import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

export default function MyItemBids() {
  return <AuthGuard>My Item Bids</AuthGuard>;
}
