'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAction = exports.fetchDynamicContent = exports.fetchSuccessContent = exports.fetchErrorContent = exports._handleFetchPaths = exports._handleDynamicParams = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _webhooks = require('./webhooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError404 from '../components/AppError404';

/**
 * Because these dynamic data fetching functions are used in multiple locations this function standardizes access to the getState function
 * @return {Function} Returns the getState function that is either on this.props or on this directly
 */
// import React from 'react';
var _getState = function _getState() {
  return this.props && typeof this.props.getState === 'function' ? this.props.getState : this.getState;
};

/**
 * Sets parameterized values derived from window location to their respective resource path counterparts
 * @param  {string} pathname  The dynamic path that parameters should be set in
 * @param  {Object} resources Contains resource paths
 * @param  {string} [current]   The actual current window path. If this argument is not passed the window path will be pulled from the window object or from this.props
 * @return {Object}           Returns the resource object with populated dynamic routes
 */
var _handleDynamicParams = exports._handleDynamicParams = function _handleDynamicParams(pathname, resources, current) {
  // console.log('_handleDynamicParams',{ pathname, resources, current });
  var currentPathname = void 0;
  if (typeof current === 'string') currentPathname = current;else currentPathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : this.props.location.pathname;
  return (0, _keys2.default)(resources).reduce(function (result, key) {
    var updatedPath = _index2.default.setParameters({
      route: pathname,
      location: currentPathname,
      query: /\?[^\s]+$/.test(currentPathname) ? currentPathname.replace(/\?([^\s]+)$/g, '$1') : undefined,
      resource: resources[key]
    });
    result[key] = updatedPath;
    return result;
  }, {});
};

/**
 * Handles making fetch requests for resource paths
 * @param  {Object} layout    Configuration for dynamic page, component or modal
 * @param  {Object} [resources={}] Dynamically loaded resources stored as resource name and resource path key value pairs
 * @param  {Object} [options={}]   Configurable options
 * @param {Function} [options.onSuccess] Optional success function
 * @param {Function} [options.onError] Optional error function
 */
var _handleFetchPaths = exports._handleFetchPaths = function _handleFetchPaths(layout) {
  var _this = this;

  var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var state = _getState.call(this)();
  var headers = state.settings && state.settings.userprofile && state.settings.userprofile.options && state.settings.userprofile.options.headers ? state.settings.userprofile.options.headers : {};
  delete headers.clientid_default;
  if (state.user && state.user.jwt_token) {
    headers['x-access-token'] = state.user.jwt_token;
  }

  return _index2.default.fetchPaths.call(this, state.settings.basename, resources, headers).then(typeof options.onSuccess === 'function' ? options.onSuccess : function (_resources) {
    _this.uiLayout = _this.getRenderedComponent(layout, _resources);
    _this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
    if (options.callbacks) _webhooks._invokeWebhooks.call(_this, options.callbacks);
  }).catch(typeof options.onError === 'function' ? function (e) {
    return options.onError(e, 'fetchResources', resources);
  } : function (e) {
    if (_this.props && _this.props.errorNotification) _this.props.errorNotification(e);else console.error(e);
    _this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
  });
};

/**
 * Sets a configurable 404 error component or sets a default 404 component
 */
var fetchErrorContent = exports.fetchErrorContent = function _fetchErrorContent(e, type, resources) {
  console.debug('fetchErrorContent', e, { type: type, resources: resources });
  var getState = _getState.call(this);
  var state = getState();
  var custom404Error = void 0;
  var componentData = void 0;
  var windowTitle = void 0;
  var navLabel = void 0;
  var get404Error = _index2.default.get404Error.bind(this);
  var errorComponents = state.ui && state.ui.components && state.ui.components.error ? state.ui.components.error : false;
  var errorCode = type === 'fetchResources' ? '400' : '404';
  // console.debug({ errorComponents });

  get404Error({
    getState: getState, _handleFetchPaths: _handleFetchPaths, state: state, custom404Error: custom404Error, componentData: componentData, windowTitle: windowTitle, navLabel: navLabel, errorComponents: errorComponents, errorCode: errorCode, resources: resources, e: e
  });
};

/**
 * Gets a dynamic page element and handles resolving async props if resources exist
 * @param  {string}  pathname  Dynamic page manifest pathname
 * @param  {Boolean} hasParams If true will attempt to assign dynamic params to resource path
 */
