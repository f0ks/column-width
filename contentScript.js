'use strict';

console.log('content scr');

//document.body.style.marginLeft = 'auto';
//document.body.style.marginRight = 'auto';
document.body.style.margin = '0 auto';

console.log('add listener ahead');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.width);
        document.body.style.width =`${request.width}%`;
        console.log()
    }
);

