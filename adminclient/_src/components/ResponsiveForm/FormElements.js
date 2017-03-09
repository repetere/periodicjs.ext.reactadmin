'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getPropertyAttribute = getPropertyAttribute;
exports.getFormTextInputArea = getFormTextInputArea;
exports.getFormTextArea = getFormTextArea;
exports.getFormSelect = getFormSelect;
exports.getFormCheckbox = getFormCheckbox;
exports.getHiddenInput = getHiddenInput;
exports.getImage = getImage;
exports.getFormLink = getFormLink;
exports.getFormGroup = getFormGroup;
exports.getFormCode = getFormCode;
exports.getFormSubmit = getFormSubmit;
exports.getCardFooterItem = getCardFooterItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormItem = require('../FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

var _RACodeMirror = require('../RACodeMirror');

var _RACodeMirror2 = _interopRequireDefault(_RACodeMirror);

var _reBulma = require('re-bulma');

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import RAEditor from '../RAEditor';
// import ResponsiveButton from '../ResponsiveButton';
// import { EditorState, } from 'draft-js';
function getPropertyAttribute(options) {
  var property = options.property,
      element = options.element;

  var attribute = element.name;
  var selector = element.idSelector;
  // console.log({ options });
  var returnVal = void 0;
  if (attribute.indexOf('.') === -1) {
    returnVal = property[attribute];
  } else {
    var attrArray = attribute.split('.');
    returnVal = property[attrArray[0]] ? property[attrArray[0]][attrArray[1]] : undefined;
  }

  if (selector && !options.skipSelector) {
    return returnVal[selector];
  } else {
    return returnVal;
  }
}

function getErrorStatus(state, name) {
  return state.formDataErrors && state.formDataErrors[name];
}

function getFormElementHelp(hasError, state, name) {
  return hasError ? {
    color: 'isDanger',
    text: state.formDataErrors[name][0]
  } : undefined;
}

function getCustomErrorLabel(hasError, state, formelement) {
  return hasError ? _react2.default.createElement(
    'div',
    { style: {
        fontSize: 11,
        color: formelement.errorColor || '#ed6c63'
      } },
    state.formDataErrors[formelement.name][0]
  ) : null;
}

function valueChangeHandler(formElement) {
  var _this = this;

  return function (event) {
    var text = event.target.value;
    // console.debug({ text, formElement, });
    var updatedStateProp = {};
    updatedStateProp[formElement.name] = text;
    _this.setState(updatedStateProp);
  };
}

function getFormLabel(formElement) {
  return formElement.label ? formElement.layoutProps && formElement.layoutProps.horizontalform ? _react2.default.createElement(
    _reBulma.ControlLabel,
    formElement.labelProps,
    formElement.label
  ) : _react2.default.createElement(
    _reBulma.Label,
    formElement.labelProps,
    formElement.label
  ) : null;
}

function getInitialValue(formElement, state) {
  // console.debug('state[ formElement.name ]', state[ formElement.name ],'typeof state[ formElement.name ] ',typeof state[ formElement.name ] );
  // console.debug('formElement.value', formElement.value,'typeof formElement.value',typeof formElement.value);
  if (state[formElement.name] === null || formElement.value === null || formElement.value === 'null') return '';else return typeof state[formElement.name] !== 'undefined' ? state[formElement.name] : formElement.value;
}

function getFormTextInputArea(options) {
  var _this2 = this;

  var formElement = options.formElement,
      i = options.i,
      onChange = options.onChange;

  var initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  var keyPress = function keyPress(e) {
    if (formElement.submitOnEnter && (e.key === 'Enter' || e.which === 13)) {
      _this2.submitForm();
    }
  };
  var fileClassname = '__reactadmin_file_' + formElement.name;
  var hasError = getErrorStatus(this.state, formElement.name);
  var passableProps = (0, _assign2.default)({
    type: formElement.type || 'text'
  }, formElement.passProps);
  if (passableProps && passableProps.type === 'file') {
    passableProps.className = fileClassname;
  }
  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (!onChange) {
    onChange = function onChange(event) {
      var text = event.target.value;
      var updatedStateProp = {};
      if (passableProps && passableProps.type === 'file') {
        updatedStateProp.formDataFiles = (0, _assign2.default)({}, _this2.state.formDataFiles, (0, _defineProperty3.default)({}, formElement.name, document.querySelector('.' + fileClassname + ' input')));
      } else {
        updatedStateProp[formElement.name] = text;
      }
      _this2.setState(updatedStateProp);
    };
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(_reBulma.Input, (0, _extends3.default)({}, passableProps, {
      help: getFormElementHelp(hasError, this.state, formElement.name),
      color: hasError ? 'isDanger' : undefined,
      icon: hasError ? 'fa fa-warning' : undefined,
      onChange: onChange,
      onKeyPress: keyPress,
      placeholder: formElement.placeholder,
      value: initialValue }))
  );
}

function getFormTextArea(options) {
  var formElement = options.formElement,
      i = options.i,
      _onChange = options.onChange;

  var initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  var hasError = getErrorStatus(this.state, formElement.name);

  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (!_onChange) {
    _onChange = valueChangeHandler.bind(this, formElement);
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(_reBulma.Textarea, (0, _extends3.default)({}, formElement.passProps, {
      onChange: function onChange(event) {
        return _onChange()(event);
      },
      help: getFormElementHelp(hasError, this.state, formElement.name),
      icon: hasError ? 'fa fa-warning' : undefined,
      color: hasError ? 'isDanger' : undefined,
      placeholder: formElement.placeholder || formElement.label,
      value: this.state[formElement.name] || initialValue }))
  );
}

function getFormSelect(options) {
  // let { formElement, i, formgroup, width, onValueChange, onSelect, } = options;
  var formElement = options.formElement,
      i = options.i,
      _onChange2 = options.onChange;

  var initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  var hasError = getErrorStatus(this.state, formElement.name);

  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (!_onChange2) {
    _onChange2 = valueChangeHandler.bind(this, formElement);
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(
      _reBulma.Select,
      (0, _extends3.default)({}, formElement.passProps, {
        help: getFormElementHelp(hasError, this.state, formElement.name),
        color: hasError ? 'isDanger' : undefined,
        onChange: function onChange(event) {
          return _onChange2()(event);
        },
        placeholder: formElement.placeholder || formElement.label,
        value: this.state[formElement.name] || initialValue }),
      formElement.options.map(function (opt, k) {
        return _react2.default.createElement(
          'option',
          { key: k, value: opt.value },
          opt.label || opt.value
        );
      })
    )
  );
}

function getFormCheckbox(options) {
  var _this3 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);

  if (!onValueChange) {
    onValueChange = function onValueChange() /*event*/{
      // let text = event.target.value;
      var updatedStateProp = {};
      updatedStateProp[formElement.name] = _this3.state[formElement.name] ? false : 'on';
      // console.log({ updatedStateProp });
      _this3.setState(updatedStateProp);
    };
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement('input', (0, _extends3.default)({}, formElement.passProps, {
      type: formElement.type || 'checkbox',
      checked: this.state[formElement.name],
      onChange: onValueChange
    })),
    _react2.default.createElement(
      'span',
      formElement.placeholderProps,
      formElement.placeholder
    ),
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}

function getHiddenInput(options) {
  var formElement = options.formElement,
      i = options.i;

  var initialValue = this.state[formElement.formdata_name] || this.state[formElement.name] || formElement.value;

  return _react2.default.createElement('input', (0, _extends3.default)({ key: i }, formElement.passProps, {
    type: 'hidden',
    value: initialValue }));
}

function getImage(options) {
  var formElement = options.formElement,
      i = options.i;

  var initialValue = getInitialValue(formElement, this.state);
  var imageProps = (0, _assign2.default)({
    style: {
      textAlign: 'center'
    }
  }, formElement.passProps);
  //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(_reBulma.Image, (0, _extends3.default)({ key: i }, imageProps, {
      src: initialValue }))
  );
}

