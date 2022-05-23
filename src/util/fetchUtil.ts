import {signIn} from "next-auth/react";

export default (url: string, accessToken: string) =>
    fetch(url, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then(res => {
            if (res.status === 401) {
                signIn("spotify")
                return undefined;
            }
            return res;
        })
        .catch(async (err) => {
            console.log(err)
            await signIn("spotify")
            return undefined;
        })
        .then(res => res?.json());
