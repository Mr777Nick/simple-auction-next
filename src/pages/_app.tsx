import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';

import NavigationBar from '../components/navigation-bar';
import createEmotionCache from '../config/create-emotion-cache';
import theme from '../config/theme';
import { ROUTES } from '../enums/routes';
import { fetcher } from '../libs/api/backend-apis/fetcher';
import { AuthContextProvider } from '../libs/context/auth';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();

  const shouldShowNavBar = () => {
    if (
      router.pathname.includes(ROUTES.SIGNIN) ||
      router.pathname.includes(ROUTES.SIGNUP)
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarProvider>
              <AuthContextProvider authName="easyAuction">
                <SWRConfig
                  value={{
                    fetcher: fetcher,
                  }}
                >
                  <CssBaseline />
                  <NextNProgress
                    color={theme.palette.primary.main}
                    options={{ showSpinner: false }}
                  />
                  <NavigationBar show={shouldShowNavBar()}>
                    <Component {...pageProps} />
                  </NavigationBar>
                </SWRConfig>
              </AuthContextProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
