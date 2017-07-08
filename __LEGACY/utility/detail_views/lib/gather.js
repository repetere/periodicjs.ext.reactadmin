'use strict';
const mongoose = require('mongoose');

module.exports = function gatherDefinitions (connection) {
	let schemas = connection.modelSchemas;
	return Object.keys(schemas).reduce((result, key) => {
		result[key.toLowerCase()] = schemas[key].obj;
		return result;
	}, {});
};