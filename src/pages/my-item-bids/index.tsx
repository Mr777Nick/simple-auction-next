import * as React from 'react';

import MyItemBidsLayout from '../../layouts/my-item-bids';
import { AuthGuard } from '../../libs/guard/auth';

export default function MyItemBids() {
  return (
    <AuthGuard>
      <MyItemBidsLayout />
    </AuthGuard>
  );
}
