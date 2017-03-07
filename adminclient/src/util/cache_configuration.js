import { AsyncStorage, } from 'react-native';
import constants from '../constants';
import semver from 'semver';
import str2json from 'string-to-json';

var handleConfigurationAssigment = function (original, update) {
	if (original && typeof original.version === 'string' && semver.lt(original.version, update.version)) {
		original = Object.assign({}, update);
	} else if (!original || (original && typeof original.version !== 'string')) {
		original = Object.assign({}, update);
	}
	return original;
};

var handleConfigurationVersioning = function (data, type, multi) {
	let configuration;
	try {
		configuration = JSON.parse(data.configuration) || {};
	} catch (e) {
		configuration = {};
	}
	if (multi === true) {
		return str2json.convert(Object.keys(data.settings).reduce((result, key) => {
			result[key] = handleConfigurationAssigment(result[key], data.settings[key]);
			return result;
		}, configuration));
	} else {
		configuration[type] = handleConfigurationAssigment(configuration[type], data.settings);
		return str2json.convert(configuration);
	}
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
							return { settings: settings, configuration: _result };
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
