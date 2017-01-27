import constants from '../constants';
import utilities from '../util';
// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';

const fetchComponent = utilities.fetchComponent;

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
      success: true,
      payload: {
        settings: response.data.settings,
      },
    };
  },
  handleFailedFetchComponent: function (type, error) {
    return {
      type: type,
      success: false,
      payload: { error, },
    };
  },
  fetchComponent: function (type) {
    let component;
    switch (type) {
      case constants.ui.LOGIN_COMPONENT:
        component = constants.ui.LOGIN_COMPONENT;
        if (!COMPONENTS[component]) COMPONENTS[component] = function (basename) {
          return fetchComponent(`${ basename }/load/components/login`);
        }
        break;
      case constants.ui.MAIN_COMPONENT:
        component = constants.ui.MAIN_COMPONENT;
        if (!COMPONENTS[component]) COMPONENTS[component] = function (basename) {
          return fetchComponent(`${ basename }/load/components/main`);
        }
        break;
      case constants.ui.ERROR_COMPONENTS:
        component = constants.ui.ERROR_COMPONENTS;
        if (!COMPONENTS[component]) COMPONENTS[component] = function (basename) {
          return fetchComponent(`${ basename }/load/components/error`);
        }
        break;
      default:
        component = false;
    }
    if (!component) throw new Error(`Can't fetch component - ${ component }`);
    return function (dispatch, getState) {
      let state = getState();
      let basename = state.settings.basename;
      dispatch({ type: `INIT_${ component }`, });
      return COMPONENTS[component](basename)()
        .then(response => {
          dispatch(this.handleFetchedComponent(component, response));
        }, e => dispatch(this.handleFailedFetchComponent(component, e)));
    }.bind(this);
  },
};

export default ui;