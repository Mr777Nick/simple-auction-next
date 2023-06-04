import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { capitalize } from '@mui/material/utils';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';

import { backendRoutes } from '../../../../libs/api/backend/routes';
import {
  CreateUpdateItemBackendCall,
  createUpdateItemBackendCall,
} from '../../../../libs/api/backend-apis/items';
import { useAuthContext } from '../../../../libs/context/auth';
import { BackendCallURL } from '../../../../libs/types/backend-call';
import { BackendResponse } from '../../../../libs/types/backend-response';
import { Item } from '../../../../libs/types/item';

const schema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  startPrice: yup.number().required(),
  endedAt: yup
    .date()
    .required('End date is required')
    .min(new Date(), 'End date must be a future date')
    .test(
      'is-hour-step-valid',
      'End date must have a minute step of 60',
      (value) => {
        if (value) {
          const minutes = value.getMinutes();
          return minutes === 0;
        }
        return true;
      },
    ),
});

export type CreateUpdateItemDialogFormValue = yup.InferType<typeof schema>;

type CreateUpdateItemDialogFormProps = {
  handleClose: () => void;
  onSuccess?: () => void;
  isEdit?: boolean;
  item?: Item;
};

export default function CreateUpdateItemDialogForm({
  handleClose,
  onSuccess,
  isEdit = false,
  item,
}: CreateUpdateItemDialogFormProps) {
  const { tokenInfo } = useAuthContext();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateUpdateItemDialogFormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { trigger, data, error, isMutating } = useSWRMutation<
    BackendResponse<null>,
    Error,
    BackendCallURL,
    CreateUpdateItemBackendCall
  >(backendRoutes.items.all, createUpdateItemBackendCall);

  const onSubmit = async (data: CreateUpdateItemDialogFormValue) => {
    try {
      await trigger({ ...data, isEdit, token: tokenInfo?.access_token });
    } catch (error) {}
  };

  const [successActionTriggered, setSuccessActionTriggered] = useState(false);

  useEffect(() => {
    if (data && !error && !isMutating) {
      if (!successActionTriggered) {
        handleClose();
        enqueueSnackbar(
          isEdit ? 'Item updated successfully' : 'Item created successfully',
          { variant: 'success' },
        );
        if (onSuccess) onSuccess();
        setSuccessActionTriggered(true);
      }
    } else {
      setSuccessActionTriggered(false);
    }
  }, [
    data,
    error,
    handleClose,
    isEdit,
    isMutating,
    onSuccess,
    successActionTriggered,
  ]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar('An error occurred. Please try again.', {
        variant: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (item) {
      setValue('name', item.name);
      setValue('startPrice', item.startPrice);
      setValue('endedAt', new Date(item.endedAt));
    }
  }, [item, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <DialogContent>
        {isEdit && (
          <DialogContentText>
            To prevent malicious activity, you cannot update the item name and
            the start price.
          </DialogContentText>
        )}
        <Controller
          name="id"
          control={control}
          defaultValue={isEdit ? item?.id : undefined}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              disabled={isEdit}
              margin="dense"
              autoComplete="name"
              required
              fullWidth
              id="name"
              error={!!errors.name}
              helperText={
                errors.name?.message ? capitalize(errors.name?.message) : null
              }
              label="Name"
              placeholder={'Item name'}
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          name="startPrice"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              disabled={isEdit}
              type="number"
              margin="dense"
              autoComplete="startPrice"
              required
              fullWidth
              id="startPrice"
              error={!!errors.startPrice}
              helperText={
                errors.startPrice?.message
                  ? capitalize(errors.startPrice?.message)
                  : null
              }
              label="Start Price"
              placeholder={'Starting price'}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          name="endedAt"
          control={control}
          render={({ field }) => (
            <>
              <DateTimePicker
                {...field}
                sx={{ mt: 2 }}
                disablePast
                minutesStep={60}
                views={['year', 'month', 'day', 'hours']}
                label="End Time"
                value={isEdit ? dayjs(field.value) : field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    helperText: errors.endedAt?.message
                      ? capitalize(errors.endedAt?.message)
                      : null,
                    error: !!errors.endedAt,
                  },
                }}
              />
            </>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={isMutating} type={'submit'}>
          {isEdit
            ? isMutating
              ? 'Updating'
              : 'Update'
            : isMutating
            ? 'Creating'
            : 'Create'}
        </Button>
      </DialogActions>
    </Box>
  );
}
