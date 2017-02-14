import PathRegExp from 'path-to-regexp';
import querystring from 'querystring';

const ROUTE_MAP = new Map();

/**
 * Generates a express style regexp for a given route and stores in a Map
 * @param  {string} route The route that should be converted into a regexp
 * @return {Object}       Returns an object with param keys and a path regexp
 */
export const getParameterized = function (route) {
	if (ROUTE_MAP.has(route)) return ROUTE_MAP.get(route);
	else {
		let keys = []
		let result = new PathRegExp(route, keys);
		ROUTE_MAP.set(route, {
			re: result,
			keys,
		});
		return { keys, re: result };
	}
};

/**
 * Converts a route into a path regexp and returns an array of params indexed by order of appearance
 * @param  {string} route    The route that should be converted into a regexp
 * @param  {string} location Url path that should have params pulled out of it
 * @return {string[]} parameterized values from location string
 */
export const parameterize = function (route, location) {
	let regexp = getParameterized(route);
	let params = regexp.re.exec(location);
	if (params.length > 1 && Array.isArray(regexp.keys)) {
		params = params.slice(1);
		console.log({ params });
		return regexp.keys.reduce((result, param, index) => {
			param = param.name;
			result[index] = param;
			return result;
		}, []);
	}
	return [];
};

/**
 * Sets params from location string to a file path that expects params
 * @param {Object} options Configurable options
 * @param {string[]} [options.param] If params are already parsed they can be passd into function and paramterization will be skipped
 * @param {string} options.route A dynamic route from manifest
 * @param {string} options.location The window location
 * @param {string} options.resource The resource loader path. Params will be assigned to resource path if a matching param is found
 * @param {Object|string} [options.query] Query params that should be assigned to the resource route. These are assigned regardless of whether matching params are assigned
 * @return {string} The compiled resource route
 */
export const setParameters = function (options = {}) {
	let params = (options.params && Array.isArray(options.params)) ? options.params : parameterize(options.route, options.location);
	let compiled = ROUTE_MAP.get(options.route).re.exec(options.location);
	compiled = compiled.slice(1);
	for (let i = 0; i < params.length; i++) {
		options.resource = options.resource.replace(new RegExp(`:${ params[i] }`), compiled[i]);
	}
	if (options.query && typeof options.query === 'object') options.resource += `?${ querystring.stringify(options.query) }`;
	else if (typeof options.query === 'string') options.resource += `${ /^\?/.test(options.query) ? '' : '?' }${ options.query }`;
	return options.resource;
};

/**
 * Finds a matching dynamic route from manifest
 * @param  {Object} routes   The manifest configuration object
 * @param  {string} location The window location that should be resolved
 * @return {string}          A matching dynamic route
 */
export const findMatchingRoute = function (routes, location) {
	let matching;
	location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?])\?[^\s]+$/, '$1') : location;
	Object.keys(routes).forEach(key => {
		let result = getParameterized(key);
		if (result.re.test(location) && !matching) matching = key;
	});
	return matching;
};
