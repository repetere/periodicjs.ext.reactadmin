'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _serverSideReactNative = require('../../util/server-side-react-native');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

var _constants = require('../../constants');

var _constants2 = _interopRequireDefault(_constants);

var _AppHeader = require('../AppHeader');

var _AppHeader2 = _interopRequireDefault(_AppHeader);

var _AppFooter = require('../AppFooter');

var _AppFooter2 = _interopRequireDefault(_AppFooter);

var _AppSidebar = require('../AppSidebar');

var _AppSidebar2 = _interopRequireDefault(_AppSidebar);

var _FloatingNav = require('../AppSidebar/FloatingNav');

var _FloatingNav2 = _interopRequireDefault(_FloatingNav);

var _overlay = require('../AppSectionLoading/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _AppOverlay = require('../AppOverlay');

var _AppOverlay2 = _interopRequireDefault(_AppOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import utilities from '../../util';

// import AppSectionLoading from '../AppSectionLoading';
var MainApp = function (_Component) {
  (0, _inherits3.default)(MainApp, _Component);

  function MainApp(props /*, context*/) {
    (0, _classCallCheck3.default)(this, MainApp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MainApp.__proto__ || (0, _getPrototypeOf2.default)(MainApp)).call(this, props));

    _this.state = props;
    // this.previousRoute = {};
    return _this;
  }

  (0, _createClass3.default)(MainApp, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log('componentWillReceiveProps nextProps', nextProps);
      this.setState(nextProps);
      if (document && document.body && document.body.setAttribute) {
        document.body.setAttribute('id', encodeURIComponent(nextProps.location.pathname));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.settings.noauth) {
        this.props.fetchUnauthenticatedManifest().then(function () {
          _this2.props.setUILoadedState(true);
        }).catch(function (error) {
          _this2.props.errorNotification(error);
          _this2.props.setUILoadedState(true);
        });
      } else {
        _promise2.default.all([_serverSideReactNative.AsyncStorage.getItem(_constants2.default.jwt_token.TOKEN_NAME), _serverSideReactNative.AsyncStorage.getItem(_constants2.default.jwt_token.TOKEN_DATA), _serverSideReactNative.AsyncStorage.getItem(_constants2.default.jwt_token.PROFILE_JSON), this.props.fetchMainComponent(), this.props.fetchErrorComponents(), this.props.fetchUnauthenticatedManifest(), _serverSideReactNative.AsyncStorage.getItem(_constants2.default.user.MFA_AUTHENTICATED)]).then(function (results) {
          try {
            if (results[results.length - 1] === 'true') {
              _this2.props.authenticatedMFA();
            }
            var jwt_token = results[0];
            var jwt_token_data = JSON.parse(results[1]);
            var jwt_user_profile = JSON.parse(results[2]);
            if (jwt_token_data && jwt_user_profile) {
              var url = '/api/jwt/token';
              var response = {};
              var json = {
                token: jwt_token_data.token,
                expires: jwt_token_data.expires,
                timeout: jwt_token_data.timeout,
                user: jwt_user_profile
              };
              var currentTime = new Date();

              if ((0, _moment2.default)(jwt_token_data.expires).isBefore(currentTime)) {
                var expiredTokenError = new Error('Access Token Expired ' + (0, _moment2.default)(jwt_token_data.expires).format('LLLL'));
                _this2.props.logoutUser();
                throw expiredTokenError;
              } else {
                _this2.props.saveUserProfile(url, response, json);
                _this2.props.initializeAuthenticatedUser(json.token, false);
              }
            } else if (jwt_token) {
              _this2.props.getUserProfile(jwt_token);
              _this2.props.initializeAuthenticatedUser(jwt_token, false);
              _this2.props.createNotification({ text: 'welcome back', timeout: 4000 });
            } else {
              console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
            }
            _this2.props.setUILoadedState(true);
          } catch (e) {
            _this2.props.errorNotification(e);
            // console.log(e);
          }
        }).catch(function (error) {
          _this2.props.errorNotification(error);
          // console.error('MAIN componentDidMount: JWT USER Login Error.', error);
          _this2.props.logoutUser();
          _this2.props.setUILoadedState(true);
        });
      }
      if (document && document.body && document.body.classList && document.body.classList.add) {
        document.body.classList.add('__ra_mc_loaded');
      } else if (document && document.body && document.body.className) {
        document.body.className = document.body.className += ' __ra_mc_loaded';
      }
      if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Trident') !== -1) {
        document.body.style.zoom = 1;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('this.state', this.state);
      var fixedSider = this.state.settings.ui.fixedSidebar ? { position: 'fixed', zIndex: 1000 } : {};
      var sidebarColumn = this.state.settings.ui.sidebar.use_floating_nav && this.state.ui.sidebar_is_open ? _react2.default.createElement(_FloatingNav2.default, (0, _extends3.default)({ className: 'reactadmin__app_floating_sidebar' }, this.state)) : this.state.ui.sidebar_is_open ? _react2.default.createElement(
        _reBulma.Column,
        { className: 'reactadmin__app_container_sidebar', size: 'isNarrow', style: (0, _assign2.default)({}, fixedSider, _styles2.default.fullMinHeight, _styles2.default.fullHeight) },
        _react2.default.createElement(_AppSidebar2.default, (0, _extends3.default)({ className: 'reactadmin__app_sidebar' }, this.state))
      ) : null;

      var headerNav = this.state.settings.ui.initialization.show_header || this.state.user.isLoggedIn ? _react2.default.createElement(_AppHeader2.default, (0, _extends3.default)({ className: 'reactadmin__app_header' }, this.state)) : null;
      var footerNav = this.state.settings.ui.initialization.show_footer || this.state.user.isLoggedIn ? _react2.default.createElement(_AppFooter2.default, (0, _extends3.default)({ className: 'reactadmin__app_footer' }, this.state)) : null;

      var overlay = this.props.ui.sidebar_is_open && this.state.settings.ui.initialization.show_sidebar_overlay ? _react2.default.createElement('div', { style: _styles2.default.sidebarOverlay, className: '__ra_show_sidebar_overlay',
        onClick: this.props.toggleUISidebar }) : null;

      return _react2.default.createElement(
        'div',
        { className: 'reactadmin__app_div_content' },
        _react2.default.createElement(_overlay2.default, { display: !this.state.ui.ui_is_loaded, wrapperstyle: (0, _assign2.default)({}, {
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // opacity:0.8,
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 100
          }, this.overlayUIWrapperStyle), ui: this.state.ui }),
        _react2.default.createElement(_AppOverlay2.default, (0, _extends3.default)({ className: 'reactadmin__app_overlay' }, this.state)),
        headerNav,
        _react2.default.createElement(
          'main',
          { style: _styles2.default.fullHeight, className: 'reactadmin__main' },
          _react2.default.createElement(
            _reBulma.Columns,
            { className: 'reactadmin__main_container', style: (0, _assign2.default)({}, _styles2.default.fullMinHeight, _styles2.default.fullHeight) },
            sidebarColumn,
            overlay,
            _react2.default.createElement(
              _reBulma.Column,
              { className: 'reactadmin__main_content', style: _styles2.default.fullMinHeight },
              this.state.ui.app_container_ui_is_loaded === false ? null : this.props.children
            )
          )
        ),
        footerNav
      );
    }
  }]);
  return MainApp;
}(_react.Component);

MainApp.contextTypes = {
  router: _react.PropTypes.object.isRequired
};

exports.default = MainApp;