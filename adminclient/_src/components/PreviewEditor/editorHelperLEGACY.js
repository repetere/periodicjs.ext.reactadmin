// /*
//  * stylie.treeview
//  * https://github.com/typesettin/stylie.treeview
//  *
//  * Copyright (c) 2015 Yaw Joseph Etse. All rights reserved.
//  */
// 'use strict';

// var extend = require('util-extend'),
// 	CodeMirror = require('codemirror'),
// 	StylieModals = require('stylie.modals'),
// 	editorModals,
// 	events = require('events'),
// 	classie = require('classie'),
// 	util = require('util');

// require('../../node_modules/codemirror/addon/edit/matchbrackets');
// require('../../node_modules/codemirror/addon/hint/css-hint');
// require('../../node_modules/codemirror/addon/hint/html-hint');
// require('../../node_modules/codemirror/addon/hint/javascript-hint');
// require('../../node_modules/codemirror/addon/hint/show-hint');
// require('../../node_modules/codemirror/addon/lint/css-lint');
// require('../../node_modules/codemirror/addon/lint/javascript-lint');
// // require('../../node_modules/codemirror/addon/lint/json-lint');
// require('../../node_modules/codemirror/addon/lint/lint');
// // require('../../node_modules/codemirror/addon/lint/html-lint');
// require('../../node_modules/codemirror/addon/comment/comment');
// require('../../node_modules/codemirror/addon/comment/continuecomment');
// require('../../node_modules/codemirror/addon/fold/foldcode');
// require('../../node_modules/codemirror/addon/fold/comment-fold');
// require('../../node_modules/codemirror/addon/fold/indent-fold');
// require('../../node_modules/codemirror/addon/fold/brace-fold');
// require('../../node_modules/codemirror/addon/fold/foldgutter');
// require('../../node_modules/codemirror/mode/css/css');
// require('../../node_modules/codemirror/mode/htmlembedded/htmlembedded');
// require('../../node_modules/codemirror/mode/htmlmixed/htmlmixed');
// require('../../node_modules/codemirror/mode/javascript/javascript');

// var saveSelection = function () {
// 	if (window.getSelection) {
// 		var sel = window.getSelection();
// 		if (sel.getRangeAt && sel.rangeCount) {
// 			return sel.getRangeAt(0);
// 		}
// 	}
// 	else if (document.selection && document.selection.createRange) {
// 		return document.selection.createRange();
// 	}
// 	return null;
// };

// var restoreSelection = function (range) {
// 	if (range) {
// 		if (window.getSelection) {
// 			var sel = window.getSelection();
// 			sel.removeAllRanges();
// 			sel.addRange(range);
// 		}
// 		else if (document.selection && range.select) {
// 			range.select();
// 		}
// 	}
// };

// var getInsertTextModal = function (orignialid, mtype) {
// 	var returnDiv = document.createElement('div'),
// 		modaltype = (mtype === 'image') ? 'image' : 'text',
// 		// execcmd = (mtype === 'image') ? 'insertImage' : 'createLink',
// 		samplelink = (mtype === 'image') ? 'https://developers.google.com/+/images/branding/g+138.png' : 'http://example.com',
// 		linktype = (mtype === 'image') ? 'image' : 'link';
// 	returnDiv.setAttribute('id', orignialid + '-insert' + modaltype + '-modal');
// 	returnDiv.setAttribute('data-name', orignialid + '-insert' + modaltype + '-modal');
// 	returnDiv.setAttribute('class', 'ts-modal ts-modal-effect-1 insert' + modaltype + '-modal');
// 	var divInnerHTML = '<section class="ts-modal-content ts-bg-text-primary-color  ts-no-heading-margin ts-padding-lg ts-shadow ">';
// 	divInnerHTML += '<div class="ts-form">';
// 	divInnerHTML += '<div class="ts-row">';
// 	divInnerHTML += '<div class="ts-col-span12">';
// 	divInnerHTML += '<h6>Insert a link</h6>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '</div>';
// 	// divInnerHTML += '<div class="ts-row">';
// 	// divInnerHTML += '<div class="ts-col-span4">';
// 	// divInnerHTML += '<label class="ts-label">text</label>';
// 	// divInnerHTML += '</div>';
// 	// divInnerHTML += '<div class="ts-col-span8">';
// 	// divInnerHTML += '<input type="text" name="link_url" placeholder="some web link" value="some web link"/>';
// 	// divInnerHTML += '</div>';
// 	// divInnerHTML += '</div>';
// 	divInnerHTML += '<div class="ts-row">';
// 	divInnerHTML += '<div class="ts-col-span4">';
// 	divInnerHTML += '<label class="ts-label">url</label>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '<div class="ts-col-span8">';
// 	divInnerHTML += '<input type="text" class="ts-input ts-' + linktype + '_url" name="' + linktype + '_url" placeholder="' + samplelink + '" value="' + samplelink + '"/>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '<div class="ts-row ts-text-center">';
// 	divInnerHTML += '<div class="ts-col-span6">';
// 	// divInnerHTML += '<button type="button" class="ts-button ts-modal-close ts-button-primary-color" onclick="document.execCommand(\'insertImage\', false, \'http://lorempixel.com/40/20/sports/\');">insert link</button>';
// 	divInnerHTML += '<button type="button" class="ts-button ts-modal-close ts-button-primary-color add-' + linktype + '-button" >insert ' + linktype + '</button>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '<div class="ts-col-span6">';
// 	divInnerHTML += '<a class="ts-button ts-modal-close">close</a>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '</div>';
// 	divInnerHTML += '</section>';
// 	returnDiv.innerHTML = divInnerHTML;

