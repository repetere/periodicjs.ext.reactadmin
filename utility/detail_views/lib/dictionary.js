'use strict';
const mongoose = require('mongoose');
const DEFAULT_TYPES = [{
	mongoose: String,
	input: 'text'
}, {
	mongoose: Number,
	input: 'number'
}, {
	mongoose: Date,
	input: 'date'
}, {
	mongoose: Boolean,
	input: 'boolean'
}, {
	mongoose: mongoose.Schema.ObjectId,
	input: 'id'
}, {
	mongoose: Array,
	input: 'array'
}];

module.exports = (function () {
	let dictionary = {};
	DEFAULT_TYPES.forEach(type => {
		Object.defineProperty(dictionary, Symbol.for(type.mongoose), {
			value: type.input,
			writable: false,
			configurable: false
		});
	});
	return dictionary;
})();