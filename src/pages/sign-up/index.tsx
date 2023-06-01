import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

import SignUpLayout from './layout';

export default function SignUp() {
  return (
    <AuthGuard needAuth={false}>
      <SignUpLayout />
    </AuthGuard>
  );
}
