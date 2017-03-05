'use strict';
const components = require('./components');
const pluralize = require('pluralize');

module.exports = function buildManifest (schemas, options = {}) {
	options.allSchemas = schemas;
	return Object.keys(schemas).reduce((result, key) => {
		result[
			(typeof options.prefix === 'string')
			? `/${options.prefix}/${pluralize(key)}`
			: `/${pluralize(key)}`
		] = components.constructIndex(schemas[ key ], key, options);
		result[
			(typeof options.prefix === 'string')
				? `/${options.prefix}/${pluralize(key)}/:id`
				: `/${pluralize(key)}/:id`
		] = components.constructDetail(schemas[ key ], key, options);
		return result;
	}, {});
};
