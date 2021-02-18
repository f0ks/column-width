'use strict';

console.log('content scr');

//document.body.style.marginLeft = 'auto';
//document.body.style.marginRight = 'auto';
document.body.style.margin = '0 auto';

if (document.addEventListener) {
    document.addEventListener("mousewheel", wheelHandler, false);
    document.addEventListener('keydown', keyboardHandler);
}

function keyboardHandler(event) {
    const key = event.key;
    console.log(event.key);

    if (event.shiftKey && event.altKey) {
        switch (event.key) {
            case "ArrowUp":
                console.log('up key');
                break;
            case "ArrowDown":
                console.log('down key');
                break;
        }
    }

}

function wheelHandler(event) {
    if (event.shiftKey && event.altKey) {
        let command = null;
        if (event.deltaY < 0) {
            command = 'up';
        } else {
            command = 'down';
        }
        console.log(command);

        chrome.runtime.sendMessage({
            command: command
        });
    }
}

function setPageWidth(value) {
    document.body.style.width = `${value}%`;
}

console.log('add listener ahead');
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request.width);
        setPageWidth(request.width);
        sendResponse('response');
    }
);

