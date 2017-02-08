import constants from '../constants';
import utilities from '../util';
import notification from './notification';
// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';

const fetchComponentUtil = utilities.fetchComponent;

const COMPONENTS = {};

const ui = {
  /**
   * once initial check of user login status, then set app state to loaded
   */
  toggleUISidebar() {
    return {
      type: constants.ui.TOGGLE_SIDEBAR,
      payload: { },
    };
  },
  closeUISidebar() {
    return {
      type: constants.ui.CLOSE_SIDEBAR,
      payload: { },
    };
  },
  setUILoadedState(loaded) {
    return {
      type: constants.ui.SET_UI_LOADED,
      payload: loaded,
    };
  },
  handleFetchedComponent: function (type, response) {
    return {
      type: type,
      payload: {
        success: true,
        settings: response.data.settings,
      },
    };
  },
  handleFailedFetchComponent: function (type, error) {
    return {
      type: type,
      payload: { 
        success: false,
        error,
      },
    };
  },
  setActiveNavItem: function (id) {
    return {
      type: constants.ui.SET_SELECTED_NAV_STATE,
      payload: {
        success: true,
        id
      }
    }
  },
  fetchComponent: function (type) {
    let component, componentLoadError;
    //add ?refresh=true to below component loading routes to individually reload configurations for a given component
    switch (type) {
      case constants.ui.LOGIN_COMPONENT:
        component = constants.ui.LOGIN_COMPONENT;
        if (!COMPONENTS[ component ]) COMPONENTS[ component ] = function (basename) {
          return fetchComponentUtil(`${basename}/load/components/login`); 
        };
        break;
      case constants.ui.MAIN_COMPONENT:
        component = constants.ui.MAIN_COMPONENT;
        if (!COMPONENTS[ component ]) COMPONENTS[ component ] = function (basename) {
          return fetchComponentUtil(`${basename}/load/components/main`);
        };
        break;
      case constants.ui.ERROR_COMPONENTS:
        component = constants.ui.ERROR_COMPONENTS;
        if (!COMPONENTS[ component ]) COMPONENTS[ component ] = function (basename) {
          return fetchComponentUtil(`${basename}/load/components/error`);
        };
        break;
      default:
      component = false;
    }
    return function (dispatch, getState) {
      if (!component) {
        componentLoadError = new Error(`Can't fetch component - ${component}`);
          // console.log({ componentLoadError });
        dispatch(notification.errorNotification(componentLoadError));
        throw componentLoadError;
      }
      let state = getState();
      let basename = state.settings.basename;
      dispatch({ type: `INIT_${ component }`, });
      return COMPONENTS[component](basename)()
        .then(response => {
          dispatch(this.handleFetchedComponent(component, response));
        }, e => {
          dispatch(this.handleFailedFetchComponent(component, e));
          e.message = e.message += '. Cannot load ' + component;
          dispatch(notification.errorNotification(e, 10000));

        });
    }.bind(this);
  },
};

export default ui;