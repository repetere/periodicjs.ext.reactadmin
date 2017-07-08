import React, { Component, } from 'react';
// import { Notification } from 're-bulma';
// import { Nav, NavGroup, NavItem, Button, Icon, NavToggle, } from 're-bulma';
// import { createStore, } from 'redux';
import { applyRouterMiddleware, Router, /*, Route, IndexRoute,*/ } from 'react-router';
import { connect, Provider, } from 'react-redux';
import { push, replace, go, goForward, goBack, } from 'react-router-redux';
import { historySettings, getHistory, } from '../../routers/history';
// import combinedReducers from '../../reducers';
import store from '../../stores';
import actions from '../../actions';
// import constants from '../../constants';
import MainApp from './Main';
import utilities from '../../util';
import AppConfigSettings from '../../content/config/settings.json';
// import AppLoginSettings from '../../content/config/login.json';
import { getRoutes, } from '../../routers/routes';
import CONSTANTS from '../../constants/index';
// import logo from './logo.svg';
// import './App.css';
import pluralize from 'pluralize';
import numeral from 'numeral';
import capitalize from 'capitalize';
import moment from 'moment';
// import debounce from 'debounce';
const history = getHistory(historySettings, AppConfigSettings, store);

const mapStateToProps = (state) => {
  return {
    dynamic: state.dynamic,
    page: state.page,
    settings: state.settings,
    ui: state.ui,
    user: state.user,
    manifest: state.manifest,
    notification: state.notification,
    // tabBarExtensions: state.tabBarExtensions,
    // fetchData: state.fetchData,
    // messageBar: state.messageBar,
  };
};
window.__reactadmin = Object.assign({}, {
  __ra_helpers: {
    numeral,
    moment,
    capitalize,
    pluralize,
  },
}, window.__reactadmin);
window.__reactadmin.setDynamicData = (prop, val) => store.dispatch(actions.dynamic.setDynamicData(prop, val));
const reduxActions = {
  isLoggedIn: () => store.getState().user.isLoggedIn,
  getState: () => store.getState(), //.dispatch(actions.user.getUserStatus()),
  debug: (data) => {
    console.debug(data);
  }, //.dispatch(actions.user.getUserStatus()),
  fetchAction: function (pathname, fetchOptions, success){
    // console.debug('in redux actions this', this);
    return utilities.fetchAction.call(this, pathname, fetchOptions, success);
  }, //.dispatch(actions.user.getUserStatus()),
  redirect: (locationURL) => {
    // console.debug({ locationURL, });
    if (typeof location === 'string') {
      window.location = locationURL;
    } else {
      window.location = locationURL.location;
    }
  },
  getUserProfile: (jwt_token) => store.dispatch(actions.user.getUserProfile(jwt_token)),
  updateUserProfile: (profile) => store.dispatch(actions.user.updateUserProfile(profile)),
  setNavLabel: (label) => store.dispatch(actions.ui.setNavLabel(label)),
  saveUserProfile: (url, response, json) => store.dispatch(actions.user.saveUserProfile(url, response, json)),
  initializeAuthenticatedUser: (jwt_token, enforceMFA = true) => store.dispatch(actions.user.initializeAuthenticatedUser(jwt_token, enforceMFA)),
  loginUser: (formdata) => store.dispatch(actions.user.loginUser(formdata)),
  // ajaxModal: (options) => store.dispatch(actions.notification.ajaxModal(options)),
  fileSaver: (options) => store.dispatch(actions.output.fileSaver(options)),
  createModal: (options) => store.dispatch(actions.notification.createModal(options)),
  hideModal: (options) => store.dispatch(actions.notification.hideModal(options)),
  createNotification: (options) => store.dispatch(actions.notification.createNotification(options)),
  errorNotification: (options, timeout) => store.dispatch(actions.notification.errorNotification(options, timeout)),
  hideNotification: (id) => store.dispatch(actions.notification.hideNotification(id)),
  toggleUISidebar: () => store.dispatch(actions.ui.toggleUISidebar()),
  setUILoadedState: (loaded, customLayout) => store.dispatch(actions.ui.setUILoadedState(loaded, customLayout)),
  setDebugUILoadedState: (loaded, customLayout) => {
    let t = setTimeout(() => { 
      store.dispatch(actions.ui.setUILoadedState(loaded, customLayout));
      clearTimeout(t);
    }, 2000);
  },
  logoutUser: () => store.dispatch(actions.user.logoutUser()),
  setDynamicData: (prop, val) => store.dispatch(actions.dynamic.setDynamicData(prop, val)),
  fetchLoginComponent: () => store.dispatch(utilities.setCacheConfiguration(actions.ui.fetchComponent(CONSTANTS.ui.LOGIN_COMPONENT), 'components.login')),
  fetchMainComponent: () => store.dispatch(utilities.setCacheConfiguration(actions.ui.fetchComponent(CONSTANTS.ui.MAIN_COMPONENT), 'components.main')),
  fetchErrorComponents: () => store.dispatch(utilities.setCacheConfiguration(actions.ui.fetchComponent(CONSTANTS.ui.ERROR_COMPONENTS), 'components.error')),
  setLoginComponent: () => store.dispatch(actions.ui.handleFetchedComponent(CONSTANTS.ui.LOGIN_COMPONENT)),
  setMainComponent: () => store.dispatch(actions.ui.handleFetchedComponent(CONSTANTS.ui.MAIN_COMPONENT)),
  setErrorComponents: () => store.dispatch(actions.ui.handleFetchedComponent(CONSTANTS.ui.ERROR_COMPONENTS)),
  setConfigurationFromCache: () => store.dispatch(utilities.getCacheConfiguration(Object.assign({}, actions, {
    setLoginComponent: reduxActions.setLoginComponent,
    setMainComponent: reduxActions.setMainComponent,
    setErrorComponents: reduxActions.setErrorComponents,
  }))),
  fetchUnauthenticatedManifest: (options = {}) => store.dispatch(actions.manifest.fetchUnauthenticatedManifest(options)),
  setActiveNavLink: (id) => store.dispatch(actions.ui.setActiveNavItem(id)),
  enforceMFA: (noRedirect) => store.dispatch(actions.user.enforceMFA(noRedirect)),
  validateMFA: (jwt_token) => store.dispatch(actions.user.validateMFA(jwt_token)),
  authenticatedMFA: () => store.dispatch(actions.user.authenticatedMFA()),
  refresh: ()=> store.dispatch(push(window.location.pathname)),
  reduxRouter: {
    push: (location) => store.dispatch(push(location)),
    replace: (location) => store.dispatch(replace(location)),
    go: (number) => store.dispatch(go(number)),
    goForward: () => store.dispatch(goForward()),
    goBack: () => store.dispatch(goBack()),
  },
};
const mapDispatchToProps = (/*dispatch*/) => {
  return reduxActions;
};

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(MainApp);
const useExtraProps = {
  renderRouteComponent: child => React.cloneElement(child, Object.assign({}, reduxActions)),
};
class Main extends Component{
  componentDidMount() {
    if (document && document.body && document.body.classList && document.body.classList.add) {
      document.body.classList.add('__reactadmin_body_loaded');
    } else if (document && document.body && document.body.className) {
      document.body.className = document.body.className += ' __reactadmin_body_loaded';
    }
    if (document && document.querySelector && document.querySelector('html')&& document.querySelector('html').add) {
      document.querySelector('html').classList.add('__reactadmin_html_loaded');
    }
  }
  render() {
    // console.log('initial store',{store})
    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={getRoutes(MainAppContainer)}
          render={applyRouterMiddleware(useExtraProps)}
          />
      </Provider>
    );
  }
}


export default Main;
