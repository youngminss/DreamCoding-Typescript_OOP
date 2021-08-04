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
const contentsDeleteButton = document.querySelectorAll('.m-delete .m-delete-button');

function getVideoContent(content: Media): string {
  const { title, url } = { ...content };
  const youtubeToken = url?.includes('=') ? url.split('=')[1] : url?.split('youtu.be/')[1];
  return `
		<div class="m-contentbox">
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
		<div class="m-contentbox">
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
		<div class="m-contentbox">
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
		<div class="m-contentbox">
			<div class="m-description">
				<h1 class="m-main-text">${title}</h1>
				<div class="m-todo">
					<div class="m-todo-item">
						<input type="checkbox" id=${title} name=${title} />
						<label for=${title}>${body}</label>
					</div>
				</div>
			</div>
	`;
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
}

// function removeContents(this: HTMLElement, idx: number) {
//   console.log(1);
// }

// contentsDeleteButton.forEach((button, btnidx) => {
//   button.addEventListener('click', function () {
//     const currentContents: Array<object> = [];
//     console.log(document.querySelectorAll('.m-contentbox'));
//   });
// });
