'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ok okssss
var manifest = {
  manifestRequest: function manifestRequest() {
    return {
      type: _constants2.default.manifest.MANIFEST_DATA_REQUEST,
      payload: {}
    };
  },
  receivedManifestData: function receivedManifestData(data) {
    return {
      type: _constants2.default.manifest.MANIFEST_DATA_SUCCESS,
      payload: data
    };
  },
  failedManifestRetrival: function failedManifestRetrival(error) {
    return {
      type: _constants2.default.manifest.MANIFEST_DATA_FAILURE,
      payload: { error: error }
    };
  },
  unauthenticatedManifestRequest: function unauthenticatedManifestRequest() {
    return {
      type: _constants2.default.manifest.UNAUTHENTICATED_MANIFEST_DATA_REQUEST,
      payload: {}
    };
  },
  unauthenticatedReceivedManifestData: function unauthenticatedReceivedManifestData(data) {
    return {
      type: _constants2.default.manifest.UNAUTHENTICATED_MANIFEST_DATA_SUCCESS,
      payload: data
    };
  },
  unauthenticatedFailedManifestRetrival: function unauthenticatedFailedManifestRetrival(error) {
    return {
      type: _constants2.default.manifest.UNAUTHENTICATED_MANIFEST_DATA_FAILURE,
      payload: { error: error }
    };
  },
  fetchManifest: function fetchManifest() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var manifestAction = function manifestAction(dispatch, getState) {
      dispatch(_this.manifestRequest());
      var state = getState();
      var hasCached = void 0;
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      var headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = (0, _assign2.default)({}, options.headers, headers);
      //add ?refresh=true to below route to reload manifest configuration
      return _util2.default.loadCacheConfigurations().then(function (result) {
        hasCached = result.manifest && result.manifest.authenticated;
        if (hasCached) dispatch(_this.receivedManifestData(result.manifest.authenticated));
        return _util2.default.fetchComponent(basename + '/load/manifest' + (state.settings.ui.initialization.refresh_manifests ? '?refresh=true' : ''), options)();
      }).then(function (response) {
        dispatch(_this.receivedManifestData(response.data.settings));
        return response;
      }, function (e) {
        if (!hasCached) dispatch(_this.failedManifestRetrival(e));
      });
    };
    return _util2.default.setCacheConfiguration(manifestAction, 'manifest.authenticated');
  },
  fetchUnauthenticatedManifest: function fetchUnauthenticatedManifest() {
    var _this2 = this;

    var unauthenticatedManifestAction = function unauthenticatedManifestAction(dispatch, getState) {
      dispatch(_this2.unauthenticatedManifestRequest());
      var state = getState();
      var hasCached = void 0;
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      //add ?refresh=true to below route to reload manifest configuration
      return _util2.default.loadCacheConfigurations().then(function (result) {
        hasCached = result.manifest && result.manifest.unauthenticated;
        if (hasCached) dispatch(_this2.unauthenticatedReceivedManifestData(result.manifest.unauthenticated));
        return _util2.default.fetchComponent(basename + '/load/public_manifest')();
      }).then(function (response) {
        dispatch(_this2.unauthenticatedReceivedManifestData(response.data.settings));
        return response;
      }, function (e) {
        if (!hasCached) dispatch(_this2.unauthenticatedFailedManifestRetrival(e));
      });
    };
    return _util2.default.setCacheConfiguration(unauthenticatedManifestAction, 'manifest.unauthenticated');
  }
};

exports.default = manifest;