
const FUNCTION_NAME_REGEXP = /func:(?:this\.props|window)(?:\.reduxRouter)?\.(\D.+)*/;
export const getDynamicFunctionName = function _getDynamicFunctionName (function_name) {
  return function_name.replace(FUNCTION_NAME_REGEXP, '$1');
};

/**
 * Takes a single function name or an array of function name and fires them if they exist on window, this.props or this.props.reduxRouter
 * @param  {string|string[]} function_names A single function name or array of function names in a specific format ie. "func:this.props"
 * @return {Object}                Returns a Promise which resolves after all functions have resolved
 */
export const _invokeWebhooks = function (function_names, argv) {
  if (typeof function_names !== 'string' && (!Array.isArray(function_names) || (Array.isArray(function_names) && !function_names.length))) {
    return false;
  }
  function_names = (Array.isArray(function_names)) ? function_names : [ function_names, ];
  let fns = function_names.reduce((result, name) => {
    if (typeof name === 'string') {
      let clean_name = getDynamicFunctionName(name);
      if (name.indexOf('func:this.props.reduxRouter') !== -1) {
        result.push((typeof this.props.reduxRouter[clean_name] === 'function') ? this.props.reduxRouter[clean_name](argv) : undefined);
      } else if (name.indexOf('func:this.props') !== -1) {
        result.push((typeof this.props[clean_name] === 'function') ? this.props[clean_name](argv) : undefined);
      } else if (name.indexOf('func:window') !== -1) {
        result.push((typeof window[clean_name] === 'function') ? window[clean_name].call(this, argv) : undefined);
      }
    }
    return result;
  }, []);
  return Promise.all(fns);
};