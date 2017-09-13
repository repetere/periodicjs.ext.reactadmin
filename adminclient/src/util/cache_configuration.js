import { AsyncStorage, } from 'react-native';
import constants from '../constants';
import semver from 'semver';
import str2json from 'string-to-json';
import flatten from 'flat';

var settleVersioning = function (original, update) {
  if (!original.versions) return true;
  if (typeof original.versions.theme !== 'string' || typeof original.versions.reactadmin !== 'string') return true;
  if (!update.versions) return true;
  let themeOutofDate = (typeof update.versions.theme === 'string') ? semver.lt(original.versions.theme, update.versions.theme) : false;
  let reactadminOutofDate = (typeof update.versions.reactadmin === 'string') ? semver.lt(original.versions.reactadmin, update.versions.reactadmin) : false;
  return (themeOutofDate || reactadminOutofDate);
};

var handleConfigurationAssigment = function (original, update) {
  if (original && settleVersioning(original, update)) {
    original = Object.assign({}, update);
  } else if (!original) {
    original = Object.assign({}, update);
  }
  return original;
};

var handleConfigurationVersioning = function (data, type, options = {}) {
  if (!type) throw new Error('Configurations must have a specified type');
  let configuration;
  try {
    configuration = JSON.parse(data.configuration) || {};
  } catch (e) {
    configuration = {};
  }
  configuration = flatten(configuration || {}, { safe: true, maxDepth: options.depth || 2, });
  if (options.multi === true) {
    if (typeof type === 'string') {
      configuration[type] = Object.keys(data).reduce((result, key) => {
        result[key] = handleConfigurationAssigment(result[key], Object.assign(data[key].data.settings, { versions: data.versions, }));
        return result;
      }, configuration[type] || {});
    } else if (type && typeof type === 'object') {
      configuration = Object.keys(data).reduce((result, key) => {
        if (type[key]) result[type[key]] = handleConfigurationAssigment(result[type[key]], Object.assign(data[key].data.settings, { versions: data.versions, }));
        return result;
      }, configuration || {});
    }
  } else {
    configuration[type] = handleConfigurationAssigment(configuration[type], Object.assign(data.settings, { versions: data.versions, }));
  }
  return str2json.convert(configuration);
};

export const setCacheConfiguration = function (fn, type, options = {}) {
  return function () {
    let invoked = fn(...arguments);
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

export const loadCacheConfigurations = function () {
  return AsyncStorage.getItem(constants.cache.CONFIGURATION_CACHE)
    .then(result => {
      try {
        return JSON.parse(result) || {};
      } catch (e) {
        return {};
      }
    })
    .catch(e => Promise.reject(e));
};


export const getCacheConfiguration = function (actions = {}) {
  return function (dispatch) {
    return AsyncStorage.getItem(constants.cache.CONFIGURATION_CACHE)
      .then(result => {
        try {
          return JSON.parse(result) || {};
        } catch (e) {
          return {};
        }
      })
      .then(result => {
        if (result.manifest) {
          if (result.manifest.authenticated && actions.manifest && actions.manifest.receivedManifestData) dispatch(actions.manifest.receivedManifestData(result.manifest.authenticated));
          if (result.manifest.unauthenticated && actions.manifest && actions.manifest.unauthenticatedReceivedManifestData) dispatch(actions.manifest.unauthenticatedReceivedManifestData(result.manifest.unauthenticated)); 
        }
        if (result.user) {
          if (result.user.preferences && actions.user && actions.user.preferenceSuccessResponse) {
            dispatch(actions.user.preferenceSuccessResponse({
              data: {
                settings: result.user.preferences,
              },
            }));
          }
          if (result.user.navigation && actions.user && actions.user.navigationSuccessResponse) {
            dispatch(actions.user.navigationSuccessResponse({
              data: {
                settings: result.user.navigation,
              },
            }));
          }
        }
        if (result.components) {
          if (result.components.login && actions.components && actions.components.setLoginComponent) {
            dispatch(actions.components.setLoginComponent({
              data: {
                settings: result.components.login,
              },
            }));
          }
          if (result.components.error && actions.components && actions.components.setErrorComponent) {
            dispatch(actions.components.setErrorComponent({
              data: {
                settings: result.components.error,
              },
            }));
          }
          if (result.components.main && actions.components && actions.components.setMainComponent) {
            dispatch(actions.components.setMainComponent({
              data: {
                settings: result.components.main,
              },
            }));
          }
        }
      })
      .catch(e => Promise.reject(e));
  };
};

export const flushCacheConfiguration = function (toRemove) {
  if (!toRemove) return AsyncStorage.removeItem(constants.cache.CONFIGURATION_CACHE);
  return AsyncStorage.getItem(constants.cache.CONFIGURATION_CACHE)
    .then(result => {
      try {
        return flatten(JSON.parse(result), { safe: true, maxDepth: 2, }) || {};
      } catch (e) {
        return {};
      }
    })
    .then(result => {
      if (typeof toRemove === 'string' && result[toRemove]) delete result[toRemove];
      else if (toRemove && typeof toRemove === 'object') {
        Object.keys(toRemove).forEach(key => {
          if (result[toRemove[key]]) delete result[toRemove[key]];
        });
      }
      return AsyncStorage.setItem(constants.cache.CONFIGURATION_CACHE, JSON.stringify(str2json.convert(result)));
    })
    .catch(e => Promise.reject(e));
};
