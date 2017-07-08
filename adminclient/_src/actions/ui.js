'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { AsyncStorage, } from 'react-web';
// import Immutable from 'immutable';

var fetchComponentUtil = _util2.default.fetchComponent;

var COMPONENTS = {};

var ui = {
  /**
   * once initial check of user login status, then set app state to loaded
   */
  toggleUISidebar: function toggleUISidebar() {
    return {
      type: _constants2.default.ui.TOGGLE_SIDEBAR,
      payload: {}
    };
  },
  closeUISidebar: function closeUISidebar() {
    return {
      type: _constants2.default.ui.CLOSE_SIDEBAR,
      payload: {}
    };
  },
  setUILoadedState: function setUILoadedState(loaded, customLayout) {
    return {
      type: _constants2.default.ui.SET_UI_LOADED,
      payload: customLayout ? {
        customLayout: customLayout, loaded: loaded
      } : loaded
    };
  },

  handleFetchedComponent: function handleFetchedComponent(type, response) {
    return {
      type: type,
      payload: {
        success: true,
        settings: response.data.settings
      }
    };
  },
  handleFailedFetchComponent: function handleFailedFetchComponent(type, error) {
    return {
      type: type,
      payload: {
        success: false,
        error: error
      }
    };
  },
  setActiveNavItem: function setActiveNavItem(id) {
    return {
      type: _constants2.default.ui.SET_SELECTED_NAV_STATE,
      payload: {
        success: true,
        id: id
      }
    };
  },
  setNavLabel: function setNavLabel(label) {
    return {
      type: _constants2.default.ui.SET_NAV_LABEL,
      payload: {
        label: label
      }
    };
  },
  fetchComponent: function fetchComponent(type) {
    var component = void 0,
        componentLoadError = void 0;
    //add ?refresh=true to below component loading routes to individually reload configurations for a given component

    return function (dispatch, getState) {
      var _this = this;

      var state = getState();
      switch (type) {
        case _constants2.default.ui.LOGIN_COMPONENT:
          component = _constants2.default.ui.LOGIN_COMPONENT;
          if (!COMPONENTS[component]) COMPONENTS[component] = function (basename) {
            return fetchComponentUtil(basename + '/load/components/login' + (state.settings.ui.initialization.refresh_components ? '?refresh=true' : ''));
          };
          break;
        case _constants2.default.ui.MAIN_COMPONENT:
          component = _constants2.default.ui.MAIN_COMPONENT;
          if (!COMPONENTS[component]) COMPONENTS[component] = function (basename) {
            return fetchComponentUtil(basename + '/load/components/main' + (state.settings.ui.initialization.refresh_components ? '?refresh=true' : ''));
          };
          break;
        case _constants2.default.ui.ERROR_COMPONENTS:
          component = _constants2.default.ui.ERROR_COMPONENTS;
          if (!COMPONENTS[component]) COMPONENTS[component] = function (basename) {
            return fetchComponentUtil(basename + '/load/components/error' + (state.settings.ui.initialization.refresh_components ? '?refresh=true' : ''));
          };
          break;
        default:
          component = false;
      }
      if (!component) {
        componentLoadError = new Error('Can\'t fetch component - ' + component);
        // console.log({ componentLoadError });
        dispatch(_notification2.default.errorNotification(componentLoadError));
        throw componentLoadError;
      }
      // let state = getState();
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      dispatch({ type: 'INIT_' + component });
      return COMPONENTS[component](basename)().then(function (response) {
        dispatch(_this.handleFetchedComponent(component, response));
        return response;
      }, function (e) {
        dispatch(_this.handleFailedFetchComponent(component, e));
        e.message = e.message += '. Cannot load ' + component;
        dispatch(_notification2.default.errorNotification(e, 10000));
      });
    }.bind(this);
  }
};

exports.default = ui;