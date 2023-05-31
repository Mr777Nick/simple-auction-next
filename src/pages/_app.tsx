import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

import createEmotionCache from '../config/create-emotion-cache';
import theme from '../config/theme';

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
          <CssBaseline />
          <NextNProgress
            color={theme.palette.primary.main}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />;
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
