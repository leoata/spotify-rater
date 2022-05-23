import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import "../styles/globals.css";
import {SessionProvider, signOut, useSession} from "next-auth/react";
import {GlobalStateProvider} from '../store';
import {Container} from "@mui/material";
import {HouseOutlined} from "@mui/icons-material";
import Unauthorized from "../components/Unauthorized";
import {NextComponentType} from "next";
import {NextRouter} from "next/router";
import Loading from "../components/Loading";
import IconButton from "../components/IconButton";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const AppContent = ({
                        Component,
                        pageProps,
                        router
                    }: { Component: NextComponentType, pageProps: any, router: NextRouter }) => {
    const {data: session, status} = useSession();

    if (status === 'loading') {
        return <Loading/>;
    }
    if ((!session || !session.id) && router.route !== '/') {
        return <Unauthorized/>;
    }
    return <Component {...pageProps} />;

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
                        <CssBaseline/>
                        <IconButton sx={{color: "white", top: "16px", left: "16px", position: "absolute", width: "16px", height: "16px"}} icon={<HouseOutlined/>} href="/"/>
                        <Container maxWidth="lg">
                            <AppContent Component={Component} pageProps={pageProps} router={router}/>
                        </Container>

                    </ThemeProvider>
                </CacheProvider>
            </GlobalStateProvider>
        </SessionProvider>

    );
}
