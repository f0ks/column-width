// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let body, curBodyWidth = null;


chrome.extension.getBackgroundPage().console.log('background');


chrome.runtime.onInstalled.addListener(function () {

    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log('The color is green.');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });


});

window.addEventListener('load', (e) => {
    console.log('load', e);
});

window.addEventListener('wheel', event => {
    console.log('wheel', e);
});

//debugger;

//////////////////////////////
/*
let body,
    curBodyWidth = null;

window.addEventListener('load', () => {
  body = document.querySelector('body');
});

window.addEventListener('wheel', event => {
  if (!event.shiftKey) return;

  const delta = Math.sign(event.wheelDelta);
  body.style.margin = '0 auto';

  if (curBodyWidth === null) {
    curBodyWidth = 100;
  }

  if (delta === 1) {
    if (curBodyWidth < 100) {
      curBodyWidth += 5;
    }
    body.style.width = curBodyWidth + '%';
  }

  if (delta === -1) {
    if (curBodyWidth > 0) {
      curBodyWidth -= 5;
    }
    body.style.width = curBodyWidth + '%';
  }

});*/


//////////////////////////////

/*chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `body.style.margin = '0 auto'`});
});*/

chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);

    if (curBodyWidth === null) {
        curBodyWidth = 100;
    }
    if (command === 'godown') {
        if (curBodyWidth < 100) {
            curBodyWidth += 50;
        }
    } else if (command === 'godown222') {
        if (curBodyWidth > 0) {
            curBodyWidth -= 50;
        }
    }

    setBodyWidth(curBodyWidth);

});

function _getCurrentTab(callback) { //Take a callback
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        callback(tab); //call the callback with argument
    });
}

function _displayTab(tab) { //define your callback function
    console.log(tab);

    chrome.tabs.executeScript(
        tab.id,
        {code: `document.body.style.width = ${curBodyWidth}%`}
    );

}

_getCurrentTab(_displayTab); //invoke the function with the callback function reference


function setBodyWidth(value) {
/*
chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        chrome.tabs.executeScript(
            tab.id,
            {code: `document.body.style.width = ${value}%`}
            );
    });

    */
    _getCurrentTab(_displayTab)
}

