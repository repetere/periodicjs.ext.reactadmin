'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const path = require('path');
const CACHE = require.cache;
const WATCHED = new Map();

var debounce = function (fn) {
	let timeout;
	return function () {
		if (!timeout) timeout = setTimeout(fn, 1500);
		else {
			clearTimeout(timeout);
			timeout = setTimeout(fn, 1500);
		}
	};
};

var flushCached = function (filepath, fn, isModule) {
	return debounce(() => {
		if (isModule) delete CACHE[filepath];
		if (typeof fn === 'function') fn();
	});
};

var watcher = function (filepath, onChange) {
	let isModule = (path.extname(filepath) === '.js');
	if (!WATCHED.has(filepath)) {
		let listener;
		if (typeof onChange !== 'function') listener = flushCached(filepath, null, isModule);
		else listener = flushCached(filepath, onChange, isModule);
		fs.watch(filepath, 'utf8', listener);
		WATCHED.set(filepath, true);
	}
	return (isModule) ? Promisie.resolve(require(filepath)) : fs.readJsonAsync(filepath);
};

module.exports = watcher;