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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _history = require('../../routers/history');

var _stores = require('../../stores');

var _stores2 = _interopRequireDefault(_stores);

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

var _routes = require('../../routers/routes');

var _index = require('../../constants/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import constants from '../../constants';

// import combinedReducers from '../../reducers';

// import { Notification } from 're-bulma';
// import { Nav, NavGroup, NavItem, Button, Icon, NavToggle, } from 're-bulma';
// import { createStore, } from 'redux';
var AppConfigSettings = {
  name: 'reactadmin',
  basename: 'http://localhost:8786',
  adminPath: '/r-admin',
  routerHistory: 'browserHistory',
  includeCoreData: {
    manifest: true,
    navigation: true
  },
  allHistoryOptions: 'browserHistory|hashHistory|createMemoryHistory',
  application: {
    environment: 'development'
  },
  ui: {
    initialization: {
      show_header: false,
      show_footer: false,
      show_sidebar_overlay: true,
      refresh_manifests: true,
      refresh_navigation: true,
      refresh_components: true
    },
    notifications: {
      error_timeout: 10000,
      timed_timeout: 10000
    },
    fixedSidebar: true,
    sidebarBG: '#ffffff',
    header: {
      isBold: true,
      color: 'isBlack',
      buttonColor: 'isWhite',
      useGlobalSearch: false,
      useHeaderLogout: false,
      customButton: false,
      navLabelStyle: {},
      containerStyle: {},
      userNameStyle: {}
    },
    footer: {
      navStyle: {}
    },
    sidebar: {
      containerStyle: {},
      use_floating_nav: false
    }
  },
  auth: {
    logged_in_homepage: '/home',
    logged_out_path: '/login'
  },
  login: {
    url: 'https://pas-dev.promisefinancial.net:8784/api/jwt/token',
    devurl: 'https://pas-dev.promisefinancial.net:8784/api/jwt/token',
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        clientid: 'fbff80bd23de5b1699cb595167370a1a',
        entitytype: 'account'
      }
    }
  },
  userprofile: {
    url: 'https://pas-dev.promisefinancial.net:8784/api/jwt/profile',
    devurl: 'https://pas-dev.promisefinancial.net:8784/api/jwt/profile',
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        clientid: 'fbff80bd23de5b1699cb595167370a1a',
        clientid_default: 'clientIDNEEDED',
        entitytype: 'account'
      }
    }
  }
};
// import AppLoginSettings from '../../content/config/login.json';

// import logo from './logo.svg';
// import './App.css';
// import capitalize from 'capitalize';
// import moment from 'moment';
// import debounce from 'debounce';
var history = (0, _history.getHistory)(_history.historySettings, AppConfigSettings, _stores2.default);

var mapStateToProps = function mapStateToProps(state) {
  return {
    page: state.page,
    settings: state.settings,
    ui: state.ui,
    user: state.user,
    manifest: state.manifest,
    notification: state.notification
  };
};

