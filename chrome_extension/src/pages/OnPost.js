import React, {useEffect, useState} from 'react';
import './../App.css';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {postData} from "../functions/postData";


function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    component="div"
                    color="primary.second"
                >
                    {props.value !== 100.1 ? Math.round(props.value) : "??"}</Typography>
            </Box>
        </Box>
    );
}

export const OnPost = ({source, date}) => {
    const [isSeen, setIsSeen] = useState(true)
    const [percent, setPercent] = useState(100.1)
    var color = ""
    if (percent === 100.1) {
        color = "white"
    } else if (percent > 65) {
        color = "green"
    } else if (percent < 30) {
        color = "red"
    } else {
        color = "orange"
    }

    const sendRequest = (isAck) => {
        postData("http://127.0.0.1:8000/addFakeVote/", {
            "url": window.location.href,
            "resource": {source},
            "datePublished": {date},
            "isFake": isAck
        }).then(
            (data) => {
                setPercent(data.fakeLikelihoods);
            }
        );
    };
    return <Box sx={{transition: "1s ease", textAlign: "center", paddingTop: 20}}>
        < CircularProgressWithLabel sx={{color}} value={percent} size={100}
                                    thickness={8.9}/>

    </Box>;
};