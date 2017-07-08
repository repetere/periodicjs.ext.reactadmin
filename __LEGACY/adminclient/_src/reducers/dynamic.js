'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Immutable from 'immutable';

var initialState = {};

var dynamicReducer = function dynamicReducer(state, action) {
  switch (action.type) {
    case _constants2.default.dynamic.SET_DYNAMIC_DATA:
      var dynamicPayload = action.payload;
      return (0, _assign2.default)({}, state, (0, _defineProperty3.default)({}, dynamicPayload.prop, dynamicPayload.value));
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = dynamicReducer;