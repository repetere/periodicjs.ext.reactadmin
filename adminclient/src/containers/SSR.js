(function () {
  if (global) {
    global[ '__DEV__' ] = false;
    global[ 'window' ] = {};
    global[ 'document' ] = {};
    global[ 'navigator' ] = {};
  }
})();

import React, { Component, } from 'react';
const  getRenderedComponent = require('../components/AppLayoutMap').getRenderedComponent;

function getPseudoRedux() {
  let state = {};
  let reducer = () => { };
  let reduxStore = {
    page: state.page,
    settings: state.settings,
    ui: state.ui,
    user: state.user,
    manifest: state.manifest,
    notification: state.notification,
  };
  let reduxActions = {
    isLoggedIn: reducer,
    getState: reducer,
    debug: reducer,
    fetchAction: reducer,
    getUserProfile: reducer,
    setNavLabel: reducer,
    saveUserProfile: reducer,
    initializeAuthenticatedUser: reducer,
    loginUser: reducer,
    createModal:reducer,
    hideModal: reducer,
    createNotification: reducer,
    errorNotification: reducer,
    hideNotification: reducer,
    toggleUISidebar: reducer,
    setUILoadedState: reducer,
    logoutUser: reducer,
    fetchLoginComponent: reducer,
    fetchMainComponent: reducer,
    fetchErrorComponents: reducer,
    setLoginComponent: reducer,
    setMainComponent: reducer,
    setErrorComponents: reducer,
    setConfigurationFromCache: reducer,
    fetchUnauthenticatedManifest: reducer,
    setActiveNavLink: reducer,
    enforceMFA: reducer,
    validateMFA: reducer,
    authenticatedMFA: reducer,
    refresh: reducer,
    reduxRouter: {
      push: reducer,
      replace: reducer,
      go: reducer,
      goForward: reducer,
      goBack: reducer,
    },
  };
  return Object.assign({}, reduxStore, reduxActions);
}

class SSR extends Component {
  constructor(props) {
    super(props);
    // let thisprops = Object.assign({}, getPseudoRedux(), props);

    // this.props = thisprops;
    // this.getRenderedComponent = getRenderedComponent.bind(this);
  }
  render() {
    let newThis = Object.assign({}, this, {
      props: Object.assign({}, this.props, getPseudoRedux())
    });
    console.log({ newThis });
    return <div>{getRenderedComponent.call(newThis,this.props.layout, this.props.resources)}</div>;
  }
}

export default SSR;
