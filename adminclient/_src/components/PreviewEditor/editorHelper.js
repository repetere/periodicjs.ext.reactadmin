'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button_gobold = button_gobold;
exports.button_gounderline = button_gounderline;
exports.button_goitalic = button_goitalic;
exports.button_golink = button_golink;
exports.button_golist = button_golist;
exports.button_gobullet = button_gobullet;
exports.button_goimg = button_goimg;
exports.button_gotextlink = button_gotextlink;
exports.add_link_to_editor = add_link_to_editor;
exports.add_image_to_editor = add_image_to_editor;
exports.button_gofullscreen = button_gofullscreen;
exports.button_togglecodeeditor = button_togglecodeeditor;
exports.button_gotext_left = button_gotext_left;
exports.button_gotext_center = button_gotext_center;
exports.button_gotext_right = button_gotext_right;
exports.button_gotext_justifyfull = button_gotext_justifyfull;
exports.button_go_outdent = button_go_outdent;
exports.button_go_indent = button_go_indent;
function button_gobold() {
  window.document.execCommand('bold', false, '');
}

function button_gounderline() {
  window.document.execCommand('underline', false, '');
}

function button_goitalic() {
  window.document.execCommand('italic', false, '');
}

function button_golink() {
  window.document.execCommand('createLink', true, '');
}

function button_golist() {
  window.document.execCommand('insertOrderedList', true, '');
}

function button_gobullet() {
  window.document.execCommand('insertUnorderedList', true, '');
}

function button_goimg() {
  // document.execCommand('insertImage', false, 'http://lorempixel.com/40/20/sports/');
  this.saveSelection();
  window.editorModals.show(this.options.elementContainer.getAttribute('data-original-id') + '-insertimage-modal');
}

function button_gotextlink() {
  // console.log(this.options.elementContainer.getAttribute('data-original-id'));
  this.saveSelection();
  window.editorModals.show(this.options.elementContainer.getAttribute('data-original-id') + '-inserttext-modal');
}

function add_link_to_editor() {
  this.restoreSelection();
  window.document.execCommand('createLink', false, this.options.forms.add_link_form.querySelector('.ts-link_url').value);
}

function add_image_to_editor() {
  this.restoreSelection();
  window.document.execCommand('insertImage', false, this.options.forms.add_image_form.querySelector('.ts-image_url').value);
}

function button_gofullscreen() {
  // console.log('button_gofullscreen this', this);
  // if()
  classie.toggle(this.options.elementContainer, 'ts-editor-fullscreen');
  classie.toggle(this.options.buttons.fullscreenButton, 'ts-button-primary-text-color');
}

function button_togglecodeeditor() {
  classie.toggle(this.options.codemirror.getWrapperElement(), 'ts-hidden');
  classie.toggle(this.options.buttons.codeButton, 'ts-button-primary-text-color');
  this.options.codemirror.refresh();
}

function button_gotext_left() {
  window.document.execCommand('justifyLeft', true, '');
}

function button_gotext_center() {
  window.document.execCommand('justifyCenter', true, '');
}

function button_gotext_right() {
  window.document.execCommand('justifyRight', true, '');
}

function button_gotext_justifyfull() {
  window.document.execCommand('justifyFull', true, '');
}

// export function button_gotext_left() {
// 	document.execCommand('justifyLeft', true, '');
// }

function button_go_outdent() {
  window.document.execCommand('outdent', true, '');
}

function button_go_indent() {
  window.document.execCommand('indent', true, '');
}