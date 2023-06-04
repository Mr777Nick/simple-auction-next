import * as React from 'react';

import MyItemsLayout from '../../layouts/my-items';
import { AuthGuard } from '../../libs/guard/auth';

export default function MyItems() {
  return (
    <AuthGuard>
      <MyItemsLayout />
    </AuthGuard>
  );
}
