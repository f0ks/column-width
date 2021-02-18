'use strict';

let columnWidthTabs = [];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
    console.log('background onUpdate');
});


chrome.commands.onCommand.addListener(function (command) {
/*
    console.log('Command:', command);
    console.log('columnWidthTabs: ', columnWidthTabs);
*/

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    sendResponse();


    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const activeTab = tabs[0];

        let registeredTab = columnWidthTabs.find((el) => el.id === activeTab.id);

        if (!registeredTab) {
            columnWidthTabs.push({id: activeTab.id, width: 100});
            registeredTab = tabs[tabs.length - 1];
        }

        if (request.command === 'up') {
            if (registeredTab.width < 100) {
                registeredTab.width += 5;
            }
        } else if (request.command === 'down') {
            if (registeredTab.width > 0) {
                registeredTab.width -= 5;
            }
        }

        console.log('registeredTab', registeredTab);

        chrome.tabs.sendMessage(activeTab.id, {"width": registeredTab.width}, function (response) {
            console.log(response);
        });
    });

});


