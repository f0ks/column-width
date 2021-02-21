'use strict';
const
    MAX_WIDTH = 100,
    STEP = 5,
    COMMAND_UP = 'up',
    COMMAND_DOWN = 'down';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    sendResponse();

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const activeTab = tabs[0]; // should be the only one

        chrome.storage.local.get(['columnerTabsWidth'], function (savedTabs) {

            let width;

            if (Object.keys(savedTabs).length === 0) {
                // initial run
                chrome.storage.local.set(
                    {
                        columnerTabsWidth: [{url: activeTab.url, width: MAX_WIDTH}]
                    }
                );

            } else {

                const savedTab = savedTabs.columnerTabsWidth.find((tab) => tab.url === activeTab.url);
                width = savedTab ? savedTab.width : MAX_WIDTH;

                if (request.command === COMMAND_UP && width < MAX_WIDTH) {
                    width += STEP;

                } else if (request.command === COMMAND_DOWN && width > 0) {
                    width -= STEP;
                }

                if (savedTab) savedTab.width = width;

                chrome.storage.local.set(
                    {
                        columnerTabsWidth: savedTab ? savedTabs.columnerTabsWidth :
                            [...savedTabs.columnerTabsWidth, {
                                url: activeTab.url,
                                width
                            }]
                    }
                );
            }

            chrome.tabs.sendMessage(activeTab.id, {width});

        });

    });

});



