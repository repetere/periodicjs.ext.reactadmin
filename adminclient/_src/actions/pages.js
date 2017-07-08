'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';


var pages = {
  /**
   * @param {string} location name of extension to load
   */
  changePage: function changePage(location) {
    var _this = this;

    return function (dispatch, getState) {
      if (getState().page.location !== location) {
        if (location !== 'login') {
          // AsyncStorage.setItem(constants.pages.ASYNCSTORAGE_KEY, location);
        }
        dispatch(_this.setPage(location));
      }
    };
  },
  setPage: function setPage(location) {
    return {
      type: _constants2.default.pages.LOAD_PAGE_ACTION,
      payload: { location: location }
    };
  },
  setAppDimensions: function setAppDimensions(layout) {
    return {
      type: _constants2.default.pages.UPDATE_APP_DIMENSIONS,
      payload: { layout: layout }
    };
  },
  initialAppLoad: function initialAppLoad(location) {
    return {
      type: _constants2.default.pages.INITIAL_APP_LOADED,
      payload: { location: location }
    };
  },

  /**
   * once initial check of user login status, then set app state to loaded
   */
  initialAppLoaded: function initialAppLoaded(location) {
    // let initialLocation = (customSettings.defaultExtensionRoute) ? customSettings.defaultExtensionRoute : location;
    return function (dispatch) {
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
  resetAppLoadedState: function resetAppLoadedState() {
    return {
      type: _constants2.default.pages.RESET_APP_LOADED,
      payload: {}
    };
  }
};

exports.default = pages;