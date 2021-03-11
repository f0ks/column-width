(function () {
    'use strict';

    const
        MAX_WIDTH = 100,
        STEP = 5,
        COMMAND_UP = 'up',
        COMMAND_DOWN = 'down';

    function setWidth(request) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

            const activeTab = tabs[0]; // should be the only one
            if (!activeTab) return;
            if (!activeTab.url) return; // do nothing if empty tab is opened

            chrome.storage.local.get(['columnerTabsWidth'], function (savedTabs) {

                let width;

                if (Object.keys(savedTabs).length === 0) {
                    // initial run
                    chrome.storage.local.set(
                        {
                            columnerTabsWidth: [{domain: new URL(activeTab.url).hostname, width: MAX_WIDTH}]
                        }
                    );

                } else {

                    let savedTab = savedTabs.columnerTabsWidth.find((tab) => tab.domain === new URL(activeTab.url).hostname);
                    width = savedTab ? savedTab.width : MAX_WIDTH;

                    if (request.message === COMMAND_UP && width < MAX_WIDTH) {
                        width += STEP;

                    } else if (request.message === COMMAND_DOWN && width > STEP * 7) {
                        width -= STEP;
                    }

                    if (savedTab) savedTab.width = width;

                    chrome.storage.local.set(
                        {
                            columnerTabsWidth: savedTab ? savedTabs.columnerTabsWidth :
                                [...savedTabs.columnerTabsWidth, {
                                    domain: new URL(activeTab.url).hostname,
                                    width
                                }]
                        }
                    );

                    chrome.runtime.sendMessage({
                        msg: "currentWidth",
                        width: savedTab ? savedTab.width : 100
                    });
                }

                chrome.tabs.sendMessage(activeTab.id, {width});

            });

        })
    }

    chrome.tabs.onActivated.addListener(function (info) {
        setWidth({
            message: 'getWidth'
        });
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        sendResponse();
        setWidth(request);
    });

})();
