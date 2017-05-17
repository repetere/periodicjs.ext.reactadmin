'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _clearImmediate2 = require('babel-runtime/core-js/clear-immediate');

var _clearImmediate3 = _interopRequireDefault(_clearImmediate2);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _reactRouterRedux = require('react-router-redux');

var _serverSideReactNative = require('../util/server-side-react-native');

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _manifest = require('./manifest');

var _manifest2 = _interopRequireDefault(_manifest);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __global__returnURL = false;
// import { Platform, } from 'react-web';
// import Immutable from 'immutable';

var checkStatus = function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

var initializationThrottle;
var initializationTimeout;

var user = {
  getUserStatus: function getUserStatus() {
    return {
      type: _constants2.default.user.CURRENT_USER_STATUS,
      payload: {}
    };
  },

  /**
   * @param {string} url restful resource
   */
  loginRequest: function loginRequest(url) {
    return {
      type: _constants2.default.user.LOGIN_DATA_REQUEST,
      payload: {
        url: url
      }
    };
  },

  /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  recievedLoginUser: function recievedLoginUser(url, response, json) {
    return {
      type: _constants2.default.user.LOGIN_DATA_SUCCESS,
      payload: {
        url: url,
        response: response,
        json: json,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },

  /**
  * @param {string} location name of extension to load
  * @param {object} options what-wg fetch options
  */
  saveUserProfile: function saveUserProfile(url, response, json) {
    return {
      type: _constants2.default.user.SAVE_DATA_SUCCESS,
      payload: {
        url: url,
        response: response,
        json: json,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  updateUserProfileSuccess: function updateUserProfileSuccess(profile) {
    return {
      type: _constants2.default.user.UPDATE_PROFILE_SUCCESS,
      payload: {
        profile: profile,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  updateUserProfile: function updateUserProfile(profile) {
    var _this = this;

    console.debug('updatedUserProfile', { profile: profile });
    return function (dispatch /*, getState*/) {
      _serverSideReactNative.AsyncStorage.setItem(_constants2.default.jwt_token.PROFILE_JSON, (0, _stringify2.default)(profile.userdata)).then(function (status) {
        console.debug({ status: status });
        dispatch(_this.updateUserProfileSuccess(profile));
      }).catch(function (e) {
        console.error(e);
        dispatch(_notification2.default.errorNotification(e));
      });
    };
  },

  /**
  * @param {string} location name of extension to load
  */
  failedUserRequest: function failedUserRequest(url, error) {
    return {
      type: _constants2.default.user.USER_DATA_FAILURE,
      payload: {
        url: url,
        error: error,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  logoutUserSuccess: function logoutUserSuccess() {
    return {
      type: _constants2.default.user.LOGOUT_SUCCESS,
      payload: {
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  failedLogoutRequest: function failedLogoutRequest(error) {
    return {
      type: _constants2.default.user.LOGOUT_FAILURE,
      payload: {
        error: error,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  preferenceSuccessResponse: function preferenceSuccessResponse(response) {
    return {
      type: _constants2.default.user.PREFERENCE_LOAD_SUCCESS,
      payload: {
        preferences: response.data.settings,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  preferenceErrorResponse: function preferenceErrorResponse(error) {
    return {
      type: _constants2.default.user.PREFERENCE_LOAD_ERROR,
      payload: {
        error: error,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  preferenceRequest: function preferenceRequest() {
    return {
      type: _constants2.default.user.PREFERENCE_REQUEST,
      payload: {}
    };
  },
  navigationSuccessResponse: function navigationSuccessResponse(response) {
    return {
      type: _constants2.default.user.NAVIGATION_LOAD_SUCCESS,
      payload: {
        navigation: response.data.settings,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  navigationErrorResponse: function navigationErrorResponse(error) {
    return {
      type: _constants2.default.user.NAVIGATION_LOAD_ERROR,
      payload: {
        error: error,
        updatedAt: new Date(),
        timestamp: Date.now()
      }
    };
  },
  navigationRequest: function navigationRequest() {
    return {
      type: _constants2.default.user.NAVIGATION_REQUEST,
      payload: {}
    };
  },
  authenticatedMFA: function authenticatedMFA() {
    var isAuthenticated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    return {
      type: _constants2.default.user.MFA_AUTHENTICATED,
      payload: {
        updatedAt: new Date(),
        timestamp: Date.now(),
        isMFAAuthenticated: isAuthenticated
      }
    };
  },
  logoutUser: function logoutUser() {
    var _this2 = this;

    return function (dispatch, getState) {
      var state = getState();
      // console.debug({ state });
      dispatch(_pages2.default.resetAppLoadedState());
      _promise2.default.all([_serverSideReactNative.AsyncStorage.removeItem(_constants2.default.jwt_token.TOKEN_NAME), _serverSideReactNative.AsyncStorage.removeItem(_constants2.default.jwt_token.TOKEN_DATA), _serverSideReactNative.AsyncStorage.removeItem(_constants2.default.jwt_token.PROFILE_JSON), _serverSideReactNative.AsyncStorage.removeItem(_constants2.default.user.MFA_AUTHENTICATED), _util2.default.flushCacheConfiguration(['manifest.authenticated', 'user.navigation', 'user.preferences'])]).then(function () /*results*/{
        dispatch(_this2.logoutUserSuccess());
        dispatch(_pages2.default.initialAppLoaded());
        dispatch(_ui2.default.closeUISidebar());
        dispatch(_this2.authenticatedMFA(false));
        dispatch((0, _reactRouterRedux.push)(state.settings.auth.logged_out_path || '/'));
        var t = (0, _setImmediate3.default)(function () {
          (0, _clearImmediate3.default)(t);
          window.location.reload();
        });
      }).catch(function (error) {
        dispatch(_notification2.default.errorNotification(error));
        dispatch(_this2.failedLogoutRequest(error));
        dispatch(_pages2.default.initialAppLoaded());
        dispatch(_ui2.default.closeUISidebar());
        dispatch((0, _reactRouterRedux.push)(state.settings.auth.logged_out_path || '/'));
        var t = (0, _setImmediate3.default)(function () {
          (0, _clearImmediate3.default)(t);
          window.location.reload();
        });
      });
    };
  },
  fetchPreferences: function fetchPreferences() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var preferencesAction = function preferencesAction(dispatch, getState) {
      dispatch(_this3.preferenceRequest());
      var state = getState();
      var hasCached = void 0;
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      var headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = (0, _assign2.default)({}, options.headers, headers);
      return _util2.default.loadCacheConfigurations().then(function (result) {
        hasCached = result.user && result.user.preferences;
        if (hasCached) {
          dispatch(_this3.preferenceSuccessResponse({
            data: {
              settings: result.user.preferences
            }
          }));
        }
        return _util2.default.fetchComponent(basename + '/load/preferences', options)();
      }).then(function (response) {
        dispatch(_this3.preferenceSuccessResponse(response));
        return response;
      }, function (e) {
        if (!hasCached) dispatch(_this3.preferenceErrorResponse(e));
      });
    };
    return _util2.default.setCacheConfiguration(preferencesAction, 'user.preferences');
  },
  fetchNavigation: function fetchNavigation() {
    var _this4 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var navigationAction = function navigationAction(dispatch, getState) {
      dispatch(_this4.navigationRequest());
      var state = getState();
      var hasCached = void 0;
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      var headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = (0, _assign2.default)({}, options.headers, headers);
      //add ?refresh=true to fetch route below to reload navigtion configuration
      return _util2.default.loadCacheConfigurations().then(function (result) {
        hasCached = result.user && result.user.navigation;
        if (hasCached) {
          dispatch(_this4.navigationSuccessResponse({
            data: {
              settings: result.user.navigation
            }
          }));
        }
        return _util2.default.fetchComponent(basename + '/load/navigation' + (state.settings.ui.initialization.refresh_navigation ? '?refresh=true' : ''), options)();
      }).then(function (response) {
        dispatch(_this4.navigationSuccessResponse(response));
        return response;
      }, function (e) {
        if (!hasCached) dispatch(_this4.navigationErrorResponse(e));
      });
    };
    return _util2.default.setCacheConfiguration(navigationAction, 'user.navigation');
  },
  getUserProfile: function getUserProfile(jwt_token, responseFormatter) {
    var _this5 = this;

    return function (dispatch, getState) {
      var fetchResponse = void 0;
      var url = getState().settings.userprofile.url;
      dispatch(_this5.loginRequest(url));
      fetch(url, {
        method: getState().settings.userprofile.method || 'POST',
        headers: (0, _assign2.default)({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, getState().settings.userprofile.options.headers, {
          'x-access-token': jwt_token
        })
      }).then(checkStatus).then(function (response) {
        fetchResponse = response;
        if (responseFormatter) {
          var formatterPromise = responseFormatter(response);
          if (formatterPromise instanceof _promise2.default) {
            return formatterPromise;
          } else {
            throw new Error('responseFormatter must return a Promise');
          }
        } else {
          return response.json();
        }
      }).then(function (responseData) {
        dispatch(_this5.saveUserProfile(url, fetchResponse, responseData));
      }).catch(function (error) {
        dispatch(_notification2.default.errorNotification(error));
        dispatch(_this5.failedUserRequest(url, error));
      });
    };
  },
  enforceMFA: function enforceMFA(noRedirect, __returnURL) {
    var _this6 = this;

    // console.debug('enforceMFA', { noRedirect, __returnURL, __global__returnURL, });
    return function (dispatch, getState) {
      var state = getState();
      var extensionattributes = state.user.userdata ? state.user.userdata.extensionattributes : false;
      var queryparams = _querystring2.default.parse(window.location.search.charAt(0) === '?' ? window.location.search.substr(1, window.location.search.length) : window.location.search);
      var formReturnURL = !__global__returnURL && state && state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname && state.dynamic && state.dynamic.formdata && (state.dynamic.formdata.__loginReturnURL || state.dynamic.formdata.__loginLastURL) ? state.dynamic.formdata.__loginReturnURL || state.routing.locationBeforeTransitions.pathname : false;
      var returnUrl = !__global__returnURL && queryparams.return_url ? queryparams.return_url : __returnURL || __global__returnURL || formReturnURL || false;
      if (state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname && state.routing.locationBeforeTransitions.pathname === returnUrl) {
        returnUrl = false;
      }
      console.debug({ formReturnURL: formReturnURL, returnUrl: returnUrl });
      // console.log('state.settings.auth', state.settings.auth);
      // console.log('state.user.isMFAAuthenticated', state.user.isMFAAuthenticated);
      // console.log('state.manifest.containers[/mfa]', state.manifest.containers[ '/mfa' ]);
      // console.log('state.manifest.containers[${state.settings.adminPath}/mfa]', state.manifest.containers[ `${state.settings.adminPath}/mfa` ]);
      if (state.settings.auth.enforce_mfa || extensionattributes && extensionattributes.login_mfa) {
        if (state.user.isMFAAuthenticated) {
          if (!noRedirect) {
            if (state.user.isLoggedIn && returnUrl) dispatch((0, _reactRouterRedux.push)(returnUrl));else dispatch((0, _reactRouterRedux.push)(state.settings.auth.logged_in_homepage));
          }
          return true;
        } else {
          if (!state.manifest.containers || state.manifest.containers && !state.manifest.containers['/mfa'] && !state.manifest.containers[state.settings.adminPath + '/mfa']) {
            dispatch(_notification2.default.errorNotification(new Error('Multi-Factor Authentication not Properly Configured')));
            _this6.logoutUser()(dispatch, getState);
          } else {
            // console.log('utilities.getMFAPath(state)')
            var mfapath = _util2.default.getMFAPath(state);
            if (!returnUrl && window.location.href && window.location.href.indexOf(mfapath) === -1) {
              // console.debug({ returnUrl, mfapath, }, ' window.location.href', window.location.href);
              returnUrl = window.location.href;
            }
            __global__returnURL = returnUrl;
            // console.debug({ mfapath,returnUrl }, 'window.location.href', window.location.href);

            dispatch((0, _reactRouterRedux.push)('' + mfapath + (returnUrl ? '?return_url=' + returnUrl : '')));
          }
          return false;
        }
      } else {
        if (!noRedirect) {
          if (state.user.isLoggedIn && returnUrl) dispatch((0, _reactRouterRedux.push)(returnUrl));else dispatch((0, _reactRouterRedux.push)(state.settings.auth.logged_in_homepage));
        }
        if (state.user.isLoggedIn && returnUrl) dispatch((0, _reactRouterRedux.push)(returnUrl));
        if (state.notification.modals && state.notification.modals.length && state.notification.modals[0] && state.notification.modals[0].pathname && (state.notification.modals[0].pathname === '/signin' || state.notification.modals[0].pathname === '/login')) {
          dispatch(_notification2.default.hideModal('last'));
        }
        __global__returnURL = false;
        return true;
      }
    };
  },
  validateMFA: function validateMFA() {
    var _this7 = this;

    var formdata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': undefined
      },
      body: (0, _stringify2.default)(formdata)
    };
    return function (dispatch, getState) {
      var state = getState();
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      var headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      var options = (0, _assign2.default)({}, requestOptions);
      options.headers = (0, _assign2.default)({}, options.headers, { 'x-access-token': state.user.jwt_token });
      return _util2.default.fetchComponent(basename + '/load/mfa', options)().then(function (response) {
        if (response && response.data && response.data.authenticated) {
          dispatch(_this7.authenticatedMFA());
          return _serverSideReactNative.AsyncStorage.setItem(_constants2.default.user.MFA_AUTHENTICATED, true).then(function () {
            return response;
          }, function (e) {
            return _promise2.default.reject(e);
          });
        }
        return response;
      }).then(function (response) {
        if (response.result === 'error') dispatch(_notification2.default.errorNotification(new Error(response.data.error)));
        return _this7.enforceMFA()(dispatch, getState);
      }).catch(function (e) {
        dispatch(_notification2.default.errorNotification(e));
      });
    };
  },
  fetchConfigurations: function fetchConfigurations() {
    var _this8 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (dispatch, getState) {
      var state = getState();
      // console.log({ state, });
      if (state.manifest && state.manifest.authenticated && state.manifest.authenticated.hasLoaded || state.settings.user && state.settings.user.navigation && state.settings.user.navigation.hasLoaded || state.settings.user && state.settings.user.preferences && state.settings.user.preferences.hasLoaded) {
        var operations = [];
        if (!state.manifest || state.manifest && state.manifest.authenticated && !state.manifest.authenticated.hasLoaded) operations.push(_manifest2.default.fetchManifest(options)(dispatch, getState));
        if (!state.settings || state.settings && !state.settings.user) {
          operations.push(_this8.fetchNavigation(options)(dispatch, getState));
          operations.push(_this8.fetchPreferences(options)(dispatch, getState));
        } else {
          if (!state.settings.user.navigation || state.settings.user.navigation && !state.settings.user.navigation.hasLoaded) operations.push(_this8.fetchNavigation(options)(dispatch, getState));
          if (!state.settings.user.preferences || state.settings.user.preferences && !state.settings.user.preferences.hasLoaded) operations.push(_this8.fetchPreferences(options)(dispatch, getState));
        }
        return _promise2.default.all(operations);
      } else {
        dispatch(_this8.navigationRequest());
        dispatch(_this8.preferenceRequest());
        dispatch(_manifest2.default.manifestRequest());
        var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
        var headers = state.settings.userprofile.options.headers;
        delete headers.clientid_default;
        options.headers = (0, _assign2.default)({}, options.headers, headers);
        return _util2.default.loadCacheConfigurations().then(function (result) {
          if (result.user) {
            if (result.user.navigation) {
              dispatch(_this8.navigationSuccessResponse({
                data: {
                  settings: result.user.navigation
                }
              }));
            }
            if (result.user.preferences) {
              dispatch(_this8.preferenceSuccessResponse({
                data: {
                  settings: result.user.preferences
                }
              }));
            }
          }
          if (result.manifest && result.manifest.authenticated) dispatch(_manifest2.default.receivedManifestData(result.manifest.authenticated));
          return true;
        }).then(function () {
          //add ?refresh=true to fetch route below to reload configurations
          return _util2.default.setCacheConfiguration(function () {
            var refreshComponents = state.settings.ui.initialization.refresh_components;
            var params = refreshComponents ? '?refresh=true' : '';
            var configurationRoute = basename + '/load/configurations' + params;
            return _util2.default.fetchComponent(configurationRoute, options)().then(function (response) {
              if (response.result === 'error') return _promise2.default.reject(new Error(response.data.error));
              var responses = (0, _keys2.default)(response.data.settings).reduce(function (result, key) {
                var data = (0, _assign2.default)({}, response.data);
                data.settings = response.data.settings[key];
                result[key] = { data: data };
                return result;
              }, {});
              dispatch(_this8.navigationSuccessResponse(responses.navigation));
              dispatch(_this8.preferenceSuccessResponse(responses.preferences));
              dispatch(_manifest2.default.receivedManifestData(responses.manifest.data.settings));
              return {
                data: {
                  versions: response.data.versions,
                  settings: responses
                }
              };
            }).catch(function (e) {
              dispatch(_this8.navigationErrorResponse(e));
              dispatch(_this8.preferenceErrorResponse(e));
              dispatch(_manifest2.default.failedManifestRetrival(e));
            });
          }, {
            navigation: 'user.navigation',
            preferences: 'user.preferences',
            manifest: 'manifest.authenticated',
            unauthenticated_manifest: 'manifest.unauthenticated'
          }, { multi: true })();
        }).catch(function (e) {
          dispatch(_this8.navigationErrorResponse(e));
          dispatch(_this8.preferenceErrorResponse(e));
          dispatch(_manifest2.default.failedManifestRetrival(e));
        });
      }
    };
  },
  initializeAuthenticatedUser: function initializeAuthenticatedUser(token, ensureMFA, __returnURL) {
    var _this9 = this;

    // console.debug('initializeAuthenticatedUser', { token, ensureMFA, __returnURL, __global__returnURL, });
    // console.debug({ __returnURL });
    return function (dispatch, getState) {
      var requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      };
      var state = getState();
      if (state.manifest && state.manifest.authenticated && state.manifest.authenticated.hasLoaded && state.settings && state.settings.user && state.settings.user.navigation && state.settings.user.navigation.hasLoaded && state.settings.user.preferences && state.settings.user.preferences.hasLoaded) {
        if (initializationTimeout) {
          clearTimeout(initializationTimeout);
          initializationThrottle.destroyInactiveThrottle();
        }
        // console.debug('enforceMFA clearTimeout __returnURL', __returnURL);
        return ensureMFA !== false ? _this9.enforceMFA(undefined, __returnURL)(dispatch, getState) : undefined;
      } else {
        var assignThrottle = function assignThrottle(resolve, reject) {
          var throttle = function throttle() {
            initializationTimeout = setTimeout(function () {
              clearTimeout(initializationTimeout);
              // console.debug('throttled enforceMFA clearTimeout __returnURL', __returnURL);
              _this9.fetchConfigurations(requestOptions)(dispatch, getState).then(function () {
                return ensureMFA !== false ? _this9.enforceMFA(undefined, __returnURL)(dispatch, getState) : undefined;
              }).then(resolve).catch(reject);
            }, 10);
          };
          throttle.destroyInactiveThrottle = resolve;
          return throttle;
        };
        return new _promise2.default(function (resolve, reject) {
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
  loginUser: function loginUser(loginData, __returnURL) {
    var _this10 = this;

    // console.debug('loginUser', { loginData, __returnURL, });
    return function (dispatch, getState) {
      var fetchResponse = void 0;
      var cachedResponseData = void 0;
      var loginSettings = getState().settings.login;
      var notificationsSettings = getState().settings.ui.notifications;
      var url = loginSettings.url;

      dispatch(_this10.loginRequest(url));
      fetch(url, {
        method: loginSettings.method || 'POST',
        headers: (0, _assign2.default)({
          'Accept': 'application/json'
        }, loginSettings.options.headers, {
          username: loginData.username,
          password: loginData.password
        }),
        body: (0, _stringify2.default)({
          username: loginData.username,
          password: loginData.password
        })
      }).then(checkStatus).then(function (response) {
        return response.json();
      }).then(function (responseData) {
        cachedResponseData = responseData;
        // console.debug('loginData.__returnURL', loginData.__returnURL);
        __global__returnURL = loginData.__returnURL || __returnURL;
        return _promise2.default.all([_serverSideReactNative.AsyncStorage.setItem(_constants2.default.jwt_token.TOKEN_NAME, responseData.token), _serverSideReactNative.AsyncStorage.setItem(_constants2.default.jwt_token.TOKEN_DATA, (0, _stringify2.default)({
          expires: responseData.expires,
          timeout: responseData.timeout,
          token: responseData.token
        })), _serverSideReactNative.AsyncStorage.setItem(_constants2.default.jwt_token.PROFILE_JSON, (0, _stringify2.default)(responseData.user)), _this10.initializeAuthenticatedUser(responseData.token, false, __global__returnURL)(dispatch, getState)]);
      }).then(function () {
        dispatch(_this10.recievedLoginUser(url, fetchResponse, cachedResponseData));
        if (!notificationsSettings.hide_login_notification) {
          dispatch(_notification2.default.createNotification({ text: 'Welcome back', timeout: 4000, type: 'success' }));
        }
        return _this10.enforceMFA()(dispatch, getState);
      }).catch(function (error) {
        dispatch(_notification2.default.errorNotification(error));
        dispatch(_this10.failedUserRequest(url, error));
      });
    };
  }
};

exports.default = user;