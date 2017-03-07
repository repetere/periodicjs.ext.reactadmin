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
    let manifestAction = (dispatch, getState) => {
      dispatch(this.manifestRequest());
      let state = getState();
      if (state.manifest && state.manifest.containers && Object.keys(state.manifest.containers).length) {
        dispatch(this.receivedManifestData(state.manifest));
      } 
      let basename = (typeof state.settings.adminPath ==='string' && state.settings.adminPath !=='/') ? state.settings.basename+state.settings.adminPath : state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = Object.assign({}, options.headers, headers);
      //add ?refresh=true to below route to reload manifest configuration
      return utilities.fetchComponent(`${ basename }/load/manifest${(state.settings.ui.initialization.refresh_manifests)?'?refresh=true':''}`, options)()
        .then(response => {
          dispatch(this.receivedManifestData(response.data.settings));
          return response;
        }, e => dispatch(this.failedManifestRetrival(e)));
    };
    return utilities.setCacheConfiguration(manifestAction, 'manifest.authenticated');
  },
  fetchUnauthenticatedManifest () {
    let unauthenticatedManifestAction = (dispatch, getState) => {
      dispatch(this.unauthenticatedManifestRequest());
      let state = getState();
      if (state.manifest && state.manifest.containers && Object.keys(state.manifest.containers).length) {
        dispatch(this.unauthenticatedReceivedManifestData(state.manifest));
      } 
      let basename = (typeof state.settings.adminPath ==='string' && state.settings.adminPath !=='/') ? state.settings.basename+state.settings.adminPath : state.settings.basename;
      //add ?refresh=true to below route to reload manifest configuration
      
      return utilities.fetchComponent(`${basename}/load/public_manifest`)()
        .then(response => {
          dispatch(this.unauthenticatedReceivedManifestData(response.data.settings));
          return response;
        }, e => dispatch(this.unauthenticatedFailedManifestRetrival(e)));
    };
    return utilities.setCacheConfiguration(unauthenticatedManifestAction, 'manifest.unauthenticated');
  },
};

export default manifest;