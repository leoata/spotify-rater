export type SpotifyAlbum = {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: { height: number, url: string, width: number }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export type SpotifyArtist = {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export type SpotifyTrack = {
    added_at: string;
    added_by: SpotifyArtist,
    is_local: boolean
    primary_color?: string
    track: {
        album: SpotifyAlbum;
        artists: SpotifyArtist[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        episode: boolean;
        explicit: boolean;
        external_ids: { isrc: string };
        external_urls: { spotify: string };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track: boolean;
        track_number: number;
        type: string;
        uri: string;
    }
    video_thumbnail: { url?: string }
}

export type SpotifyPlaylist = {
    collaborative: boolean
    description: string
    external_urls: any
    href: string
    id: string
    images: { height: number, width: number, url: string }[];
    name: string;
    owner: { display_name: string, external_urls: any, href: string, id: string, type: string, uri: string };
    primary_color: string;
    public: boolean;
    snapshot_id: string;
    tracks: { href: string, total: number };
    type: string;
    uri: string;
};
