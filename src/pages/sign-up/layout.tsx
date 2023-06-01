import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { capitalize } from '@mui/material/utils';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';

import Copyright from '../../components/copyright';
import Link from '../../components/link';
import { ROUTES } from '../../enums/routes';
import { backendRoutes } from '../../libs/api/backend/routes';
import {
  SignUpBackendCall,
  signUpBackendCall,
} from '../../libs/api/backend-apis/auth';
import { BackendCallURL } from '../../libs/types/backend-call';
import { BackendResponse } from '../../libs/types/backend-response';
import { TokenInfo } from '../../libs/types/token-info';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export type SignUpFormValue = yup.InferType<typeof schema>;

export default function SignUpLayout() {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<SignUpFormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { trigger, data, error, isMutating } = useSWRMutation<
    BackendResponse<null>,
    Error,
    BackendCallURL,
    SignUpBackendCall
  >(backendRoutes.auth.signUp, signUpBackendCall);

  const onSubmit = async (data: SignUpFormValue) => {
    try {
      await trigger(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (data) {
      enqueueSnackbar(data.message, { variant: 'success' });
      router.push(
        {
          pathname: ROUTES.SIGNIN,
          query: {
            email: getValues('email'),
          },
        },
        ROUTES.SIGNIN,
      );
    }
  }, [data, getValues, router]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          {!!error && (
            <Stack sx={{ width: '100%' }}>
              <Alert severity="error" variant="filled">
                {error.message}
              </Alert>
            </Stack>
          )}
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                margin="normal"
                autoComplete="name"
                required
                fullWidth
                id="name"
                error={!!errors.name}
                helperText={
                  errors.name?.message ? capitalize(errors.name?.message) : null
                }
                label="Name"
                placeholder={'Your name'}
                autoFocus
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                error={!!errors.email}
                helperText={
                  errors.email?.message
                    ? capitalize(errors.email?.message)
                    : null
                }
                label="Email"
                placeholder={'Your email'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                margin="normal"
                autoComplete="new-password"
                required
                fullWidth
                id="password"
                type="password"
                error={!!errors.password}
                helperText={
                  errors.password?.message
                    ? capitalize(errors.password?.message)
                    : null
                }
                label="Password"
                placeholder={'Your password'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isMutating}
          >
            {isMutating ? 'Signing up...' : 'Sign up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={ROUTES.SIGNIN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
