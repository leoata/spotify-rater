import React from 'react';
import {Typography} from "@mui/material";
import {PlaylistRating} from "../../util/playlistRatingUtil";

const SongLengthCard = ({rating}: {rating: PlaylistRating}) => {
    const longest = rating.songs.reduce((acc, song) => (
        song.track.track.duration_ms > acc.track.track.duration_ms ? song : acc
    )).track;
    const shortest = rating.songs.reduce((acc, song) => (
        song.track.track.duration_ms < acc.track.track.duration_ms ? song : acc
    )).track;

    // get average length of songs
    const average = rating.songs.reduce((acc, song) => acc + song.track.track.duration_ms, 0) / rating.songs.length / 1000 / 60;

    return (
        <>
            <Typography variant="h1" component={"h1"}>
                Your longest song is:
            </Typography>
            <Typography variant="h2" component={"h2"} sx={{color: "white"}}>
                {longest.track.name} by {longest.track.artists[0].name}<br/>
                {(longest.track.duration_ms / 1000 / 60)
                    .toLocaleString(undefined, {maximumFractionDigits: 2})} minutes
            </Typography>
            <Typography variant="h1" component={"h1"}>
                Your shortest song is:
            </Typography>
            <Typography variant="h2" component={"h2"} sx={{color: "white"}}>
                {shortest.track.name} by {shortest.track.artists[0].name}<br/>
                {(shortest.track.duration_ms / 1000 / 60)
                    .toLocaleString(undefined, {maximumFractionDigits: 2})} minutes
            </Typography>
            <Typography variant="h1" component={"h1"}>
                On average, a song on your playlist is
            </Typography>
            <Typography variant="h2" component={"h2"} sx={{color: "white"}}>
                {average.toLocaleString(undefined, {maximumFractionDigits: 2})} minutes long
            </Typography>
        </>
    );
};

export default SongLengthCard;
