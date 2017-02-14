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
};

const manifestReducer = (state, action) => {
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
      containers: manifestSuccessPayload.containers,
      updatedAt: new Date(),
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default manifestReducer;