'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPaths = exports.fetchComponent = exports.checkStatus = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _webhooks = require('./webhooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkStatus = exports.checkStatus = function checkStatus(response) {
  return new _promise2.default(function (resolve, reject) {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      try {
        // console.debug({response})
        response.json().then(function (res) {
          if (res.data.error) {
            reject(res.data.error);
          } else if (res.data) {
            reject((0, _stringify2.default)(res.data));
          } else {
            reject(error);
          }
        }).catch(function () {
          reject(error);
        });
      } catch (e) {
        reject(error);
      }
    }
  });
};

var fetchComponent = exports.fetchComponent = function fetchComponent(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function () {
    // console.debug({ url, options });
    return fetch(url, (0, _assign2.default)({}, options)).then(checkStatus).then(function (res) {
      return res.json();
    }).catch(function (e) {
      return _promise2.default.reject(e);
    });
  };
};

var fetchPaths = exports.fetchPaths = function fetchPaths(basename) {
  var _this = this;

  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var headers = arguments[2];

  var result = {};
  var finished = (0, _keys2.default)(data).map(function (key) {
    var val = void 0;
    if (typeof data[key] === 'string') val = [data[key]];else val = [data[key].url, data[key].options];
    var additionalParams = '';
    additionalParams = typeof window !== 'undefined' && (0, _keys2.default)(window).length ? window.location.search.charAt(0) === '?' ? window.location.search.substr(1) : window.location.search : '';
    var route = val[0] || '';
    var fetchOptions = (0, _assign2.default)({}, val[1], { headers: headers });
    var onSuccess = fetchOptions.onSuccess,
        onError = fetchOptions.onError,
        blocking = fetchOptions.blocking,
        renderOnError = fetchOptions.renderOnError;

    delete fetchOptions.onSuccess;
    delete fetchOptions.onError;
    return fetchComponent('' + basename + route + (route && route.indexOf('?') === -1 ? '?' : '') + (route && route.indexOf('?') !== -1 ? '&' : '') + additionalParams, fetchOptions)().then(function (response) {
      result[key] = response;
      if (typeof onSuccess === 'string' || Array.isArray(onSuccess) && onSuccess.length) {
        if (blocking) {
          return _webhooks._invokeWebhooks.call(_this, onSuccess, response);
        } else {
          _webhooks._invokeWebhooks.call(_this, onSuccess, response);
        }
      }
    }, function (e) {
      if (typeof onError === 'string' || Array.isArray(onError) && onError.length) {
        if (renderOnError === false) result.__hasError = true;
        if (blocking) {
          return _webhooks._invokeWebhooks.call(_this, onError, e);
        } else {
          _webhooks._invokeWebhooks.call(_this, onError, e);
        }
      } else return _promise2.default.reject(e);
    }).catch(function (e) {
      return _promise2.default.reject(e);
    });
  });
  return _promise2.default.all(finished).then(function () {
    return result;
  }).catch(function (e) {
    return _promise2.default.reject(e);
  });
};