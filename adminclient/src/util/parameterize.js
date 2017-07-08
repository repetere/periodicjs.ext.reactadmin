// import PathRegExp from 'path-to-regexp';
import querystring from 'querystring';
import { findMatchingRoutePath, getParameterizedPath, } from '../../../utility/find_matching_route';

export const getParameterized = getParameterizedPath;

/**
 * Converts a route into a path regexp and returns an array of params indexed by order of appearance
 * @param  {string} route    The route that should be converted into a regexp
 * @param  {string} location Url path that should have params pulled out of it
 * @return {string[]} parameterized values from location string
 */
export const parameterize = function (route, location) {
  // console.debug({ route, location });
  let regexp = getParameterized(route);
  let params = regexp.re.exec(location);
  if (params.length > 1 && Array.isArray(regexp.keys)) {
    params = params.slice(1);
    return regexp.keys.reduce((result, param, index) => {
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
export const setParameters = function (options = {}) {
  let params = (options.params && Array.isArray(options.params)) ? options.params : parameterize(options.route, options.location);
  let pkeys = Object.keys(params);
  for (let i = 0; i < pkeys.length; i++) {
    options.resource = options.resource.replace(new RegExp(`:${ pkeys[i] }`), params[pkeys[i]]);
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
export const findMatchingRoute = findMatchingRoutePath;
