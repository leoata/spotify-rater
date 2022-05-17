import React, {ReactElement} from 'react';
import {ButtonBase, SxProps, Theme} from "@mui/material";
import {KeyboardArrowRightRounded, SvgIconComponent} from "@mui/icons-material";
import Link from "next/link";

const IconButton = ({sx, icon, href, onClick}:
                        {sx?: SxProps<Theme>, icon: ReactElement<any, any>, href: string, onClick?: React.MouseEventHandler}) => {
    return (
        <Link
            href={href}
            passHref>
            <ButtonBase sx={sx} disableRipple onClick={onClick}>
                {icon}
            </ButtonBase>
        </Link>
    );
};

export default IconButton;
