chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({color: 'red'}, function () {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

document.onkeydown = keydown;

function keydown(evt) {
    if (!evt) evt = event;
    if (evt.ctrlKey && evt.altKey && evt.keyCode === 115) { //CTRL+ALT+F4
        alert("CTRL+ALT+F4");
    } else if (evt.shiftKey && evt.keyCode === 9) { //Shif+TAB
        alert("Shift+TAB");
    }
}