import {signIn} from "next-auth/react";

export default (url: string, accessToken: string) =>
    fetch(url, {headers: {Authorization: `Bearer ${accessToken}`}})
        .catch(err => signIn("spotify"))
        .then(res => res?.json());
