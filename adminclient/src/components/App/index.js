import React, { Component, } from 'react';
// import { Notification } from 're-bulma';
// import { AsyncStorage } from 'react-native-web';
// import { Nav, NavGroup, NavItem, Button, Icon, NavToggle, } from 're-bulma';
// import { createStore, } from 'redux';
import { Router,/* Route, IndexRoute,*/ } from 'react-router';
import { Provider, connect, } from 'react-redux';
import { push, replace, go, goForward, goBack } from 'react-router-redux';
import { historySettings, getHistory, } from '../../routers/history';
// import combinedReducers from '../../reducers';
import store from '../../stores';
import actions from '../../actions';
// import constants from '../../constants';
import MainApp from './Main';
import AppConfigSettings from '../../content/config/settings.json';
// import AppLoginSettings from '../../content/config/login.json';
import { getRoutes, } from '../../routers/routes';
// import logo from './logo.svg';
// import './App.css';
import 'font-awesome/css/font-awesome.css';
// import capitalize from 'capitalize';
// import moment from 'moment';
// import debounce from 'debounce';
const history = getHistory(historySettings, AppConfigSettings, store);

const mapStateToProps = (state) => {
  return {
    page: state.page,
    user: state.user,
    // tabBarExtensions: state.tabBarExtensions,
    // fetchData: state.fetchData,
    // messageBar: state.messageBar,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    // initialAppLoaded:()=>store.dispatch(actions.pages.initialAppLoaded()),
    // onChangePage:(location) => store.dispatch(actions.pages.changePage(location)),
    // setAppDimensions:(layout) => store.dispatch(actions.pages.setAppDimensions(layout)),
    // requestData: (url, options, responseFormatter) => store.dispatch(actions.fetchData.request(url, options, responseFormatter)),
    // setTabExtensions: (arrayOfTabExtensions)=>store.dispatch(actions.tabBarExtension.setTabExtensions(arrayOfTabExtensions)),
    // showError: (notification) => store.dispatch(actions.messageBar.showError(notification)),
    // showInfo: (notification) => store.dispatch(actions.messageBar.showInfo(notification)),
    // setLoginStatus: (loggedIn) => store.dispatch(actions.user.setLoginStatus(loggedIn)),
    // getUserProfile: (jwt_token) => store.dispatch(actions.user.getUserProfile(jwt_token)),
    // saveUserProfile: (url, response, json) => store.dispatch(actions.user.saveUserProfile(url, response, json)),
    loginUser: (formdata) => store.dispatch(actions.user.loginUser(formdata)),
    // logoutUser: () => store.dispatch(actions.user.logoutUser()),
    reduxRouter: {
      push: (location) => store.dispatch(push(location)),
      replace: (location) => store.dispatch(replace(location)),
      go: (number) => store.dispatch(go(number)),
      goForward: () => store.dispatch(goForward()),
      goBack: () => store.dispatch(goBack()),
    },

  };
};

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(MainApp);

class Main extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={getRoutes(MainAppContainer)} />
      </Provider>
    );
  }
}


export default Main;