// 	return returnDiv;
// };

// /**
//  * A module that represents a StylieTextEditor object, a componentTab is a page composition tool.
//  * @{@link https://github.com/typesettin/stylie.treeview}
//  * @author Yaw Joseph Etse
//  * @copyright Copyright (c) 2015 Typesettin. All rights reserved.
//  * @license MIT
//  * @constructor StylieTextEditor
//  * @requires module:util-extent
//  * @requires module:util
//  * @requires module:events
//  * @param {object} el element of tab container
//  * @param {object} options configuration options
//  */
// var StylieTextEditor = function (options) {
// 	events.EventEmitter.call(this);
// 	var defaultOptions = {
// 		type: 'html',
// 		updateOnChange: true
// 	};

// 	this.options = extend(defaultOptions, options);
// 	return this;
// 	// this.getTreeHTML = this.getTreeHTML;
// };

// util.inherits(StylieTextEditor, events.EventEmitter);

// var createButton = function (options) {
// 	var buttonElement = document.createElement('button');
// 	buttonElement.setAttribute('class', 'ts-button ts-text-xs ' + options.classes);
// 	buttonElement.setAttribute('type', 'button');
// 	buttonElement.innerHTML = options.innerHTML;
// 	for (var key in options) {
// 		if (key !== 'classes' && key !== 'innerHTML' && key !== 'innerhtml') {
// 			buttonElement.setAttribute(key, options[key]);
// 		}
// 	}

// 	return buttonElement;
// };

