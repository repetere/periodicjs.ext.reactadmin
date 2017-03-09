import constants from '../constants';
import defaultManifest from '../content/config/manifest.json';
// console.log({defaultManifest})
// import Immutable from 'immutable';
const initialState = {
  isFetching: false,
  hasLoaded: false,
  error: null,
  updatedAt: new Date(),
  containers: defaultManifest.containers,
  unauthenticated_routes: null,
  unauthenticated: {
    isFetching: false,
    hasLoaded: false,
    error: null,
    updatedAt: new Date(),
  },
};

const manifestReducer = (state, action) => {
  // let unauthenticated;
  switch (action.type) {
  case constants.manifest.MANIFEST_DATA_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      hasLoaded: false,
      error: null,
      updatedAt: new Date(),
    });
  case constants.manifest.MANIFEST_DATA_FAILURE:
    var failurePayload = action.payload;
    return Object.assign({}, state, {
      isFetching: false,
      hasLoaded: false,
      error: failurePayload.error,
      updatedAt: new Date(),
    });
  case constants.manifest.MANIFEST_DATA_SUCCESS:
    var manifestSuccessPayload = action.payload;
    return Object.assign({}, state, {
      isFetching: true,
      hasLoaded: true,
      error: null,
      containers: Object.assign({}, state.containers, manifestSuccessPayload.containers),
      updatedAt: new Date(),
    });
  case constants.manifest.UNAUTHENTICATED_MANIFEST_DATA_REQUEST:
    var unauthenticated_req = Object.assign({}, state.unauthenticated, {
      isFetching: true,
      hasLoaded: false,
      error: null,
      updatedAt: new Date(),
    });
    return Object.assign({}, state, {
      unauthenticated_req,
    });
  case constants.manifest.UNAUTHENTICATED_MANIFEST_DATA_FAILURE:
    failurePayload = action.payload;
    var unauthenticated_fail = Object.assign({}, state.unauthenticated, {
      isFetching: false,
      hasLoaded: false,
      error: failurePayload.error,
      updatedAt: new Date(),
    });
    return Object.assign({}, state, {
      unauthenticated_fail,
    });
  case constants.manifest.UNAUTHENTICATED_MANIFEST_DATA_SUCCESS:
    var unauthenticatedSuccessPayload = action.payload;
    var unauthenticated_success = Object.assign({}, state.unauthenticated, {
      isFetching: true,
      hasLoaded: true,
      error: null,
      updatedAt: new Date(),
    });
    return Object.assign({}, state, {
      unauthenticated_success,
      containers: Object.assign({}, state.containers, unauthenticatedSuccessPayload.containers),
      unauthenticated_routes: Object.keys(unauthenticatedSuccessPayload.containers || {}),
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default manifestReducer;