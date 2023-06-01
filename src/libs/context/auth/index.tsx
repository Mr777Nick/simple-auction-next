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

export const AuthContext = createContext<null | {
  isContextInitialised: boolean;
  tokenInfo: null | TokenInfo;
  signIn: (tokenInfo: TokenInfo) => unknown;
  signOut: () => unknown;
}>(null);

export const AuthContextProvider = (props: {
  children: ReactNode;
  authName: string;
}) => {
  const { authName } = props;

  const [isContextInitialised, setInitialised] = useState(false);

  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  const persistTokenInfo = useCallback(
    (tokenInfo: TokenInfo) => {
      const { token, expiresIn, expiresAt, tokenType, refreshToken } =
        tokenInfo;

      setTokenInfo(tokenInfo);

      setCookie(`token_${authName}`, token);
      setCookie(`expiresIn_${authName}`, expiresIn);
      setCookie(`expiresAt_${authName}`, expiresAt);
      setCookie(`tokenType_${authName}`, tokenType);
      setCookie(`refreshToken_${authName}`, refreshToken);
    },
    [authName],
  );

  const handleSignOut = useCallback(() => {
    setTokenInfo(null);

    deleteCookie(`token_${authName}`);
    deleteCookie(`expiresIn_${authName}`);
    deleteCookie(`expiresAt_${authName}`);
    deleteCookie(`tokenType_${authName}`);
    deleteCookie(`refreshToken_${authName}`);
  }, [authName]);

  useEffect(() => {
    if (tokenInfo) {
      setInitialised(true);
    }
  }, [handleSignOut, tokenInfo]);

  useEffect(() => {
    const token = getCookie(`token_${authName}`)?.toString();
    const expiresIn = Number(getCookie(`expiresIn_${authName}`));
    const expiresAt = Number(getCookie(`expiresAt_${authName}`));
    const tokenType = getCookie(`tokenType_${authName}`)?.toString();
    const refreshToken = getCookie(`refreshToken_${authName}`)?.toString();

    if (token && expiresIn && expiresAt && tokenType) {
      setTokenInfo({
        token,
        expiresIn,
        expiresAt,
        tokenType,
        refreshToken,
      });
    } else {
      setInitialised(true);
    }
  }, [authName]);

  const contextValue = useMemo(
    () => ({
      isContextInitialised,
      tokenInfo,
      signIn: persistTokenInfo,
      signOut: handleSignOut,
    }),
    [isContextInitialised, tokenInfo, persistTokenInfo, handleSignOut],
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
