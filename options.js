(function () {
    'use strict';

    const optionAltArrows = document.getElementById('optionAltArrows'),
        optionAltMouseWheel = document.getElementById('optionAltMouseWheel'),
        optionAlignment = document.getElementsByName('optionAlignment'),
        optionAlignmentLeft = document.getElementById('optionAlignmentLeft'),
        optionAlignmentCenter = document.getElementById('optionAlignmentCenter'),
        optionAlignmentRight = document.getElementById('optionAlignmentRight')
    ;

    chrome.storage.sync.get('optionAltArrows', function (data) {
        optionAltArrows.checked = data.optionAltArrows;
    });

    chrome.storage.sync.get('optionAltMouseWheel', function (data) {
        optionAltMouseWheel.checked = data.optionAltMouseWheel;
    });

    chrome.storage.sync.get('optionAlignment', function (data) {
        const alignment = data.optionAlignment || 'center';
        switch (alignment) {
            case 'left':
                optionAlignmentLeft.checked = true;
                break;
            case 'center':
                optionAlignmentCenter.checked = true;
                break;
            case 'right':
                optionAlignmentRight.checked = true;
                break;
        }
    });

    optionAltArrows.addEventListener('click', function (e) {
        chrome.storage.sync.set({optionAltArrows: e.target.checked});
    })

    optionAltMouseWheel.addEventListener('click', function (e) {
        chrome.storage.sync.set({optionAltMouseWheel: e.target.checked});
    })

    optionAlignment.forEach(option => option.addEventListener('click', function (e) {
        chrome.storage.sync.set({optionAlignment: e.target.value});
    }))

})();



