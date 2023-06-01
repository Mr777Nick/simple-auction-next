import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';

import createEmotionCache from '../config/create-emotion-cache';
import theme from '../config/theme';
import { AuthContextProvider } from '../libs/context/auth';
import { fetcher } from '../libs/utils/fetcher';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
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
                <Component {...pageProps} />;
              </SWRConfig>
            </AuthContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
