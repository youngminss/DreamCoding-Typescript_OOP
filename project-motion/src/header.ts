type contents = string | null;

let currentMakeingContents: contents;
const contentsMakerButtons = document.querySelectorAll('.m-header-bottons .m-header-botton');
const mediaContentModal = document.querySelector('.m-input-media-window');
const memoContentModal = document.querySelector('.m-input-memo-window');

function showMemoModal(memo: contents) {
  memoContentModal?.classList.add('active');
  currentMakeingContents = memo;
  console.log(currentMakeingContents);
}
function showMediaModal(media: contents) {
  mediaContentModal?.classList.add('active');
  currentMakeingContents = media;
  console.log(currentMakeingContents);
}
function showContentModalMaker(this: HTMLElement) {
  const buttonCotent: contents = this.textContent;
  buttonCotent === 'VIDEO' || buttonCotent === 'IMAGE' ? showMediaModal(buttonCotent) : showMemoModal(buttonCotent);
}

contentsMakerButtons.forEach((button) => {
  button.addEventListener('click', showContentModalMaker);
});
