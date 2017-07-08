'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';


var dynamic = {
  setDynamicData: function setDynamicData(prop, value) {
    return {
      type: _constants2.default.dynamic.SET_DYNAMIC_DATA,
      payload: { prop: prop, value: value }
    };
  }
};

exports.default = dynamic;