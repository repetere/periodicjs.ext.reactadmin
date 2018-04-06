'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appDefaultSettings = {
  name: 'Admin Panel',
  basename: 'http://localhost:8786',
  adminPath: '/r-admin',
  routerHistory: 'browserHistory',
  hot_reload: false,
  includeCoreData: {
    manifest: true,
    navigation: true
  },
  allHistoryOptions: 'browserHistory|hashHistory|createMemoryHistory',
  application: {
    environment: 'development',
    use_offline_cache: false
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
      timed_timeout: 10000,
      hide_login_notification: false,
      supressResourceErrors: false
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
    logged_in_homepage: '/r-admin/dashboard',
    logged_out_path: '/login'
  },
  login: {
    url: 'http://localhost:8786/api/jwt/token',
    devurl: 'http://localhost:8786/api/jwt/token',
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
    url: 'http://localhost:8786/api/jwt/profile',
    devurl: 'http://localhost:8786/api/jwt/profile',
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
var defaultUserNavigation = {
  wrapper: {
    style: {}
  },
  container: {
    style: {}
  },
  layout: {
    component: 'Menu',
    props: {
      style: {
        paddingBottom: 70,
        width: '10rem'
      }
    },
    children: [{
      component: 'MenuLabel',
      children: 'System'
    }, {
      component: 'MenuList',
      children: [{
        component: 'MenuAppLink',
        props: {
          href: '/dashboard',
          label: 'Dashboard',
          id: 'dashboard'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/#logout',
          label: 'Logout',
          onClick: 'func:this.props.logoutUser'
        }
      }]
    }]
  }
};
var packageJSON = {
  name: 'adminclient',
  version: '0.1.0',
  'private': true,
  devDependencies: {
    'animate.css': '^3.5.2',
    capitalize: '^1.0.0',
    eslint: '^3.14.1',
    'font-awesome': '^4.7.0',
    moment: '^2.17.1',
    pluralize: '^3.1.0',
    'react-addons-css-transition-group': '^15.4.1',
    'react-animate.css': '0.0.4',
    'react-native': '^0.39.2',
    'react-native-web': '0.0.60',
    'react-redux': '^4.4.6',
    'react-router': '^3.0.0',
    'react-router-redux': '^4.0.7',
    'react-scripts': '0.8.4',
    recharts: '0.20.5',
    redux: '^3.6.0',
    'redux-logger': '^2.7.4',
    'redux-thunk': '^2.1.0',
    'ua-parser-js': '^0.7.12',
    useragent: '^2.1.13'
  },
  dependencies: {
    'babel-polyfill': '^6.23.0',
    debounce: '^1.0.0',
    'draft-js': '^0.10.0',
    eslint: '^3.14.1',
    'eslint-plugin-react': '^6.9.0',
    'file-saver': '^1.3.3',
    flat: '^2.0.1',
    'json-2-csv': '^2.1.0',
    mime: '^1.3.6',
    'rc-slider': '^6.2.0',
    'rc-steps': '^2.5.1',
    're-bulma': '^0.4.3',
    react: '15.3.2',
    'react-codemirror': '^0.3.0',
    'react-dates': '^16.5.0',
    'react-dom': '15.3.2',
    'react-draft-wysiwyg': '^1.7.6',
    'react-file-reader-input': '^1.1.0',
    'react-moment-proptypes': '^1.5.0',
    'react-responsive-carousel': '^3.1.3',
    'react-text-mask': '^5.0.2',
    'text-mask-addons': '^3.6.0',
    'validate.js': '^0.11.1',
    'whatwg-fetch': '^2.0.3'
  },
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test --env=jsdom',
    eject: 'react-scripts eject'
  },
  proxy: 'http://localhost:8786',
  homepage: '/extensions/periodicjs.ext.reactadmin'
};

var windowState = typeof window !== 'undefined' && window.__padmin ? window.__padmin : {};

var initialState = (0, _assign2.default)({ version: packageJSON.version }, appDefaultSettings, windowState);
initialState.user = (0, _assign2.default)({
  navigation: defaultUserNavigation
}, initialState.user);

// console.log({ initialState });
var settingsReducer = function settingsReducer(state, action) {
  var user = void 0;
  switch (action.type) {
    case _constants2.default.settings.UPDATE_APP_SETTINGS:
      var updatedSettings = action.payload;
      return (0, _assign2.default)({}, state, updatedSettings);
    case _constants2.default.user.PREFERENCE_REQUEST:
      user = (0, _assign2.default)({}, state.user);
      user.preferences = (0, _assign2.default)({}, user.preferences, {
        isFetching: true
      });
      return (0, _assign2.default)({}, state, { user: user });
    case _constants2.default.user.PREFERENCE_LOAD_ERROR:
      user = (0, _assign2.default)({}, state.user);
      user.preferences = (0, _assign2.default)({}, user.preferences, {
        isFetching: false
      }, action.payload);
      return (0, _assign2.default)({}, state, { user: user });
    case _constants2.default.user.PREFERENCE_LOAD_SUCCESS:
      user = (0, _assign2.default)({}, state.user);
      user.preferences = (0, _assign2.default)({}, user.preferences, {
        isFetching: false,
        updatedAt: action.payload.updatedAt,
        timestamp: action.payload.timestamp,
        hasLoaded: true,
        error: undefined
      }, action.payload.preferences);
      return (0, _assign2.default)({}, state, { user: user });
    case _constants2.default.user.NAVIGATION_REQUEST:
      user = (0, _assign2.default)({}, state.user);
      user.navigation = (0, _assign2.default)({}, user.navigation, {
        isFetching: true
      });
      return (0, _assign2.default)({}, state, { user: user });
    case _constants2.default.user.NAVIGATION_LOAD_ERROR:
      user = (0, _assign2.default)({}, state.user);
      user.navigation = (0, _assign2.default)({}, user.navigation, {
        isFetching: false
      }, action.payload);
      return (0, _assign2.default)({}, state, { user: user });
    case _constants2.default.user.NAVIGATION_LOAD_SUCCESS:
      user = (0, _assign2.default)({}, state.user);
      user.navigation = (0, _assign2.default)({}, user.navigation, {
        isFetching: false,
        updatedAt: action.payload.updatedAt,
        timestamp: action.payload.timestamp,
        hasLoaded: true,
        error: undefined
      }, action.payload.navigation);
      return (0, _assign2.default)({}, state, { user: user });
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = settingsReducer;