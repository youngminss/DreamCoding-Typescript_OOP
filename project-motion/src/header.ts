type Contents = string | null;

let currentMakeingContents: Contents;
const contentsMakerButtons = document.querySelectorAll('.m-header-bottons .m-header-botton');
const contentModals = document.querySelectorAll('.m-input-window');

function showMediaModal(media: Contents) {
  contentModals[0]?.classList.add('active');
  currentMakeingContents = media;
  // console.log(currentMakeingContents);
}
function showMemoModal(memo: Contents) {
  contentModals[1]?.classList.add('active');
  currentMakeingContents = memo;
  // console.log(currentMakeingContents);
}

function showContentModalMaker(this: HTMLElement) {
  const buttonCotent: Contents = this.textContent;
  buttonCotent === 'VIDEO' || buttonCotent === 'IMAGE' ? showMediaModal(buttonCotent) : showMemoModal(buttonCotent);
}

contentsMakerButtons.forEach((button) => {
  button.addEventListener('click', showContentModalMaker);
});
