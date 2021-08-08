type Media = {
  name: Contents;
  title?: string;
  url?: string;
};
type Memo = {
  name: Contents;
  title?: string;
  body?: string;
};
type MotionContents = Media | Memo;

let motionContents: Array<MotionContents> = [];
let readyToMove: boolean = false;
let selectedContentIdx: number;
let lastDragOverContentIdx: number;

function getVideoContent(content: Media): string {
  const { title, url } = { ...content };
  const youtubeToken = url?.includes('=') ? url.split('=')[1] : url?.split('youtu.be/')[1];
  return `
		<div class="m-contentbox" draggable='true'>
			<iframe
				class="m-youtube"
				src="https://www.youtube.com/embed/${youtubeToken}"
				title=${title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
			<div class="m-media-description">
				<h1 class="m-main-text">${title}</h1>
			</div>
			<div class="m-delete">
				<img class="m-delete-button" src="./src/assets/images/delete.svg" alt="" />
			</div>
		</div>
	`;
}
function getImageContent(content: Media): string {
  const { title, url } = { ...content };
  return `
		<div class="m-contentbox" draggable='true'>
			<img class="m-image" src=${url} alt="motion-image" />
			<div class="m-media-description">
				<h1 class="m-main-text">${title}</h1>
			</div>
			<div class="m-delete">
				<img class="m-delete-button" src="./src/assets/images/delete.svg" alt="" />
			</div>
		</div>
	`;
}
function getNoteContent(content: Memo): string {
  const { title, body } = { ...content };
  return `
		<div class="m-contentbox" draggable='true'>
			<div class="m-description">
				<h1 class="m-main-text">${title}</h1>
				<div class="m-note">
					<p class="m-paragraph">${body}</p>
				</div>
			</div>
			<div class="m-delete">
				<img class="m-delete-button" src="./src/assets/images/delete.svg" alt="" />
			</div>
		</div>
	`;
}
function getTodoContent(content: Memo): string {
  const { title, body } = { ...content };
  return `
		<div class="m-contentbox" draggable='true'>
			<div class="m-description">
				<h1 class="m-main-text">${title}</h1>
				<div class="m-todo">
					<div class="m-todo-item">
						<input type="checkbox" id=${title} name=${title} />
						<label for=${title}>${body}</label>
					</div>
				</div>
			</div>
			<div class="m-delete">
        <img class="m-delete-button" src="./src/assets/images/delete.svg" alt="" />
      </div>
		</div>
	`;
}

function enrollDeleteContents() {
  const contentsDeleteButtons = document.querySelectorAll('.m-contents .m-delete-button');
  contentsDeleteButtons.forEach((button, idx) => {
    button.addEventListener('click', function () {
      motionContents.splice(idx, 1);
      showMotionContents(motionContents);
    });
  });
}

function mousedownHandler(e: Event, idx: number) {
  readyToMove = true;
  selectedContentIdx = idx;
  lastDragOverContentIdx = idx;

  const content = document.querySelectorAll('.m-contentbox')[selectedContentIdx];
  if (content instanceof HTMLElement) {
    content.style.opacity = '0.4';
  }
}
function dragstartHandler(this: HTMLElement, e: Event) {}
function dragendHandler(e: Event, idx: number) {
  const moveContent: any = motionContents.splice(selectedContentIdx, 1);
  motionContents.splice(lastDragOverContentIdx, 0, ...moveContent);
  readyToMove = false;

  showMotionContents(motionContents);
}
function dragoverHandler(this: HTMLElement, e: Event) {
  if (readyToMove && !this.classList.contains('active')) {
    this.classList.add('active');
    const contentsBoxs = Array.from(document.querySelectorAll('.m-contentbox'));
    lastDragOverContentIdx = contentsBoxs.indexOf(this);
  }
}
function dragleaveHandler(this: HTMLElement, e: Event) {
  if (this.classList.contains('active')) {
    this.classList.remove('active');
  }
}

function enrollMoveMotionContents() {
  const currentMotionBoxs = document.querySelectorAll('.m-contentbox');
  currentMotionBoxs.forEach((box, idx) => {
    box.addEventListener('mousedown', (e: Event) => mousedownHandler(e, idx), false);
    box.addEventListener('dragstart', dragstartHandler, false);
    box.addEventListener('dragend', (e: Event) => dragendHandler(e, idx), false);
    box.addEventListener('dragover', dragoverHandler, false);
    box.addEventListener('dragleave', dragleaveHandler, false);
  });
}

function showMotionContents(motionContents: Array<MotionContents>) {
  const motionContent = document.querySelector('.m-contents');
  let motionContentItems = motionContents
    .map((content) => {
      switch (content.name) {
        case 'IMAGE':
          return getImageContent(content);
        case 'VIDEO':
          return getVideoContent(content);
        case 'NOTE':
          return getNoteContent(content);
        case 'TASK':
          return getTodoContent(content);
      }
    })
    .join('');
  (motionContent as Element).innerHTML = motionContentItems;
  enrollDeleteContents();
  enrollMoveMotionContents();
}
