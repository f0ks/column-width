'use strict';

console.log('content scr');
//alert('content');

//console.log(document.querySelector('body'));

// content.js

document.body.style.margin = '0 auto';

console.log('add listener ahead');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.width);
        document.body.style.width =`${request.width}%`;
        console.log()
    }
);

