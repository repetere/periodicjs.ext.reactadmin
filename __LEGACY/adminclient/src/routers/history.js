// import { Platform, } from 'react-native';
import { browserHistory, hashHistory, createMemoryHistory, } from 'react-router';
import { syncHistoryWithStore, } from 'react-router-redux';

exports.historySettings = { browserHistory, hashHistory, createMemoryHistory, };

exports.getHistory = (historySettings, AppConfigSettings, store) => {
  // if(Platform.OS === 'web') {
  return syncHistoryWithStore(historySettings[  AppConfigSettings.routerHistory ], store);
  // } else{ 
  //   return createMemoryHistory(store);
  // }
};
  