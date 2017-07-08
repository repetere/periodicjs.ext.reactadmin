'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Immutable from 'immutable';

var initialState = {
  isFetching: false,
  updatedAt: new Date(),
  loginURL: null,
  isLoggedIn: false,
  userdata: false,
  username: null,
  email: null,
  firstname: null,
  lastname: null,
  profile_image_preview: null,
  jwt_token: null,
  jwt_token_expires: null,
  jwt_token_timeout: null,
  error: null,
  isMFAAuthenticated: false
};

var userReducer = function userReducer(state, action) {
  switch (action.type) {
    case _constants2.default.user.LOGOUT_FAILURE:
      var logoutFailurePayload = action.payload;
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        error: logoutFailurePayload.error,
        timestamp: logoutFailurePayload.timestamp,
        updatedAt: logoutFailurePayload.updatedAt
      });
    case _constants2.default.user.LOGOUT_SUCCESS:
      var logoutSuccessPayload = action.payload;
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        isLoggedIn: false,
        error: null,
        email: null,
        firstname: null,
        lastname: null,
        profile_image_preview: null,
        jwt_token: null,
        jwt_token_expires: null,
        jwt_token_timeout: null,
        userdata: false,
        timestamp: logoutSuccessPayload.timestamp,
        updatedAt: logoutSuccessPayload.updatedAt
      });
    case _constants2.default.user.LOGIN_DATA_REQUEST:
      // var requestPayload = action.payload;
      return (0, _assign2.default)({}, state, {
        isFetching: true,
        loginURL: action.payload.url,
        updatedAt: new Date()
      });
    case _constants2.default.user.UPDATE_PROFILE_SUCCESS:
      var profilePayload = action.payload;
      if (profilePayload.profile.userdata && profilePayload.profile.userdata.password) {
        delete profilePayload.profile.userdata.password;
      }
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        // userdata: profilePayload.profile.userdata,
        // username: profilePayload.profile.username,
        // email: profilePayload.profile.email,
        // firstname: profilePayload.profile.firstname,
        // lastname: profilePayload.profile.lastname,
        // profile_image_preview: profilePayload.profile.profile_image_preview,
        updatedAt: new Date()
      }, profilePayload.profile);
    case _constants2.default.user.LOGIN_DATA_SUCCESS:
      var loginSuccessPayload = action.payload;
      if (loginSuccessPayload.json && loginSuccessPayload.json.user && loginSuccessPayload.json.user.password) {
        delete loginSuccessPayload.json.user.password;
      }
      return {
        isFetching: false,
        loginURL: loginSuccessPayload.url,
        isLoggedIn: true,
        error: null,
        email: loginSuccessPayload.json.user.email,
        firstname: loginSuccessPayload.json.user.firstname,
        lastname: loginSuccessPayload.json.user.lastname,
        profile_image_preview: loginSuccessPayload.json.user.primaryasset && loginSuccessPayload.json.user.primaryasset.attributes ? loginSuccessPayload.json.user.primaryasset.attributes.location : null,
        jwt_token: loginSuccessPayload.json.token,
        jwt_token_expires: loginSuccessPayload.json.expires,
        jwt_token_timeout: loginSuccessPayload.json.timeout,
        userdata: loginSuccessPayload.json.user,
        updatedAt: loginSuccessPayload.updatedAt
      };
    case _constants2.default.user.SAVE_DATA_SUCCESS:
      var successPayload = action.payload;
      if (successPayload.json && successPayload.json.user && successPayload.json.user.password) {
        delete successPayload.json.user.password;
      }
      return {
        isFetching: false,
        loginURL: successPayload.url,
        isLoggedIn: true,
        error: null,
        email: successPayload.json.user.email,
        firstname: successPayload.json.user.firstname,
        lastname: successPayload.json.user.lastname,
        profile_image_preview: successPayload.json.user.primaryasset && successPayload.json.user.primaryasset.attributes ? successPayload.json.user.primaryasset.attributes.location : null,
        jwt_token: successPayload.json.token,
        jwt_token_expires: successPayload.json.expires,
        jwt_token_timeout: successPayload.json.timeout,
        userdata: successPayload.json.user,
        updatedAt: successPayload.updatedAt,
        isMFAAuthenticated: typeof successPayload.json.isMFAAuthenticated === 'boolean' ? successPayload.json.isMFAAuthenticated : state.isMFAAuthenticated
      };
    case _constants2.default.user.USER_DATA_FAILURE:
      var failurePayload = action.payload;
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        loginURL: failurePayload.url,
        error: failurePayload.error,
        updatedAt: new Date()
      });
    case _constants2.default.user.MFA_AUTHENTICATED:
      return (0, _assign2.default)({}, state, action.payload);
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = userReducer;