'use strict';

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

// import { Platform, } from 'react-native';
exports.historySettings = { browserHistory: _reactRouter.browserHistory, hashHistory: _reactRouter.hashHistory, createMemoryHistory: _reactRouter.createMemoryHistory };

exports.getHistory = function (historySettings, AppConfigSettings, store) {
  // if(Platform.OS === 'web') {
  return (0, _reactRouterRedux.syncHistoryWithStore)(historySettings[AppConfigSettings.routerHistory], store);
  // } else{ 
  //   return createMemoryHistory(store);
  // }
};