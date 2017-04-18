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

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  location: _react.PropTypes.string,
  style: _react.PropTypes.object
};

var defaultProps = {
  location: '/',
  style: {}
};

var ResponsiveLink = function (_Component) {
  (0, _inherits3.default)(ResponsiveLink, _Component);

  function ResponsiveLink() {
    (0, _classCallCheck3.default)(this, ResponsiveLink);
    return (0, _possibleConstructorReturn3.default)(this, (ResponsiveLink.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveLink)).apply(this, arguments));
  }

  (0, _createClass3.default)(ResponsiveLink, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'a',
        (0, _extends3.default)({}, this.props.passProps, { href: this.props.location, onClick: function onClick(e) {
            e.preventDefault();
            _this2.props.reduxRouter.push(_this2.props.location);
            if (_this2.props.callback) {
              var callbackName = _this2.props.callback;
              var clean_name = _util2.default.getDynamicFunctionName(callbackName);
              if (callbackName.indexOf('func:this.props.reduxRouter') !== -1) {
                _this2.props.reduxRouter[clean_name](_this2.props.callbackProp);
              } else if (callbackName.indexOf('func:this.props') !== -1 && typeof _this2.props[clean_name] === 'function') {
                _this2.props[clean_name](_this2.props.callbackProp);
              } else if (callbackName.indexOf('func:window') !== -1 && typeof window[clean_name] === 'function') {
                window[clean_name].call(_this2, _this2.props.callbackProp);
              }
            }
            return false;
          }, style: (0, _assign2.default)({ cursor: 'pointer' }, this.props.style) }),
        this.props.children
      );
    }
  }]);
  return ResponsiveLink;
}(_react.Component);

ResponsiveLink.propTypes = propTypes;
ResponsiveLink.defaultProps = defaultProps;

exports.default = ResponsiveLink;