// StylieTextEditor.prototype.addMenuButtons = function () {
// 	this.options.buttons.boldButton = createButton({
// 		classes: ' flaticon-bold17 ',
// 		title: 'Bold text',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'bold'
// 	});
// 	this.options.buttons.italicButton = createButton({
// 		classes: ' flaticon-italic9 ',
// 		title: 'Italic text',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'italic'
// 	});
// 	this.options.buttons.underlineButton = createButton({
// 		classes: ' flaticon-underlined5 ',
// 		title: 'Underline text',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'underline'
// 	});
// 	this.options.buttons.unorderedLIButton = createButton({
// 		classes: ' flaticon-list82 ',
// 		innerHTML: ' ',
// 		title: ' Insert unordered list ',
// 		'data-attribute-action': 'unorderedLI'
// 	});
// 	this.options.buttons.orderedLIButton = createButton({
// 		classes: ' flaticon-numbered8 ',
// 		title: ' Insert ordered list ',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'orderedLI'
// 	});
// 	this.options.buttons.lefttextalignButton = createButton({
// 		classes: ' flaticon-text141 ',
// 		innerHTML: ' ',
// 		title: ' left align text ',
// 		'data-attribute-action': 'left-textalign'
// 	}); //flaticon-text141
// 	this.options.buttons.centertextalignButton = createButton({
// 		classes: ' flaticon-text136 ',
// 		innerHTML: ' ',
// 		title: ' center align text ',
// 		'data-attribute-action': 'center-textalign'
// 	}); //flaticon-text136
// 	this.options.buttons.righttextalignButton = createButton({
// 		classes: ' flaticon-text134 ',
// 		innerHTML: ' ',
// 		title: ' right align text ',
// 		'data-attribute-action': 'right-textalign'
// 	}); //flaticon-text134
// 	this.options.buttons.justifytextalignButton = createButton({
// 		classes: ' flaticon-text146 ',
// 		innerHTML: ' ',
// 		title: ' justify align text ',
// 		'data-attribute-action': 'justify-textalign'
// 	}); //flaticon-text146
// 	//flaticon-characters - font
// 	this.options.buttons.textcolorButton = createButton({
// 		classes: ' flaticon-text137 ',
// 		innerHTML: ' ',
// 		title: ' change text color ',
// 		'data-attribute-action': 'text-color'
// 	}); //flaticon-text137 - text color
// 	this.options.buttons.texthighlightButton = createButton({
// 		classes: ' flaticon-paintbrush13 ',
// 		innerHTML: ' ',
// 		title: ' change text highlight ',
// 		'data-attribute-action': 'text-highlight'
// 	}); //flaticon-paintbrush13 - text background color(highlight)
// 	this.options.buttons.linkButton = createButton({
// 		classes: ' flaticon-link56 ',
// 		title: ' Insert a link ',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'link'
// 	});
// 	this.options.buttons.imageButton = createButton({
// 		classes: ' flaticon-images25 ',
// 		title: ' Insert image ',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'image'
// 	});
// 	this.options.buttons.codeButton = createButton({
// 		innerHTML: ' ',
// 		classes: ' flaticon-code39 ',
// 		title: 'Source code editor',
// 		'data-attribute-action': 'code'
// 	});
// 	this.options.buttons.fullscreenButton = createButton({
// 		title: 'Maximize and fullscreen editor',
// 		classes: ' flaticon-logout18 ',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'fullscreen'
// 	});
// 	this.options.buttons.outdentButton = createButton({
// 		title: 'Outdent button',
// 		classes: ' flaticon-paragraph19 ',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'outdent'
// 	});
// 	this.options.buttons.indentButton = createButton({
// 		title: 'Indent button',
// 		classes: ' flaticon-right195 ',
// 		innerHTML: ' ',
// 		'data-attribute-action': 'indent'
// 	});
// };

// var button_gobold = function () {
// 	document.execCommand('bold', false, '');
// };
// var button_gounderline = function () {
// 	document.execCommand('underline', false, '');
// };
// var button_goitalic = function () {
// 	document.execCommand('italic', false, '');
// };
// var button_golink = function () {
// 	document.execCommand('createLink', true, '');
// };
// var button_golist = function () {
// 	document.execCommand('insertOrderedList', true, '');
// };
// var button_gobullet = function () {
// 	document.execCommand('insertUnorderedList', true, '');
// };
// var button_goimg = function () {
// 	// document.execCommand('insertImage', false, 'http://lorempixel.com/40/20/sports/');
// 	this.saveSelection();
// 	window.editorModals.show(this.options.elementContainer.getAttribute('data-original-id') + '-insertimage-modal');
// };
// var button_gotextlink = function () {
// 	// console.log(this.options.elementContainer.getAttribute('data-original-id'));
// 	this.saveSelection();
// 	window.editorModals.show(this.options.elementContainer.getAttribute('data-original-id') + '-inserttext-modal');
// };
// var add_link_to_editor = function () {
// 	this.restoreSelection();
// 	document.execCommand('createLink', false, this.options.forms.add_link_form.querySelector('.ts-link_url').value);
// };
// var add_image_to_editor = function () {
// 	this.restoreSelection();
// 	document.execCommand('insertImage', false, this.options.forms.add_image_form.querySelector('.ts-image_url').value);
// };
// var button_gofullscreen = function () {
// 	// console.log('button_gofullscreen this', this);
// 	// if()
// 	classie.toggle(this.options.elementContainer, 'ts-editor-fullscreen');
// 	classie.toggle(this.options.buttons.fullscreenButton, 'ts-button-primary-text-color');
// };
// var button_togglecodeeditor = function () {
// 	classie.toggle(this.options.codemirror.getWrapperElement(), 'ts-hidden');
// 	classie.toggle(this.options.buttons.codeButton, 'ts-button-primary-text-color');
// 	this.options.codemirror.refresh();
// };
// var button_gotext_left = function () {
// 	document.execCommand('justifyLeft', true, '');
// };
// var button_gotext_center = function () {
// 	document.execCommand('justifyCenter', true, '');
// };
// var button_gotext_right = function () {
// 	document.execCommand('justifyRight', true, '');
// };
// var button_gotext_justifyfull = function () {
// 	document.execCommand('justifyFull', true, '');
// };
// // var button_gotext_left = function () {
// // 	document.execCommand('justifyLeft', true, '');
// // };
// var button_go_outdent = function () {
// 	document.execCommand('outdent', true, '');
// };
// var button_go_indent = function () {
// 	document.execCommand('indent', true, '');
// };

