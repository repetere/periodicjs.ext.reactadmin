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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import navigation from '../../content/config/default_navigation';
// import { Menu, MenuLabel, MenuLink, MenuList, } from 're-bulma'; //Icon

var AppSidebar = function (_Component) {
  (0, _inherits3.default)(AppSidebar, _Component);

  function AppSidebar(props) {
    (0, _classCallCheck3.default)(this, AppSidebar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppSidebar.__proto__ || (0, _getPrototypeOf2.default)(AppSidebar)).call(this, props));

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    return _this;
  }
  // componentWillReceiveProps (props) {
  //   this.setState(props);
  // }


  (0, _createClass3.default)(AppSidebar, [{
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
      if (this.props.settings && this.props.settings.user && this.props.settings.user.navigation && this.props.settings.user.navigation) {
        navigationLayout = this.props.settings.user.navigation.layout || {};
        navigationWrapper = this.props.settings.user.navigation.wrapper || {};
        navigationContainer = this.props.settings.user.navigation.container || {};
      }
      return (
        // {(this.props.ui.components.footer && typeof this.props.ui.components.footer==='object' && this.props.ui.components.footer.layout) 
        //   ? this.getRenderedComponent(this.props.ui.components.footer.layout)
        //   : ()
        // }


        _react2.default.createElement(
          'div',
          { style: (0, _assign2.default)({ padding: '1rem', borderRight: '1px solid black' }, _styles2.default.fullHeight, _styles2.default.mainContainer, _styles2.default.sidebarContainer, navigationContainer.style),
            className: this.props.ui.sidebar_is_open ? 'animated fadeInLeft Nav-Sidebar-Speed  __ra_sb_s' : 'animated slideOutLeft Nav-Sidebar-Speed  __ra_sb_s' },
          _react2.default.createElement(
            'div',
            { style: (0, _assign2.default)({
                position: 'fixed',
                height: '100%',
                overflowY: 'auto'
              }, navigationWrapper.style),
              className: ' __ra_sb_w'
            },
            this.getRenderedComponent(navigationLayout && (typeof navigationLayout === 'undefined' ? 'undefined' : (0, _typeof3.default)(navigationLayout)) === 'object' ? navigationLayout : {})
          )
        )
      );
    }
  }]);
  return AppSidebar;
}(_react.Component);

exports.default = AppSidebar;