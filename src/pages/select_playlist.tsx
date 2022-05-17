import React, {useEffect} from 'react';
import useSwr from 'swr';
import {signIn, useSession} from "next-auth/react";
import Unauthorized from "../components/Unauthorized";
import {Button, Container, Paper, Typography} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/router";
import {useGlobalState} from "../store";
import spotifyFetcher from "../util/fetchUtil";
import {signin} from "next-auth/core/routes";
import {SpotifyPlaylist} from "../util/spotifyTypes";


const SelectPlaylist = () => {
    const {data: session} = useSession();
    const [state, setState] = useGlobalState();
    const [offset, setOffset] = React.useState(0);
    const [playlists, setPlaylists] = React.useState<SpotifyPlaylist[]>([]);
    const [next, setNext] = React.useState<string>();
    const router = useRouter();

    useEffect(() => {
        spotifyFetcher(`https://api.spotify.com/v1/users/${session?.id}/playlists?limit=50&offset=${offset}`,
            session?.accessToken as string)
            .then(res => {
            setPlaylists(playlists.concat(res.items));
            setNext(res.next);
            setOffset(offset + 50);
        });
    }, [])
    useEffect(() => {
        if (!next)
            return;
        if (offset >= 150)
            return;
        spotifyFetcher(
            `https://api.spotify.com/v1/users/${session?.id}/playlists?limit=50&offset=${offset}`,
            session?.accessToken as string).then(res => {
            setPlaylists(playlists.concat(res.items));
            setNext(res.next);
            setOffset(offset + 50);
        });
    }, [next]);


    if (playlists.length == 0) {
        return <Typography variant={"h1"} component={"h1"}>
            Loading...
        </Typography>;
    }

    //const myPlaylists: SpotifyPlaylist[] = data.filter((item: any) => item.owner.id === session?.id);
    const myPlaylists: SpotifyPlaylist[] = playlists.filter(item=>item).filter((item: SpotifyPlaylist) => item.owner.id === session?.id);

    return (
        <Container sx={{maxHeight: "none", position: "relative", top: "4rem"}} className={"centerX"}>
            <Typography variant={"h1"} component={"h1"}>
                Your playlists
            </Typography>
            <Button sx={{marginY: 1}} disabled={state.selectedPlaylist == null} onClick={() => router.push("/results")}>
                Get Results
            </Button>
            <Container maxWidth={"xs"}>
                <div style={{display: "flex", justifyContent: "space-between", padding: "0.5rem 1.5rem 0rem 1.5rem"}}>
                    <Typography variant={"h3"} component={"h3"}>
                        Cover
                    </Typography>
                    <Typography variant={"h3"} component={"h3"}>
                        Name
                    </Typography>
                    <Typography variant={"h3"} component={"h3"}>
                        Tracks
                    </Typography>
                </div>
                {myPlaylists.map((playlist: SpotifyPlaylist) => (
                    <Paper key={playlist.id}
                           sx={{
                               backgroundColor: state.selectedPlaylist && state.selectedPlaylist.id == playlist.id ? "#303236" : "rgb(34, 35, 38)",
                               borderRadius: "10px", padding: "0.5rem 2rem",
                               height: "50px", marginY: "5px", position: "relative",
                               textAlign: "left", cursor: "pointer"
                           }} elevation={state.selectedPlaylist && state.selectedPlaylist.id == playlist.id ? 2 : 12}
                           onClick={() => setState((prev) => ({
                               ...prev, selectedPlaylist:
                                   state.selectedPlaylist && state.selectedPlaylist.id == playlist.id ? null : playlist
                           }))}>

                        <Image style={{float: "left", left: "10px"}}
                               src={!playlist.images || playlist.images.length == 0 ? "/" : playlist.images[0].url} alt={playlist.name}
                               width={32} height={32}/>
                        <div style={{float: "right", width: "80%"}}>
                            <Typography sx={{
                                verticalAlign: "middle", lineHeight: "100%", float: "left"
                            }} variant={"caption"} component={"p"}>
                                {playlist.name}
                            </Typography>
                            <Typography sx={{width: "2rem", margin: 0, float: "right"}} variant={"caption"}
                                        component={"p"}>
                                {playlist.tracks.total}
                            </Typography>
                        </div>
                    </Paper>

                ))}
            </Container>
        </Container>
    );
};


export default SelectPlaylist;
