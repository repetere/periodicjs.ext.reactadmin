'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sortObject = exports.traverse = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var traverse = exports.traverse = function traverse(paths, data) {
	var keys = (0, _keys2.default)(paths);
	if (!keys.length) return paths;
	return keys.reduce(function (result, key) {
		if (typeof paths[key] === 'string') result[key] = data[paths[key]];else if (Array.isArray(paths[key])) {
			var _path = (0, _assign2.default)([], paths[key]);
			var value = data;
			while (_path.length && value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
				var prop = _path.shift();
				value = value[prop];
			}
			result[key] = _path.length ? undefined : value;
		} else throw new TypeError('asyncprop paths must be a string or an array of strings or numeric indexes');
		return result;
	}, {});
};

/**
 * custom object sort by field
 * @example
 * 			req.controllerData.searchdocuments = searchdocuments.sort(CoreUtilities.sortObject('desc', 'createdat'));
 * @param  {string} dir   either asc or desc
 * @param  {string} field object property to seach
 * @return {function}  object sort compare function
 */
var sortObject = exports.sortObject = function sortObject(dir, field) {
	var comparefunction;
	if (dir === 'desc') {
		comparefunction = function comparefunction(a, b) {
			if (a[field] < b[field]) {
				return 1;
			}
			if (a[field] > b[field]) {
				return -1;
			}
			return 0;
		};
	} else {
		comparefunction = function comparefunction(a, b) {
			if (a[field] < b[field]) {
				return -1;
			}
			if (a[field] > b[field]) {
				return 1;
			}
			return 0;
		};
	}

	return comparefunction;
};