// StylieTextEditor.prototype.initButtonEvents = function () {
// 	this.options.buttons.boldButton.addEventListener('click', button_gobold, false);
// 	this.options.buttons.underlineButton.addEventListener('click', button_gounderline, false);
// 	this.options.buttons.italicButton.addEventListener('click', button_goitalic, false);
// 	this.options.buttons.linkButton.addEventListener('click', button_golink, false);
// 	this.options.buttons.unorderedLIButton.addEventListener('click', button_gobullet, false);
// 	this.options.buttons.orderedLIButton.addEventListener('click', button_golist, false);
// 	this.options.buttons.imageButton.addEventListener('click', button_goimg.bind(this), false);
// 	this.options.buttons.linkButton.addEventListener('click', button_gotextlink.bind(this), false);

// 	this.options.buttons.lefttextalignButton.addEventListener('click', button_gotext_left, false);
// 	this.options.buttons.centertextalignButton.addEventListener('click', button_gotext_center, false);
// 	this.options.buttons.righttextalignButton.addEventListener('click', button_gotext_right, false);
// 	this.options.buttons.justifytextalignButton.addEventListener('click', button_gotext_justifyfull, false);

// 	this.options.buttons.outdentButton.addEventListener('click', button_go_outdent, false);
// 	this.options.buttons.indentButton.addEventListener('click', button_go_indent, false);

// 	this.options.buttons.fullscreenButton.addEventListener('click', button_gofullscreen.bind(this), false);
// 	this.options.buttons.codeButton.addEventListener('click', button_togglecodeeditor.bind(this), false);

// 	this.options.buttons.addlinkbutton.addEventListener('click', add_link_to_editor.bind(this), false);
// 	this.options.buttons.addimagebutton.addEventListener('click', add_image_to_editor.bind(this), false);
// };

// StylieTextEditor.prototype.init = function () {
// 	try {
// 		var previewEditibleDiv = document.createElement('div'),
// 			previewEditibleMenu = document.createElement('div'),
// 			insertImageURLModal = getInsertTextModal(this.options.element.getAttribute('id'), 'image'),
// 			insertTextLinkModal = getInsertTextModal(this.options.element.getAttribute('id'), 'text'),
// 			previewEditibleContainer = document.createElement('div');
// 		this.options.buttons = {};
// 		this.addMenuButtons();
// 		previewEditibleMenu.appendChild(this.options.buttons.boldButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.italicButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.underlineButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.unorderedLIButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.orderedLIButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.lefttextalignButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.centertextalignButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.righttextalignButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.justifytextalignButton);
// 		// previewEditibleMenu.appendChild(this.options.buttons.textcolorButton);
// 		// previewEditibleMenu.appendChild(this.options.buttons.texthighlightButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.outdentButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.indentButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.linkButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.imageButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.codeButton);
// 		previewEditibleMenu.appendChild(this.options.buttons.fullscreenButton);
// 		previewEditibleMenu.setAttribute('class', 'ts-input ts-editor-menu ts-padding-sm');
// 		previewEditibleMenu.setAttribute('style', 'font-family: monospace, Arial,"Times New Roman";');
// 		previewEditibleDiv.setAttribute('class', 'ts-input ts-texteditor');
// 		previewEditibleDiv.setAttribute('contenteditable', 'true');
// 		previewEditibleDiv.setAttribute('tabindex', '1');
// 		previewEditibleContainer.setAttribute('id', this.options.element.getAttribute('id') + '_container');
// 		previewEditibleContainer.setAttribute('data-original-id', this.options.element.getAttribute('id'));
// 		previewEditibleContainer.setAttribute('class', 'ts-editor-container');
// 		previewEditibleContainer.appendChild(previewEditibleMenu);
// 		previewEditibleContainer.appendChild(previewEditibleDiv);
// 		document.querySelector('.ts-modal-hidden-container').appendChild(insertTextLinkModal);
// 		document.querySelector('.ts-modal-hidden-container').appendChild(insertImageURLModal);
// 		this.options.element = this.options.element || document.querySelector(this.options.elementSelector);
// 		previewEditibleDiv.innerHTML = this.options.element.innerText;
// 		this.options.previewElement = previewEditibleDiv;
// 		this.options.forms = {
// 			add_link_form: document.querySelector('.inserttext-modal .ts-form'),
// 			add_image_form: document.querySelector('.insertimage-modal .ts-form')
// 		};
// 		this.options.buttons.addlinkbutton = document.querySelector('.inserttext-modal').querySelector('.add-link-button');
// 		this.options.buttons.addimagebutton = document.querySelector('.insertimage-modal').querySelector('.add-image-button');
// 		//now add code mirror

