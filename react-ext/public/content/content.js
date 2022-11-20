/*global chrome*/


const getBlocksFromGooglePage = () => {
    var aTags = document.getElementsByTagName("div");
    return Array.from(aTags).filter((element) => {
        return element.getAttribute('data-sokoban-container') !== null;
    })
}

const getTimeOfPublish = () => {
    var koks = document.querySelectorAll('script[type="application/ld+json"]')[0].innerHTML;
    var index = koks.search("datePublished");
    var date = new Date(koks.substr(index + 16, 10))
    if (date.toString() === "Invalid Date") {
        throw "Invalid date";
    }
    return date.getFullYear() + ":" + date.getMonth() + ":" + date.getDay();
}

const getSource = () => {
    let domain = (new URL(window.location.href));
    let words = domain.host.split(".")
    return words[words.length - 2] + "." + words[words.length - 1]
}

const getUrlFromBlock = (block) => {
    const url = block.childNodes[0]
        .childNodes[0]
        .childNodes[0]
        .getAttribute("href")
    return url
}
const messagesFromReactAppListener = (message, sender, response) => {
    if ((sender == null || sender.id === chrome.runtime.id) && message.from === "React" &&
        message.message === 'giveMeLinks') {
        let blocks = getBlocksFromGooglePage();
        let urls = {
            articles: []
        }

        blocks.forEach((block) => {
                urls.articles.push(getUrlFromBlock(block))
            }
        )

        console.log(urls)
        response(urls);
    }


    if ((sender == null || sender.id === chrome.runtime.id) && message.from === "React" &&
        message.message === 'isItPost') {
        try {
            var date = getTimeOfPublish()
            return response({name: "post", source: getSource(), date});

        } catch (e) {

        }

    }

    response(null);
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
