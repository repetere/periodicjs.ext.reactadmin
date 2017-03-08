'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAuth = exports.isLoggedIn = undefined;

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