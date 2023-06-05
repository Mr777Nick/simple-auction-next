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
  CreateItemBidBackendCall,
  createItemBidBackendCall,
} from '../../../../libs/api/backend-apis/items';
import { useAuthContext } from '../../../../libs/context/auth';
import { BackendCallURL } from '../../../../libs/types/backend-call';
import { BackendResponse } from '../../../../libs/types/backend-response';
import { Item } from '../../../../libs/types/item';
import DepositDialog from '../../deposit';

const schema = yup.object({
  id: yup.string().required(),
  bidPrice: yup.number().required(),
});

export type CreateItemBidDialogDialogFormValue = yup.InferType<typeof schema>;

type CreateItemBidDialogDialogFormProps = {
  handleClose: () => void;
  onSuccess?: () => void;
  item: Item;
};

export default function CreateItemBidDialogDialogForm({
  handleClose,
  onSuccess,
  item,
}: CreateItemBidDialogDialogFormProps) {
  const { tokenInfo, user } = useAuthContext();

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<CreateItemBidDialogDialogFormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { trigger, data, error, isMutating } = useSWRMutation<
    BackendResponse<null>,
    Error,
    BackendCallURL,
    CreateItemBidBackendCall
  >(backendRoutes.itemBids.all, createItemBidBackendCall);

  const [openDepositDialog, setOpenDepositDialog] = useState(false);

  const onSubmit = async (data: CreateItemBidDialogDialogFormValue) => {
    try {
      if (
        user?.balance !== undefined &&
        user?.balance !== null &&
        user?.balance < data.bidPrice
      ) {
        setOpenDepositDialog(true);
      } else {
        await trigger({ ...data, token: tokenInfo?.access_token });
      }
    } catch (error) {}
  };

  const [successActionTriggered, setSuccessActionTriggered] = useState(false);

  useEffect(() => {
    if (data && !error && !isMutating) {
      if (!successActionTriggered) {
        handleClose();
        enqueueSnackbar('Item bid created successfully', {
          variant: 'success',
        });
        if (onSuccess) onSuccess();
        setSuccessActionTriggered(true);
      }
    } else {
      setSuccessActionTriggered(false);
    }
  }, [data, error, handleClose, isMutating, onSuccess, successActionTriggered]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, [error]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <DialogContent>
          <Controller
            name="id"
            control={control}
            defaultValue={item.id}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <TextField
            type="text"
            margin="dense"
            autoComplete="name"
            required
            fullWidth
            id="name"
            label="Item Name"
            placeholder={'Bidding price'}
            value={item.name}
            disabled
          />
          <Controller
            name="bidPrice"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                type="number"
                margin="dense"
                autoComplete="bidPrice"
                required
                fullWidth
                id="bidPrice"
                error={!!errors.bidPrice}
                helperText={
                  errors.bidPrice?.message
                    ? capitalize(errors.bidPrice?.message)
                    : null
                }
                label="Bid Price"
                placeholder={'Bidding price'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isMutating} type={'submit'}>
            {isMutating ? 'Submitting' : 'Submit'}
          </Button>
        </DialogActions>
      </Box>
      <DepositDialog
        open={openDepositDialog}
        setOpen={setOpenDepositDialog}
        amount={getValues('bidPrice') - user?.balance!}
      />
    </>
  );
}
