'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

(function () {
  if (global) {
    global['__DEV__'] = false;
    global['window'] = {};
    global['document'] = {};
    global['navigator'] = {};
  }
})();

var getRenderedComponent = require('../components/AppLayoutMap').getRenderedComponent;

var SSR = function (_Component) {
  (0, _inherits3.default)(SSR, _Component);

  function SSR() {
    (0, _classCallCheck3.default)(this, SSR);
    return (0, _possibleConstructorReturn3.default)(this, (SSR.__proto__ || (0, _getPrototypeOf2.default)(SSR)).apply(this, arguments));
  }

  (0, _createClass3.default)(SSR, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        getRenderedComponent(this.props.layout, this.props.resources)
      );
    }
  }]);
  return SSR;
}(_react.Component);

exports.default = SSR;