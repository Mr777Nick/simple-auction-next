import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Link from '../components/link';
import { useAuthContext } from '../libs/context/auth';
import { AuthGuard } from '../libs/guard/auth';

export default function Home() {
  const { signOut } = useAuthContext();

  return (
    <AuthGuard>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Material UI - Next.js example in TypeScript
          </Typography>
          <Link href="/sign-in" color="secondary">
            Go to the sign-in page
          </Link>
          <Link href="/sign-up" color="secondary">
            Go to the sign-up page
          </Link>
          <button onClick={signOut}>Sign out</button>
        </Box>
      </Container>
    </AuthGuard>
  );
}
