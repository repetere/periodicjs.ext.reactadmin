import React from 'react';
// import utilities from './index';
import AppError404 from '../components/AppError404';

export const get404Error = function _get404Error(options) {
  let { getState, _handleFetchPaths, state, custom404Error, componentData, windowTitle, navLabel, errorComponents, errorCode, resources, e, /* type,*/ } = options;
  let customErrorComponent;
  if (e && !state.settings.ui.notifications.supressResourceErrors && this.props && typeof this.props.errorNotification==='function') {
    this.props.errorNotification(e.message || e.toString());
  }
  if (errorComponents && errorComponents[ errorCode ]) {
    customErrorComponent = errorComponents[ errorCode ];
  } else if (errorComponents && errorComponents[ '404' ]) { 
    customErrorComponent = errorComponents[ '404' ];
  }
  if (customErrorComponent) {
    componentData = customErrorComponent;
    //TODO: Jan, this was broken because the custom error component had layout nested under settings
    if (!componentData.layout && componentData.settings) {
      componentData.layout = componentData.settings.layout;
      componentData.resources = componentData.settings.resources;
    }
    // console.debug({componentData})
    windowTitle = (componentData && componentData.pageData&& componentData.pageData.title) 
      ? componentData.pageData.title
      : 'Page Not Found';
    navLabel = (componentData && componentData.pageData&& componentData.pageData.navLabel) 
      ? componentData.pageData.navLabel
      : 'Error';
    if (typeof componentData.status === 'undefined' || componentData.status === 'undefined' || componentData.status === 'uninitialized') {
      custom404Error = false;
    } else {
      if (componentData.resources && Object.keys(componentData.resources).length) {
        return _handleFetchPaths.call(this, componentData.layout, componentData.resources, {
          onError: function (e) {
            // console.debug('fetch call eror')
            window.document.title = windowTitle;
            if (this.props && this.props.setNavLabel) this.props.setNavLabel(navLabel);
            this.uiLayout = <AppError404 error={e}/>;
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
          }.bind(this),
          getState,
        });
      } else {
        // console.debug('error page has no resources')
        custom404Error = this.getRenderedComponent(componentData.layout, resources);
      }
    }
  }
  // console.log({ custom404Error });
  this.uiLayout = (custom404Error) ? custom404Error : <AppError404/>;
  window.document.title = windowTitle;
  if (this.props && this.props.setNavLabel) this.props.setNavLabel(navLabel);
  this.setState({ ui_is_loaded: true,  async_data_is_loaded: true, });
};