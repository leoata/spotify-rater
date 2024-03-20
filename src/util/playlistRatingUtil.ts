import {SpotifyArtist, SpotifyPlaylist, SpotifyTrack} from "./spotifyTypes";

export type SongResponse = {
    track: SpotifyTrack;
    popularity: number;
}

export type PlaylistRating = {
    songs: SongResponse[];
    mostCommonArtist: SpotifyArtist;
    overallRelativePopularity: number;
}

export const ratePlaylist = async (playlist: SpotifyPlaylist, tracks: SpotifyTrack[]): Promise<PlaylistRating> => {
    const songs: SongResponse[] = tracks.map(track => ({
        track: track,
        popularity: track.track.popularity / 100
    }));

    const avg = tracks.reduce((acc, curr) => acc + curr.track.popularity, 0) / tracks.length;
    const artists = tracks.map(s => s.track.artists).flat();
    const artistCommonality: { [name: string]: number } = {"dummy": 1}
    for (let i = 0; i < artists.length; ++i) {
        if (artistCommonality[artists[i].id])
            artistCommonality[artists[i].id] += 1
        else
            artistCommonality[artists[i].id] = 1;
    }
    let mostCommonArtist = "";
    let mostCommonArtistCnt = -1;
    for (let i = 0; i < Object.keys(artistCommonality).length; ++i) {
        const entry = Object.entries(artistCommonality)[i];
        if (mostCommonArtistCnt < entry[1]) {
            mostCommonArtist = entry[0];
            mostCommonArtistCnt = entry[1]
        }
    }
    return {songs, overallRelativePopularity: avg, mostCommonArtist: artists.filter(s=>s.id === mostCommonArtist)[0]};
}

