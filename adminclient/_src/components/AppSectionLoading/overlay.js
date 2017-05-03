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

var _reBulma = require('re-bulma');

var _AppLayoutMap = require('../AppLayoutMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function (_Component) {
  (0, _inherits3.default)(Loading, _Component);

  function Loading(props) {
    (0, _classCallCheck3.default)(this, Loading);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).call(this, props));
    // console.debug({ props });


    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Loading, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log('componentWillReceiveProps nextProps', nextProps);
      this.setState(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      // this.getRenderedComponent(formElement.value, undefined, true)
      return this.props.display ? _react2.default.createElement(
        _reBulma.Hero,
        (0, _extends3.default)({ size: 'isFullheight' }, this.props.heroProps, { style: (0, _assign2.default)({ textAlign: 'center' }, this.props.wrapperstyle) }),
        _react2.default.createElement(
          _reBulma.HeroBody,
          this.props.bodyProps,
          _react2.default.createElement(
            'div',
            { className: 'has-text-centered', style: (0, _assign2.default)({ textAlign: 'center', margin: 'auto' }, this.props.style) },
            this.props.ui && this.props.ui.custom_ui_layout ? this.getRenderedComponent(this.props.ui.custom_ui_layout) : _react2.default.createElement(
              _reBulma.Button,
              { color: 'isWhite', buttonStyle: 'isOutlined', state: 'isLoading', style: { border: 'none' } },
              'Loading'
            )
          )
        ),
        this.props.children
      ) : null;
    }
  }]);
  return Loading;
}(_react.Component);

exports.default = Loading;