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
  // console.debug('this.props', this.props);
  window.document.execCommand('createLink', true, '');
}

export function button_golist() {
  window.document.execCommand('insertOrderedList', true, '');
}

export function button_gobullet() {
  window.document.execCommand('insertUnorderedList', true, '');
}

function getInsertModal(options) {
  
  return {
    title: (options.type==='link') ? 'Insert a link':'Insert an image',
    text: {
      component: 'div',
      children: [ {
        component: 'Columns',
        children: [ {
          component: 'Column',
          children: [ {
            component: 'FormHorizontal',
            children: [ {
              component: 'ControlLabel',
              props: {
                style: {
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              children: 'URL',
            },
            {
              component: 'Input',
              props: {
                onChange: (e) => {
                  if (options.type === 'link') {
                    this.options.inputlink = e.target.value;
                  } else {
                    this.options.inputimage = e.target.value;
                  }
                },
              },
            },
            ],
          }, ],
        }, ],
      },
      {
        component: 'Columns',
        children: [ {
          component: 'Column',
          children: [ {
            component: 'FormHorizontal',
            children: [ {
              component: 'Group',
              props: {
                style: {
                  justifyContent: 'space-around',
                },
              },
              children: [ {
                component: 'Button',
                children: (options.type==='link') ? 'Insert link':'Insert image',
                props: {
                  onClick: () => {
                    if (options.type === 'link') {
                      add_link_to_editor.call(this);
                    } else {
                      add_image_to_editor.call(this);
                    }
                    this.props.hideModal('last');
                  }
                }
              },
              {
                component: 'Button',
                props: {
                  onClick: () => {
                    this.props.hideModal('last');
                  },
                },
                children: 'Cancel',
              },
              ],
            }, ],
          }, ],
        }, ],
      },
      ],
    },
  };
}

export function button_goimg() {
  const getModal = getInsertModal.bind(this);
  this.saveSelection();
  this.props.createModal(getModal({
    type:'image',
  }));
}

export function button_gotextlink() {
  const getModal = getInsertModal.bind(this);
  this.saveSelection();
  this.props.createModal(getModal({
    type:'link',
  }));
}

export function add_link_to_editor() {
  this.restoreSelection();
  window.document.execCommand('createLink', false, this.options.inputlink);
}

export function add_image_to_editor() {
  this.restoreSelection();
  window.document.execCommand('insertImage', false, this.options.inputimage);
}

export function button_gofullscreen() {
  // // console.log('button_gofullscreen this', this);
  // // if()
  // classie.toggle(this.options.elementContainer, 'ts-editor-fullscreen');
  // classie.toggle(this.options.buttons.fullscreenButton, 'ts-button-primary-text-color');
}

export function button_togglecodeeditor() {
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

export function button_go_outdent() {
  window.document.execCommand('outdent', true, '');
}

export function button_go_indent() {
  window.document.execCommand('indent', true, '');
}