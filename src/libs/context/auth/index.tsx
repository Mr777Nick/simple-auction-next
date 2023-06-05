import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TokenInfo } from '../../types/token-info';
import { User } from '../../types/user';

export const AuthContext = createContext<null | {
  isContextInitialised: boolean;
  tokenInfo: null | TokenInfo;
  user: null | User;
  signIn: (tokenInfo: TokenInfo) => unknown;
  signOut: () => unknown;
  saveUser: (user: User) => unknown;
}>(null);

export const AuthContextProvider = (props: {
  children: ReactNode;
  authName: string;
  initialValue?: {
    tokenInfo?: TokenInfo;
    user?: User;
  };
}) => {
  const { authName, initialValue } = props;

  const [isContextInitialised, setInitialised] = useState(false);

  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (initialValue) {
      setTokenInfo(initialValue.tokenInfo ?? null);
      setUser(initialValue.user ?? null);
    }
  }, [initialValue]);

  const persistTokenInfo = useCallback(
    (tokenInfo: TokenInfo) => {
      const {
        access_token,
        expires_in,
        expires_at,
        token_type,
        refresh_token,
      } = tokenInfo;

      setTokenInfo(tokenInfo);

      setCookie(`access_token_${authName}`, access_token);
      setCookie(`expires_in_${authName}`, expires_in);
      setCookie(`expires_at_${authName}`, expires_at);
      setCookie(`token_type_${authName}`, token_type);
      setCookie(`refresh_token_${authName}`, refresh_token);
    },
    [authName],
  );

  const handleSignOut = useCallback(() => {
    setTokenInfo(null);

    deleteCookie(`access_token_${authName}`);
    deleteCookie(`expires_in_${authName}`);
    deleteCookie(`expires_at_${authName}`);
    deleteCookie(`token_type_${authName}`);
    deleteCookie(`refresh_token_${authName}`);

    setUser(null);

    deleteCookie(`user_name_${authName}`);
    deleteCookie(`user_balance_${authName}`);
  }, [authName]);

  const persistUser = useCallback(
    (user: User) => {
      const { name, balance } = user;

      setUser(user);

      setCookie(`user_name_${authName}`, name);
      setCookie(`user_balance_${authName}`, balance);
    },
    [authName],
  );

  useEffect(() => {
    if (tokenInfo) {
      setInitialised(true);
    }
  }, [tokenInfo]);

  useEffect(() => {
    const access_token = getCookie(`access_token_${authName}`)?.toString();
    const expires_in = Number(getCookie(`expires_in_${authName}`));
    const expires_at = Number(getCookie(`expires_at_${authName}`));
    const token_type = getCookie(`token_type_${authName}`)?.toString();
    const refresh_token = getCookie(`refresh_token_${authName}`)?.toString();

    if (access_token && expires_in && expires_at && token_type) {
      setTokenInfo({
        access_token,
        expires_in,
        expires_at,
        token_type,
        refresh_token,
      });
    } else {
      setInitialised(true);
    }
  }, [authName]);

  const contextValue = useMemo(
    () => ({
      isContextInitialised,
      tokenInfo,
      user,
      signIn: persistTokenInfo,
      signOut: handleSignOut,
      saveUser: persistUser,
    }),
    [
      isContextInitialised,
      tokenInfo,
      user,
      persistTokenInfo,
      handleSignOut,
      persistUser,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(`Attempted to read context value outside of provider`);
  }

  return context;
};
