'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPaths = exports.fetchComponent = exports.checkStatus = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// window.qs = qs;
var checkStatus = exports.checkStatus = function checkStatus(response) {
  return new _promise2.default(function (resolve, reject) {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      reject(error);
    }
  });
};

var fetchComponent = exports.fetchComponent = function fetchComponent(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function () {
    return fetch(url, (0, _assign2.default)({}, options)).then(checkStatus).then(function (res) {
      return res.json();
    }).catch(function (e) {
      return _promise2.default.reject(e);
    });
  };
};

var fetchPaths = exports.fetchPaths = function fetchPaths(basename) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var headers = arguments[2];

  var result = {};
  var finished = (0, _keys2.default)(data).map(function (key) {
    var val = void 0;
    if (typeof data[key] === 'string') val = [data[key]];else val = [data[key].url, data[key].options];
    var additionalParams = '';
    additionalParams = typeof window !== 'undefined' && (0, _keys2.default)(window).length ? window.location.search.charAt(0) === '?' ? window.location.search.substr(1) : window.location.search : '';
    var route = val[0] || '';
    // console.log({ data, key, val, },this);
    // console.log(qs.parse(additionalParams),val[0])
    var fetchOptions = (0, _assign2.default)({}, val[1], { headers: headers });

    return fetchComponent('' + basename + route + (route && route.indexOf('?') !== -1 ? '&' : '') + additionalParams, fetchOptions)().then(function (response) {
      result[key] = response;
    }, function (e) {
      return _promise2.default.reject(e);
    });
  });
  return _promise2.default.all(finished).then(function () {
    return result;
  }).catch(function (e) {
    return _promise2.default.reject(e);
  });
};