import constants from '../constants';
// import { AsyncStorage, } from 'react-web';
import customSettings from '../content/config/settings.json';
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
};

export default ui;