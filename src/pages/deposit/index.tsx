import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

export default function Deposit() {
  return <AuthGuard>Deposit</AuthGuard>;
}
