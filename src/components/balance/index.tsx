import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import useSWR from 'swr';

import theme from '../../config/theme';
import { backendRoutes } from '../../libs/api/backend/routes';
import { getUserBackendCall } from '../../libs/api/backend-apis/users';
import { useAuthContext } from '../../libs/context/auth';
import { BackendResponse } from '../../libs/types/backend-response';
import { User } from '../../libs/types/user';

export default function Balance() {
  const { tokenInfo } = useAuthContext();

  const token = tokenInfo?.access_token ?? '';
  const url = backendRoutes.users.profile;

  const { data, error, isLoading, mutate } = useSWR<BackendResponse<User>>(
    [url, token],
    ([url, token]: [string, string]) => getUserBackendCall(url, token),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      mutate();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [mutate]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, [error]);

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={'center'}
      marginBottom={theme.spacing(1)}
    >
      <Typography variant="h6">
        {isLoading
          ? 'Getting user balance...'
          : `Current Balance: $ ${data?.data?.balance}`}{' '}
      </Typography>
    </Grid>
  );
}
