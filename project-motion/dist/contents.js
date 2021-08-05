"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var motionContents = [];
var readyToMove = false;
var selectedContentIdx;
var lastDragOverContentIdx;
function getVideoContent(content) {
    var _a = __assign({}, content), title = _a.title, url = _a.url;
    var youtubeToken = (url === null || url === void 0 ? void 0 : url.includes('=')) ? url.split('=')[1] : url === null || url === void 0 ? void 0 : url.split('youtu.be/')[1];
    return "\n\t\t<div class=\"m-contentbox\" draggable='true'>\n\t\t\t<iframe\n\t\t\t\tclass=\"m-youtube\"\n\t\t\t\tsrc=\"https://www.youtube.com/embed/" + youtubeToken + "\"\n\t\t\t\ttitle=" + title + "\n\t\t\t\tallow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n\t\t\t\tallowfullscreen\n\t\t\t></iframe>\n\t\t\t<div class=\"m-media-description\">\n\t\t\t\t<h1 class=\"m-main-text\">" + title + "</h1>\n\t\t\t</div>\n\t\t\t<div class=\"m-delete\">\n\t\t\t\t<img class=\"m-delete-button\" src=\"./src/assets/images/delete.svg\" alt=\"\" />\n\t\t\t</div>\n\t\t</div>\n\t";
}
function getImageContent(content) {
    var _a = __assign({}, content), title = _a.title, url = _a.url;
    return "\n\t\t<div class=\"m-contentbox\" draggable='true'>\n\t\t\t<img class=\"m-image\" src=" + url + " alt=\"motion-image\" />\n\t\t\t<div class=\"m-media-description\">\n\t\t\t\t<h1 class=\"m-main-text\">" + title + "</h1>\n\t\t\t</div>\n\t\t\t<div class=\"m-delete\">\n\t\t\t\t<img class=\"m-delete-button\" src=\"./src/assets/images/delete.svg\" alt=\"\" />\n\t\t\t</div>\n\t\t</div>\n\t";
}
function getNoteContent(content) {
    var _a = __assign({}, content), title = _a.title, body = _a.body;
    return "\n\t\t<div class=\"m-contentbox\" draggable='true'>\n\t\t\t<div class=\"m-description\">\n\t\t\t\t<h1 class=\"m-main-text\">" + title + "</h1>\n\t\t\t\t<div class=\"m-note\">\n\t\t\t\t\t<p class=\"m-paragraph\">" + body + "</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"m-delete\">\n\t\t\t\t<img class=\"m-delete-button\" src=\"./src/assets/images/delete.svg\" alt=\"\" />\n\t\t\t</div>\n\t\t</div>\n\t";
}
function getTodoContent(content) {
    var _a = __assign({}, content), title = _a.title, body = _a.body;
    return "\n\t\t<div class=\"m-contentbox\" draggable='true'>\n\t\t\t<div class=\"m-description\">\n\t\t\t\t<h1 class=\"m-main-text\">" + title + "</h1>\n\t\t\t\t<div class=\"m-todo\">\n\t\t\t\t\t<div class=\"m-todo-item\">\n\t\t\t\t\t\t<input type=\"checkbox\" id=" + title + " name=" + title + " />\n\t\t\t\t\t\t<label for=" + title + ">" + body + "</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"m-delete\">\n        <img class=\"m-delete-button\" src=\"./src/assets/images/delete.svg\" alt=\"\" />\n      </div>\n\t\t</div>\n\t";
}
function enrollDeleteContents() {
    var contentsDeleteButtons = document.querySelectorAll('.m-contents .m-delete-button');
    contentsDeleteButtons.forEach(function (button, idx) {
        button.addEventListener('click', function () {
            motionContents.splice(idx, 1);
            showMotionContents(motionContents);
        });
    });
}
// function mouseupHandler(this: HTMLElement, e: Event) {
//   if (readyToMove && this.classList.contains('active')) {
//     this.classList.remove('active');
//   }
//   readyToMove = false;
// }
// function mouseenterHandler(this: HTMLElement, e: Event) {
//   // if (readyToMove && !this.classList.contains('active')) {
//   //   this.classList.add('active');
//   // }
// }
// function mouseleaveHandler(this: HTMLElement, e: Event) {
//   if (readyToMove && this.classList.contains('active')) {
//     this.classList.remove('active');
//   }
// }
// function mousemoveHandler(this: HTMLElement, e: Event) {
//   if (readyToMove && !this.classList.contains('active')) {
//     this.classList.add('active');
//   }
// }
function mousedownHandler(e, idx) {
    readyToMove = true;
    selectedContentIdx = idx;
    lastDragOverContentIdx = idx;
    var content = document.querySelectorAll('.m-contentbox')[selectedContentIdx];
    if (content instanceof HTMLElement) {
        content.style.opacity = '0.4';
    }
}
function dragstartHandler(e) { }
function dragendHandler(e, idx) {
    var moveContent = motionContents.splice(selectedContentIdx, 1);
    motionContents.splice.apply(motionContents, __spreadArray([lastDragOverContentIdx, 0], moveContent));
    readyToMove = false;
    showMotionContents(motionContents);
}
function dragoverHandler(e) {
    if (readyToMove && !this.classList.contains('active')) {
        this.classList.add('active');
        var contentsBoxs = Array.from(document.querySelectorAll('.m-contentbox'));
        lastDragOverContentIdx = contentsBoxs.indexOf(this);
    }
}
function dragleaveHandler(e) {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    }
}
function enrollMoveMotionContents() {
    var currentMotionBoxs = document.querySelectorAll('.m-contentbox');
    currentMotionBoxs.forEach(function (box, idx) {
        // box.addEventListener('mouseup', mouseupHandler);
        // box.addEventListener('mouseenter', mouseenterHandler);
        // box.addEventListener('mouseleave', mouseleaveHandler);
        // box.addEventListener('mousemove', mousemoveHandler);
        box.addEventListener('mousedown', function (e) { return mousedownHandler(e, idx); }, false);
        box.addEventListener('dragstart', dragstartHandler, false);
        box.addEventListener('dragend', function (e) { return dragendHandler(e, idx); }, false);
        box.addEventListener('dragover', dragoverHandler, false);
        box.addEventListener('dragleave', dragleaveHandler, false);
    });
}
function showMotionContents(motionContents) {
    var motionContent = document.querySelector('.m-contents');
    var motionContentItems = motionContents
        .map(function (content) {
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
    motionContent.innerHTML = motionContentItems;
    enrollDeleteContents();
    enrollMoveMotionContents();
}
