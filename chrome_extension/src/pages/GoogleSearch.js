import React, {useEffect, useState} from 'react';
import './../App.css';
import {sendMessageAndGetFeedback} from "../functions/sendMessageAndGetFeedback";
import {Box, CircularProgress} from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {postData} from "../functions/postData";

export const GoogleSearch = () => {
    useEffect(() => {
        sendMessageAndGetFeedback("giveMeLinks", (response) => {
            postData("http://127.0.0.1/getArticles/", response).then(
                (date) => {
                    setResponseFromServer(date);
                }
            )
        });
    }, []);

    const [responseFromServer, setResponseFromServer] = useState('');

    if (responseFromServer === "") {
        return <Box sx={{textAlign: "center", paddingTop: "95px"}}>
            <CircularProgress size={90} thickness={8.9} sx={{color: "#36AE7C"}}/>
        </Box>;
    }
    console.log(responseFromServer)
    return <Box className="spiin">
        <DoneOutlineIcon sx={{fontSize: 80, color: "#F9D923"}}/>
    </Box>

};