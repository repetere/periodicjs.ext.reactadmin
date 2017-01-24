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
  setUILoadedState(loaded) {
    // console.log('called laoded action')
    return {
      type: constants.ui.SET_UI_LOADED,
      payload: loaded,
    };
  },
  handleFetchedComponent: function (type, response) {
    return {
      type: type,
      success: true,
      settings: response.data.settings
    };
  },
  handleFailedFetchComponent: function (data, error) {
    return {
      type: type,
      success: false,
      error: error
    };
  },
  fetchComponent: function (type) {
    let component;
    switch (type) {
      case constants.ui.LOGIN_COMPONENT:
        component = constants.ui.LOGIN_COMPONENT;
        if (!COMPONENTS[component]) COMPONENTS[component] = fetchComponent(`${ window.__padmin.hostname }/load/components/login`);
        break;
      case constants.ui.MAIN_COMPONENT:
        component = constants.ui.MAIN_COMPONENT;
        if (!COMPONENTS[component]) COMPONENTS[component] = fetchComponent(`${ window.__padmin.hostname }/load/components/main`);
        break;
      default:
        component = false;
    }
    if (!component) throw new Error(`Can't fetch component - ${ component }`);
    return function (dispatch) {
      dispatch({ type: `INIT_${ component }` });
      return COMPONENTS[component]()
        .then(response => {
          dispatch(this.handleFetchedComponent(component, response));
        }, e => dispatch(this.handleFailedFetchComponent(component, e)))
    }.bind(this);
  }
  // sendApplicationState(appState) {
  //   return {
  //     type: constants.ui.GET_APP_STATE,
  //     payload: {
  //       appState,
  //     },
  //   };
  // },
  // getApplicationState() {
  //   return (dispatch, getState)=>{
  //     dispatch(this.sendApplicationState(getState()));
  //   };
  // },
};

export default ui;