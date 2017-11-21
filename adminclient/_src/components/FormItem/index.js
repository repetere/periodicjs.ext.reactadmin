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

var _reBulma = require('re-bulma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = function (_Component) {
  (0, _inherits3.default)(FormItem, _Component);

  function FormItem() {
    (0, _classCallCheck3.default)(this, FormItem);
    return (0, _possibleConstructorReturn3.default)(this, (FormItem.__proto__ || (0, _getPrototypeOf2.default)(FormItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(FormItem, [{
    key: 'render',
    value: function render() {
      var className = this.props.hasValue ? '__form_element_has_value' : '';
      className = this.props.hasError ? (className ? className + ' ' : '') + '__form_element_has_error' : className;
      className = this.props.isValid ? (className ? className + ' ' : '') + '__form_element_is_valid' : className;
      className = this.props.initialIcon ? (className ? className + ' ' : '') + '__form_element_initial_icon' : className;
      if (this.props.innerFormItem) {
        return this.props.horizontalform ? _react2.default.createElement(
          _reBulma.FormHorizontal,
          { className: className, style: (0, _assign2.default)({ width: '100%' }, this.props.formItemStyle) },
          this.props.children
        ) : _react2.default.createElement(
          'span',
          { className: className, style: (0, _assign2.default)({ width: '100%' }, this.props.formItemStyle) },
          this.props.children
        );
      } else {
        return _react2.default.createElement(
          _reBulma.Column,
          this.props,
          this.props.horizontalform ? _react2.default.createElement(
            _reBulma.FormHorizontal,
            { className: className, style: (0, _assign2.default)({ width: '100%' }, this.props.formItemStyle) },
            this.props.children
          ) : _react2.default.createElement(
            'span',
            { className: className, style: (0, _assign2.default)({ width: '100%' }, this.props.formItemStyle) },
            this.props.children
          )
        );
      }
    }
  }]);
  return FormItem;
}(_react.Component);

exports.default = FormItem;