import * as React from 'react';

import CompletedItemsLayout from '../../layouts/completed-items';
import { AuthGuard } from '../../libs/guard/auth';

export default function CompletedItems() {
  return (
    <AuthGuard>
      <CompletedItemsLayout />
    </AuthGuard>
  );
}
