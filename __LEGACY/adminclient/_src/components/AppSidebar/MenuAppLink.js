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

var _reactRouter = require('react-router');

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { MenuLink, } from 're-bulma'; //Icon
var MenuAppLink = function (_Component) {
  (0, _inherits3.default)(MenuAppLink, _Component);

  function MenuAppLink() {
    (0, _classCallCheck3.default)(this, MenuAppLink);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuAppLink.__proto__ || (0, _getPrototypeOf2.default)(MenuAppLink)).apply(this, arguments));

    _this.state = { isActive: _this.props.ui.selected_nav !== undefined && (_this.props.id && _this.props.ui.selected_nav === _this.props.id || _this.props.ui.selected_nav === _this.props.href) };
    return _this;
  }

  (0, _createClass3.default)(MenuAppLink, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { style: this.state.isActive ? _styles2.default.activeButton : undefined, to: this.props.href, onClick: function onClick() {
              if (typeof _this2.props.onClick === 'string' && _this2.props.onClick.indexOf('func:this.props') !== -1) {
                _this2.props[_this2.props.onClick.replace('func:this.props.', '')](_this2.props.onClickProps);
              }
              _this2.props.setActiveNavLink.bind(_this2, _this2.props.id || _this2.props.href);
              _this2.props.toggleUISidebar();
            } },
          this.props.label
        )
      );
    }
  }]);
  return MenuAppLink;
}(_react.Component);

exports.default = MenuAppLink;