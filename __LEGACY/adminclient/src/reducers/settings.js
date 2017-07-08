import constants from '../constants';
import appDefaultSettings from '../content/config/settings.json';
import defaultUserNavigation from '../content/config/navigation.json';
import packageJSON from '../../package.json';
let windowState = (typeof window !=='undefined' && window.__padmin) ? window.__padmin : {};

const initialState = Object.assign({ version: packageJSON.version, }, appDefaultSettings, windowState);
initialState.user = Object.assign({
  navigation: defaultUserNavigation,
}, initialState.user);

// console.log({ initialState });
const settingsReducer = (state, action) => {
  let user;
  switch (action.type) {
  case constants.settings.UPDATE_APP_SETTINGS:
    var updatedSettings = action.payload;
    return Object.assign({}, state, updatedSettings);
  case constants.user.PREFERENCE_REQUEST:
    user = Object.assign({}, state.user);
    user.preferences = Object.assign({}, user.preferences, {
      isFetching: true,
    });
    return Object.assign({}, state, { user, });
  case constants.user.PREFERENCE_LOAD_ERROR:
    user = Object.assign({}, state.user);
    user.preferences = Object.assign({}, user.preferences, {
      isFetching: false,
    }, action.payload);
    return Object.assign({}, state, { user, });
  case constants.user.PREFERENCE_LOAD_SUCCESS:
    user = Object.assign({}, state.user);
    user.preferences = Object.assign({}, user.preferences, {
      isFetching: false,
      updatedAt: action.payload.updatedAt,
      timestamp: action.payload.timestamp,
      hasLoaded: true,
      error: undefined,
    }, action.payload.preferences);
    return Object.assign({}, state, { user, });
  case constants.user.NAVIGATION_REQUEST:
    user = Object.assign({}, state.user);
    user.navigation = Object.assign({}, user.navigation, {
      isFetching: true,
    });
    return Object.assign({}, state, { user, });
  case constants.user.NAVIGATION_LOAD_ERROR:
    user = Object.assign({}, state.user);
    user.navigation = Object.assign({}, user.navigation, {
      isFetching: false,
    }, action.payload);
    return Object.assign({}, state, { user, });
  case constants.user.NAVIGATION_LOAD_SUCCESS:
    user = Object.assign({}, state.user);
    user.navigation = Object.assign({}, user.navigation, {
      isFetching: false,
      updatedAt: action.payload.updatedAt,
      timestamp: action.payload.timestamp,
      hasLoaded: true,
      error: undefined,
    }, action.payload.navigation);
    return Object.assign({}, state, { user, });
  default:
    return Object.assign(initialState, state);
  }
};

export default settingsReducer;