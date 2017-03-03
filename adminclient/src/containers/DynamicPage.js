import React, { Component, } from 'react';
// import AppSectionLoading from '../components/AppSectionLoading';
import AppSectionLoadingOverlay from '../components/AppSectionLoading/overlay';
import { getRenderedComponent, } from '../components/AppLayoutMap';
import utilities from '../util';

const _handleComponentLifecycle = function () {
  this.setState({ ui_is_loaded: false, });
  let parentState = this.props.getState();
  let pathname = (this.props.location.pathname) ? this.props.location.pathname : window.location.href || window.location.pathname;
  if (parentState.manifest && parentState.manifest.hasLoaded) {
    if (pathname === '/mfa' && window.location.pathname === '/mfa') return this.fetchData();
    else {
      let isValid = this.props.enforceMFA(true);
      if (isValid) this.fetchData();
    }
  } else {
    return this.props.initializeAuthenticatedUser(parentState.user.jwt_token, false)
      .then(() => this.props.enforceMFA(true))
      .then(isValid => {
        if (isValid) this.fetchData();
      }, e => this.fetchDynamicErrorContent(pathname));
  }
};


class DynamicPage extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      ui_is_loaded: false,
      async_data_is_loaded: false,
    };
    this.uiLayout = {};
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.handleComponentLifecycle = _handleComponentLifecycle.bind(this);
    this.fetchData = utilities.fetchDynamicContent.bind(this);
  }
  fetchDynamicErrorContent (/*pathname*/) {
    return utilities.fetchErrorContent.call(this); 
  }
  componentDidMount () { 
    this.handleComponentLifecycle();
  }
  componentWillReceiveProps () { 
    this.handleComponentLifecycle();
  }
  render () {
    return <div style={{
      width: '100%',
      height: '100%', }}>
        <AppSectionLoadingOverlay display={!this.state.ui_is_loaded} wrapperstyle={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255,255,255,.8)',
          zIndex:100,
        }} /> 
      {
        (this.state.async_data_is_loaded && this.uiLayout) ? this.uiLayout : null
      }
        
    </div>
  }
}

export default DynamicPage;
