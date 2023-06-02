import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

export default function CompletedItems() {
  return <AuthGuard>Completed Items</AuthGuard>;
}
