import React from 'react';
import {Typography} from "@mui/material";

const Error = ({message}: {message: string}) => {
    return (
        <div className={"center"}>
            <Typography variant={"h1"} component={"h1"}>Error! Message: {message}</Typography>
        </div>
    );
};

export default Error;
