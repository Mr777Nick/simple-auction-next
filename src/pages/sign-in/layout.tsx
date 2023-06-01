import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Stack, capitalize } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
  SignInBackendCall,
  signInBackendCall,
} from '../../libs/api/backend-apis/auth';
import { useAuthContext } from '../../libs/context/auth';
import { BackendCallURL } from '../../libs/types/backend-call';
import { BackendResponse } from '../../libs/types/backend-response';
import { TokenInfo } from '../../libs/types/token-info';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export type SignInFormValue = yup.InferType<typeof schema>;

export default function SignInLayout() {
  const { signIn } = useAuthContext();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInFormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { trigger, data, error, isMutating } = useSWRMutation<
    BackendResponse<TokenInfo>,
    Error,
    BackendCallURL,
    SignInBackendCall
  >(backendRoutes.auth.signIn, signInBackendCall);

  const onSubmit = async (data: SignInFormValue) => {
    try {
      await trigger(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (data && data.data) {
      const { token, expiresAt, expiresIn, tokenType, refreshToken } =
        data.data;

      signIn({
        token,
        expiresAt,
        expiresIn,
        tokenType,
        refreshToken,
      });
    }
  }, [data, signIn]);

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
          Sign in
        </Typography>
        <Box
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
            name="email"
            control={control}
            defaultValue=""
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
                autoFocus
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                margin="normal"
                autoComplete="current-password"
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
            {isMutating ? 'Signing in...' : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={ROUTES.SIGNUP} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
