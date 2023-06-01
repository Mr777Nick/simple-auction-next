import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { capitalize } from '@mui/material/utils';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Copyright from '../../components/copyright';
import Link from '../../components/link';
import { ROUTES } from '../../enums/routes';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export type SignUpFormValue = yup.InferType<typeof schema>;

export default function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpFormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: any) => console.log(data);

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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                margin="normal"
                autoComplete="new-password"
                required
                fullWidth
                id="password"
                error={!!errors.password}
                helperText={
                  errors.password?.message
                    ? capitalize(errors.password?.message)
                    : null
                }
                label="Password"
                placeholder={'Your password'}
                autoFocus
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
          >
            Sign Up
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
