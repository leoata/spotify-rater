import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import Link from 'next/link';

const FourOhFour = () => {
    return (
        <>
            <Typography variant={"h1"} component={"h1"}>
                Are you lost?
            </Typography>
            <Link
                href={'/'}
                passHref>
                <Button sx={{marginY: 2}}>
                    Back to safety
                </Button>
            </Link>
        </>
    );
};

export default FourOhFour;
