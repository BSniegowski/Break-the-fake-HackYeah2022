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
                    color="primary.main"
                >
                    {props.value !== 100.1 ? Math.round(props.value) : "??"}</Typography>
            </Box>
        </Box>
    );
}

export const OnPost = ({source, date}) => {
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
        postData("localhost:8000/??", {
            "url": window.location.href,
            "resource": {source},
            "datePublished": {date},
            "isFake": isAck
        }).then(
            (date) => {
                setPercent(date.fakeLikelihoods);
            }
        );
    };


    return <Box sx={{textAlign: "center", paddingTop: "40px"}}>
        <CircularProgressWithLabel sx={{transition: "color 1s ease", color: color}} value={percent} size={100}
                                   thickness={8.9}/>

        <Box sx={{paddingTop: "20px"}}>
            <Button size="large" color="success" variant="outlined" onClick={() => {
                sendRequest(true)
            }}

            > YES </Button>

            <Button size="large" color="error" variant="outlined" onClick={() => {
                sendRequest(false)
            }}> NO </Button>
        </Box>

        <Box sx={{paddingTop: "10px"}}>
            <Typography
                variant="h5"
                component="div"
                color="primary.main"
            >
                {source}
            </Typography>
        </Box>
        <Typography
            variant="h5"
            component="div"
            color="color.secondary"
        >
            {date}
        </Typography>
    </Box>;
};