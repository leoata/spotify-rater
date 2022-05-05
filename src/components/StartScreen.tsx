import React from 'react';
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {signIn, useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import {jsx} from "@emotion/react";
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;

const StartScreen = (onFinish: any) => {
    const {data: session} = useSession();

    return (
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
                    <Button onClick={onFinish}>
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
    );
};

export default StartScreen;
