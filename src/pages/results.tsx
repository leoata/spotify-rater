import React from 'react';
import {Button} from "@mui/material";
import {useGlobalState} from "../store";
import {useRouter} from "next/router";
import useSwr from "swr";
import {ratePlaylist} from "../util/playlistRatingUtil";
import spotifyFetcher from "../util/fetchUtil";
import {useSession} from "next-auth/react";
import {SpotifyPlaylist} from "../util/spotifyTypes";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SongPopularityStat from "../components/SongPopularityStat";
import Link from 'next/link';

const Results = () => {
    const [state, setState] = useGlobalState();
    const {data: session} = useSession();
    const {data: rating, error} = useSwr(state.selectedPlaylist?.tracks.href,
        (url: string) => spotifyFetcher(url, session?.accessToken as string)
            .then(s => ratePlaylist(state.selectedPlaylist as SpotifyPlaylist, s.items)));
    const router = useRouter();
    if (!state.selectedPlaylist) {
        router.push('/select_playlist');
        return <Loading/>;
    }
    if (!rating)
        return <Loading/>;
    if (error)
        return <Error message={JSON.stringify(error)}/>;


    return (
        <div className={"center"}>

            <SongPopularityStat rating={rating}/>
            <Link passHref href={"/select_playlist"}>
                <Button onClick={() => setState({...state, selectedPlaylist: undefined})} sx={{marginY: 2}}>
                    Choose another playlist
                </Button>
            </Link>
        </div>
    );
};

export default Results;
