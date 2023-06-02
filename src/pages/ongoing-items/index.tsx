import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

export default function OngoingItems() {
  return <AuthGuard>Ongoing Items</AuthGuard>;
}
