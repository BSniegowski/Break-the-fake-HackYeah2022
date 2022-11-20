import React, {useEffect, useState} from 'react';
import './../App.css';
import {Box, Button, CircularProgress, createTheme, rgbToHex, Typography} from "@mui/material";
import {postData} from "../functions/postData";
import {CircularProgressProps} from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


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
    const [percent, setPercent] = useState(50)
    const [needVoting, setNeedVoting] = useState(true)
    var color = ""
    if (percent === 100.1) {
        color = "white"
    } else if (percent > 65) {
        color = "red"
    } else if (percent < 30) {
        color = "green"
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
            (data) => {
                setPercent(data.fakeLikelihoods);
            }
        );
    };

    // const { palette } = createTheme();
    // const { augmentColor } = palette;
    // const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    // const theme = createTheme({
    //     palette: {
    //     red: createColor('#EB5353'),
    //     green: createColor('#36AE7C'),
    //     yellow: createColor('#F9D923'),
    //     blue: createColor('#187498'),
    //     },
    // });
    let circularProgressIcon;
    if (color === "red") circularProgressIcon = (<ReportIcon color="danger"/>)
    else if (color === "yellow") circularProgressIcon = (<WarningIcon color="warning"/>)
    else circularProgressIcon = (<TaskAltIcon/>)
    return <Box alignItems="center" justifyContent="center" display="flex">
        {needVoting ? null : (<CircularProgressWithLabel sx={{
            transition: "color 1s ease",
            color: color,
            marginTop: '25%',
        }} variant="determinate" value={percent} size={100} thickness={8.9}>
            {circularProgressIcon}
        </CircularProgressWithLabel>)}
        {needVoting ? <Button sx={{marginTop: '40%', marginX: '4px'}} color="error" size="large" variant="contained"
                              onClick={async () => {
                                  await sendRequest(true)
                                  setNeedVoting(false)
                              }}

        > Fake </Button> : null}

        {needVoting ? <Button sx={{marginTop: '40%', marginX: '4px'}} color="success" size="large" variant="contained"
                              onClick={async () => {
                                  await sendRequest(false)
                                  setNeedVoting(false)
                              }}>Fakt</Button> : null}

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