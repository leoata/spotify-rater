import { useState } from 'react';
import {createContainer} from "react-tracked";
import {SpotifyPlaylist} from "./pages/select_playlist";

interface GlobalState {
    selectedPlaylist?: SpotifyPlaylist | null,
}
const initialState: GlobalState = {
    selectedPlaylist: null,
}


const useMyState = () => useState(initialState);

export const {
    Provider: GlobalStateProvider,
    useTracked: useGlobalState,
} = createContainer(useMyState);
