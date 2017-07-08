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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

var propTypes = {
  // editorType: PropTypes.string,
};
var defaultProps = {
  toolbarProps: {
    style: {
      padding: '0.25rem'
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
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
    }
  }
};

var PreviewEditor = function (_Component) {
  (0, _inherits3.default)(PreviewEditor, _Component);

  function PreviewEditor(props) {
    (0, _classCallCheck3.default)(this, PreviewEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PreviewEditor.__proto__ || (0, _getPrototypeOf2.default)(PreviewEditor)).call(this, props));

    _this.state = (0, _assign2.default)({}, props);
    return _this;
  }

  (0, _createClass3.default)(PreviewEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.debug({ nextProps });
      this.setState((0, _assign2.default)({}, nextProps));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        this.props.wrapperProps,
        _react2.default.createElement('div', this.props.toolbarProps),
        _react2.default.createElement('div', (0, _extends3.default)({}, this.props.passProps, {
          className: 'contenteditable',
          onInput: this.emitChange.bind(this),
          onBlur: this.emitChange.bind(this),
          contentEditable: true,
          dangerouslySetInnerHTML: {
            __html: this.state.value
          } }))
      );
    }
  }, {
    key: 'getInnerHTML',
    value: function getInnerHTML() {
      return _reactDom2.default.findDOMNode(this).children[0].innerHTML;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.value !== this.getInnerHTML();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.value !== this.getInnerHTML()) {
        _reactDom2.default.findDOMNode(this).children[0].innerHTML = this.props.value;
      }
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      var html = this.getInnerHTML();
      // console.debug({ html });
      if (this.props.onChange && typeof this.props.onChange === 'function' && html !== this.lastHtml) {
        this.props.onChange({
          target: {
            value: _reactDom2.default.findDOMNode(this).children[0].innerHTML
          }
        });
      }
      if (this.props.setDynamicData && typeof this.props.setDynamicData === 'string' && html !== this.lastHtml) {
        this.props.setDynamicData(this.props.dynamicField, html);
      }
      this.lastHtml = html;
    }
  }]);
  return PreviewEditor;
}(_react.Component);

PreviewEditor.propTypes = propTypes;
PreviewEditor.defaultProps = defaultProps;

exports.default = PreviewEditor;