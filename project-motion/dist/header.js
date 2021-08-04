"use strict";
var currentMakeingContents;
var contentsMakerButtons = document.querySelectorAll('.m-header-bottons .m-header-botton');
var contentModals = document.querySelectorAll('.m-input-window');
function showMediaModal(media) {
    var _a;
    (_a = contentModals[0]) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    currentMakeingContents = media;
    // console.log(currentMakeingContents);
}
function showMemoModal(memo) {
    var _a;
    (_a = contentModals[1]) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    currentMakeingContents = memo;
    // console.log(currentMakeingContents);
}
function showContentModalMaker() {
    var buttonCotent = this.textContent;
    buttonCotent === 'VIDEO' || buttonCotent === 'IMAGE' ? showMediaModal(buttonCotent) : showMemoModal(buttonCotent);
}
contentsMakerButtons.forEach(function (button) {
    button.addEventListener('click', showContentModalMaker);
});
