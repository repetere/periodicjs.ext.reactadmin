import constants from '../constants';
import appDefaultSettings from '../content/config/settings.json';
let windowState = (window && window.__padmin) ? window.__padmin : {};

const initialState = Object.assign({},appDefaultSettings,windowState);
// console.log({ initialState });
const settingsReducer = (state, action) => {
  switch (action.type) {
    case constants.settings.UPDATE_APP_SETTINGS:
      var updatedSettings = action.payload;
      return Object.assign({},state, updatedSettings);  
    default:
      return Object.assign(initialState, state);
  }
};

export default settingsReducer;