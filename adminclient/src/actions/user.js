import constants from '../constants';
import { push, /* replace, go, goForward, goBack */ } from 'react-router-redux';
import { AsyncStorage, } from 'react-native';
import pageActions from './pages';
import uiActions from './ui';
import qs from 'querystring';
import utilities from '../util';
import manifest from './manifest';
import notification from './notification';
// import { Platform, } from 'react-web';
// import Immutable from 'immutable';

const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const user = {
  getUserStatus() {
    return {
      type: constants.user.CURRENT_USER_STATUS,
      payload: {},
    };
  },
  /**
   * @param {string} url restful resource
   */
  loginRequest(url) {
    return {
      type: constants.user.LOGIN_DATA_REQUEST,
      payload: {
        url,
      },
    };
  },
  /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  recievedLoginUser(url, response, json) {
    return {
      type: constants.user.LOGIN_DATA_SUCCESS,
      payload: {
        url,
        response,
        json,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
    /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  saveUserProfile(url, response, json) {
    return {
      type: constants.user.SAVE_DATA_SUCCESS,
      payload: {
        url,
        response,
        json,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  /**
  * @param {string} location name of extension to load
  */
  failedUserRequest(url, error) {
    return {
      type: constants.user.USER_DATA_FAILURE,
      payload: {
        url,
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  logoutUserSuccess() { 
    return {
      type: constants.user.LOGOUT_SUCCESS,
      payload: {
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  failedLogoutRequest(error) { 
    return {
      type: constants.user.LOGOUT_FAILURE,
      payload: {
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  preferenceSuccessResponse (response) {
    return {
      type: constants.user.PREFERENCE_LOAD_SUCCESS,
      payload: {
        preferences: response.data.settings,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  preferenceErrorResponse (error) {
    return {
      type: constants.user.PREFERENCE_LOAD_ERROR,
      payload: { 
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  preferenceRequest () {
    return {
      type: constants.user.PREFERENCE_REQUEST,
      payload: {},
    };
  },
  navigationSuccessResponse (response) {
    return {
      type: constants.user.NAVIGATION_LOAD_SUCCESS,
      payload: {
        navigation: response.data.settings,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  navigationErrorResponse (error) {
    return {
      type: constants.user.NAVIGATION_LOAD_ERROR,
      payload: { 
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  navigationRequest () {
    return {
      type: constants.user.NAVIGATION_REQUEST,
      payload: {},
    };
  },
  logoutUser() {
    return (dispatch) => {
      dispatch(pageActions.resetAppLoadedState());
      Promise.all([
        AsyncStorage.removeItem(constants.jwt_token.TOKEN_NAME),
        AsyncStorage.removeItem(constants.jwt_token.TOKEN_DATA),
        AsyncStorage.removeItem(constants.jwt_token.PROFILE_JSON),
        // AsyncStorage.removeItem(constants.pages.ASYNCSTORAGE_KEY),
      ])
        .then((/*results*/) => {
          // console.log('logout user results', results);
          dispatch(this.logoutUserSuccess());
          dispatch(pageActions.initialAppLoaded());
          dispatch(uiActions.closeUISidebar());
          dispatch(push('/'));
        })
        .catch(error => { 
          dispatch(notification.errorNotification(error));
          dispatch(this.failedLogoutRequest(error));
          dispatch(pageActions.initialAppLoaded());
          dispatch(uiActions.closeUISidebar());
          dispatch(push('/'));
        });
    };
  },
  fetchPreferences (options = {}) {
    return (dispatch, getState) => {
      dispatch(this.preferenceRequest());
      let state = getState();
      let basename = state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = Object.assign({}, options.headers, headers);
      return utilities.fetchComponent(`${ basename }/load/preferences`, options)()
        .then(response => {
          dispatch(this.preferenceSuccessResponse(response));
        }, e => dispatch(this.preferenceErrorResponse(e)));
    };
  },
  fetchNavigation (options = {}) {
    return (dispatch, getState) => {
      dispatch(this.navigationRequest());
      let state = getState();
      let basename = state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = Object.assign({}, options.headers, headers);
      //add ?refresh=true to fetch route below to reload navigtion configuration
      return utilities.fetchComponent(`${ basename }/load/navigation`, options)()
        .then(response => {
          dispatch(this.navigationSuccessResponse(response));
        }, e => dispatch(this.navigationErrorResponse(e)));
    };
  },
  getUserProfile(jwt_token, responseFormatter) {
    return (dispatch, getState) => {
      let fetchResponse;
      let url = getState().settings.userprofile.url;
      dispatch(this.loginRequest(url));
      fetch(url, {
        method: getState().settings.userprofile.method || 'POST',
        headers: Object.assign({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, getState().settings.userprofile.options.headers, {
          'x-access-token': jwt_token,
        }),
      })
        .then(checkStatus)
        .then((response) => {
          fetchResponse = response;
          if (responseFormatter) {
            let formatterPromise = responseFormatter(response);
            if (formatterPromise instanceof Promise) {
              return formatterPromise;
            } else {
              throw new Error('responseFormatter must return a Promise');
            }
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          dispatch(this.saveUserProfile(url, fetchResponse, responseData));
        })
        .catch((error) => {
          dispatch(notification.errorNotification(error));
          dispatch(this.failedUserRequest(url, error));
        });
    };
  },
  initializeAuthenticatedUser (token) {
    return (dispatch, getState) => {
      let requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      };
      return Promise.all([
        manifest.fetchManifest(requestOptions)(dispatch, getState),
        this.fetchPreferences(requestOptions)(dispatch, getState),
        this.fetchNavigation(requestOptions)(dispatch, getState),
      ]);
    };
  },
  /**
  * @param {string} url url for fetch request
  * @param {object} options what-wg fetch options
  * @param {function} responseFormatter custom reponse formatter, must be a function that returns a promise that resolves to json/javascript object
  */
  loginUser(loginData, responseFormatter) {
    return (dispatch, getState) => {
      let fetchResponse;
      let cachedResponseData;
      let loginSettings = getState().settings.login;
      let url = loginSettings.url;

      dispatch(this.loginRequest(url));
      fetch(url, {
        method: loginSettings.method || 'POST',
        headers: Object.assign({
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
        }, loginSettings.options.headers, {
          username: loginData.username,
          password: loginData.password,
        }),
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      })
        .then(checkStatus)
        .then((response) => {
          fetchResponse = response;
          if (responseFormatter) {
            let formatterPromise = responseFormatter(response);
            if (formatterPromise instanceof Promise) {
              return formatterPromise;
            } else {
              throw new Error('responseFormatter must return a Promise');
            }
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          cachedResponseData = responseData;
          return Promise.all([
            AsyncStorage.setItem(constants.jwt_token.TOKEN_NAME, responseData.token),
            AsyncStorage.setItem(constants.jwt_token.TOKEN_DATA, JSON.stringify({
              expires: responseData.expires,
              timeout: responseData.timeout,
              token: responseData.token,
            })),
            AsyncStorage.setItem(constants.jwt_token.PROFILE_JSON, JSON.stringify(responseData.user)),
            this.initializeAuthenticatedUser(responseData.token)(dispatch, getState),
          ]);
        })
        .then(() => {
          dispatch(this.recievedLoginUser(url, fetchResponse, cachedResponseData));
          //move to new page
          let queryStrings = qs.parse((window.location.search.charAt(0) === '?') ? window.location.search.substr(1, window.location.search.length) : window.location.search);
          let returnUrl = (queryStrings.return_url) ? queryStrings.return_url : false;
          // console.log({ returnUrl, queryStrings, });
          if (getState().user.isLoggedIn && returnUrl) {
            dispatch(push(returnUrl));
          } else {
            dispatch(push(getState().settings.auth.logged_in_homepage));
          }
        })
        .catch((error) => {
          dispatch(notification.errorNotification(error));
          dispatch(this.failedUserRequest(url, error));
        });
    };
  },
};

export default user;