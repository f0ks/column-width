'use strict';

const optionCtrlArrows = document.getElementById('optionCtrlArrows');
const optionCtrlMouseWheel = document.getElementById('optionCtrlMouseWheel');

chrome.storage.sync.get('optionCtrlArrows', function (data) {
    optionCtrlArrows.checked = data.optionCtrlArrows;
});

chrome.storage.sync.get('optionCtrlMouseWheel', function (data) {
    optionCtrlMouseWheel.checked = data.optionCtrlMouseWheel;
});

optionCtrlArrows.addEventListener('click', function (e) {
    chrome.storage.sync.set({optionCtrlArrows: e.target.checked});
})

optionCtrlMouseWheel.addEventListener('click', function (e) {
    chrome.storage.sync.set({optionCtrlMouseWheel: e.target.checked});
})

//chrome.extension.getBackgroundPage().console.log('');
