'use strict';
const PathRegExp = require('path-to-regexp');
// const ROUTE_MAP = new Map();
const ROUTE_MAP = {};

/**
 * Generates a express style regexp for a given route and stores in a Map
 * @param  {string} route The route that should be converted into a regexp
 * @return {Object}       Returns an object with param keys and a path regexp
 */
const getParameterizedPath = function (route) {
  if (ROUTE_MAP[route]) {
    return ROUTE_MAP[route];
  } else {
    var keys = [];
    var result = new PathRegExp(route, keys);
    // console.log({ route, }, {
    //   re: result,
    //   keys,
    // });
    ROUTE_MAP[route] = {
      re: result,
      keys: keys,
    };
    return { keys:keys, re: result, };
  }
};


/**
 * Finds a matching dynamic route from manifest
 * @param  {Object} routes   The manifest configuration object
 * @param  {string} location The window location that should be resolved
 * @return {string}          A matching dynamic route
 */
const findMatchingRoutePath = function (routes, location) {
  var matching;
  location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
  Object.keys(routes).forEach(function(key){
    var result = getParameterizedPath(key);
    if (result.re.test(location) && !matching) matching = key;
  });
  // console.log({ routes, location, matching, });
  return matching;
};

module.exports = {
  getParameterizedPath:getParameterizedPath,
  findMatchingRoutePath:findMatchingRoutePath,
};
// exports.getParameterizedPath = getParameterizedPath;
// exports.findMatchingRoutePath = findMatchingRoutePath;
