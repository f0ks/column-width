'use strict';

const optionAltArrows = document.getElementById('optionAltArrows');
const optionAltMouseWheel = document.getElementById('optionAltMouseWheel');

chrome.storage.sync.get('optionAltArrows', function (data) {
    optionAltArrows.checked = data.optionAltArrows;
    //chrome.extension.getBackgroundPage().console.log('chrome.storage.sync.get optionAltArrows', data)
});

chrome.storage.sync.get('optionAltMouseWheel', function (data) {
    optionAltMouseWheel.checked = data.optionAltMouseWheel;
    //chrome.extension.getBackgroundPage().console.log('chrome.storage.sync.get optionAltMouseWheel', data)

});

optionAltArrows.addEventListener('click', function (e) {
    chrome.storage.sync.set({optionAltArrows: e.target.checked});
    //chrome.extension.getBackgroundPage().console.log('click', e.target.checked)

})

optionAltMouseWheel.addEventListener('click', function (e) {
    chrome.storage.sync.set({optionAltMouseWheel: e.target.checked});
    //chrome.extension.getBackgroundPage().console.log('click', e.target.checked)

})

//chrome.extension.getBackgroundPage().console.log('');
