// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let curBodyWidth = null;


chrome.runtime.onInstalled.addListener(function () {

/*    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log('The color is green.');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });*/


});



//////////////////////////////

/*chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `body.style.margin = '0 auto'`});
});*/


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
    console.log('background onUpdate');
});



chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);

    if (curBodyWidth === null) {
        curBodyWidth = 100;
    }
    if (command === 'godown') {
        if (curBodyWidth < 100) {
            curBodyWidth += 5;
        }
    } else if (command === 'godown222') {
        if (curBodyWidth > 0) {
            curBodyWidth -= 5;
        }
    }

    //setBodyWidth(curBodyWidth);

    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('query');
        const activeTab = tabs[0];
        console.log('active tab id', activeTab.id);
        chrome.tabs.sendMessage(activeTab.id, {"width": curBodyWidth}, function(response) {
            console.log(response);
        });
    });

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

//_getCurrentTab(_displayTab); //invoke the function with the callback function reference


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

