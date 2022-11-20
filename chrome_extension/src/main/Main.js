/*global chrome*/
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import GoogleIcon from '@mui/icons-material/Google';

import './../App.css';
import {GoogleSomething} from "../pages/GoogleSomething";
import {GoogleSearch} from "../pages/GoogleSearch";
import {sendMessageAndGetFeedback, sendMessageAndGetFeedbackDbg} from "../functions/sendMessageAndGetFeedback";
import {OnPost} from "../pages/OnPost";
import {Box, Button, IconButton, Link, Typography} from "@mui/material";


export const Main = () => {
        const [url, setUrl] = useState('');
        const [curretPage, setCurrentPage] = useState({name: ''});
        // unknown
        // google main

        const urlUpdate = useCallback(() => {
            const queryInfo = {active: true, lastFocusedWindow: true};
            chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
                if (tabs[0] === undefined) {
                    return;
                }
                const url = tabs[0].url;
                setUrl(url);
            });
        }, [])
        useLayoutEffect(urlUpdate, [urlUpdate]);
        setInterval(urlUpdate, 100);

        useLayoutEffect(() => {
            console.log(url)
            if (url === "https://www.google.com/" || url === "google.com" || url === undefined || url === "chrome://newtab/") {
                setCurrentPage({name: 'google'});
                return;
            }
            if (url.includes("google.com") && url.includes("search?")) {
                setCurrentPage({name: 'googleSearch'});
                return;
            }
            sendMessageAndGetFeedback("isItPost", (response) => {
                if (response != null) {
                    setCurrentPage(response);
                }
            })
        }, [url]);
    return <OnPost source={curretPage.source} date={curretPage.date}/>
        if (curretPage.name === "google") {
            return <GoogleSomething/>;
        }
        if (curretPage.name === "googleSearch") {
            return <GoogleSearch/>
        }
        if (curretPage.name === "post") {

        }
        return <Box sx={{textAlign: "center", paddingTop: "95px"}}>
            <Box sx={{paddingTop: "10px"}}>
                <Link href="https://google.com" target="_blank" color="inherit">
                    <IconButton>
                        <GoogleIcon sx={{fontSize: 80, color: "#F9D923"}}/>
                    </IconButton>
                </Link>
            </Box>
        </Box>;
    }
;