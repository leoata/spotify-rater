import React, {cloneElement, useEffect} from 'react';
import {PlaylistRating} from "../util/playlistRatingUtil";
import {Paper} from "@mui/material";
import TrendingnessCard from "./StatisticCards/TrendingnessCard";
import {
     KeyboardArrowRightRounded, KeyboardArrowLeftRounded
} from "@mui/icons-material";
import IconButton from "./IconButton";
import SongLengthCard from "./StatisticCards/SongLengthCard";

const SongPopularityStat = ({rating}: { rating: PlaylistRating }) => {
    const [card, setCard] = React.useState(0);
    const cardOrder = [<TrendingnessCard rating={rating}/>, <SongLengthCard rating={rating}/>];
    let element = cloneElement(cardOrder[card], {rating});
    useEffect(() => {
        element = cloneElement(cardOrder[card], {rating});
    }, [card]);

    return (
        <Paper elevation={10}
               sx={{position: "relative",
                   height: "30rem", width: "30rem",
                   '@media (max-width: 600px)': {
                        width: "13rem", height: "18rem"
                   },
                   overflow: "scroll",
                   borderRadius: "20px", padding: "1rem", backgroundColor: "rgb(34, 35, 38)"}}>
            {element}
            {card !== cardOrder.length - 1 &&
            <IconButton href={"#"}
                        onClick={() => setCard(card + 1)}
                        icon={<KeyboardArrowRightRounded color={"primary"}/>}
                        sx={{bottom: "16px", right: "16px", position: "absolute"}}/>
            }
            {card !== 0 &&
            <IconButton href={"#"}
                        onClick={() => setCard(card - 1)}
                        icon={<KeyboardArrowLeftRounded color={"primary"}/>}
                        sx={{bottom: "16px", left: "16px", position: "absolute"}}/>
            }
        </Paper>
    );
};

export default SongPopularityStat;
