(function () {
    'use strict';

    const MAX_WIDTH = 100, MIN_WIDTH = 35;
    let buttonUp, buttonDown;

    window.onload = function () {
        buttonUp = document.getElementById('buttonUp');
        buttonDown = document.getElementById('buttonDown');

        chrome.runtime.sendMessage({
            message: 'getWidth'
        });

        buttonUp.onclick = function (element) {
            chrome.runtime.sendMessage({
                message: 'up'
            });

        };

        buttonDown.onclick = function (element) {
            chrome.runtime.sendMessage({
                message: 'down'
            });
        };

    }

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            buttonUp.disabled = request.width === MAX_WIDTH;
            buttonDown.disabled = request.width <= MIN_WIDTH;
        }
    );

})();


