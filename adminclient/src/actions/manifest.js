import constants from '../constants';
import utilities from '../util';

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
  fetchManifest (options = {}) {
    return (dispatch) => {
      dispatch(this.manifestRequest());
      return utilities.fetchComponent(`${ window.__padmin.basename }/load/manifest`, options)()
        .then(response => {
          dispatch(this.receivedManifestData(response.data.settings));
        }, e => dispatch(this.failedManifestRetrival(e)))
    };
  }
};

export default manifest;