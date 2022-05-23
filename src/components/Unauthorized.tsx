import React, {useEffect} from 'react';
import {Button, Typography} from "@mui/material";
import {signIn, signOut} from "next-auth/react";

const Unauthorized = () => {
    useEffect(() => {
        signOut()
    }, []);
    return (
        <div className={"center"}>
            <Typography variant={"h1"} component={"h1"}>
                You have to be logged in to use this page
            </Typography>
            <Button sx={{marginY: 2}} onClick={() => signIn("spotify")}>
                Login in with Spotify
            </Button>
        </div>
    );
};

export default Unauthorized;
