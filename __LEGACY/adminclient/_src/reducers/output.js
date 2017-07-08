'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Immutable from 'immutable';

var initialState = {
  updatedAt: new Date(),
  files: [],
  error: undefined
};

var outputReducer = function outputReducer(state, action) {
  switch (action.type) {
    case _constants2.default.output.OUTPUT_FILE_DATA_SUCCESS:
      var outputPayload = action.payload;
      return (0, _assign2.default)({}, state, {
        updatedAt: new Date(),
        files: state.files.concat([outputPayload])
      });
    case _constants2.default.output.OUTPUT_FILE_DATA_ERROR:
      var errorPayload = action.payload;
      return (0, _assign2.default)({}, state, {
        updatedAt: new Date(),
        error: errorPayload
      });
    default:
      return (0, _assign2.default)({}, initialState, state);
  }
};

exports.default = outputReducer;