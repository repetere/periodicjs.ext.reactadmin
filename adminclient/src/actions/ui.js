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
          let settings = response.data.settings;
          dispatch({ type: component, success: true, settings });
        }, e => dispatch({ type: component, success: false, error: e }))
    };
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