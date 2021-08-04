const mediaModalExitButton = document.querySelector('.m-input-media-window .m-delete-button');
const memoModalExitButton = document.querySelector('.m-input-memo-window .m-delete-button');

function exitMediaModal(this: HTMLElement) {
  document.querySelector('.m-input-media-window')?.classList.remove('active');
  currentMakeingContents = null;
  console.log(currentMakeingContents);
}
function exitMemoModal(this: HTMLElement) {
  document.querySelector('.m-input-memo-window')?.classList.remove('active');
  currentMakeingContents = null;
  console.log(currentMakeingContents);
}

mediaModalExitButton?.addEventListener('click', exitMediaModal);
memoModalExitButton?.addEventListener('click', exitMemoModal);
