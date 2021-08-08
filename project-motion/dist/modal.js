"use strict";
var mediaModalExitButton = contentModals[0].querySelector('.m-delete-button');
var memoModalExitButton = contentModals[1].querySelector('.m-delete-button');
var contentsAddButton = document.querySelectorAll('.m-input-box .m-header-botton');
function exitMediaModal() {
    var _a;
    (_a = contentModals[0]) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
    currentMakeingContents = null;
}
function exitMemoModal() {
    var _a;
    (_a = contentModals[1]) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
    currentMakeingContents = null;
}
function addMotionContents() {
    if (contentModals[0].classList.contains('active')) {
        var title = contentModals[0].querySelector('#input-media-title');
        var url = contentModals[0].querySelector('#url');
        motionContents.push({
            name: currentMakeingContents,
            title: title.value,
            url: url.value,
        });
        showMotionContents(motionContents);
        title.value = '';
        url.value = '';
        contentModals[0].classList.remove('active');
    }
    else {
        var title = contentModals[1].querySelector('#input-memo-title');
        var memo = contentModals[1].querySelector('#memo');
        motionContents.push({
            name: currentMakeingContents,
            title: title.value,
            body: memo.value,
        });
        showMotionContents(motionContents);
        title.value = '';
        memo.value = '';
        contentModals[1].classList.remove('active');
    }
}
function exitModal() { }
mediaModalExitButton === null || mediaModalExitButton === void 0 ? void 0 : mediaModalExitButton.addEventListener('click', exitMediaModal);
memoModalExitButton === null || memoModalExitButton === void 0 ? void 0 : memoModalExitButton.addEventListener('click', exitMemoModal);
contentsAddButton.forEach(function (button) {
    button.addEventListener('click', addMotionContents);
});
