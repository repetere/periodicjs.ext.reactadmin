import constants from '../constants';
// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';


const dynamic = {
  setDynamicData(prop, value) {
    return {
      type: constants.dynamic.SET_DYNAMIC_DATA,
      payload: { prop, value, },
    };
  },
};

export default dynamic;