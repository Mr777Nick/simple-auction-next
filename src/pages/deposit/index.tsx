import * as React from 'react';

import DepositLayout from '../../layouts/deposit';
import { AuthGuard } from '../../libs/guard/auth';

export default function Deposit() {
  return (
    <AuthGuard>
      <DepositLayout />
    </AuthGuard>
  );
}
