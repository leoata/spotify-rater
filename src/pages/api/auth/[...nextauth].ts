import NextAuth, {Account, Profile, Session, User} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import {JWT} from "next-auth/jwt";
import {ISODateString} from "next-auth/core/types";
import {CredentialInput} from "next-auth/providers";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID as string,
            clientSecret: process.env.SPOTIFY_SECRET as string,
            authorization: {params: {scope: "playlist-read-private playlist-read-collaborative"}}
        }),
    ],
    session: {},
    callbacks: {
        async jwt(params: {
            token: JWT;
            user?: User;
            account?: Account;
            profile?: Profile;
            isNewUser?: boolean;
        }) {
            if (params.user) {
                params.token = {id: params.user.id, accessToken: params.user.accessToken, ...params.token}
            }

            return params.token;
        },

        async signIn(params: {
            user: User;
            account: Account;
            profile: Profile & Record<string, unknown>;
            email: {
                verificationRequest?: boolean;
            };
            credentials?: Record<string, CredentialInput>;
        }) {
            params.user.id = params.account.providerAccountId;
            params.user.accessToken = params.account.access_token;
            params.user.name = params.profile.display_name as string;
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        },
        async session(params: { session: Session, user: User, token: JWT }) {
            //session.accessToken = token.accessToken;
            if (params.session && params.session.user && params.token) {
                params.session.accessToken = params.token.accessToken;
                params.session.id = params.token.id
            }

            return new Promise((resolve, reject) => {
                resolve(params.session);
            });
        }
    }
})
