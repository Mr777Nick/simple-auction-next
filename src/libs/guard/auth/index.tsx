import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { ROUTES } from '../../../enums/routes';
import { useAuthContext } from '../../context/auth';

export const AuthGuard = ({
  needAuth = true,
  children,
}: {
  needAuth?: boolean;
  children?: ReactNode;
}) => {
  const { isContextInitialised, tokenInfo } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (needAuth && isContextInitialised && !tokenInfo) {
      router.replace(ROUTES.SIGNIN);
    }
  }, [isContextInitialised, needAuth, router, tokenInfo]);

  useEffect(() => {
    if (!needAuth && tokenInfo) {
      router.push(ROUTES.HOME);
    }
  }, [needAuth, router, tokenInfo]);

  if (needAuth && !tokenInfo) {
    return null;
  }

  if (!needAuth && tokenInfo) {
    return null;
  }

  return <>{children}</>;
};
