'use strict';

let columnWidthTabs = [];
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


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
    console.log('background onUpdate');
});


chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    console.log('columnWidthTabs: ', columnWidthTabs);

    // get active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const activeTab = tabs[0];

        let registeredTab = columnWidthTabs.find((el) => el.id === activeTab.id);

        if (!registeredTab) {
            columnWidthTabs.push({id: activeTab.id, width: 100});
            registeredTab = tabs[tabs.length - 1];
        }

        if (command === 'godown') {
            if (registeredTab.width < 100) {
                registeredTab.width += 5;
            }
        } else if (command === 'godown222') {
            if (registeredTab.width > 0) {
                registeredTab.width -= 5;
            }
        }

        chrome.tabs.sendMessage(activeTab.id, {"width": registeredTab.width}, function (response) {
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

