'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushCacheConfiguration = exports.getCacheConfiguration = exports.loadCacheConfigurations = exports.setCacheConfiguration = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _serverSideReactNative = require('./server-side-react-native');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _stringToJson = require('string-to-json');

var _stringToJson2 = _interopRequireDefault(_stringToJson);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var settleVersioning = function (original, update) {
//   if (!original.versions) return true;
//   if (typeof original.versions.theme !== 'string' || typeof original.versions.reactadmin !== 'string') return true;
//   if (!update.versions) return true;
//   let themeOutofDate = (typeof update.versions.theme === 'string') ? semver.lt(original.versions.theme, update.versions.theme) : false;
//   let reactadminOutofDate = (typeof update.versions.reactadmin === 'string') ? semver.lt(original.versions.reactadmin, update.versions.reactadmin) : false;
//   return (themeOutofDate || reactadminOutofDate);
// };

// var handleConfigurationAssigment = function (original, update) {
//   if (original && settleVersioning(original, update)) {
//     original = Object.assign({}, update);
//   } else if (!original) {
//     original = Object.assign({}, update);
//   }
//   return original;
// };

// var handleConfigurationVersioning = function (data, type, options = {}) {
//   if (!type) throw new Error('Configurations must have a specified type');
//   let configuration;
//   try {
//     configuration = JSON.parse(data.configuration) || {};
//   } catch (e) {
//     configuration = {};
//   }
//   configuration = flatten(configuration || {}, { safe: true, maxDepth: options.depth || 2, });
//   if (options.multi === true) {
//     if (typeof type === 'string') {
//       configuration[type] = Object.keys(data).reduce((result, key) => {
//         result[key] = handleConfigurationAssigment(result[key], Object.assign(data[key].data.settings, { versions: data.versions, }));
//         return result;
//       }, configuration[type] || {});
//     } else if (type && typeof type === 'object') {
//       configuration = Object.keys(data).reduce((result, key) => {
//         if (type[key]) result[type[key]] = handleConfigurationAssigment(result[type[key]], Object.assign(data[key].data.settings, { versions: data.versions, }));
//         return result;
//       }, configuration || {});
//     }
//   } else {
//     configuration[type] = handleConfigurationAssigment(configuration[type], Object.assign(data.settings, { versions: data.versions, }));
//   }
//   return str2json.convert(configuration);
// };

// import semver from 'semver';
var setCacheConfiguration = exports.setCacheConfiguration = function setCacheConfiguration(fn, type) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function () {
    var invoked = fn.apply(undefined, arguments);
    // if (invoked && typeof invoked.then === 'function' && typeof invoked.catch === 'function') {
    //   return invoked
    //     .then(result => {
    //       let settings = result.data.settings;
    //       return AsyncStorage.getItem(constants.cache.CONFIGURATION_CACHE)
    //         .then(_result => {
    //           _result = { configuration: _result, versions: result.data.versions, };
    //           if (options.multi) return Object.assign(_result, settings);
    //           return Object.assign(_result, { settings: settings, });
    //         }, e => Promise.reject(e));
    //     })
    //     .then(result => handleConfigurationVersioning(result, type, options))
    //     .then(result => {
    //       // console.log({ type, result, });
    //       return AsyncStorage.setItem(constants.cache.CONFIGURATION_CACHE, JSON.stringify(result))
    //         .then(() => result, e => Promise.reject(e));
    //     })
    //     .catch(e => Promise.reject(e));
    // }
    return invoked;
  };
};

var loadCacheConfigurations = exports.loadCacheConfigurations = function loadCacheConfigurations() {
  return _serverSideReactNative.AsyncStorage.getItem(_constants2.default.cache.CONFIGURATION_CACHE).then(function (result) {
    try {
      return JSON.parse(result) || {};
    } catch (e) {
      return {};
    }
  }).catch(function (e) {
    return _promise2.default.reject(e);
  });
};

var getCacheConfiguration = exports.getCacheConfiguration = function getCacheConfiguration() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    return _serverSideReactNative.AsyncStorage.getItem(_constants2.default.cache.CONFIGURATION_CACHE).then(function (result) {
      try {
        return JSON.parse(result) || {};
      } catch (e) {
        return {};
      }
    }).then(function (result) {
      if (result.manifest) {
        if (result.manifest.authenticated && actions.manifest && actions.manifest.receivedManifestData) dispatch(actions.manifest.receivedManifestData(result.manifest.authenticated));
        if (result.manifest.unauthenticated && actions.manifest && actions.manifest.unauthenticatedReceivedManifestData) dispatch(actions.manifest.unauthenticatedReceivedManifestData(result.manifest.unauthenticated));
      }
      if (result.user) {
        if (result.user.preferences && actions.user && actions.user.preferenceSuccessResponse) {
          dispatch(actions.user.preferenceSuccessResponse({
            data: {
              settings: result.user.preferences
            }
          }));
        }
        if (result.user.navigation && actions.user && actions.user.navigationSuccessResponse) {
          dispatch(actions.user.navigationSuccessResponse({
            data: {
              settings: result.user.navigation
            }
          }));
        }
      }
      if (result.components) {
        if (result.components.login && actions.components && actions.components.setLoginComponent) {
          dispatch(actions.components.setLoginComponent({
            data: {
              settings: result.components.login
            }
          }));
        }
        if (result.components.error && actions.components && actions.components.setErrorComponent) {
          dispatch(actions.components.setErrorComponent({
            data: {
              settings: result.components.error
            }
          }));
        }
        if (result.components.main && actions.components && actions.components.setMainComponent) {
          dispatch(actions.components.setMainComponent({
            data: {
              settings: result.components.main
            }
          }));
        }
      }
    }).catch(function (e) {
      return _promise2.default.reject(e);
    });
  };
};

var flushCacheConfiguration = exports.flushCacheConfiguration = function flushCacheConfiguration(toRemove) {
  if (!toRemove) return _serverSideReactNative.AsyncStorage.removeItem(_constants2.default.cache.CONFIGURATION_CACHE);
  return _serverSideReactNative.AsyncStorage.getItem(_constants2.default.cache.CONFIGURATION_CACHE).then(function (result) {
    try {
      return (0, _flat2.default)(JSON.parse(result), { safe: true, maxDepth: 2 }) || {};
    } catch (e) {
      return {};
    }
  }).then(function (result) {
    if (typeof toRemove === 'string' && result[toRemove]) delete result[toRemove];else if (toRemove && (typeof toRemove === 'undefined' ? 'undefined' : (0, _typeof3.default)(toRemove)) === 'object') {
      (0, _keys2.default)(toRemove).forEach(function (key) {
        if (result[toRemove[key]]) delete result[toRemove[key]];
      });
    }
    return _serverSideReactNative.AsyncStorage.setItem(_constants2.default.cache.CONFIGURATION_CACHE, (0, _stringify2.default)(_stringToJson2.default.convert(result)));
  }).catch(function (e) {
    return _promise2.default.reject(e);
  });
};