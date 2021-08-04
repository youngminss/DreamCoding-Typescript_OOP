"use strict";
var mediaModalExitButton = document.querySelector('.m-input-media-window .m-delete-button');
var memoModalExitButton = document.querySelector('.m-input-memo-window .m-delete-button');
function exitMediaModal() {
    var _a;
    (_a = document.querySelector('.m-input-media-window')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
    currentMakeingContents = null;
    console.log(currentMakeingContents);
}
function exitMemoModal() {
    var _a;
    (_a = document.querySelector('.m-input-memo-window')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
    currentMakeingContents = null;
    console.log(currentMakeingContents);
}
mediaModalExitButton === null || mediaModalExitButton === void 0 ? void 0 : mediaModalExitButton.addEventListener('click', exitMediaModal);
memoModalExitButton === null || memoModalExitButton === void 0 ? void 0 : memoModalExitButton.addEventListener('click', exitMemoModal);
