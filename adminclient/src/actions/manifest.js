import constants from '../constants';
import utilities from '../util';
//ok okssss
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
  unauthenticatedManifestRequest() {
    return {
      type: constants.manifest.UNAUTHENTICATED_MANIFEST_DATA_REQUEST,
      payload: { },
    };
  },
  unauthenticatedReceivedManifestData (data) {
    return {
      type: constants.manifest.UNAUTHENTICATED_MANIFEST_DATA_SUCCESS,
      payload: data,
    };
  },
  unauthenticatedFailedManifestRetrival (error) {
    return {
      type: constants.manifest.UNAUTHENTICATED_MANIFEST_DATA_FAILURE,
      payload: { error, },
    };
  },
  fetchManifest (options = {}) {
    return (dispatch, getState) => {
      dispatch(this.manifestRequest());
      let state = getState();
      let basename = (typeof state.settings.adminPath ==='string' && state.settings.adminPath !=='/') ? state.settings.basename+state.settings.adminPath : state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = Object.assign({}, options.headers, headers);
      //add ?refresh=true to below route to reload manifest configuration
      
      return utilities.fetchComponent(`${ basename }/load/manifest${(state.settings.ui.initialization.refresh_manifests)?'?refresh=true':''}`, options)()
        .then(response => {
          dispatch(this.receivedManifestData(response.data.settings));
        }, e => dispatch(this.failedManifestRetrival(e)));
    };
  },
  fetchUnauthenticatedManifest () {
    return (dispatch, getState) => {
      dispatch(this.unauthenticatedManifestRequest());
      let state = getState();
      let basename = (typeof state.settings.adminPath ==='string' && state.settings.adminPath !=='/') ? state.settings.basename+state.settings.adminPath : state.settings.basename;
      //add ?refresh=true to below route to reload manifest configuration
      
      return utilities.fetchComponent(`${basename}/load/public_manifest`)()
        .then(response => {
          dispatch(this.unauthenticatedReceivedManifestData(response.data.settings));
        }, e => dispatch(this.unauthenticatedFailedManifestRetrival(e)));
    };
  },
};

export default manifest;