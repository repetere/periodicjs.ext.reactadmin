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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  if (global) {
    global['__DEV__'] = false;
    global['window'] = {};
    global['document'] = {};
    global['navigator'] = {};
  }
})();

var getRenderedComponent = require('../components/AppLayoutMap').getRenderedComponent;

function getPseudoRedux() {
  var state = {};
  var reducer = function reducer() {};
  var reduxStore = {
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

var SSR = function (_Component) {
  (0, _inherits3.default)(SSR, _Component);

  function SSR(props) {
    (0, _classCallCheck3.default)(this, SSR);
    return (0, _possibleConstructorReturn3.default)(this, (SSR.__proto__ || (0, _getPrototypeOf2.default)(SSR)).call(this, props));
    // let thisprops = Object.assign({}, getPseudoRedux(), props);

    // this.props = thisprops;
    // this.getRenderedComponent = getRenderedComponent.bind(this);
  }

  (0, _createClass3.default)(SSR, [{
    key: 'render',
    value: function render() {
      var newThis = (0, _assign2.default)({}, this, {
        props: (0, _assign2.default)({}, this.props, getPseudoRedux())
      });
      console.log({ newThis: newThis });
      return _react2.default.createElement(
        'div',
        null,
        getRenderedComponent.call(newThis, this.props.layout, this.props.resources)
      );
    }
  }]);
  return SSR;
}(_react.Component);

exports.default = SSR;