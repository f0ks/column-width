// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.extension.getBackgroundPage().console.log('background');



chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });


});

window.addEventListener('load', (e) => {
  chrome.extension.getBackgroundPage().console.log('load', e);
});

window.addEventListener('wheel', event => {
  chrome.extension.getBackgroundPage().console.log('wheel', e);
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

chrome.commands.onCommand.addListener(function(command) {
  chrome.extension.getBackgroundPage().console.log('Command:', command);
  //alert('Command:', command);
  //debugger;
});
