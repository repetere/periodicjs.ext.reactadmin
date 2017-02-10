## Development Tips

#### Resfreshing Manifest/Navigation/Components

Reactadmin dynamically loads content via configurations defined on the server side of the application.  Although this is useful for dynamically configured UI's it may make it difficult to propagate changes to the front-end.  Having to restart the application to see changes can be pretty annoying while developing and so we have added some development specific resources.

Query Params:	
  * refresh
  	* When set to true the request to the server will trigger a refresh of the given configuration
  * refresh_log
  	* When set to true the resfreshed configuration will be written to the stdout of server side application

There are three sections in which to add the query param:
```javascript
// file src/actions/user.js in function fetchNavigation

function fetchNavigation (options = {}) {
	return (dispatch, getState) => {
      dispatch(this.navigationRequest());
      let state = getState();
      let basename = state.settings.basename;
      let headers = state.settings.userprofile.options.headers;
      delete headers.clientid_default;
      options.headers = Object.assign({}, options.headers, headers);
      //make `${ basename }/load/navigation` `${ basename }/load/navigation?refresh=true` to force navigation refresh when this action is triggered
      //make `${ basename }/load/navigation` `${ basename }/load/navigation?refresh=true&refresh_log=true` to also print changes to server side stdout
      return utilities.fetchComponent(`${ basename }/load/navigation`, options)()
        .then(response => {
          dispatch(this.navigationSuccessResponse(response));
        }, e => dispatch(this.navigationErrorResponse(e)));
    };
};

```
```javascript
// file src/actions/manfiest.js in function fetchManifest

function fetchManifest (options = {}) {
  return (dispatch, getState) => {
    dispatch(this.manifestRequest());
    let state = getState();
    let basename = state.settings.basename;
    let headers = state.settings.userprofile.options.headers;
    delete headers.clientid_default;
    options.headers = Object.assign({}, options.headers, headers);
    //make `${ basename }/load/manifest` `${ basename }/load/manifest?refresh=true` to force manifest refresh when this action is triggered
      //make `${ basename }/load/manifest` `${ basename }/load/manifest?refresh=true&refresh_log=true` to also print changes to server side stdout
    return utilities.fetchComponent(`${ basename }/load/manifest`, options)()
      .then(response => {
        dispatch(this.receivedManifestData(response.data.settings));
      }, e => dispatch(this.failedManifestRetrival(e)))
  };
}

```
```javascript
// file src/actions/ui.js in function fetchComponent
//make `${basename}/load/components/somecomponent` `${basename}/load/components/somecomponent?refresh=true` to force component reload on action trigger
//`${basename}/load/components/somecomponent?refresh=true&refresh_log=true` to also print changes to server side stdout
function fetchComponent (type) {
  let component, componentLoadError;
  //make 
  switch (type) {
    case constants.ui.LOGIN_COMPONENT:
      component = constants.ui.LOGIN_COMPONENT;
      if (!COMPONENTS[ component ]) COMPONENTS[ component ] = function (basename) {
        return fetchComponentUtil(`${basename}/load/components/login`);
      };
      break;
    case constants.ui.MAIN_COMPONENT:
      component = constants.ui.MAIN_COMPONENT;
      if (!COMPONENTS[ component ]) COMPONENTS[ component ] = function (basename) {
        return fetchComponentUtil(`${basename}/load/components/main`);
      };
      break;
    case constants.ui.ERROR_COMPONENTS:
      component = constants.ui.ERROR_COMPONENTS;
      if (!COMPONENTS[ component ]) COMPONENTS[ component ] = function (basename) {
        return fetchComponentUtil(`${basename}/load/components/error`);
      };
      break;
    default:
    component = false;
  }
  return function (dispatch, getState) {
    if (!component) {
      componentLoadError = new Error(`Can't fetch component - ${component}`);
        // console.log({ componentLoadError });
      dispatch(notification.errorNotification(componentLoadError));
      throw componentLoadError;
    }
    let state = getState();
    let basename = state.settings.basename;
    dispatch({ type: `INIT_${ component }`, });
    return COMPONENTS[component](basename)()
      .then(response => {
        dispatch(this.handleFetchedComponent(component, response));
      }, e => {
        dispatch(this.handleFailedFetchComponent(component, e));
        e.message = e.message += '. Cannot load ' + component;
        dispatch(notification.errorNotification(e, 10000));

      });
  }.bind(this);
};

//Its important to note that in the case of components each component is individually refreshed and so query params must be added to each individual route

```