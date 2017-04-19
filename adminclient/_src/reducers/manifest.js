'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultManifest = {
  containers: {
    '/healthcheck': {
      layout: {
        component: 'Hero',
        props: {
          size: 'isFullheight'
        },
        children: [{
          component: 'HeroBody',
          props: {},
          children: [{
            component: 'Container',
            props: {},
            children: [{
              component: 'RawOutput',
              asyncprops: {
                healthcheck: ['healthcheckStatus']
              }
            }, {
              component: 'Title',
              children: 'Documentation Page Healthcheck'
            }]
          }]
        }]
      },
      resources: {},
      onFinish: 'render',
      pageData: {
        title: 'Healthcheck',
        navLabel: 'Healthcheck'
      }
    }
  }
};
// console.log({defaultManifest})
// import Immutable from 'immutable';

var initialState = {
  isFetching: false,
  hasLoaded: false,
  error: null,
  updatedAt: new Date(),
  isInitial: true,
  containers: defaultManifest.containers,
  unauthenticated_routes: null,
  unauthenticated: {
    isFetching: false,
    hasLoaded: false,
    error: null,
    isInitial: true,
    updatedAt: new Date()
  },
  unauthenticated_success: {
    isFetching: false,
    hasLoaded: false,
    error: null,
    isInitial: true,
    updatedAt: new Date()
  }
};

var manifestReducer = function manifestReducer(state, action) {
  // let unauthenticated;
  switch (action.type) {
    case _constants2.default.manifest.MANIFEST_DATA_REQUEST:
      return (0, _assign2.default)({}, state, {
        isFetching: true,
        hasLoaded: false,
        error: null,
        updatedAt: new Date()
      });
    case _constants2.default.manifest.MANIFEST_DATA_FAILURE:
      var failurePayload = action.payload;
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        hasLoaded: false,
        error: failurePayload.error,
        updatedAt: new Date()
      });
    case _constants2.default.manifest.MANIFEST_DATA_SUCCESS:
      var manifestSuccessPayload = action.payload;
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        hasLoaded: true,
        isInitial: false,
        error: null,
        containers: (0, _assign2.default)({}, state.containers, manifestSuccessPayload.containers),
        updatedAt: new Date()
      });
    case _constants2.default.manifest.UNAUTHENTICATED_MANIFEST_DATA_REQUEST:
      var unauthenticated_req = (0, _assign2.default)({}, state.unauthenticated, {
        isFetching: true,
        hasLoaded: false,
        error: null,
        updatedAt: new Date()
      });
      return (0, _assign2.default)({}, state, {
        unauthenticated_req: unauthenticated_req
      });
    case _constants2.default.manifest.UNAUTHENTICATED_MANIFEST_DATA_FAILURE:
      failurePayload = action.payload;
      var unauthenticated_fail = (0, _assign2.default)({}, state.unauthenticated, {
        isFetching: false,
        hasLoaded: false,
        error: failurePayload.error,
        updatedAt: new Date()
      });
      return (0, _assign2.default)({}, state, {
        unauthenticated_fail: unauthenticated_fail
      });
    case _constants2.default.manifest.UNAUTHENTICATED_MANIFEST_DATA_SUCCESS:
      var unauthenticatedSuccessPayload = action.payload;
      var unauthenticated_success = (0, _assign2.default)({}, state.unauthenticated, {
        isFetching: false,
        hasLoaded: true,
        isInitial: false,
        error: null,
        updatedAt: new Date()
      });
      return (0, _assign2.default)({}, state, {
        unauthenticated_success: unauthenticated_success,
        containers: (0, _assign2.default)({}, state.containers, unauthenticatedSuccessPayload.containers),
        unauthenticated_routes: (0, _keys2.default)(unauthenticatedSuccessPayload.containers || {})
      });
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = manifestReducer;