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

var _AppLayoutMap = require('../AppLayoutMap');

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

var _reBulma = require('re-bulma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Icon

var FloatingNav = function (_Component) {
  (0, _inherits3.default)(FloatingNav, _Component);

  function FloatingNav(props) {
    (0, _classCallCheck3.default)(this, FloatingNav);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FloatingNav.__proto__ || (0, _getPrototypeOf2.default)(FloatingNav)).call(this, props));

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    return _this;
  }
  // componentWillReceiveProps (props) {
  //   this.setState(props);
  // }


  (0, _createClass3.default)(FloatingNav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.ui && !this.props.ui.selected_nav) this.props.setActiveNavLink(this.props.location.pathname);
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('this.props',this.props)
      var navigationLayout = {};
      var navigationWrapper = {};
      var navigationContainer = {};
      var navigationFloatingContainer = {};
      if (this.props.settings && this.props.settings.user && this.props.settings.user.navigation && this.props.settings.user.navigation) {
        navigationLayout = this.props.settings.user.navigation.layout || {};
        navigationWrapper = this.props.settings.user.navigation.wrapper || {};
        navigationContainer = this.props.settings.user.navigation.container || {};
        navigationFloatingContainer = this.props.settings.user.navigation.floatingContainer || {};
      }
      return _react2.default.createElement(
        'div',
        { style: (0, _assign2.default)({
            padding: '1rem',
            paddingTop: '0',
            height: 'auto',
            position: 'fixed',
            width: '100%'
          }, _styles2.default.mainContainer, _styles2.default.floatingSidebarContainer, navigationContainer.style),
          className: this.props.ui.sidebar_is_open ? 'animated fadeInDown Nav-Sidebar-Speed __ra_f_sc' : 'animated slideOutUp Nav-Sidebar-Speed  __ra_f_sc',
          onClick: this.props.toggleUISidebar
        },
        _react2.default.createElement(
          _reBulma.Container,
          navigationFloatingContainer,
          _react2.default.createElement(
            'div',
            { style: (0, _assign2.default)({
                overflow: 'hidden',
                overflowY: 'auto',
                backgroundColor: 'white',
                maxHeight: '20rem',
                width: '20rem'
              }, navigationWrapper.style),
              className: ' __ra_f_w'
            },
            this.getRenderedComponent(navigationLayout && (typeof navigationLayout === 'undefined' ? 'undefined' : (0, _typeof3.default)(navigationLayout)) === 'object' ? navigationLayout : {})
          )
        )
      );
    }
  }]);
  return FloatingNav;
}(_react.Component);
// import navigation from '../../content/config/default_navigation';


exports.default = FloatingNav;