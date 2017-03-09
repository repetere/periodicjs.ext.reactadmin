'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findMatchingRoute = exports.setParameters = exports.parameterize = exports.getParameterized = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROUTE_MAP = new _map2.default();

/**
 * Generates a express style regexp for a given route and stores in a Map
 * @param  {string} route The route that should be converted into a regexp
 * @return {Object}       Returns an object with param keys and a path regexp
 */
var getParameterized = exports.getParameterized = function getParameterized(route) {
	if (ROUTE_MAP.has(route)) return ROUTE_MAP.get(route);else {
		var keys = [];
		var result = new _pathToRegexp2.default(route, keys);
		ROUTE_MAP.set(route, {
			re: result,
			keys: keys
		});
		return { keys: keys, re: result };
	}
};

/**
 * Converts a route into a path regexp and returns an array of params indexed by order of appearance
 * @param  {string} route    The route that should be converted into a regexp
 * @param  {string} location Url path that should have params pulled out of it
 * @return {string[]} parameterized values from location string
 */
var parameterize = exports.parameterize = function parameterize(route, location) {
	var regexp = getParameterized(route);
	var params = regexp.re.exec(location);
	if (params.length > 1 && Array.isArray(regexp.keys)) {
		params = params.slice(1);
		return regexp.keys.reduce(function (result, param, index) {
			param = param.name;
			result[param] = params[index];
			return result;
		}, {});
	}
	return [];
};

/**
 * Sets params from location string to a file path that expects params
 * @param {Object} options Configurable options
 * @param {string[]} [options.params] If params are already parsed they can be passed into function and paramterization will be skipped
 * @param {string} options.route A dynamic route from manifest
 * @param {string} options.location The window location
 * @param {string} options.resource The resource loader path. Params will be assigned to resource path if a matching param is found
 * @param {Object|string} [options.query] Query params that should be assigned to the resource route. These are assigned regardless of whether matching params are assigned
 * @return {string} The compiled resource route
 */
var setParameters = exports.setParameters = function setParameters() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var params = options.params && Array.isArray(options.params) ? options.params : parameterize(options.route, options.location);
	var pkeys = (0, _keys2.default)(params);
	for (var i = 0; i < pkeys.length; i++) {
		options.resource = options.resource.replace(new RegExp(':' + pkeys[i]), params[pkeys[i]]);
	}
	if (options.query && (0, _typeof3.default)(options.query) === 'object') options.resource += '?' + _querystring2.default.stringify(options.query);else if (typeof options.query === 'string') options.resource += '' + (/^\?/.test(options.query) ? '' : '?') + options.query;
	return options.resource;
};

/**
 * Finds a matching dynamic route from manifest
 * @param  {Object} routes   The manifest configuration object
 * @param  {string} location The window location that should be resolved
 * @return {string}          A matching dynamic route
 */
var findMatchingRoute = exports.findMatchingRoute = function findMatchingRoute(routes, location) {
	var matching = void 0;
	location = /\?[^\s]+$/.test(location) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
	(0, _keys2.default)(routes).forEach(function (key) {
		var result = getParameterized(key);
		if (result.re.test(location) && !matching) matching = key;
	});
	return matching;
};