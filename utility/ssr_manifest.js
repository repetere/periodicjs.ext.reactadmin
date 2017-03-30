'use strict';

// const PathRegExp = require('path-to-regexp');
// const ssr_manifest = require('ssr_manifest');
//babel utility/ssr_manifest_es6.js > utility/ssr_manifest.js
//babel adminclient/src -d adminclient/_src --ignore adminclient/src/components/RACodeMirror/

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _SSR = require('../adminclient/_src/containers/SSR');

var _SSR2 = _interopRequireDefault(_SSR);

var _util = require('../adminclient/_src/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('isomorphic-fetch');

console.debug = console.log;

module.exports = function (options) {
  return new _promise2.default(function (resolve, reject) {
    try {
      var layoutPath = options.layoutPath,
          manifest = options.manifest,
          req_url = options.req_url,
          basename = options.basename;

      if (manifest && manifest.layout) {
        if ((0, _keys2.default)(manifest.resources).length) {
          var resources = _util2.default._handleDynamicParams(layoutPath, manifest.resources, req_url);
          // console.log({ resources,manifest });

          _util2.default.fetchPaths(basename, resources, {}).then(function (_resources) {
            // console.log({ _resources });
            var dyanmicManifest = (0, _assign2.default)({}, manifest, { resources: _resources });
            var body = (0, _server.renderToString)(_react2.default.createElement(_SSR2.default, dyanmicManifest));
            resolve({ body: body, pagedata: manifest.pageData });
          }).catch(function (e) {
            console.error(e);
            var body = (0, _server.renderToString)(_react2.default.createElement(_SSR2.default, manifest));
            resolve({ body: body, pagedata: manifest.pageData });
          });
        } else {
          var body = (0, _server.renderToString)(_react2.default.createElement(_SSR2.default, manifest));
          resolve({ body: body, pagedata: manifest.pageData });
        }
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

