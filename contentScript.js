'use strict';

//document.body.style.marginLeft = 'auto';
//document.body.style.marginRight = 'auto';
document.body.style.margin = '0 auto';
// if styles already set by pages styles then add some wrapper?

if (document.addEventListener) {
    document.addEventListener("mousewheel", wheelHandler, false);
    document.addEventListener('keydown', keyboardHandler, false);
    window.addEventListener("load", onLoad, false);
}

function onLoad(event) {
    sendMessage('getWidth');
}

function keyboardHandler(event) {
    const key = event.key;
    if (event.shiftKey && event.altKey) {
        switch (event.key) {
            case "ArrowUp":
                sendMessage('up')
                break;
            case "ArrowDown":
                sendMessage('down')
                break;
        }
    }
}

function wheelHandler(event) {
    if (event.shiftKey && event.altKey) {
        if (event.deltaY < 0) {
            sendMessage('up')
        } else {
            sendMessage('down')
        }
    }
}

function sendMessage(message) {
    chrome.runtime.sendMessage({
        message
    });
}

function setPageWidth(value) {
    document.body.style.width = `${value}%`;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        setPageWidth(request.width);
        sendResponse('response');
    }
);

