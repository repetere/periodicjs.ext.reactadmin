(function () {
  if (global) {
    global[ '__DEV__' ] = false;
    global[ 'window' ] = {};
    global[ 'document' ] = {
      createElement: () => {
        return {
          style: {}
        };
      }
    };
    global[ 'navigator' ] = {};
    process.env.NODE_ENV = 'production';
  }
})();

import React, { Component, } from 'react';
const  getRenderedComponent = require('../components/AppLayoutMap').getRenderedComponent;

function getPseudoRedux() {
  let state = {};
  let reducer = () => { };
  let reduxStore = {
    dynamic: state.dynamic,
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

const SSR = (props) => {
  let newThis = Object.assign({}, this, {
    props: Object.assign({}, props, getPseudoRedux())
  });
  // console.log({ newThis });
  return <div className='ssr-index'>{getRenderedComponent.call(newThis,props.layout, props.resources)}</div>;
}

export default SSR;
