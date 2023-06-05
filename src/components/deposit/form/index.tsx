import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { capitalize } from '@mui/material/utils';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';

import theme from '../../../config/theme';
import { backendRoutes } from '../../../libs/api/backend/routes';
import {
  DepositBackendCall,
  depositBackendCall,
} from '../../../libs/api/backend-apis/users';
import { useAuthContext } from '../../../libs/context/auth';
import { BackendCallURL } from '../../../libs/types/backend-call';
import { BackendResponse } from '../../../libs/types/backend-response';

const schema = yup.object({
  amount: yup.number().required(),
});

export type DepositFormValue = yup.InferType<typeof schema>;

type DepositFormProps = {
  amount?: number;
  isForDialog?: boolean;
  handleClose?: () => void;
};

export default function DepositForm(props: DepositFormProps) {
  const { amount, isForDialog, handleClose } = props;

  const { tokenInfo } = useAuthContext();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<DepositFormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    if (amount) setValue('amount', amount);
  }, [amount, setValue]);

  const { trigger, data, error, isMutating } = useSWRMutation<
    BackendResponse<null>,
    Error,
    BackendCallURL,
    DepositBackendCall
  >(backendRoutes.users.topup, depositBackendCall);

  const onSubmit = async (data: DepositFormValue) => {
    try {
      if (tokenInfo?.access_token) {
        await trigger({ ...data, token: tokenInfo?.access_token });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Successfully deposit balance', { variant: 'success' });
      if (handleClose) handleClose();
    }
  }, [data, handleClose]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(
        `An error occurred. Please try again. Error message: ${error.message}`,
        { variant: 'error' },
      );
    }
  }, [error]);

  return (
    <>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        {!!error && (
          <Stack sx={{ width: '100%' }}>
            <Alert severity="error" variant="filled">
              {error.message}
            </Alert>
          </Stack>
        )}
        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              type="number"
              error={!!errors.amount}
              helperText={
                errors.amount?.message
                  ? capitalize(errors.amount?.message)
                  : null
              }
              label="Amount"
              placeholder={'Amount to deposit'}
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {!isForDialog && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isMutating}
          >
            {isMutating ? 'Depositing...' : 'Deposit'}
          </Button>
        )}
        {isForDialog && (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={isMutating} type={'submit'}>
              {isMutating ? 'Depositing...' : 'Deposit'}
            </Button>
          </DialogActions>
        )}
      </Grid>
    </>
  );
}
