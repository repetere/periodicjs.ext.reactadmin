'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMFASetupPath = exports.getMFAPath = exports.requireAuth = exports.isLoggedIn = undefined;

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isLoggedIn = exports.isLoggedIn = function isLoggedIn() {
  return typeof window !== 'undefined' && !!window.localStorage[_constants2.default.jwt_token.TOKEN_NAME];
};

var requireAuth = exports.requireAuth = function requireAuth(nextState, replaceState) {
  // console.log({ nextState, replaceState });
  // console.log("nextState.location.pathname.indexOf('p-admin')!==-1",nextState.location.pathname.indexOf('p-admin')!==-1)
  if (!isLoggedIn()) {
    replaceState({
      pathname: nextState.location.pathname.indexOf('p-admin') !== -1 ? '/p-admin/login?return_url=' + nextState.location.pathname : '/login?return_url=' + nextState.location.pathname,
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};

var getMFAPath = exports.getMFAPath = function getMFAPath(state) {
  var mfapath = state.manifest.containers[state.settings.adminPath + '/mfa'] ? state.settings.adminPath + '/mfa' : '/mfa';
  // console.log({ mfapath });
  return mfapath;
};

var getMFASetupPath = exports.getMFASetupPath = function getMFASetupPath(state) {
  var mfasetuppath = state.manifest.containers[state.settings.adminPath + '/auth/login-otp-setup'] ? state.settings.adminPath + '/auth/login-otp-setup' : '/auth/login-otp-setup';
  // console.log({ mfasetuppath });
  return mfasetuppath;
};