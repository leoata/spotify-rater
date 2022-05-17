import {SpotifyPlaylist, SpotifyTrack} from "../util/spotifyTypes";
import {getBaseUrl} from "./envUtil";
import spotifyFetcher from "./fetchUtil";

export type SongResponse = {
    track: SpotifyTrack;
    popularity: number;
}

export type PlaylistRating = {
    songs: SongResponse[];
    overallRelativePopularity: number;
}

export const ratePlaylist = async (playlist: SpotifyPlaylist, tracks: SpotifyTrack[]): Promise<PlaylistRating> => {
    const songs: SongResponse[] = tracks.map(track => ({
        track: track,
        popularity: track.track.popularity / 100
    }));

    const avg = tracks.reduce((acc, curr) => acc + curr.track.popularity, 0) / tracks.length;
    return {songs, overallRelativePopularity: avg};
}

