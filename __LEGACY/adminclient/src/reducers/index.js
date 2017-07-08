import { combineReducers, } from 'redux';
import dynamicReducer from './dynamic';
import manifestReducer from './manifest';
import notificationReducer from './notification';
import userReducer from './user';
import outputReducer from './output';
import uiReducer from './ui';
import settingsReducer from './settings';
import { routerReducer, } from 'react-router-redux';

const ReactAdminReducer = combineReducers({
  dynamic: dynamicReducer,
  routing: routerReducer,
  settings: settingsReducer,
  ui: uiReducer,
  user: userReducer,
  output: outputReducer,
  manifest: manifestReducer,
  notification: notificationReducer,
});

export default ReactAdminReducer;