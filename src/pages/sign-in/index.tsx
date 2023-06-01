import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

import SignInLayout from './layout';

export default function SignIn() {
  return (
    <AuthGuard needAuth={false}>
      <SignInLayout />
    </AuthGuard>
  );
}
