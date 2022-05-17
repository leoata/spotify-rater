import * as React from 'react';
import type {NextPage} from 'next';
import Typography from '@mui/material/Typography';
import {signIn, signOut, useSession} from "next-auth/react";
import {Button, ButtonBase, Container, IconButton} from "@mui/material";
import {HomeMaxOutlined, HouseOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import Link from "next/link";
import {signout} from "next-auth/core/routes";

type AppStage = 'start' | 'selectPlaylist' | 'loadingResults' | 'results' | 'error';
const Home: NextPage = () => {
    const {data: session} = useSession();
    const router = useRouter();
    return (
        <div className={"center"}>
            <Typography variant="h1" component="h1" gutterBottom>
                How good is your playlist? 🎧
            </Typography>
            {session && session.user ?
                <>
                    <Typography variant={"caption"} component={"p"}>
                        You are logged in as {session.user.name}.
                    </Typography>
                    <div style={{display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center"}}>
                        <Link
                            href={'/select_playlist'}
                            passHref>
                            <Button component="a" sx={{marginY: "16px"}}>
                                Select Playlist
                            </Button>
                        </Link>
                        <Button onClick={() => {
                            signOut({
                                callbackUrl: "/",
                            });
                        }}>
                            Use a Different Account
                        </Button>
                    </div>
                </>
                :
                <div style={{display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center"}}>
                    <Typography variant="caption" component="p" gutterBottom>
                        Not logged in.
                    </Typography>
                    <Button onClick={() => signIn("spotify")}>
                        Login in with Spotify
                    </Button>
                </div>
            }
        </div>
    );
};

export default Home;
