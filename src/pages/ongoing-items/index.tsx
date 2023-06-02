import * as React from 'react';

import OngoingItemsLayout from '../../layouts/ongoing-items';
import { AuthGuard } from '../../libs/guard/auth';

function OngoingItems() {
  return (
    <AuthGuard>
      <OngoingItemsLayout />
    </AuthGuard>
  );
}

export default OngoingItems;
