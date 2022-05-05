import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID as string,
            clientSecret: process.env.SPOTIFY_SECRET as string,
        }),
        // ...add more providers here
    ],
})
