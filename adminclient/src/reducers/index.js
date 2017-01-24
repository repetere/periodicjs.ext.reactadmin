import { combineReducers, } from 'redux';
// import pageReducer from './pages';
// import fetchDataReducer from './fetchData';
// import messageBarReducer from './messageBar';
// import clientCacheDataReducer from './pages';
import manifestReducer from './manifest';
import userReducer from './user';
import uiReducer from './ui';
import settingsReducer from './settings';
import { routerReducer, } from 'react-router-redux';

const NativeCMSReducer = combineReducers({
  // page: pageReducer,
  // tabBarExtensions: tabBarExtensionReducer,
  // fetchData: fetchDataReducer,
  // messageBar: messageBarReducer,
  // clientCacheData: clientCacheDataReducer,
  routing: routerReducer,
  settings: settingsReducer,
  ui: uiReducer,
  user: userReducer,
  manifest: manifestReducer,
});

export default NativeCMSReducer;