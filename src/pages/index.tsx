import { useRouter } from 'next/router';
import * as React from 'react';

import { ROUTES } from '../enums/routes';
import { useAuthContext } from '../libs/context/auth';
import { AuthGuard } from '../libs/guard/auth';

export default function Home() {
  const { signOut } = useAuthContext();

  const router = useRouter();

  React.useEffect(() => {
    router.replace(ROUTES.ONGOING_ITEMS);
  }, [router]);

  return <AuthGuard></AuthGuard>;
}
