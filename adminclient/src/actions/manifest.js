import constants from '../constants';

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
  recievedManifestData(json) {
    return {
      type: constants.manifest.MANIFEST_DATA_SUCCESS,
      payload: json,
    };
  },
  failedManifestRetrival(error) {
    return {
      type: constants.manifest.MANIFEST_DATA_FAILURE,
      payload: { error, },
    };
  },
  getApplicationManifest() {
    return (dispatch, getState)=>{
      dispatch(this.manifestRequest());
      fetch('url', {})
        .then(checkStatus)
        .then(response => response.json())
        .then(responseData => {
          dispatch(this.recievedManifestData(responseData));
        })
        .catch(e => {
          dispatch(this.failedManifestRetrival(e));
        });
    };
  },
};

export default manifest;