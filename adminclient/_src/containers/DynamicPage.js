'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _overlay = require('../components/AppSectionLoading/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _AppLayoutMap = require('../components/AppLayoutMap');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppSectionLoading from '../components/AppSectionLoading';
var isLoggedIn = function isLoggedIn() {
  return window && !!window.localStorage[_constants2.default.jwt_token.TOKEN_NAME];
};

var determineDynamicRouteAccess = function determineDynamicRouteAccess(state, pathname) {
  if (state.manifest && state.manifest.containers) {
    var unauthRoutes = void 0;
    if (state.manifest.unauthenticated_routes) {
      unauthRoutes = state.manifest.unauthenticated_routes.reduce(function (expanded, key) {
        expanded[key] = null;
        return expanded;
      }, {});
      unauthRoutes = _util2.default.findMatchingRoute(unauthRoutes, state.settings.auth.admin_path ? pathname.replace(state.settings.auth.admin_path, '') : pathname);
    }
    var hasDynamicRoute = Boolean(_util2.default.findMatchingRoute(state.manifest.containers, state.settings.auth.admin_path ? pathname.replace(state.settings.auth.admin_path, '') : pathname));
    return { authenticated: hasDynamicRoute, unauthenticated: Boolean(unauthRoutes) };
  }
  return false;
};

var _handleComponentLifecycle = function _handleComponentLifecycle() {
  var _this = this;

  this.setState({ ui_is_loaded: false, async_data_is_loaded: false });
  if (window && window.scrollTo) {
    window.scrollTo(0, 0);
  }
  var parentState = this.props.getState();
  var pathname = this.props.location.pathname ? this.props.location.pathname : window.location.href || window.location.pathname;
  var isAuthenticated = isLoggedIn();
  var loginRedirect = function loginRedirect() {
    return _this.props.reduxRouter.replace({
      pathname: pathname.indexOf('p-admin') !== -1 ? '/p-admin/login?return_url=' + pathname : '/login?return_url=' + pathname,
      state: {
        nextPathname: pathname
      }
    });
  };
  if (!isAuthenticated) {
    if (parentState.manifest && parentState.manifest.containers) {
      var isDynamicRoute = determineDynamicRouteAccess(parentState, pathname);
      if (!isDynamicRoute) {
        if (parentState.manifest && Array.isArray(parentState.manifest.unauthenticated_routes) && parentState.manifest.unauthenticated_routes.indexOf(pathname) !== -1) {
          return this.fetchData();
        }
        if (parentState.manifest && parentState.manifest.containers && (0, _keys2.default)(parentState.manifest.containers).indexOf(pathname) !== -1) {
          return loginRedirect();
        }
        if (pathname === '/') return loginRedirect();
        return this.fetchDynamicErrorContent();
      } else {
        if (isDynamicRoute.unauthenticated) return this.fetchData();
        if (isDynamicRoute.authenticated) return loginRedirect();
        return this.fetchDynamicErrorContent();
      }
    }
    return this.fetchDynamicErrorContent();
  } else if (parentState.manifest && parentState.manifest.hasLoaded) {
    if (pathname === '/mfa' && window.location.pathname === '/mfa') {
      return this.fetchData();
    } else {
      var isValid = this.props.enforceMFA(true);
      if (isValid) this.fetchData();
    }
  } else {
    return this.props.initializeAuthenticatedUser(parentState.user.jwt_token, false).then(function () {
      return _this.props.enforceMFA(true);
    }).then(function (isValid) {
      if (isValid) _this.fetchData();
    }, function (e) {
      return _this.fetchDynamicErrorContent(pathname);
    });
  }
};

var DynamicPage = function (_Component) {
  (0, _inherits3.default)(DynamicPage, _Component);

  function DynamicPage() {
    (0, _classCallCheck3.default)(this, DynamicPage);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (DynamicPage.__proto__ || (0, _getPrototypeOf2.default)(DynamicPage)).apply(this, arguments));

    _this2.state = {
      ui_is_loaded: false,
      async_data_is_loaded: false
    };
    _this2.overlayUIWrapperStyle = _this2.props.getState().ui.customOverlayWrapperStyle;
    _this2.uiLayout = null;
    _this2.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this2);
    _this2.handleComponentLifecycle = _handleComponentLifecycle.bind(_this2);
    _this2.fetchData = _util2.default.fetchDynamicContent.bind(_this2);
    return _this2;
  }

  (0, _createClass3.default)(DynamicPage, [{
    key: 'fetchDynamicErrorContent',
    value: function fetchDynamicErrorContent() /*pathname*/{
      return _util2.default.fetchErrorContent.call(this);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleComponentLifecycle();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() /*nextProps*/{
      // console.debug({ nextProps });
      this.handleComponentLifecycle();
    }
  }, {
    key: 'render',
    value: function render() {
      // console.debug('this.props.getState()', this.props.getState(),'this.overlayUIWrapperStyle',this.overlayUIWrapperStyle);
      return _react2.default.createElement(
        'div',
        { id: '__ra_dp', className: this.state.ui_is_loaded ? '__reactadmin_dp_loaded' : '__reactadmin_dp_loading' },
        _react2.default.createElement(_overlay2.default, { display: !this.state.ui_is_loaded, wrapperstyle: (0, _assign2.default)({}, {
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
          }, this.overlayUIWrapperStyle) }),
        this.state.async_data_is_loaded && this.uiLayout ? this.uiLayout : this.uiLayout //null

      );
    }
  }]);
  return DynamicPage;
}(_react.Component);

exports.default = DynamicPage;