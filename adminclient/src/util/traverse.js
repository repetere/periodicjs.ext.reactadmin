
export const traverse = function (paths, data) {
	let keys = Object.keys(paths);
	if (!keys.length) return paths;
	return keys.reduce((result, key) => {
		if (typeof paths[key] === 'string') result[key] = data[paths[key]];
		else if (Array.isArray(paths[key])) {
			let _path = Object.assign([], paths[key]);
			let value = data;
			while (_path.length && value && typeof value === 'object') {
				let prop = _path.shift();
				value = value[prop];
			}
			result[key] = value;
		}
		else throw new TypeError('asyncprop paths must be a string or an array of strings or numeric indexes');
		return result;
	}, {});
};