import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import {signIn, useSession} from "next-auth/react";
import {Button} from "@mui/material";
import {getBaseUrl} from "../src/util/envUtil";

const Home: NextPage = () => {
    const {data: session} = useSession();

    return (
        <Container maxWidth="lg" className={"center"}>
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    How good is your playlist? 🎧
                </Typography>
                {session && session.user ?
                    <>
                        {session.user.email}
                        <Button>
                            Select Playlist
                        </Button>
                        <Button>
                            Use a Different Account
                        </Button>
                    </>
                    :
                    <>
                        <Typography variant="caption" component="p" gutterBottom>
                            Not logged in.
                        </Typography>
                        <Button onClick={() => signIn("spotify")}>
                            Login in with Spotify
                        </Button>
                    </>
                }
            </Box>
        </Container>
    );
};

export default Home;
