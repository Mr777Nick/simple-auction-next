import * as React from 'react';

import SignUpLayout from '../../layouts/sign-up/layout';
import { AuthGuard } from '../../libs/guard/auth';

export default function SignUp() {
  return (
    <AuthGuard needAuth={false}>
      <SignUpLayout />
    </AuthGuard>
  );
}
