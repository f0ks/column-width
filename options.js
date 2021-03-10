(function () {
    'use strict';

    const optionAltArrows = document.getElementById('optionAltArrows');
    const optionAltMouseWheel = document.getElementById('optionAltMouseWheel');

    chrome.storage.sync.get('optionAltArrows', function (data) {
        optionAltArrows.checked = data.optionAltArrows;
    });

    chrome.storage.sync.get('optionAltMouseWheel', function (data) {
        optionAltMouseWheel.checked = data.optionAltMouseWheel;
    });

    optionAltArrows.addEventListener('click', function (e) {
        chrome.storage.sync.set({optionAltArrows: e.target.checked});
    })

    optionAltMouseWheel.addEventListener('click', function (e) {
        chrome.storage.sync.set({optionAltMouseWheel: e.target.checked});
    })

    //chrome.extension.getBackgroundPage().console.log('');
})();



