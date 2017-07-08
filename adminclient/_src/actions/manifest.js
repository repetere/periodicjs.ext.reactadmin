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
      var isInitial = state.manifest.authenticated.isInitial;
      delete headers.clientid_default;
      options.headers = (0, _assign2.default)({}, options.headers, headers);
      //add ?refresh=true to below route to reload manifest configuration
      return _util2.default.loadCacheConfigurations().then(function (result) {
        hasCached = result.manifest && result.manifest.authenticated;
        if (hasCached && !options.skip_cache) dispatch(_this.receivedManifestData(result.manifest.authenticated));
        var refreshComponents = state.settings.ui.initialization.refresh_components;
        var pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : _this.props.location.pathname;
        var params = isInitial || refreshComponents ? '?' + (isInitial ? 'initial=true&location=' + pathname : '') + (refreshComponents ? isInitial ? '&refresh=true' : 'refresh=true' : '') : '';
        return _util2.default.fetchComponent(basename + '/load/manifest' + params, options)();
      }).then(function (response) {
        dispatch(_this.receivedManifestData(response.data.settings));
        if (isInitial) _this.fetchManifest((0, _assign2.default)(options, { skip_cache: true }))(dispatch, getState);
        return response;
      }, function (e) {
        if (!hasCached) dispatch(_this.failedManifestRetrival(e));
      });
    };
    return _util2.default.setCacheConfiguration(manifestAction, 'manifest.authenticated');
  },
  fetchUnauthenticatedManifest: function fetchUnauthenticatedManifest() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var unauthenticatedManifestAction = function unauthenticatedManifestAction(dispatch, getState) {
      dispatch(_this2.unauthenticatedManifestRequest());
      var state = getState();
      var hasCached = void 0;
      var isInitial = state.manifest.unauthenticated.isInitial;
      var basename = typeof state.settings.adminPath === 'string' && state.settings.adminPath !== '/' ? state.settings.basename + state.settings.adminPath : state.settings.basename;
      //add ?refresh=true to below route to reload manifest configuration
      return _util2.default.loadCacheConfigurations().then(function (result) {
        hasCached = result.manifest && result.manifest.unauthenticated;
        if (hasCached && !options.skip_cache) dispatch(_this2.unauthenticatedReceivedManifestData(result.manifest.unauthenticated));
        var pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : _this2.props.location.pathname;
        return _util2.default.fetchComponent(basename + '/load/public_manifest' + (isInitial ? '?initial=true&location=' + pathname : ''))();
      }).then(function (response) {
        dispatch(_this2.unauthenticatedReceivedManifestData(response.data.settings));
        if (isInitial) _this2.fetchUnauthenticatedManifest({ skip_cache: true })(dispatch, getState);
        return response;
      }, function (e) {
        if (!hasCached) dispatch(_this2.unauthenticatedFailedManifestRetrival(e));
      });
    };
    return _util2.default.setCacheConfiguration(unauthenticatedManifestAction, 'manifest.unauthenticated');
  }
};

exports.default = manifest;