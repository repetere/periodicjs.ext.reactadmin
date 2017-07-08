'use strict';
const components = require('./components');
const pluralize = require('pluralize');
const helpers = require('./helpers');

module.exports = function buildManifest (schemas, options = {}) {
  options.allSchemas = schemas;
  // console.log({ schemas });
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix, options.dbname);
  return Object.keys(schemas).reduce((result, key) => {
    result[`${manifestPrefix}/${pluralize(key)}`] = components.constructIndex(schemas[ key ], key, options);
    result[`${manifestPrefix}/${pluralize(key)}/new`] = components.constructDetail(schemas[ key ], key, options, true);
    result[`${manifestPrefix}/${pluralize(key)}/:id`] = components.constructDetail(schemas[ key ], key, options);
    return result;
  }, {});
};
