import constants from '../constants';
// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';


const pages = {
  /**
   * @param {string} location name of extension to load
   */
  changePage(location) {
    return (dispatch, getState) => {
      if (getState().page.location !== location) {
        if (location !== 'login') {
          // AsyncStorage.setItem(constants.pages.ASYNCSTORAGE_KEY, location);
        }
        dispatch(this.setPage(location));
      }
    };
  },
  setPage(location) {
    return {
      type: constants.pages.LOAD_PAGE_ACTION,
      payload: { location, },
    };
  },
  setAppDimensions(layout) {
    return {
      type: constants.pages.UPDATE_APP_DIMENSIONS,
      payload: { layout, },
    };
  },
  initialAppLoad(location) {
    return {
      type: constants.pages.INITIAL_APP_LOADED,
      payload: { location, },
    };
  },
  /**
   * once initial check of user login status, then set app state to loaded
   */
  initialAppLoaded(location) {
    // let initialLocation = (customSettings.defaultExtensionRoute) ? customSettings.defaultExtensionRoute : location;
    return (dispatch) => {
      // AsyncStorage.getItem(constants.pages.ASYNCSTORAGE_KEY)
      //   .then((page_location) => {
      //     dispatch(this.initialAppLoad(page_location));
      //   })
      //   .catch((error) => {
      //     dispatch(this.initialAppLoad(initialLocation));
      //   });
      // dispatch(this.initialAppLoad(initialLocation));

    };
  },
  /**
   * once initial check of user login status, then set app state to loaded
   */
  resetAppLoadedState() {
    return {
      type: constants.pages.RESET_APP_LOADED,
      payload: { },
    };
  },
};

export default pages;