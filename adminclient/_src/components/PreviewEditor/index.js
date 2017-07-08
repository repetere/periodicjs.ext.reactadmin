'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reBulma = require('re-bulma');

var rb = _interopRequireWildcard(_reBulma);

var _editorHelper = require('./editorHelper');

var editorHelper = _interopRequireWildcard(_editorHelper);

var _RACodeMirror = require('../RACodeMirror');

var _RACodeMirror2 = _interopRequireDefault(_RACodeMirror);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

var _saveSelection = function _saveSelection() {
  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
};

var _restoreSelection = function _restoreSelection(range) {
  if (range) {
    if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.selection && range.select) {
      range.select();
    }
  }
};

var propTypes = {
  toolbarProps: _react.PropTypes.object,
  wrapperProps: _react.PropTypes.object,
  buttonProps: _react.PropTypes.object,
  useToolbar: _react.PropTypes.bool
};
var defaultProps = {
  toolbarProps: {
    style: {
      padding: '0.25rem',
      borderBottom: '1px solid #d3d6db'
    }
  },
  wrapperProps: {
    style: {
      overflow: 'hidden',
      backgroundColor: 'white',
      border: '1px solid #d3d6db',
      borderRadius: 3,
      minHeight: '2rem',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
    }
  },
  buttonProps: {
    style: {
      paddingRight: 0,
      paddingLeft: '0.25rem',
      marginRight: '0.25rem'
    },
    size: 'isSmall'
  },
  useToolbar: true,
  showEditor: false
};

var PreviewEditor = function (_Component) {
  (0, _inherits3.default)(PreviewEditor, _Component);

  function PreviewEditor(props) {
    (0, _classCallCheck3.default)(this, PreviewEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PreviewEditor.__proto__ || (0, _getPrototypeOf2.default)(PreviewEditor)).call(this, props));

    _this.state = {
      useToolbar: props.useToolbar,
      showEditor: props.showEditor,
      value: props.value
    };
    _this.buttons = [{
      onClickFunction: editorHelper.button_gobold,
      icon: 'fa fa-bold'
    }, {
      onClickFunction: editorHelper.button_goitalic,
      icon: 'fa fa-italic'
    }, {
      onClickFunction: editorHelper.button_gounderline,
      icon: 'fa fa-underline'
    }, {
      icon: 'sep'
    }, {
      onClickFunction: editorHelper.button_gotext_left,
      icon: 'fa fa-align-left'
    }, {
      onClickFunction: editorHelper.button_gotext_center,
      icon: 'fa fa-align-center'
    }, {
      onClickFunction: editorHelper.button_gotext_right,
      icon: 'fa fa-align-right'
    }, {
      onClickFunction: editorHelper.button_gotext_justifyfull,
      icon: 'fa fa-align-justify'
    }, {
      icon: 'sep'
    }, {
      onClickFunction: editorHelper.button_golist,
      icon: 'fa fa-list-ol'
    }, {
      onClickFunction: editorHelper.button_gobullet,
      icon: 'fa fa-list-ul'
    }, {
      onClickFunction: editorHelper.button_go_outdent,
      icon: 'fa fa-outdent'
    }, {
      onClickFunction: editorHelper.button_go_indent,
      icon: 'fa fa-indent'
    }, {
      icon: 'sep'
    }, {
      onClickFunction: editorHelper.button_gotextlink.bind(_this),
      icon: 'fa fa-link'
    }, {
      onClickFunction: editorHelper.button_goimg.bind(_this),
      icon: 'fa fa-picture-o'
    }, {
      icon: 'sep'
    }, {
      onClickFunction: _this.toggleEditor.bind(_this),
      icon: 'fa fa-code'
    }].concat(props.customButttons || []);
    _this.contentIndex = props.useToolbar ? 1 : 0;
    _this.options = {};
    return _this;
  }

  (0, _createClass3.default)(PreviewEditor, [{
    key: 'getInnerHTML',
    value: function getInnerHTML() {
      return _reactDom2.default.findDOMNode(this).children[this.contentIndex].innerHTML;
    }
  }, {
    key: 'toggleEditor',
    value: function toggleEditor() {
      var codeState = {
        showEditor: this.state.showEditor ? false : true,
        value: this.getInnerHTML()
      };
      // console.debug('clicked toggler', 'codeState',codeState);
      this.setState(codeState);
      this.forceUpdate();
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      var html = this.getInnerHTML();
      // console.debug({ html });
      if (this.refs && this.refs.RAC) {
        // console.debug('this.refs.RAC.setState', this.refs.RAC.setState);
        // console.debug('this.refs.RAC.props', this.refs.RAC.props);
        this.refs.RAC.props.codeMirrorProps.value = html;
        this.refs.RAC.forceUpdate();
      }
      if (this.props.onChange && typeof this.props.onChange === 'function' && html !== this.lastHtml) {
        this.props.onChange({
          target: {
            value: this.getInnerHTML()
          }
        });
      }
      if (this.props.setDynamicData && typeof this.props.setDynamicData === 'string' && html !== this.lastHtml) {
        this.props.setDynamicData(this.props.dynamicField, html);
      }
      this.lastHtml = html;
    }
  }, {
    key: 'saveSelection',
    value: function saveSelection() {
      this.options.selection = _saveSelection() ? _saveSelection() : null;
    }
  }, {
    key: 'restoreSelection',
    value: function restoreSelection() {
      this.options.preview_selection = this.options.selection;
      _restoreSelection(this.options.selection);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.value !== this.getInnerHTML() || this.state.showEditor !== nextProps.showEditor;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.value !== this.getInnerHTML()) {
        _reactDom2.default.findDOMNode(this).children[this.contentIndex].innerHTML = this.state.value;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.debug({ nextProps });
      this.setState((0, _assign2.default)({}, nextProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // console.debug('---RENDER--- this.state.showEditor', this.state.showEditor);
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: '__ra_pe_w' }, this.props.wrapperProps),
        _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: '__ra_pe_tb' }, this.props.toolbarProps),
          this.buttons.map(function (button, i) {
            if (button.icon === 'sep') {
              return _react2.default.createElement(
                'span',
                { key: i, style: {
                    marginRight: '0.25rem'
                  } },
                ' '
              );
            }
            return _react2.default.createElement(rb.Button, (0, _extends3.default)({
              key: i,
              onClick: button.onClickFunction,
              icon: button.icon,
              color: _this2.state.showEditor && button.icon === 'fa fa-code' ? 'isBlack' : undefined
            }, _this2.props.buttonProps));
          })
        ),
        _react2.default.createElement('div', (0, _extends3.default)({ className: '__ra_pe_ce', style: {
            padding: '5px'
          } }, this.props.passProps, {
          onInput: this.emitChange.bind(this),
          onBlur: this.emitChange.bind(this),
          contentEditable: true,
          dangerouslySetInnerHTML: {
            __html: this.state.value
          } })),
        this.state.showEditor ? _react2.default.createElement(_RACodeMirror2.default, {
          ref: 'RAC',
          editorType: 'editor',
          wrapperProps: {
            style: {
              borderTop: '1px solid #d3d6db'
            }
          },
          codeMirrorProps: {
            value: this.state.value,
            onChange: function onChange(value) {
              _reactDom2.default.findDOMNode(_this2).children[_this2.contentIndex].innerHTML = value;
            }
          }
        }) : null
      );
    }
  }]);
  return PreviewEditor;
}(_react.Component);

PreviewEditor.propTypes = propTypes;
PreviewEditor.defaultProps = defaultProps;

exports.default = PreviewEditor;