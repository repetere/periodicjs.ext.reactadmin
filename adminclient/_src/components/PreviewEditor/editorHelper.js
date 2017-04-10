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
  // console.debug('this.props', this.props);
  window.document.execCommand('createLink', true, '');
}

function button_golist() {
  window.document.execCommand('insertOrderedList', true, '');
}

function button_gobullet() {
  window.document.execCommand('insertUnorderedList', true, '');
}

function getInsertModal(options) {
  var _this = this;

  return {
    title: options.type === 'link' ? 'Insert a link' : 'Insert an image',
    text: {
      component: 'div',
      children: [{
        component: 'Columns',
        children: [{
          component: 'Column',
          children: [{
            component: 'FormHorizontal',
            children: [{
              component: 'ControlLabel',
              props: {
                style: {
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              },
              children: 'URL'
            }, {
              component: 'Input',
              props: {
                onChange: function onChange(e) {
                  if (options.type === 'link') {
                    _this.options.inputlink = e.target.value;
                  } else {
                    _this.options.inputimage = e.target.value;
                  }
                }
              }
            }]
          }]
        }]
      }, {
        component: 'Columns',
        children: [{
          component: 'Column',
          children: [{
            component: 'FormHorizontal',
            children: [{
              component: 'Group',
              props: {
                style: {
                  justifyContent: 'space-around'
                }
              },
              children: [{
                component: 'Button',
                children: options.type === 'link' ? 'Insert link' : 'Insert image',
                props: {
                  onClick: function onClick() {
                    if (options.type === 'link') {
                      add_link_to_editor.call(_this);
                    } else {
                      add_image_to_editor.call(_this);
                    }
                    _this.props.hideModal('last');
                  }
                }
              }, {
                component: 'Button',
                props: {
                  onClick: function onClick() {
                    _this.props.hideModal('last');
                  }
                },
                children: 'Cancel'
              }]
            }]
          }]
        }]
      }]
    }
  };
}

function button_goimg() {
  var getModal = getInsertModal.bind(this);
  this.saveSelection();
  this.props.createModal(getModal({
    type: 'image'
  }));
}

function button_gotextlink() {
  var getModal = getInsertModal.bind(this);
  this.saveSelection();
  this.props.createModal(getModal({
    type: 'link'
  }));
}

function add_link_to_editor() {
  this.restoreSelection();
  window.document.execCommand('createLink', false, this.options.inputlink);
}

function add_image_to_editor() {
  this.restoreSelection();
  window.document.execCommand('insertImage', false, this.options.inputimage);
}

function button_gofullscreen() {
  // // console.log('button_gofullscreen this', this);
  // // if()
  // classie.toggle(this.options.elementContainer, 'ts-editor-fullscreen');
  // classie.toggle(this.options.buttons.fullscreenButton, 'ts-button-primary-text-color');
}

function button_togglecodeeditor() {
  console.debug('button_togglecodeeditor');
  // console.debug('this.getInnerHTML()', this.getInnerHTML());
  // console.debug('this.state.showEditor', this.state.showEditor);
  // let codeState = {
  //   showEditor: !this.state.showEditor,
  //   value: this.getInnerHTML(),
  //   // date: new Date().toString(),
  // };
  // console.debug('clicked toggler', 'codeState',codeState);
  // this.setState(codeState);
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

function button_go_outdent() {
  window.document.execCommand('outdent', true, '');
}

function button_go_indent() {
  window.document.execCommand('indent', true, '');
}