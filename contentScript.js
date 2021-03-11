(function () {
    'use strict';

    let optionAltArrows, optionAltMouseWheel, optionAlignment;

    if (document.addEventListener) {
        document.addEventListener("mousewheel", wheelHandler, false);
        document.addEventListener('keydown', keyboardHandler, false);
        window.addEventListener("load", onLoad, false);
    }


    function onLoad(event) {
        chrome.storage.sync.get('optionAlignment', function (data) {
            let bodyMargin;
            optionAlignment = data.optionAlignment || 'center';

            // if styles already set by pages styles then add some wrapper?

            switch (optionAlignment) {
                case 'left':
                    bodyMargin = '0 auto 0 0';
                    break;
                case 'center':
                    bodyMargin = '0 auto 0 auto';
                    break;
                case 'right':
                    bodyMargin = '0 0 0 auto';
                    break;
            }

            document.body.style.margin = bodyMargin;
        });

        sendMessage('getWidth');

        chrome.storage.sync.get('optionAltArrows', function (data) {
            optionAltArrows = data.optionAltArrows;
        });

        chrome.storage.sync.get('optionAltMouseWheel', function (data) {
            optionAltMouseWheel = data.optionAltMouseWheel;
        });

    }

    function keyboardHandler(event) {
        const key = event.key;
        if (event.shiftKey && (optionAltArrows ? event.altKey : true)) {
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
        if (event.shiftKey && (optionAltMouseWheel ? event.altKey : true)) {
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

})();





