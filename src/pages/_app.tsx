import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import "../styles/globals.css";
import {SessionProvider} from "next-auth/react";
import {GlobalStateProvider} from '../store';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp({
                                  Component,
                                  emotionCache = clientSideEmotionCache,
                                  pageProps: {session, ...pageProps},
                                  router
                              }: MyAppProps) {
    return (
        <SessionProvider session={session}>
            <GlobalStateProvider>

                <CacheProvider value={emotionCache}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    </Head>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </CacheProvider>
            </GlobalStateProvider>
        </SessionProvider>

    );
}
