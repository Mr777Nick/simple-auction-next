import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { ReactNode, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

import { ROUTES } from '../../../enums/routes';
import { backendRoutes } from '../../api/backend/routes';
import {
  GetUserBackendCall,
  getUserBackendCall,
} from '../../api/backend-apis/users';
import { useAuthContext } from '../../context/auth';
import { BackendCallURL } from '../../types/backend-call';
import { BackendResponse } from '../../types/backend-response';
import { User } from '../../types/user';

export const AuthGuard = ({
  needAuth = true,
  children,
}: {
  needAuth?: boolean;
  children?: ReactNode;
}) => {
  const { isContextInitialised, tokenInfo, signOut, saveUser } =
    useAuthContext();
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

  const token = tokenInfo?.access_token ?? '';
  const url = backendRoutes.users.profile;

  const { data, error, trigger } = useSWRMutation<
    BackendResponse<User>,
    Error,
    BackendCallURL,
    GetUserBackendCall
  >(url, getUserBackendCall);

  useEffect(() => {
    if (data && data.data && !error) {
      saveUser(data.data);
    }
  }, [data, error, saveUser]);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (needAuth && tokenInfo) {
      trigger({ token });
      intervalId = setInterval(() => {
        trigger({ token });
      }, 5000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [needAuth, token, tokenInfo, trigger]);

  const [numberOfFailedAttempts, setNumberOfFailedAttempts] = useState(0);

  useEffect(() => {
    if (Number(error?.stack) === 401 && numberOfFailedAttempts > 2) {
      signOut();
      enqueueSnackbar('Your session has expired. Please sign in again.', {
        variant: 'error',
      });
    } else if (Number(error?.stack) === 401) {
      setNumberOfFailedAttempts(numberOfFailedAttempts + 1);
    } else {
      setNumberOfFailedAttempts(0);
    }
  }, [error, numberOfFailedAttempts, signOut]);

  if (needAuth && !tokenInfo) {
    return null;
  }

  if (!needAuth && tokenInfo) {
    return null;
  }

  return <>{children}</>;
};
