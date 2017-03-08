'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/mode/sql/sql';
// import 'codemirror/mode/css/css';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/markdown/markdown';
var propTypes = {};
var defaultProps = {};

var RACodeMirror = function (_Component) {
  (0, _inherits3.default)(RACodeMirror, _Component);

  function RACodeMirror() {
    (0, _classCallCheck3.default)(this, RACodeMirror);
    return (0, _possibleConstructorReturn3.default)(this, (RACodeMirror.__proto__ || (0, _getPrototypeOf2.default)(RACodeMirror)).apply(this, arguments));
  }

  (0, _createClass3.default)(RACodeMirror, [{
    key: 'render',
    value: function render() {
      var options = (0, _assign2.default)({
        options: {
          lineNumbers: true
        }
      }, this.props.codeMirrorProps);

      return _react2.default.createElement(
        'div',
        this.props.wrapperProps,
        _react2.default.createElement(
          'textarea',
          options,
          this.props.children
        )
      );
    }
  }]);
  return RACodeMirror;
}(_react.Component);

//ok


RACodeMirror.propTypes = propTypes;
RACodeMirror.defaultProps = defaultProps;

exports.default = RACodeMirror;