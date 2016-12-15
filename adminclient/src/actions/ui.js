import constants from '../constants';
// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';


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
    console.log('called laoded action')
    return {
      type: constants.ui.SET_UI_LOADED,
      payload: loaded,
    };
  },
};

export default ui;