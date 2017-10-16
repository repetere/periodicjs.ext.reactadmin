'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  if (global) {
    global['__DEV__'] = false;
    global['window'] = {};
    global['document'] = {
      createElement: function createElement() {
        return {
          style: {}
        };
      }
    };
    global['navigator'] = {
      userAgent: ''
    };
    process.env.NODE_ENV = 'production';
  }
})();

var getRenderedComponent = require('../components/AppLayoutMap').getRenderedComponent;

function getPseudoRedux() {
  var state = {};
  var reducer = function reducer() {};
  var reduxStore = {
    dynamic: state.dynamic,
    page: state.page,
    settings: state.settings,
    ui: state.ui,
    user: state.user,
    manifest: state.manifest,
    notification: state.notification
  };
  var reduxActions = {
    isLoggedIn: reducer,
    getState: reducer,
    debug: reducer,
    fetchAction: reducer,
    getUserProfile: reducer,
    setNavLabel: reducer,
    saveUserProfile: reducer,
    initializeAuthenticatedUser: reducer,
    loginUser: reducer,
    createModal: reducer,
    hideModal: reducer,
    createNotification: reducer,
    errorNotification: reducer,
    hideNotification: reducer,
    toggleUISidebar: reducer,
    setUILoadedState: reducer,
    logoutUser: reducer,
    fetchLoginComponent: reducer,
    fetchMainComponent: reducer,
    fetchErrorComponents: reducer,
    setLoginComponent: reducer,
    setMainComponent: reducer,
    setErrorComponents: reducer,
    setConfigurationFromCache: reducer,
    fetchUnauthenticatedManifest: reducer,
    setActiveNavLink: reducer,
    enforceMFA: reducer,
    validateMFA: reducer,
    authenticatedMFA: reducer,
    refresh: reducer,
    reduxRouter: {
      push: reducer,
      replace: reducer,
      go: reducer,
      goForward: reducer,
      goBack: reducer
    }
  };
  return (0, _assign2.default)({}, reduxStore, reduxActions);
}

var SSR = function SSR(props) {
  var newThis = (0, _assign2.default)({}, undefined, {
    props: (0, _assign2.default)({}, props, getPseudoRedux())
  });
  // console.log({ newThis });
  return _react2.default.createElement(
    'div',
    { className: 'ssr-index' },
    getRenderedComponent.call(newThis, props.layout, props.resources)
  );
};

exports.default = SSR;