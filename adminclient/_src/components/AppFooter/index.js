'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

require('font-awesome/css/font-awesome.css');

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppFooter = function (_Component) {
  (0, _inherits3.default)(AppFooter, _Component);

  function AppFooter(props /*, context*/) {
    (0, _classCallCheck3.default)(this, AppFooter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppFooter.__proto__ || (0, _getPrototypeOf2.default)(AppFooter)).call(this, props));

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(AppFooter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reBulma.Nav,
        { style: (0, _assign2.default)({}, _styles2.default.fixedBottom, _styles2.default.footerContainer, this.props.settings.ui.footer.navStyle), className: this.props.settings.ui.initialization.show_footer || this.props.user.isLoggedIn ? 'animated fadeInUp Header-Speed reactadmin__app_footer' : 'animated slideOutUp Header-Speed reactadmin__app_footer' },
        this.props.ui.components && this.props.ui.components.footer && (0, _typeof3.default)(this.props.ui.components.footer) === 'object' && this.props.ui.components.footer.layout ? this.getRenderedComponent(this.props.ui.components.footer.layout) : _react2.default.createElement(
          _reBulma.Container,
          null,
          _react2.default.createElement(
            _reBulma.NavGroup,
            { align: 'left' },
            _react2.default.createElement(
              _reBulma.NavItem,
              null,
              this.props.settings.name + ' v' + this.props.settings.version
            )
          ),
          _react2.default.createElement(_reBulma.NavGroup, { align: 'center' }),
          _react2.default.createElement(_reBulma.NavGroup, { align: 'right' })
        )
      );
    }
  }]);
  return AppFooter;
}(_react.Component);

exports.default = AppFooter;