// 		this.options.elementContainer = previewEditibleContainer;
// 		this.options.element.parentNode.appendChild(previewEditibleContainer);
// 		previewEditibleContainer.appendChild(this.options.element);
// 		this.options.codemirror = CodeMirror.fromTextArea(
// 			this.options.element, {
// 				lineNumbers: true,
// 				lineWrapping: true,
// 				matchBrackets: true,
// 				autoCloseBrackets: true,
// 				mode: (this.options.type === 'ejs') ? 'text/ejs' : 'text/html',
// 				indentUnit: 2,
// 				indentWithTabs: true,
// 				'overflow-y': 'hidden',
// 				'overflow-x': 'auto',
// 				lint: true,
// 				gutters: [
// 					'CodeMirror-linenumbers',
// 					'CodeMirror-foldgutter',
// 					// 'CodeMirror-lint-markers'
// 				],
// 				foldGutter: true
// 			}
// 		);
// 		// this.options.element.parentNode.insertBefore(previewEditibleDiv, this.options.element);
// 		this.options.codemirror.on('blur', function (instance) {
// 			// console.log('editor lost focuss', instance, change);
// 			this.options.previewElement.innerHTML = instance.getValue();
// 		}.bind(this));
// 		this.options.previewElement.addEventListener('blur', function () {
// 			this.options.codemirror.getDoc().setValue(this.options.previewElement.innerHTML);
// 		}.bind(this));

// 		if (this.options.updateOnChange) {
// 			this.options.codemirror.on('change', function (instance) {
// 				// console.log('editor lost focuss', instance, change);
// 				// console.log('document.activeElement === this.options.previewElement', document.activeElement === this.options.previewElement);
// 				setTimeout(function () {
// 					if (document.activeElement !== this.options.previewElement) {
// 						this.options.previewElement.innerHTML = instance.getValue();
// 					}
// 				}.bind(this), 5000);
// 			}.bind(this));
// 			this.options.previewElement.addEventListener('change', function () {
// 				this.options.codemirror.getDoc().setValue(this.options.previewElement.innerHTML);
// 			}.bind(this));
// 		}
// 		//set initial code mirror
// 		this.options.codemirror.getDoc().setValue(this.options.previewElement.innerHTML);
// 		this.options.codemirror.refresh();
// 		classie.add(this.options.codemirror.getWrapperElement(), 'ts-hidden');
// 		// setTimeout(this.options.codemirror.refresh, 1000);


// 		this.initButtonEvents();
// 		editorModals = new StylieModals({});
// 		window.editorModals = editorModals;
// 		return this;
// 	}
// 	catch (e) {
// 		console.error(e);
// 	}
// };

// StylieTextEditor.prototype.getValue = function () {
// 	return this.options.previewElement.innerText || this.options.codemirror.getValue();
// };

// StylieTextEditor.prototype.saveSelection = function () {
// 	this.options.selection = (saveSelection()) ? saveSelection() : null;
// };

// StylieTextEditor.prototype.restoreSelection = function () {
// 	this.options.preview_selection = this.options.selection;
// 	restoreSelection(this.options.selection);
// };

// module.exports = StylieTextEditor;
"use strict";