/*global chrome*/

import {messagesFromReactAppListener} from "../content/content";

export const sendMessageAndGetFeedback = (text, onResponse) => {
    const message = {
        from: "React",
        message: text,
    }
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(
            currentTabId,
            message,
            (response) => {
                onResponse(response);
            });
    });
}


export const sendMessageAndGetFeedbackDbg = (text, onResponse) => {
     const message = {
        from: "React",
        message: text,
    }
    let response = {}
    messagesFromReactAppListener(message, null, response)
    onResponse(response);
}
