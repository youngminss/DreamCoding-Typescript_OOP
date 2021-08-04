"use strict";
var currentMakeingContents;
var contentsMakerButtons = document.querySelectorAll('.m-header-bottons .m-header-botton');
var mediaContentModal = document.querySelector('.m-input-media-window');
var memoContentModal = document.querySelector('.m-input-memo-window');
function showMemoModal(memo) {
    memoContentModal === null || memoContentModal === void 0 ? void 0 : memoContentModal.classList.add('active');
    currentMakeingContents = memo;
    console.log(currentMakeingContents);
}
function showMediaModal(media) {
    mediaContentModal === null || mediaContentModal === void 0 ? void 0 : mediaContentModal.classList.add('active');
    currentMakeingContents = media;
    console.log(currentMakeingContents);
}
function showContentModalMaker() {
    var buttonCotent = this.textContent;
    buttonCotent === 'VIDEO' || buttonCotent === 'IMAGE' ? showMediaModal(buttonCotent) : showMemoModal(buttonCotent);
}
contentsMakerButtons.forEach(function (button) {
    button.addEventListener('click', showContentModalMaker);
});
