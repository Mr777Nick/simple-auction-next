import * as React from 'react';

import { AuthGuard } from '../../libs/guard/auth';

export default function MyItems() {
  return <AuthGuard>My Items</AuthGuard>;
}
