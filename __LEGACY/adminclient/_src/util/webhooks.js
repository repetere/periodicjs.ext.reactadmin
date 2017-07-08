'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._invokeWebhooks = exports.getDynamicFunctionName = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FUNCTION_NAME_REGEXP = /func:(?:this\.props|window)(?:\.reduxRouter)?\.(\D.+)*/;
var getDynamicFunctionName = exports.getDynamicFunctionName = function _getDynamicFunctionName(function_name) {
  return function_name.replace(FUNCTION_NAME_REGEXP, '$1');
};

/**
 * Takes a single function name or an array of function name and fires them if they exist on window, this.props or this.props.reduxRouter
 * @param  {string|string[]} function_names A single function name or array of function names in a specific format ie. "func:this.props"
 * @return {Object}                Returns a Promise which resolves after all functions have resolved
 */
var _invokeWebhooks = exports._invokeWebhooks = function _invokeWebhooks(function_names, argv) {
  var _this = this;

  if (typeof function_names !== 'string' && (!Array.isArray(function_names) || Array.isArray(function_names) && !function_names.length)) {
    return false;
  }
  function_names = Array.isArray(function_names) ? function_names : [function_names];
  var fns = function_names.reduce(function (result, name) {
    if (typeof name === 'string') {
      var clean_name = getDynamicFunctionName(name);
      if (name.indexOf('func:this.props.reduxRouter') !== -1) {
        result.push(typeof _this.props.reduxRouter[clean_name] === 'function' ? _this.props.reduxRouter[clean_name](argv) : undefined);
      } else if (name.indexOf('func:this.props') !== -1) {
        result.push(typeof _this.props[clean_name] === 'function' ? _this.props[clean_name](argv) : undefined);
      } else if (name.indexOf('func:window') !== -1) {
        result.push(typeof window[clean_name] === 'function' ? window[clean_name].call(_this, argv) : undefined);
      }
    }
    return result;
  }, []);
  return _promise2.default.all(fns);
};