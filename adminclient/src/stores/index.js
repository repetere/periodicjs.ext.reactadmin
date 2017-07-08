import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import { routerMiddleware, } from 'react-router-redux';
import { browserHistory, hashHistory, } from 'react-router';
import AppConfigSettings from '../content/config/settings.json'; // import promise from 'redux-promise';
import createLogger from 'redux-logger';
const logger = createLogger();
// const logger = (store) => (next) => (action) => {
//   console.log('dispatching: ', action,{store});
//   return next(action);
// };

const getRouterHistoryType = function(routerHistoryType){
  return (routerHistoryType==='browserHistory') ? browserHistory : hashHistory;
}

const AppReduxStore = createStore(
  combinedReducers,
  applyMiddleware(
    thunk,
    routerMiddleware(getRouterHistoryType(AppConfigSettings.routerHistory))
    // promise,
    , logger
  )
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(combinedReducers, () => {
    const nextRootReducer = combinedReducers;
    AppReduxStore.replaceReducer(nextRootReducer);
  });
}

export default AppReduxStore;
