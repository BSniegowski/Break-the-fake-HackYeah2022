/*global chrome*/
import React, {useEffect, useState} from 'react';
import './../App.css';
import {Box, IconButton, Link} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";


export const GoogleSomething = () => {
    return <Box sx={{textAlign: "center", paddingTop: "65px"}}>
        <Box className="spiin">
            <GoogleIcon sx={{fontSize: 80, color: "#F9D923"}}/>
        </Box>
    </Box>;
};