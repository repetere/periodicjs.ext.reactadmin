'use strict';

const mongoose = require('mongoose');
const DEFAULT_TYPES = [{
  mongoose: String,
  input: 'text',
}, {
  mongoose: Number,
  input: 'number',
}, {
  mongoose: Date,
  input: 'text',
	// input: 'datetime-local'
}, {
  mongoose: Boolean,
  input: 'boolean',
}, {
  mongoose: mongoose.Schema.ObjectId,
  input: '_id',
}, {
  mongoose: Array,
  input: 'array',
}, ];

module.exports = (function () {
  let dictionary = {};
  DEFAULT_TYPES.forEach(type => {
    Object.defineProperty(dictionary, Symbol.for(type.mongoose), {
      value: type.input,
      writable: false,
      configurable: false,
    });
	});
	// console.log({ dictionary });
  return dictionary;
})();