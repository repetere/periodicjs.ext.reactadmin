import React, { Component, } from 'react';
import AppSectionLoading from '../components/AppSectionLoading';
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
    return (this.state.ui_is_loaded === false) ? <AppSectionLoading/> : this.uiLayout;
  }
}

export default DynamicPage;
