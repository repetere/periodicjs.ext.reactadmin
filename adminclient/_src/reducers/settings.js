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
      children: 'Generals'
    }, {
      component: 'MenuList',
      children: [{
        component: 'MenuAppLink',
        props: {
          href: '/home',
          label: 'Dashboard',
          id: 'home'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/documentation',
          label: 'Documentation',
          id: 'documentation'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/#logout',
          label: 'Logout',
          onClick: 'func:this.props.logoutUser'
        }
      }]
    }, {
      component: 'MenuLabel',
      children: 'Administration'
    }, {
      component: 'MenuList',
      children: [{
        component: 'SubMenuLinks',
        children: [{
          component: 'MenuAppLink',
          props: {
            href: '/r-admin/documentation',
            label: 'Members',
            id: 'members'
          }
        }, {
          component: 'MenuAppLink',
          props: {
            href: '/blog/21090',
            label: 'Plugins',
            id: 'plugins'
          }
        }, {
          component: 'MenuAppLink',
          privileges: ['100'],
          props: {
            href: '/whatever',
            label: 'Add a member',
            id: 'add-member'
          }
        }]
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/login',
          label: 'Invitations',
          id: 'invitations'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/login',
          label: 'Authentication',
          id: 'authentication'
        }
      }]
    }, {
      component: 'MenuLabel',
      children: 'Transactions'
    }, {
      component: 'MenuList',
      children: [{
        component: 'MenuAppLink',
        props: {
          href: '/p-admin',
          label: 'Payments',
          id: 'payments'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '#',
          label: 'Transfers',
          id: 'transfers'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '#',
          label: 'Balance',
          id: 'balance'
        }
      }]
    }, {
      component: 'MenuLabel',
      children: 'Content Manager'
    }, {
      component: 'MenuList',
      children: [{
        component: 'MenuAppLink',
        props: {
          href: '/r-admin/content/accounts',
          label: 'Accounts',
          id: 'accounts'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/r-admin/content/testtables',
          label: 'Test Tables',
          id: 'testtables'
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
    're-bulma': '^0.2.3',
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
    'redux-thunk': '^2.1.0'
  },
  dependencies: {
    debounce: '^1.0.0',
    'draft-js': '^0.10.0',
    eslint: '^3.14.1',
    'eslint-plugin-react': '^6.9.0',
    flat: '^2.0.1',
    react: '15.3.2',
    'react-codemirror': '^0.3.0',
    'react-dom': '15.3.2',
    'react-draft-wysiwyg': '^1.7.6',
    'validate.js': '^0.11.1'
  },
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test --env=jsdom',
    eject: 'react-scripts eject'
  },
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