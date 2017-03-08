'use strict';

// const PathRegExp = require('path-to-regexp');
// const ssr_manifest = require('ssr_manifest');
//babel utility/ssr_manifest_es6.js > utility/ssr_manifest.js
//babel adminclient/src -d adminclient/_src --ignore adminclient/src/components/RACodeMirror/

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _SSR = require('../adminclient/_src/containers/SSR');

var _SSR2 = _interopRequireDefault(_SSR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (manifest) {
  return new _promise2.default(function (resolve, reject) {
    try {
      if (manifest && manifest.layout) {
        var body = (0, _server.renderToString)(_react2.default.createElement(_SSR2.default, manifest));
        resolve(body, manifest.pageData ? manifest.pageData : {});
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

