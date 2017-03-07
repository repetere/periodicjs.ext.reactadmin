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

var handleConfigurationVersioning = function (data, type, multi) {
	if (!type) throw new Error('Configurations must have a specified type');
	let configuration;
	try {
		configuration = JSON.parse(data.configuration) || {};
	} catch (e) {
		configuration = {};
	}
	if (multi === true) {
		if (typeof type === 'string') {
			configuration[type] = Object.keys(data).reduce((result, key) => {
				result[key] = handleConfigurationAssigment(result[key], Object.assign(data[key].data.settings, { versions: data.versions }));
				return result;
			}, configuration[type] || {});
		} else if (type && typeof type === 'object') {
			configuration = Object.keys(data).reduce((result, key) => {
				if (type[key]) result[type[key]] = handleConfigurationAssigment(result[type[key]], Object.assign(data[key].data.settings, { versions: data.versions }));
				return result;
			}, flatten(configuration || {}, { safe: true }));
		}
	} else {
		configuration[type] = handleConfigurationAssigment(configuration[type], Object.assign(data.settings, { versions: data.versions }));
	}
	return str2json.convert(configuration);
};

export const setCacheConfiguration = function (fn, type, multi = false) {
	return function () {
		let invoked = fn(...arguments);
		if (invoked && typeof invoked.then === 'function' && typeof invoked.catch === 'function') {
			return invoked
				.then(result => {
					let settings = result.data.settings;
					return AsyncStorage.getItem(constants.cache.CONFIGURATION_CACHE)
						.then(_result => {
							_result = { configuration: _result, versions: result.data.versions };
							if (multi) return Object.assign(_result, settings);
							return Object.assign(_result, { settings: settings });
						}, e => Promise.reject(e));
				})
				.then(result => handleConfigurationVersioning(result, type, multi))
				.then(result => {
					return AsyncStorage.setItem(constants.cache.CONFIGURATION_CACHE, JSON.stringify(result))
						.then(() => result, e => Promise.reject(e));
				})
				.catch(e => Promise.reject(e));
		}
		return invoked;
	};
};

export const getCacheConfiguration = function () {
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

export const flushCacheConfiguration = function () {
	return AsyncStorage.removeItem(constants.cache.CONFIGURATION_CACHE);
};