var fetchSuccessContent = exports.fetchSuccessContent = function _fetchSuccessContent(pathname, hasParams) {
  var _this2 = this;

  try {
    var getState = _getState.call(this);
    var state = getState();
    var containers = state.manifest.containers;
    var layout = (0, _assign2.default)({}, containers[pathname].layout);
    if (containers[pathname].dynamic && (0, _typeof3.default)(containers[pathname].dynamic) === 'object') {
      (0, _keys2.default)(containers[pathname].dynamic).forEach(function (dynamicProp) {
        _this2.props.setDynamicData(dynamicProp, containers[pathname].dynamic[dynamicProp]);
      });
    }
    if (containers[pathname].resources && (0, _typeof3.default)(containers[pathname].resources) === 'object') {
      var container = containers[pathname];
      var resources = container.resources;
      if (hasParams) resources = _handleDynamicParams.call(this, pathname, resources, typeof this.props.pathname === 'string' ? this.props.pathname : undefined);
      if (container.pageData && container.pageData.title) window.document.title = container.pageData.title;
      if (container.pageData && container.pageData.navLabel && this.props && this.props.setNavLabel) this.props.setNavLabel(container.pageData.navLabel);else if (this.props && this.props.setNavLabel) this.props.setNavLabel('');
      return _handleFetchPaths.call(this, layout, resources, {
        getState: getState,
        onError: fetchErrorContent.bind(this),
        callbacks: containers[pathname].callbacks
      });
    } else {
      if (containers[pathname].callbacks) _webhooks._invokeWebhooks.call(this, containers[pathname].callbacks);
      this.uiLayout = this.getRenderedComponent(containers[pathname].layout);
      // if(window && window.scrollTo){
      //   window.scrollTo(0, 0);
      // }
      this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
    }
  } catch (e) {
    if (this.props && this.props.errorNotification) this.props.errorNotification(e);else console.error(e);
    // if(window && window.scrollTo){
    //   window.scrollTo(0, 0);
    // }
    this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
  }
};

/**
 * Gets dynamic content for a given page, component, modal
 * @param  {string} [_pathname] The window path that should content is being fetched for. If the argument is not passed it will defaul to window.location.pathname
 * @param  {Function} [onSuccess] Optional success function override. If this isnt passed resource paths will be fetched for async props
 * @param  {Function} onError   Optional error function override. If this isnt passed 404 error page will be rendered
 */
var fetchDynamicContent = exports.fetchDynamicContent = function _fetchDynamicContent(_pathname, onSuccess, onError) {
  var pathname = void 0;
  var getState = _getState.call(this);
  var state = getState();
  if (typeof _pathname === 'string') {
    pathname = _pathname;
  } else {
    pathname = window.location.pathname ? window.location.pathname : this.props.location.pathname;
  }
  onSuccess = typeof onSuccess === 'function' ? onSuccess : fetchSuccessContent.bind(this);
  onError = typeof onError === 'function' ? onError : fetchErrorContent.bind(this);
  // console.log({pathname}, onSuccess, onError)
  if (state.manifest.containers[pathname]) {
    return onSuccess(pathname);
  } else if (state.manifest.containers[pathname.replace(state.settings.auth.admin_path, '')]) {
    var adminPathname = pathname.replace(state.settings.auth.admin_path, '');
    return onSuccess(adminPathname);
  } else {
    var dynamicPathname = _index2.default.findMatchingRoute(state.manifest.containers, pathname.replace(state.settings.auth.admin_path, ''));
    if (!dynamicPathname) return onError();
    return onSuccess(dynamicPathname, true);
  }
};

var fetchAction = exports.fetchAction = function _fetchAction(pathname, fetchOptions, success) {
  var _this3 = this;

  // let pathname, fetchOptions, success;
  if ((typeof pathname === 'undefined' ? 'undefined' : (0, _typeof3.default)(pathname)) === 'object') {
    pathname = pathname.pathname;
    fetchOptions = pathname.fetchOptions;
    success = pathname.success;
  }
  // console.debug('in fetch action this', this,{ pathname, fetchOptions, success, customThis, });
  var state = _getState.call(this)();
  var headers = state.settings && state.settings.userprofile && state.settings.userprofile.options && state.settings.userprofile.options.headers ? state.settings.userprofile.options.headers : {};
  var successCallback = console.debug;
  delete headers.clientid_default;
  if (state.user && state.user.jwt_token) {
    headers['x-access-token'] = state.user.jwt_token;
  }
  fetchOptions.headers = (0, _assign2.default)({}, fetchOptions.headers, headers);

  fetch(pathname, fetchOptions).then(_index2.default.checkStatus).then(function (res) {
    if (success.success) {
      if (success.success.modal) {
        _this3.props.createModal(success.success.modal);
      } else if (success.success.notification) {
        _this3.props.createNotification(success.success.notification);
      } else {
        _this3.props.createNotification({ text: 'Saved', timeout: 4000, type: 'success' });
      }
    }
    if (success.successCallback) {
      res.json().then(function (successData) {
        var successCallbackProp = success.successCallback;
        if (typeof successCallbackProp === 'string' && successCallbackProp.indexOf('func:this.props.reduxRouter') !== -1) {
          successCallback = _this3.props.reduxRouter[successCallbackProp.replace('func:this.props.reduxRouter.', '')];
        } else if (typeof successCallbackProp === 'string' && successCallbackProp.indexOf('func:this.props') !== -1) {
          successCallback = _this3.props[success.successCallback.replace('func:this.props.', '')];
        } else if (typeof successCallbackProp === 'string' && successCallbackProp.indexOf('func:window') !== -1 && typeof window[success.successCallback.replace('func:window.', '')] === 'function') {
          successCallback = window[success.successCallback.replace('func:window.', '')].bind(_this3);
        }
        if (fetchOptions.successCallback === 'func:this.props.setDynamicData') {
          _this3.props.setDynamicData(success.dynamicField, success.successProps || successData);
        } else {
          successCallback(success.successProps || successData);
        }
      });
    } else {
      return res.json();
    }
  }).catch(this.props.errorNotification);
};