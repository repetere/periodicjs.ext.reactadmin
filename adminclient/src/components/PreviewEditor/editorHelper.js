export function button_gobold() {
  window.document.execCommand('bold', false, '');
}

export function button_gounderline() {
  window.document.execCommand('underline', false, '');
}

export function button_goitalic() {
  window.document.execCommand('italic', false, '');
}

export function button_golink() {
  window.document.execCommand('createLink', true, '');
}

export function button_golist() {
  window.document.execCommand('insertOrderedList', true, '');
}

export function button_gobullet() {
  window.document.execCommand('insertUnorderedList', true, '');
}

export function button_goimg() {
  // document.execCommand('insertImage', false, 'http://lorempixel.com/40/20/sports/');
  this.saveSelection();
  window.editorModals.show(this.options.elementContainer.getAttribute('data-original-id') + '-insertimage-modal');
}

export function button_gotextlink() {
  // console.log(this.options.elementContainer.getAttribute('data-original-id'));
  this.saveSelection();
  window.editorModals.show(this.options.elementContainer.getAttribute('data-original-id') + '-inserttext-modal');
}

export function add_link_to_editor() {
  this.restoreSelection();
  window.document.execCommand('createLink', false, this.options.forms.add_link_form.querySelector('.ts-link_url').value);
}

export function add_image_to_editor() {
  this.restoreSelection();
  window.document.execCommand('insertImage', false, this.options.forms.add_image_form.querySelector('.ts-image_url').value);
}

export function button_gofullscreen() {
  // console.log('button_gofullscreen this', this);
  // if()
  classie.toggle(this.options.elementContainer, 'ts-editor-fullscreen');
  classie.toggle(this.options.buttons.fullscreenButton, 'ts-button-primary-text-color');
}

export function button_togglecodeeditor() {
  classie.toggle(this.options.codemirror.getWrapperElement(), 'ts-hidden');
  classie.toggle(this.options.buttons.codeButton, 'ts-button-primary-text-color');
  this.options.codemirror.refresh();
}

export function button_gotext_left() {
  window.document.execCommand('justifyLeft', true, '');
}

export function button_gotext_center() {
  window.document.execCommand('justifyCenter', true, '');
}

export function button_gotext_right() {
  window.document.execCommand('justifyRight', true, '');
}

export function button_gotext_justifyfull() {
  window.document.execCommand('justifyFull', true, '');
}

// export function button_gotext_left() {
// 	document.execCommand('justifyLeft', true, '');
// }

export function button_go_outdent() {
  window.document.execCommand('outdent', true, '');
}

export function button_go_indent() {
  window.document.execCommand('indent', true, '');
}
