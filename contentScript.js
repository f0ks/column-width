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

let optionCtrlArrows, optionCtrlMouseWheel;

function onLoad(event) {
    sendMessage('getWidth');

    chrome.storage.sync.get('optionCtrlArrows', function (data) {
        optionCtrlArrows = data.optionCtrlArrows;
    });

    chrome.storage.sync.get('optionCtrlMouseWheel', function (data) {
        optionCtrlMouseWheel = data.optionCtrlMouseWheel;
    });

}

function keyboardHandler(event) {
    const key = event.key;
    if (event.shiftKey && event.altKey && (optionCtrlArrows ? event.ctrlKey : true)) {
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
    if (event.shiftKey && event.altKey && (optionCtrlMouseWheel ? event.ctrlKey : true)) {
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

