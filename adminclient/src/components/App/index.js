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
import AppConfigSettings from '../../content/config/settings.json';
// import AppLoginSettings from '../../content/config/login.json';
import { getRoutes, } from '../../routers/routes';
import CONSTANTS from '../../constants/index';
// import logo from './logo.svg';
// import './App.css';
// import capitalize from 'capitalize';
// import moment from 'moment';
// import debounce from 'debounce';
const history = getHistory(historySettings, AppConfigSettings, store);

const mapStateToProps = (state) => {
  return {
    page: state.page,
    settings: state.settings,
    ui: state.ui,
    user: state.user,
    manifest: state.manifest,
    // tabBarExtensions: state.tabBarExtensions,
    // fetchData: state.fetchData,
    // messageBar: state.messageBar,
  };
};

const reduxActions = {
  // initialAppLoaded:()=>store.dispatch(actions.pages.initialAppLoaded()),
  // onChangePage:(location) => store.dispatch(actions.pages.changePage(location)),
  // setAppDimensions:(layout) => store.dispatch(actions.pages.setAppDimensions(layout)),
  // requestData: (url, options, responseFormatter) => store.dispatch(actions.fetchData.request(url, options, responseFormatter)),
  // setTabExtensions: (arrayOfTabExtensions)=>store.dispatch(actions.tabBarExtension.setTabExtensions(arrayOfTabExtensions)),
  // showError: (notification) => store.dispatch(actions.messageBar.showError(notification)),
  // showInfo: (notification) => store.dispatch(actions.messageBar.showInfo(notification)),
  // setLoginStatus: (loggedIn) => store.dispatch(actions.user.setLoginStatus(loggedIn)),
  isLoggedIn: () => store.getState().user.isLoggedIn,
  getState: () => store.getState(), //.dispatch(actions.user.getUserStatus()),
  getUserProfile: (jwt_token) => store.dispatch(actions.user.getUserProfile(jwt_token)),
  saveUserProfile: (url, response, json) => store.dispatch(actions.user.saveUserProfile(url, response, json)),
  initializeAuthenticatedUser: (jwt_token) => store.dispatch(actions.user.initializeAuthenticatedUser(jwt_token)),
  loginUser: (formdata) => store.dispatch(actions.user.loginUser(formdata)),
  toggleUISidebar: () => store.dispatch(actions.ui.toggleUISidebar()),
  setUILoadedState: (loaded) => store.dispatch(actions.ui.setUILoadedState(loaded)),
  logoutUser: () => store.dispatch(actions.user.logoutUser()),
  fetchLoginComponent: () => store.dispatch(actions.ui.fetchComponent(CONSTANTS.ui.LOGIN_COMPONENT)),
  fetchMainComponent: () => store.dispatch(actions.ui.fetchComponent(CONSTANTS.ui.MAIN_COMPONENT)),
  fetchErrorComponents: () => store.dispatch(actions.ui.fetchComponent(CONSTANTS.ui.ERROR_COMPONENTS)),
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
