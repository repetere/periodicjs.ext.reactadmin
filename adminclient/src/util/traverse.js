
export const traverse = function (paths, data) {
	paths = (Array.isArray(paths)) ? paths : [];
  return paths.reduce((result, _path) => {
		if (typeof _path === 'string') result[_path] = data[_path];
		else {
		  if (!Array.isArray(_path)) throw new TypeError('traverse expects paths to either be a string or Array');
  		else {
  			let value = data;
  			let _result;
  			let lastValid;
  			while (value && typeof value === 'object' && _path.length) {
  				let key = _path.shift();
  				value = value[key];
  				if (!_result) {
  					result[key] = (!value || typeof value !== 'object' || !_path.length) ? value : {};
  					_result = result[key];
  				}
  				else {
  					_result[key] = (!value || typeof value !== 'object' || !_path.length) ? value : {};
  					_result = _result[key];
  				}
  			}
  		} 
		}
		return result;
	}, {});
};