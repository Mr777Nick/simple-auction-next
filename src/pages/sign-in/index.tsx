import * as React from 'react';

import SignInLayout from '../../layouts/sign-in/layout';
import { AuthGuard } from '../../libs/guard/auth';

export default function SignIn() {
  return (
    <AuthGuard needAuth={false}>
      <SignInLayout />
    </AuthGuard>
  );
}
