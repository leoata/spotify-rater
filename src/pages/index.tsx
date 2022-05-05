import * as React from 'react';
import type {NextPage} from 'next';
import Typography from '@mui/material/Typography';
import {signIn, useSession} from "next-auth/react";
import StartScreen from "../src/components/StartScreen";
import {useState} from "react";
import SelectPlaylist from "../src/components/SelectPlaylist";
import LoadingResults from "../src/components/LoadingResults";
import Results from "../src/components/Results";
import Error from "../src/components/Error";
import {Container} from "@mui/material";

type AppStage = 'start' | 'selectPlaylist' | 'loadingResults' | 'results' | 'error';
const Home: NextPage = () => {
    const {data: session} = useSession();
    const [stage, setStage] = useState<AppStage>('start');
    const [playlistId, setPlaylistId] = useState<string | null>(null);
    const getComponentFromStage = () => {
        switch (stage) {
            case 'start':
                return <StartScreen onFinish={() => setStage('selectPlaylist')}/>;
            case 'selectPlaylist':
                return <SelectPlaylist onFinish={(playlistId: string) => {
                    setStage('loadingResults');
                    setPlaylistId(playlistId);
                }}/>;
            case 'loadingResults':
                return <LoadingResults playlistId={playlistId} onFinish={()=>setStage('results')}/>;
            case 'results':
                return <Results playlistId={playlistId} onFinish={()=>{
                    setStage('selectPlaylist');
                    setPlaylistId(null);
                }}/>;
            case 'error':
                return <Error/>;
        }
    };
    return (
        <Container maxWidth="lg" className={"center"}>
            {getComponentFromStage()}
        </Container>
    );
};

export default Home;
