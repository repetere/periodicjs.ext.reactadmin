'use strict';

const PathRegExp = require('path-to-regexp');
const ssr_manifest = require('./ssr_manifest');
const reloader = require('./reloader');
const ROUTE_MAP = new Map();

const getParameterized = function (route) {
  if (ROUTE_MAP.has(route)) return ROUTE_MAP.get(route);
  else {
    let keys = [];
    let result = new PathRegExp(route, keys);
    ROUTE_MAP.set(route, {
      re: result,
      keys,
    });
    return { keys, re: result, };
  }
};

const findMatchingRoute = function (routes, location) {
  let matching;
  location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
  Object.keys(routes).forEach(key => {
    let result = getParameterized(key);
    if (result.re.test(location) && !matching) matching = key;
  });
  return matching;
};

module.exports = function (resources){
  const generateDetailManifests = require('./detail_views/index').generateManifest;
  // const geolocation = require('./geolocation')(resources);
  return {
    generateDetailManifests,
    findMatchingRoute,
    getParameterized,
    ssr_manifest,
    reloader,
  };
};