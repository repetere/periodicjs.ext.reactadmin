import React from 'react';
import utilities from './index';
import AppError404 from '../components/AppError404';

/**
 * Because these dynamic data fetching functions are used in multiple locations this function standardizes access to the getState function
 * @return {Function} Returns the getState function that is either on this.props or on this directly
 */
var _getState = function () {
  return (this.props && typeof this.props.getState === 'function') ? this.props.getState : this.getState;
};

/**
 * Sets parameterized values derived from window location to their respective resource path counterparts
 * @param  {string} pathname  The dynamic path that parameters should be set in
 * @param  {Object} resources Contains resource paths
 * @param  {string} [current]   The actual current window path. If this argument is not passed the window path will be pulled from the window object or from this.props
 * @return {Object}           Returns the resource object with populated dynamic routes
 */
var _handleDynamicParams = function (pathname, resources, current) {
  let currentPathname;
  if (typeof current === 'string') currentPathname = current;
  else currentPathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
  return Object.keys(resources).reduce((result, key) => {
    let updatedPath = utilities.setParameters({
      route: pathname,
      location: currentPathname,
      query: (/\?[^\s]+$/.test(currentPathname)) ? currentPathname.replace(/\?([^\s]+)$/g, '$1') : undefined,
      resource: resources[key],
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
var _handleFetchPaths = function (layout, resources = {}, options = {}) {
  let state = _getState.call(this)();
  let headers = (state.settings && state.settings.userprofile && state.settings.userprofile.options && state.settings.userprofile.options.headers)
    ? state.settings.userprofile.options.headers
    : {};
  delete headers.clientid_default;
  if (state.user && state.user.jwt_token) {
    headers[ 'x-access-token' ] = state.user.jwt_token;
  }

  return utilities.fetchPaths(state.settings.basename, resources, headers)
    .then((typeof options.onSuccess === 'function') ? options.onSuccess : _resources => {
      this.uiLayout = this.getRenderedComponent(layout, _resources);
      this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
    })
    .catch((typeof options.onError === 'function') ? options.onError : e => {
      if (this.props && this.props.errorNotification) this.props.errorNotification(e);
      else console.error(e);
      this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
    });
};

/**
 * Sets a configurable 404 error component or sets a default 404 component
 */
export const fetchErrorContent = function _fetchErrorContent () {
  let getState = _getState.call(this);
  let state = getState();
  let custom404Error;
  let errorComponents = (state.ui && state.ui.components && state.ui.components.error) ? state.ui.components.error : false;
  if (errorComponents && errorComponents['404']) {
    let componentData = errorComponents['404'];
    if (typeof componentData.status === 'undefined' || componentData.status === 'undefined' || componentData.status === 'uninitialized') {
      custom404Error = false;
    } else {
      if (componentData.resources && Object.keys(componentData.resources).length) {
        return _handleFetchPaths.call(this, componentData.layout, componentData.resources, {
          onError: function (e) {
            this.uiLayout = <AppError404 error={e}/>;
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
          }.bind(this),
          getState,
        });
      } else custom404Error = this.getRenderedComponent(componentData.layout);
    }
  }
  this.uiLayout = (custom404Error) ? custom404Error : <AppError404/>;
  window.document.title = 'Page Not Found';
  if (this.props && this.props.setNavLabel) this.props.setNavLabel('Error');
  this.setState({ ui_is_loaded: true, });
};

/**
 * Gets a dynamic page element and handles resolving async props if resources exist
 * @param  {string}  pathname  Dynamic page manifest pathname
 * @param  {Boolean} hasParams If true will attempt to assign dynamic params to resource path
 */
export const fetchSuccessContent = function _fetchSuccessContent (pathname, hasParams) {
  try {
    let getState = _getState.call(this);
    let state = getState();
    let containers = state.manifest.containers;
    let layout = Object.assign({}, containers[pathname].layout);
    if (containers[pathname].resources && typeof containers[pathname].resources === 'object') {
      let container = containers[pathname];
      let resources = container.resources;
      if (hasParams) resources = _handleDynamicParams.call(this, pathname, resources, (typeof this.props.pathname === 'string') ? this.props.pathname : undefined);
      if (container.pageData && container.pageData.title) window.document.title = container.pageData.title;
      if (container.pageData && container.pageData.navLabel && this.props && this.props.setNavLabel) this.props.setNavLabel(container.pageData.navLabel);
      else if (this.props && this.props.setNavLabel) this.props.setNavLabel('');
      return _handleFetchPaths.call(this, layout, resources, { getState, });
    } else {
      this.uiLayout = this.getRenderedComponent(containers[pathname].layout);
      this.setState({ ui_is_loaded: true, });
    }
  } catch (e) {
    if (this.props && this.props.errorNotification) this.props.errorNotification(e);
    else console.error(e);
    this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
  }
};

/**
 * Gets dynamic content for a given page, component, modal
 * @param  {string} [_pathname] The window path that should content is being fetched for. If the argument is not passed it will defaul to window.location.pathname
 * @param  {Function} [onSuccess] Optional success function override. If this isnt passed resource paths will be fetched for async props
 * @param  {Function} onError   Optional error function override. If this isnt passed 404 error page will be rendered
 */
export const fetchDynamicContent = function _fetchDynamicContent (_pathname, onSuccess, onError) {
  let pathname;
  let getState = _getState.call(this);
  let state = getState();
  if (typeof _pathname === 'string') pathname = _pathname; 
  else pathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
  onSuccess = (typeof onSuccess === 'function') ? onSuccess : fetchSuccessContent.bind(this);
  onError = (typeof onError === 'function') ? onError : fetchErrorContent.bind(this);
  // console.log({pathname}, onSuccess, onError)
  if (state.manifest.containers[pathname]) {
    return onSuccess(pathname);
  } else if (state.manifest.containers[pathname.replace(state.settings.auth.admin_path, '')]) {
    let adminPathname = pathname.replace(state.settings.auth.admin_path, ''); 
    return onSuccess(adminPathname);
  } else {
    let dynamicPathname = utilities.findMatchingRoute(state.manifest.containers, pathname.replace(state.settings.auth.admin_path, ''));
    if (!dynamicPathname) return onError();
    return onSuccess(dynamicPathname, true);
  }
};
