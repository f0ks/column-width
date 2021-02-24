'use strict';

window.onload = function () {
    const buttonUp = document.getElementById('buttonUp');
    const buttonDown = document.getElementById('buttonDown');

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

