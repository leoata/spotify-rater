import React from 'react';
import {Typography} from "@mui/material";
import {PlaylistRating} from "../../util/playlistRatingUtil";

const TrendingnessCard = ({rating}: { rating: PlaylistRating }) => {
    const mostPopular = rating.songs.reduce((acc, song) => (
        song.popularity > acc.popularity ? song : acc
    )).track;
    const leastPopular = rating.songs.reduce((acc, song) => (
        song.popularity < acc.popularity ? song : acc
    )).track;
    return (
        <>
            <Typography variant="h1" component={"h1"}>
                Your most trending song is:
            </Typography>
            <Typography variant="h2" component={"h2"} sx={{color: "white"}}>
                {mostPopular.track.name} by {mostPopular.track.artists[0].name}<br/>
                {mostPopular.track.popularity}/100
            </Typography>
            <Typography variant="h1" component={"h1"}>
                Your least trending song:
            </Typography>
            <Typography variant="h2" component={"h2"} sx={{color: "white"}}>
                {leastPopular.track.name} by {leastPopular.track.artists[0].name}<br/>
                {leastPopular.track.popularity}/100
            </Typography>
            <Typography variant="h1" component={"h1"}>
                Overall, your playlist is trending
            </Typography>
            <Typography variant="h2" component={"h2"} sx={{color: "white"}}>
                {rating.overallRelativePopularity.toLocaleString(undefined, {maximumFractionDigits: 1})}/100
            </Typography>
        </>
    );
};

export default TrendingnessCard;
