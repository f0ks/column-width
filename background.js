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
  chrome.commands.onCommand.addListener(function(command) {
    chrome.extension.getBackgroundPage().console.log('Command:', command);
  });

  console.log('1');

});

console.log('2');


chrome.commands.onCommand.addListener(function(command) {
  chrome.extension.getBackgroundPage().console.log('Command:', command);
  alert('Command:', command);
});
