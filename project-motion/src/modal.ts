const mediaModalExitButton = contentModals[0].querySelector('.m-delete-button');
const memoModalExitButton = contentModals[1].querySelector('.m-delete-button');
const contentsAddButton = document.querySelectorAll('.m-input-box .m-header-botton');

function exitMediaModal(this: HTMLElement) {
  contentModals[0]?.classList.remove('active');
  currentMakeingContents = null;
  // console.log(currentMakeingContents);
}
function exitMemoModal(this: HTMLElement) {
  contentModals[1]?.classList.remove('active');
  currentMakeingContents = null;
  // console.log(currentMakeingContents);
}
function addMotionContents(this: HTMLElement) {
  if (contentModals[0].classList.contains('active')) {
    const title = contentModals[0].querySelector('#input-media-title') as HTMLInputElement;
    const url = contentModals[0].querySelector('#url') as HTMLInputElement;
    motionContents.push({
      name: currentMakeingContents,
      title: title.value,
      url: url.value,
    });
    showMotionContents(motionContents);
    title.value = '';
    url.value = '';
    contentModals[0].classList.remove('active');
  } else {
    const title = contentModals[1].querySelector('#input-memo-title') as HTMLInputElement;
    const memo = contentModals[1].querySelector('#memo') as HTMLTextAreaElement;
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

function exitModal(this: HTMLElement) {}
mediaModalExitButton?.addEventListener('click', exitMediaModal);
memoModalExitButton?.addEventListener('click', exitMemoModal);
contentsAddButton.forEach((button) => {
  button.addEventListener('click', addMotionContents);
});