var reduxActions = {
  isLoggedIn: function isLoggedIn() {
    return _stores2.default.getState().user.isLoggedIn;
  },
  getState: function getState() {
    return _stores2.default.getState();
  }, //.dispatch(actions.user.getUserStatus()),
  debug: function debug(data) {
    console.debug(data);
  }, //.dispatch(actions.user.getUserStatus()),
  fetchAction: function fetchAction(pathname, fetchOptions, success) {
    // console.debug('in redux actions this', this);
    return _util2.default.fetchAction.call(this, pathname, fetchOptions, success);
  }, //.dispatch(actions.user.getUserStatus()),
  getUserProfile: function getUserProfile(jwt_token) {
    return _stores2.default.dispatch(_actions2.default.user.getUserProfile(jwt_token));
  },
  setNavLabel: function setNavLabel(label) {
    return _stores2.default.dispatch(_actions2.default.ui.setNavLabel(label));
  },
  saveUserProfile: function saveUserProfile(url, response, json) {
    return _stores2.default.dispatch(_actions2.default.user.saveUserProfile(url, response, json));
  },
  initializeAuthenticatedUser: function initializeAuthenticatedUser(jwt_token) {
    var enforceMFA = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return _stores2.default.dispatch(_actions2.default.user.initializeAuthenticatedUser(jwt_token, enforceMFA));
  },
  loginUser: function loginUser(formdata) {
    return _stores2.default.dispatch(_actions2.default.user.loginUser(formdata));
  },
  // ajaxModal: (options) => store.dispatch(actions.notification.ajaxModal(options)),
  createModal: function createModal(options) {
    return _stores2.default.dispatch(_actions2.default.notification.createModal(options));
  },
  hideModal: function hideModal(options) {
    return _stores2.default.dispatch(_actions2.default.notification.hideModal(options));
  },
  createNotification: function createNotification(options) {
    return _stores2.default.dispatch(_actions2.default.notification.createNotification(options));
  },
  errorNotification: function errorNotification(options, timeout) {
    return _stores2.default.dispatch(_actions2.default.notification.errorNotification(options, timeout));
  },
  hideNotification: function hideNotification(id) {
    return _stores2.default.dispatch(_actions2.default.notification.hideNotification(id));
  },
  toggleUISidebar: function toggleUISidebar() {
    return _stores2.default.dispatch(_actions2.default.ui.toggleUISidebar());
  },
  setUILoadedState: function setUILoadedState(loaded) {
    return _stores2.default.dispatch(_actions2.default.ui.setUILoadedState(loaded));
  },
  logoutUser: function logoutUser() {
    return _stores2.default.dispatch(_actions2.default.user.logoutUser());
  },
  fetchLoginComponent: function fetchLoginComponent() {
    return _stores2.default.dispatch(_util2.default.setCacheConfiguration(_actions2.default.ui.fetchComponent(_index2.default.ui.LOGIN_COMPONENT), 'components.login'));
  },
  fetchMainComponent: function fetchMainComponent() {
    return _stores2.default.dispatch(_util2.default.setCacheConfiguration(_actions2.default.ui.fetchComponent(_index2.default.ui.MAIN_COMPONENT), 'components.main'));
  },
  fetchErrorComponents: function fetchErrorComponents() {
    return _stores2.default.dispatch(_util2.default.setCacheConfiguration(_actions2.default.ui.fetchComponent(_index2.default.ui.ERROR_COMPONENTS), 'components.error'));
  },
  setLoginComponent: function setLoginComponent() {
    return _stores2.default.dispatch(_actions2.default.ui.handleFetchedComponent(_index2.default.ui.LOGIN_COMPONENT));
  },
  setMainComponent: function setMainComponent() {
    return _stores2.default.dispatch(_actions2.default.ui.handleFetchedComponent(_index2.default.ui.MAIN_COMPONENT));
  },
  setErrorComponents: function setErrorComponents() {
    return _stores2.default.dispatch(_actions2.default.ui.handleFetchedComponent(_index2.default.ui.ERROR_COMPONENTS));
  },
  setConfigurationFromCache: function setConfigurationFromCache() {
    return _stores2.default.dispatch(_util2.default.getCacheConfiguration((0, _assign2.default)({}, _actions2.default, {
      setLoginComponent: reduxActions.setLoginComponent,
      setMainComponent: reduxActions.setMainComponent,
      setErrorComponents: reduxActions.setErrorComponents
    })));
  },
  fetchUnauthenticatedManifest: function fetchUnauthenticatedManifest() {
    return _stores2.default.dispatch(_actions2.default.manifest.fetchUnauthenticatedManifest());
  },
  setActiveNavLink: function setActiveNavLink(id) {
    return _stores2.default.dispatch(_actions2.default.ui.setActiveNavItem(id));
  },
  enforceMFA: function enforceMFA(noRedirect) {
    return _stores2.default.dispatch(_actions2.default.user.enforceMFA(noRedirect));
  },
  validateMFA: function validateMFA(jwt_token) {
    return _stores2.default.dispatch(_actions2.default.user.validateMFA(jwt_token));
  },
  authenticatedMFA: function authenticatedMFA() {
    return _stores2.default.dispatch(_actions2.default.user.authenticatedMFA());
  },
  refresh: function refresh() {
    return _stores2.default.dispatch((0, _reactRouterRedux.push)(window.location.pathname));
  },
  reduxRouter: {
    push: function push(location) {
      return _stores2.default.dispatch((0, _reactRouterRedux.push)(location));
    },
    replace: function replace(location) {
      return _stores2.default.dispatch((0, _reactRouterRedux.replace)(location));
    },
    go: function go(number) {
      return _stores2.default.dispatch((0, _reactRouterRedux.go)(number));
    },
    goForward: function goForward() {
      return _stores2.default.dispatch((0, _reactRouterRedux.goForward)());
    },
    goBack: function goBack() {
      return _stores2.default.dispatch((0, _reactRouterRedux.goBack)());
    }
  }
};
var mapDispatchToProps = function mapDispatchToProps() /*dispatch*/{
  return reduxActions;
};

var MainAppContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Main2.default);
var useExtraProps = {
  renderRouteComponent: function renderRouteComponent(child) {
    return _react2.default.cloneElement(child, (0, _assign2.default)({}, reduxActions));
  }
};

var Main = function (_Component) {
  (0, _inherits3.default)(Main, _Component);

  function Main() {
    (0, _classCallCheck3.default)(this, Main);
    return (0, _possibleConstructorReturn3.default)(this, (Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).apply(this, arguments));
  }

  (0, _createClass3.default)(Main, [{
    key: 'render',
    value: function render() {
      // console.log('initial store',{store})
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: _stores2.default },
        _react2.default.createElement(_reactRouter.Router, {
          history: history,
          routes: (0, _routes.getRoutes)(MainAppContainer),
          render: (0, _reactRouter.applyRouterMiddleware)(useExtraProps)
        })
      );
    }
  }]);
  return Main;
}(_react.Component);

exports.default = Main;