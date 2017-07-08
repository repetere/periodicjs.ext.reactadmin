'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import navigationSettings from '../content/config/navigation';
// let windowState = (window && window.__padmin && window.__padmin.navigation) ? window.__padmin.navigation : {};
//TODO - if we want to use default navigation move to navigation reducer
var initialState = {
  sidebar_is_open: false,
  ui_is_loaded: false,
  nav_ui_is_loaded: false,
  custom_ui_layout: undefined,
  app_container_ui_is_loaded: false,
  login_ui_is_loaded: false,
  header_ui_is_loaded: false,
  footer_ui_is_loaded: false,
  error_ui_is_loaded: false,
  nav_label: '',
  app_data: {},
  selected_nav: undefined
};

var containers;
var components;

var uiReducer = function uiReducer(state, action) {
  switch (action.type) {
    case _constants2.default.ui.SET_UI_LOADED:
      var uiStatePayload = action.payload;
      var appContainerUIState = uiStatePayload.loaded || uiStatePayload ? {
        app_container_ui_is_loaded: true
      } : {};
      return (0, _assign2.default)({}, state, appContainerUIState, uiStatePayload.customLayout ? {
        ui_is_loaded: uiStatePayload.loaded,
        custom_ui_layout: uiStatePayload.customLayout
      } : {
        ui_is_loaded: uiStatePayload,
        custom_ui_layout: undefined
      });
    case _constants2.default.ui.SET_NAV_LABEL:
      var navLabelPaylod = action.payload;
      return (0, _assign2.default)({}, state, {
        nav_label: navLabelPaylod.label
      });
    case _constants2.default.ui.TOGGLE_SIDEBAR:
      // var logoutFailurePayload = action.payload;
      return (0, _assign2.default)({}, state, {
        sidebar_is_open: !state.sidebar_is_open
      });
    case _constants2.default.ui.OPEN_SIDEBAR:
      // var logoutFailurePayload = action.payload;
      return (0, _assign2.default)({}, state, {
        sidebar_is_open: true
      });
    case _constants2.default.ui.CLOSE_SIDEBAR:
      // var failurePayload = action.payload;
      return (0, _assign2.default)({}, state, {
        sidebar_is_open: false
      });
    case 'INIT_' + _constants2.default.ui.LOGIN_COMPONENT:
      containers = (0, _assign2.default)({}, state.containers);
      containers.login = {};
      return (0, _assign2.default)({}, state, { containers: containers });
    case 'INIT_' + _constants2.default.ui.MAIN_COMPONENT:
      components = (0, _assign2.default)({}, state.components, { header: {}, footer: {} });
      return (0, _assign2.default)({}, state, { components: components });
    case _constants2.default.ui.LOGIN_COMPONENT:
      if (!action.payload.success) {
        console.log('There was an error retrieving login component', action.error);
        return state;
      } else {
        containers = (0, _assign2.default)({}, state.containers, { login: action.payload.settings });
        return (0, _assign2.default)({}, state, { containers: containers, login_ui_is_loaded: true });
      }
    case _constants2.default.ui.MAIN_COMPONENT:
      if (!action.payload.success) {
        console.log('There was an error retrieving main component', action.payload.error);
        return state;
      } else {
        components = (0, _assign2.default)({}, state.components);
        components.header = action.payload.settings.header || {};
        components.footer = action.payload.settings.footer || {};
        return (0, _assign2.default)({}, state, { components: components, header_ui_is_loaded: true, footer_ui_is_loaded: true });
      }
    case 'INIT_' + _constants2.default.ui.ERROR_COMPONENTS:
      components = (0, _assign2.default)({}, state.components, { error: {} });
      return (0, _assign2.default)({}, state, { components: components });
    case _constants2.default.ui.ERROR_COMPONENTS:
      if (!action.payload.success) {
        console.log('There was an error retrieving error components', action.payload.error);
        return state;
      } else {
        components = (0, _assign2.default)({}, state.components, { error: action.payload.settings });
        return (0, _assign2.default)({}, state, { components: components, error_ui_is_loaded: true });
      }
    case _constants2.default.ui.SET_SELECTED_NAV_STATE:
      return (0, _assign2.default)({}, state, {
        // sidebar_is_open: false,
        selected_nav: action.payload.id
      });
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = uiReducer;