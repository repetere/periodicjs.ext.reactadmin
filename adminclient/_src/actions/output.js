'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _fileSaver = require('file-saver');

var _fileSaver2 = _interopRequireDefault(_fileSaver);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { AsyncStorage, } from 'react-web';
// import customSettings from '../content/config/settings.json';
// import Immutable from 'immutable';

var getBlobData = function getBlobData(options) {
  // console.debug('getBlobData', { options });
  var data = options.data,
      filename = options.filename,
      type = options.type;

  if (!data) {
    data = options;
  }
  if (!type || type === 'json') {
    type = 'application/json;charset=utf-8';
  }
  if (type === 'json' || type === 'application/json;charset=utf-8') {
    data = (0, _stringify2.default)(data, null, 2);
  }
  if (type && filename && _path2.default.extname(filename) === '') {
    filename += '.' + _mime2.default.extension(type);
  }
  if (!filename) {
    filename = 'output.json';
  }
  // console.debug('before blob data',data );
  var blob = new Blob([data], { type: type });
  // let blob = new Blob([ data, ], { type, });
  _fileSaver2.default.saveAs(blob, filename);

  return { filename: filename, type: type };
};

var output = {
  fileSaver: function fileSaver(options) {
    var _getBlobData = getBlobData(options),
        filename = _getBlobData.filename,
        type = _getBlobData.type;

    try {
      return {
        type: _constants2.default.output.OUTPUT_FILE_DATA_SUCCESS,
        payload: { filename: filename, type: type }
      };
    } catch (e) {
      return {
        type: _constants2.default.output.OUTPUT_FILE_DATA_ERROR,
        payload: { filename: filename, type: type, e: e }
      };
    }
  }
};

exports.default = output;