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

var initializationThrottle;
var initializationTimeout;

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
  authenticatedMFA (isAuthenticated = true) {
    return {
      type: constants.user.MFA_AUTHENTICATED,
      payload: {
        updatedAt: new Date(),
        timestamp: Date.now(),
        isMFAAuthenticated: isAuthenticated
      }
    }
  },
  logoutUser() {
    return (dispatch) => {
      dispatch(pageActions.resetAppLoadedState());
      Promise.all([
        AsyncStorage.removeItem(constants.jwt_token.TOKEN_NAME),
        AsyncStorage.removeItem(constants.jwt_token.TOKEN_DATA),
        AsyncStorage.removeItem(constants.jwt_token.PROFILE_JSON),
        AsyncStorage.removeItem(constants.user.MFA_AUTHENTICATED),
        // AsyncStorage.removeItem(constants.pages.ASYNCSTORAGE_KEY),
      ])
        .then((/*results*/) => {
          // console.log('logout user results', results);
          dispatch(this.logoutUserSuccess());
          dispatch(pageActions.initialAppLoaded());
          dispatch(uiActions.closeUISidebar());
          dispatch(this.authenticatedMFA(false));
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
      let basename = (typeof state.settings.adminPath ==='string' && state.settings.adminPath !=='/') ? state.settings.basename+state.settings.adminPath : state.settings.basename;
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
      let basename = (typeof state.settings.adminPath ==='string' && state.settings.adminPath !=='/') ? state.settings.basename+state.settings.adminPath : state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = Object.assign({}, options.headers, headers);
      //add ?refresh=true to fetch route below to reload navigtion configuration
      return utilities.fetchComponent(`${ basename }/load/navigation?refresh=true`, options)()
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
  enforceMFA (noRedirect) {
    return (dispatch, getState) => {
      let state = getState();
      let extensionattributes = (state.user.userdata) ? state.user.userdata.extensionattributes : false;
      let queryparams = qs.parse((window.location.search.charAt(0) === '?') ? window.location.search.substr(1, window.location.search.length) : window.location.search);
      let returnUrl = (queryparams.return_url) ? queryparams.return_url : false;
      if (state.settings.auth.enforce_mfa || (extensionattributes && extensionattributes.login_mfa)) {
        if (state.user.isMFAAuthenticated) {
          if (!noRedirect) {
            if (state.user.isLoggedIn && returnUrl) dispatch(push(returnUrl));
            else dispatch(push(state.settings.auth.logged_in_homepage));
          }
          return true;
        } else {
          if (!state.manifest.containers || (state.manifest.containers && !state.manifest.containers['/mfa'])) {
            dispatch(notification.errorNotification(new Error('Multi-Factor Authentication not Properly Configured')));
            this.logoutUser()(dispatch);
          } else dispatch(push('/mfa'));
          return false;
        }
      } else {
        if (!noRedirect) {
          if (state.user.isLoggedIn && returnUrl) dispatch(push(returnUrl));
          else dispatch(push(state.settings.auth.logged_in_homepage));
        }
        return true;
      } 
    };
  },
  validateMFA (formdata = {}) {
    let requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': undefined,
      },
      body: JSON.stringify(formdata)
    };
    return (dispatch, getState) => {
      let state = getState();
      let basename = (typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/') ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      let options = Object.assign({}, requestOptions);
      options.headers = Object.assign({}, options.headers, { 'x-access-token': state.user.jwt_token });
      return utilities.fetchComponent(`${ basename }/load/mfa`, options)()
        .then(response => {
          if (response && response.data && response.data.authenticated) {
            dispatch(this.authenticatedMFA());
            return AsyncStorage.setItem(constants.user.MFA_AUTHENTICATED, true)
              .then(() => response, e => Promise.reject(e));
          }
          return response
        })
        .then(response => {
          if (response.result === 'error') dispatch(notification.errorNotification(new Error(response.data.error)));
          return this.enforceMFA()(dispatch, getState)
        })
        .catch(e => {
          dispatch(notification.errorNotification(e));
        });
    };
  },
  fetchConfigurations (options = {}) {
    return (dispatch, getState) => {
      let state = getState();
      if ((state.manifest && state.manifest.hasLoaded) || (state.settings.user && state.settings.user.navigation && state.settings.user.navigation.hasLoaded) || (state.settings.user && state.settings.user.preferences && state.settings.user.preferences.hasLoaded)) {
        let operations = [];
        if (!state.manifest || (state.manifest && !state.manifest.hasLoaded)) operations.push(manifest.fetchManifest(options)(dispatch, getState));
        if (!state.settings || (state.settings && !state.settings.user)) {
          operations.push(this.fetchNavigation(options)(dispatch, getState));
          operations.push(this.fetchPreferences(options)(dispatch, getState));
        } else {
          if (!state.settings.user.navigation || (state.settings.user.navigation && !state.settings.user.navigation.hasLoaded)) operations.push(this.fetchNavigation(options)(dispatch, getState));
          if (!state.settings.user.preferences || (state.settings.user.preferences && !state.settings.user.preferences.hasLoaded)) operations.push(this.fetchPreferences(options)(dispatch, getState));
        }
        return Promise.all(operations);
      } else {
        dispatch(this.navigationRequest());
        dispatch(this.preferenceRequest());
        dispatch(manifest.manifestRequest());
        let basename = (typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/') ? state.settings.basename + state.settings.adminPath : state.settings.basename;
        let headers = state.settings.userprofile.options.headers;
        delete headers.clientid_default;
        options.headers = Object.assign({}, options.headers, headers);
        //add ?refresh=true to fetch route below to reload configurations
        return utilities.fetchComponent(`${basename}/load/configurations`, options)()
          .then(response => {
            if (response.result === 'error') return Promise.reject(new Error(response.data.error));
            let responses = Object.keys(response.data.settings).reduce((result, key) => {
              let data = Object.assign({}, response.data);
              data.settings = response.data.settings[key];
              result[key] = { data };
              return result;
            }, {});
            dispatch(this.navigationSuccessResponse(responses.navigation));
            dispatch(this.preferenceSuccessResponse(responses.preferences));
            dispatch(manifest.receivedManifestData(responses.manifest.data.settings));
          })
          .catch(e => {
            dispatch(this.navigationErrorResponse(e));
            dispatch(this.preferenceErrorResponse(e));
            dispatch(manifest.failedManifestRetrival(e));
          });
      }
    };
  },
  initializeAuthenticatedUser (token, ensureMFA) {
    return (dispatch, getState) => {
      let requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      };
      let state = getState();
      if (state.manifest && state.manifest.hasLoaded && state.settings && state.settings.user && state.settings.user.navigation && state.settings.user.navigation.hasLoaded && state.settings.user.preferences && state.settings.user.preferences.hasLoaded) {
        if (initializationTimeout) {
          clearTimeout(initializationTimeout);
          initializationThrottle.destroyInactiveThrottle();
        }
        return (ensureMFA !== false) ? this.enforceMFA()(dispatch, getState) : undefined;
      } else {
        let assignThrottle = (resolve, reject) => {
          let throttle = () => {
            initializationTimeout = setTimeout(() => {
              clearTimeout(initializationTimeout);
              this.fetchConfigurations(requestOptions)(dispatch, getState)
                .then(() => (ensureMFA !== false) ? this.enforceMFA()(dispatch, getState) : undefined)
                .then(resolve)
                .catch(reject);
            }, 10);
          };
          throttle.destroyInactiveThrottle = resolve;
          return throttle;
        };
        return new Promise((resolve, reject) => {
          if (!initializationTimeout) {
            initializationThrottle = assignThrottle(resolve, reject);
            initializationThrottle();
          } else {
            clearTimeout(initializationTimeout);
            initializationThrottle.destroyInactiveThrottle();
            initializationThrottle = assignThrottle(resolve, reject);
            initializationThrottle();
          }
        });
      }
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
            this.initializeAuthenticatedUser(responseData.token, false)(dispatch, getState),
          ]);
        })
        .then(() => {
          dispatch(this.recievedLoginUser(url, fetchResponse, cachedResponseData));
          return this.enforceMFA()(dispatch, getState);
        })
        .catch((error) => {
          dispatch(notification.errorNotification(error));
          dispatch(this.failedUserRequest(url, error));
        });
    };
  },
};

export default user;