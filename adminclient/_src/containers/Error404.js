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

var _reBulma = require('re-bulma');

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error404 = function (_Component) {
  (0, _inherits3.default)(Error404, _Component);

  function Error404() {
    (0, _classCallCheck3.default)(this, Error404);
    return (0, _possibleConstructorReturn3.default)(this, (Error404.__proto__ || (0, _getPrototypeOf2.default)(Error404)).apply(this, arguments));
  }

  (0, _createClass3.default)(Error404, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reBulma.Hero,
        { style: _styles2.default.mainContainer },
        _react2.default.createElement(
          _reBulma.HeroBody,
          null,
          _react2.default.createElement(
            _reBulma.Container,
            null,
            _react2.default.createElement(
              _reBulma.Content,
              null,
              _react2.default.createElement(
                'h1',
                null,
                'PAGE NOT FOUND'
              ),
              _react2.default.createElement(
                'div',
                null,
                window.location.href
              )
            )
          )
        )
      );
    }
  }]);
  return Error404;
}(_react.Component);

exports.default = Error404;