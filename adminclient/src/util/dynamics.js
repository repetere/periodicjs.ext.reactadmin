import React from 'react';
import utilities from './index';
import AppError404 from '../components/AppError404';

const handleDynamicParams = function _handleDynamicParams (pathname, resources, current) {
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

const handleFetchPaths = function _handleFetchPaths (layout, resources = {}, options = {}) {
	let state = options.getState();
	return utilities.fetchPaths(state.settings.basename, resources)
		.then((typeof options.onSuccess === 'function') ? options.onSuccess : _resources => {
			this.uiLayout = this.getRenderedComponent(layout, _resources);
			this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
		})
		.catch((typeof options.onError === 'function') ? options.onError : e => {
			if (this.props && this.props.errorNotification) this.props.errorNotification(e);
			else console.error(e);
			this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
		});
};

export const fetchErrorContent = function _fetchErrorContent (getState) {
	let state = this.props.getState();
	let custom404Error;
	let errorComponents = (state.ui && state.ui.components && state.ui.components.error) ? state.ui.components.error : false;
	if (errorComponents && errorComponents['404']) {
		let componentData = errorComponents['404'];
		if (typeof componentData.status === 'undefined' || componentData.status === 'undefined' || componentData.status === 'uninitialized') {
			custom404Error = false;
		} else {
			if (componentData.resources && Object.keys(componentData.resources).length) {
				return handleFetchPaths.call(this, componentData.layout, componentData.resources, {
					onError: function (e) {
						this.uiLayout = <AppError404 error={e}/>;
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
					}.bind(this),
					getState: (typeof getState === 'function') ? getState : this.props.getState
				});
      } else custom404Error = this.getRenderedComponent(componentData.layout);
		}
	}
	this.uiLayout = (custom404Error) ? custom404Error : <AppError404/>;
  window.document.title = 'Page Not Found';
  if (this.props && this.props.setNavLabel) this.props.setNavLabel('Error');
  this.setState({ ui_is_loaded: true, });
};

export const fetchSuccessContent = function _fetchSuccessContent (pathname, hasParams, getState) {
	try {
		let state = getState();
	  let containers = state.manifest.containers;
	  let layout = Object.assign({}, containers[pathname].layout);
	  if (containers[pathname].resources && typeof containers[pathname].resources === 'object') {
	  	let container = containers[pathname];
	  	let resources = container.resources;
	  	if (hasParams) resources = handleDynamicParams.call(this, pathname, resources, (typeof this.props.pathname === 'string') ? this.props.pathname : undefined);
	  	if (container.pageData && container.pageData.title) window.document.title = container.pageData.title;
		  if (container.pageData && container.pageData.navLabel && this.props && this.props.setNavLabel) this.props.setNavLabel(container.pageData.navLabel);
		  else if (this.props && this.props.setNavLabel) this.props.setNavLabel('');
		  return handleFetchPaths.call(this, layout, resources, { getState });
	  } else {
	  	this.uiLayout = this.getRenderedComponent(containers[pathname].layout);
	  	this.setState({ ui_is_loaded: true });
	  }
	} catch (e) {
		if (this.props && this.props.errorNotification) this.props.errorNotification(e);
		else console.error(e);
		this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
	}
};

export const fetchDynamicContent = function _fetchDynamicContent (_pathname, getState, onSuccess, onError) {
	let pathname;
	getState = (this.props && this.props.getState) ? this.props.getState : getState;
	if (typeof _pathname === 'string') pathname = _pathname; 
	else pathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
	let state = getState();
	onSuccess = (typeof onSuccess === 'function') ? onSuccess : fetchSuccessContent.bind(this);
	onError = (typeof onError === 'function') ? onError : fetchErrorContent.bind(this);
	if (state.manifest.containers[pathname]) {
    return onSuccess(pathname, null, getState);
  } else if (state.manifest.containers[pathname.replace(state.settings.auth.admin_path, '')]) {
    let adminPathname = pathname.replace(state.settings.auth.admin_path, ''); 
    return onSuccess(adminPathname, null, getState);
  } else {
    let dynamicPathname = utilities.findMatchingRoute(state.manifest.containers, pathname.replace(state.settings.auth.admin_path, ''));
    if (!dynamicPathname) return onError(pathname, getState);
    return onSuccess(dynamicPathname, true, getState);
  }
};