function getFormLink(options) {
  var formElement = options.formElement,
      i = options.i,
      button = options.button;

  var wrapperProps = (0, _assign2.default)({
    style: _styles2.default.inputStyle
  }, formElement.wrapperProps);
  var linkWrapperProps = (0, _assign2.default)({
    style: {
      padding: '0 5px'
    }
  }, formElement.linkWrapperProps);
  // console.debug({ linkWrapperProps, formElement });

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(
      'span',
      wrapperProps,
      _react2.default.createElement(
        'span',
        linkWrapperProps,
        button
      )
    )
  );
}

function getFormGroup(options) {
  var formElement = options.formElement,
      i = options.i,
      groupElements = options.groupElements;


  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(
      _reBulma.Group,
      formElement.passProps,
      groupElements
    )
  );
}

function getFormCode(options) {
  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);
  var CodeMirrorProps = (0, _assign2.default)({
    codeMirrorProps: {
      lineNumbers: true,
      value: getInitialValue(formElement, this.state), //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
      //value: this.state[ formElement.name ] || formElement.value,
      style: {
        minHeight: 200
      },
      onChange: !onValueChange ? function (newvalue) {
        // console.log({ newvalue });
        var updatedStateProp = {};
        updatedStateProp[formElement.name] = newvalue;
        this.setState(updatedStateProp);
      }.bind(this) : onValueChange
    },
    wrapperProps: {
      style: {
        overflow: 'auto',
        backgroundColor: 'white',
        border: hasError ? '1px solid #ed6c63' : '1px solid #d3d6db',
        borderRadius: 3,
        height: 500,
        boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
      }
    }
  }, formElement.passProps);

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(_RACodeMirror2.default, (0, _extends3.default)({ key: i }, CodeMirrorProps)),
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}
/*
export function getFormEditor(options) {
  let { formElement, i, onValueChange, } = options;
  let editorStateProp = EditorState.createEmpty();
  let editorPropOnChange = (editorstate) => {
    // console.log(editorstate.value)
    // console.debug({ editorstate, });
    // let contentstate = editorstate.getCurrentContent();
    // console.debug('contentstate.getPlainText()',contentstate.getPlainText())
    // console.debug({ contentstate, });
  };
  // let onContentStateChange = (contentstate) => {
  //   console.debug('contentstate.getPlainText()',contentstate.getPlainText())
  //   console.debug({ contentstate, });
  // };
  let EditorProps = Object.assign({
    wrapperProps: {
      style: {
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid #d3d6db',
        borderRadius: 3,
        boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
      },
    },
    passProps: {
      toolbarStyle: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        padding: '5px 0 0',
      },
      editorState: editorStateProp,
      onChange:editorPropOnChange,
      // onContentStateChange:onContentStateChange,
    },
    // contentState:this.state[ formElement.name ],
    value:this.state[ formElement.name ] || formElement.value,
  }, formElement.passProps);
  if (!onValueChange) {
    onValueChange = (newvalue) => {
      console.debug({ newvalue, });
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = newvalue;
      this.setState(updatedStateProp);
    };
  }

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <RAEditor key={i} {...EditorProps} />
  </FormItem>
  );
}

*/
function getFormSubmit(options) {
  var _this4 = this;

  var formElement = options.formElement,
      i = options.i;

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel(formElement),
    _react2.default.createElement(
      _reBulma.Button,
      (0, _extends3.default)({}, formElement.passProps, {
        onClick: function onClick() {
          formElement.confirmModal ? _this4.props.createModal((0, _assign2.default)({
            title: 'Please Confirm',
            text: {
              component: 'div',
              props: {
                style: {
                  textAlign: 'center'
                }
              },
              children: [{
                component: 'div',
                children: formElement.confirmModal.textContent || ''
              }, {
                component: 'div',
                children: [{
                  component: 'ResponsiveButton',
                  props: {
                    style: {
                      margin: 10
                    },
                    buttonProps: {
                      size: 'isMedium',

                      color: 'isPrimary'
                    },
                    onClick: function onClick() {
                      _this4.props.hideModal('last');
                      _this4.submitForm.call(_this4);
                    },
                    onclickProps: 'last'
                  },
                  children: 'Yes'
                }, {
                  component: 'ResponsiveButton',
                  props: {
                    style: {
                      margin: 10
                    },
                    buttonProps: {
                      size: 'isMedium'
                    },
                    onClick: 'func:this.props.hideModal',
                    onclickProps: 'last'
                  },
                  children: 'No'
                }]
              }]
            } }, formElement.confirmModal)) : _this4.submitForm.call(_this4);
        } }),
      formElement.value
    )
  );
}

function getCardFooterItem(options) {
  var formElement = options.formElement,
      i = options.i;

  formElement.layoutProps = (0, _assign2.default)({
    style: { cursor: 'pointer', textAlign: 'center' }
  }, formElement.layoutProps);
  return _react2.default.createElement(
    _reBulma.CardFooterItem,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { onClick: this.submitForm.bind(this) }),
    _react2.default.createElement(
      _reBulma.Label,
      formElement.passProps,
      formElement.value
    )
  );
}