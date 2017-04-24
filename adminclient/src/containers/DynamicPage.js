import React, { Component, } from 'react';
// import AppSectionLoading from '../components/AppSectionLoading';
import AppSectionLoadingOverlay from '../components/AppSectionLoading/overlay';
import { getRenderedComponent, } from '../components/AppLayoutMap';
import constants from '../constants';
import utilities from '../util';

const isLoggedIn = function () {
  return window && !!window.localStorage[constants.jwt_token.TOKEN_NAME];
};

const determineDynamicRouteAccess = function (state, pathname) {
  if (state.manifest && state.manifest.containers) {
    let unauthRoutes;
    if (state.manifest.unauthenticated_routes) {
      unauthRoutes = state.manifest.unauthenticated_routes.reduce((expanded, key) => {
        expanded[key] = null;
        return expanded;
      }, {});
      unauthRoutes = utilities.findMatchingRoute(unauthRoutes, (state.settings.auth.admin_path) ? pathname.replace(state.settings.auth.admin_path, '') : pathname);
    }
    let hasDynamicRoute = Boolean(utilities.findMatchingRoute(state.manifest.containers, (state.settings.auth.admin_path) ? pathname.replace(state.settings.auth.admin_path, '') : pathname));
    return { authenticated: hasDynamicRoute, unauthenticated: Boolean(unauthRoutes), };
  }
  return false;
};

const _handleComponentLifecycle = function () {
  this.setState({ ui_is_loaded: false, async_data_is_loaded: false, });
  if(window && window.scrollTo){
    window.scrollTo(0, 0);
  }
  let parentState = this.props.getState();
  let pathname = (this.props.location.pathname && (this.props.location.pathname===window.location.pathname))
    ? this.props.location.pathname
    : window.location.pathname || window.location.href;
  let isAuthenticated = isLoggedIn();
  let mfapath = utilities.getMFAPath(parentState);
  let mfasetup = utilities.getMFASetupPath(parentState);
  // console.debug({mfasetup})
  let loginRedirect = () => {
    return this.props.reduxRouter.replace({
      pathname: (pathname.indexOf('p-admin')!==-1) ? `/p-admin/login?return_url=${pathname}` : `/login?return_url=${pathname}`,
      state: {
        nextPathname: pathname,
      },
    });
  };
  if (!isAuthenticated) {
    if (parentState.manifest && parentState.manifest.containers) {
      let isDynamicRoute = determineDynamicRouteAccess(parentState, pathname);
      if (!isDynamicRoute) {
        if (parentState.manifest && Array.isArray(parentState.manifest.unauthenticated_routes) && parentState.manifest.unauthenticated_routes.indexOf(pathname) !== -1) {
          return this.fetchData();
        }
        if (parentState.manifest && parentState.manifest.containers && Object.keys(parentState.manifest.containers).indexOf(pathname) !== -1) {
          return loginRedirect();
        }
        if (pathname === '/') return loginRedirect();
        return this.fetchDynamicErrorContent();
      } else {
        if (isDynamicRoute.unauthenticated) return this.fetchData();
        if (isDynamicRoute.authenticated) return loginRedirect();
        return this.fetchDynamicErrorContent();
      }
    }
    return this.fetchDynamicErrorContent();
  } else if (parentState.manifest && parentState.manifest.authenticated && parentState.manifest.authenticated.hasLoaded) {
    // console.debug('OUTSIDE CONDITION', {
    //   pathname, mfasetup,
    // });
    // console.debug('window.location.pathname', window.location.pathname);
    // console.debug('this.props.location.pathname', this.props.location.pathname);
    // console.debug('window.location.href', window.location.href);
    if ((pathname === mfapath && window.location.pathname === mfapath) || (pathname === mfasetup && window.location.pathname === mfasetup)) {
      // console.debug('OK LOAD', { pathname, mfasetup, }, 'window.location.pathname', window.location.pathname);
      return this.fetchData();
    } else {
      let isValid = this.props.enforceMFA(true);
      if (isValid) this.fetchData();
    }
  } else {
    return this.props.initializeAuthenticatedUser(parentState.user.jwt_token, false)
      .then(() => this.props.enforceMFA(true))
      .then(isValid => {
        if (isValid) this.fetchData();
      }, e => this.fetchDynamicErrorContent(pathname));
  }
};

class DynamicPage extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      ui_is_loaded: false,
      async_data_is_loaded: false,
    };
    this.overlayUIWrapperStyle = this.props.getState().ui.customOverlayWrapperStyle;
    this.uiLayout = null;
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.handleComponentLifecycle = _handleComponentLifecycle.bind(this);
    this.fetchData = utilities.fetchDynamicContent.bind(this);
  }
  fetchDynamicErrorContent (/*pathname*/) {
    return utilities.fetchErrorContent.call(this); 
  }
  componentDidMount () { 
    this.handleComponentLifecycle();
  }
  componentWillReceiveProps(/*nextProps*/) {
    // console.debug({ nextProps });
    this.handleComponentLifecycle();
  }
  render() {
    // console.debug('this.props.getState()', this.props.getState(),'this.overlayUIWrapperStyle',this.overlayUIWrapperStyle);
    return (<div id="__ra_dp" className={(this.state.ui_is_loaded)?'__reactadmin_dp_loaded':'__reactadmin_dp_loading'}>
      <AppSectionLoadingOverlay display={!this.state.ui_is_loaded} wrapperstyle={
        Object.assign({}, {
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          // opacity:0.8,
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex:100,
        }, this.overlayUIWrapperStyle)} /> 
      {
        (this.state.async_data_is_loaded && this.uiLayout) ? this.uiLayout : this.uiLayout //null
      }
    </div>);
  }
}

export default DynamicPage;
