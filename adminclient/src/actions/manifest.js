import constants from '../constants';
import utilities from '../util';

const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const manifest = {
  manifestRequest() {
    return {
      type: constants.manifest.MANIFEST_DATA_REQUEST,
      payload: { },
    };
  },
  receivedManifestData (data) {
    return {
      type: constants.manifest.MANIFEST_DATA_SUCCESS,
      payload: data,
    };
  },
  failedManifestRetrival (error) {
    return {
      type: constants.manifest.MANIFEST_DATA_FAILURE,
      payload: { error, },
    };
  },
  fetchManifest () {
    return function (dispatch) {
      dispatch(this.manifestRequest);
      return fetchComponent(`${ window.__padmin.hostname }/load/manifest`)
        .then(response => {
          dispatch(this.receivedManifestData(response.data.settings));
        }, e => dispatch(this.failedManifestRetrival(e)))
    }
  }
};

export default manifest;