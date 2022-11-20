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
        const [curretPage, setCurrentPage] = useState({name: 'post'});
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
        const urlUpdate2 = useCallback(() => {
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
            }
        )
        useEffect(urlUpdate2, []);
        setInterval(urlUpdate2, 100);
        if (curretPage.name === "google") {
            return <GoogleSomething/>;
        }
        if (curretPage.name === "googleSearch") {
            return <GoogleSearch/>
        }
        if (curretPage.name === "post") {
            return <OnPost source={curretPage.source} date={curretPage.date}/>
        }
        return <Box sx={{textAlign: "center", paddingTop: "55px"}}>
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