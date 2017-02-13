import React, { Component, } from 'react';
// import styles from '../styles';
import AppSectionLoading from '../components/AppSectionLoading';
import AppError404 from '../components/AppError404';
import { getRenderedComponent, } from '../components/AppLayoutMap';
// import constants from '../constants';
// import { AsyncStorage, } from 'react-native';
import utilities from '../util';

let AppManifest = {};

const setAppManifest = (props) => {
  // console.log('setAppManifest props',props)
  if (props.containers && props.updatedAt !== AppManifest.updatedAt) {
    AppManifest = props;
  }
};

const _handleComponentLifecycle = function () {
  this.setState({ ui_is_loaded: false, });
  let parentState = this.props.getState();
  let pathname = (this.props.location.pathname) ? this.props.location.pathname : window.location.pathname;
  if (parentState.manifest && parentState.manifest.hasLoaded) {
    if (pathname === '/mfa' && window.location.pathname === '/mfa') this.fetchData();
    else {
      let isValid = this.props.enforceMFA(true);
      if (isValid) this.fetchData();
    }
  } else {
    this.props.initializeAuthenticatedUser(parentState.user.jwt_token, false)
      .then(() => this.props.enforceMFA(true))
      .then(isValid => {
        if (isValid) this.fetchData();
      }, e => this.fetchDynamicErrorContent(pathname));
  }
};

class DynamicPage extends Component {
  constructor(props) {
    const Props = Object.assign({}, props, props.getState());
    // console.log({ Props });
    super(props);
    setAppManifest(Props.manifest);
    this.state = {
      ui_is_loaded: false,
      async_data_is_loaded: false,
    };
    this.uiLayout = {};
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.handleComponentLifecycle = _handleComponentLifecycle.bind(this);
  }
  fetchDynamicPageContent (pathname, hasParams) {
    let layout = Object.assign({}, AppManifest.containers[pathname].layout);
    if (AppManifest.containers[pathname].resources && typeof AppManifest.containers[pathname].resources === 'object') {
      let resources = AppManifest.containers[pathname].resources
      if (hasParams) {
        let currentPathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
        resources = Object.keys(resources).reduce((result, key) => {
          let updatedPath = utilities.setParameters({
            route: pathname,
            location: currentPathname,
            query: (/\?[^\s]+$/.test(currentPathname)) ? currentPathname.replace(/\?([^\s]+)$/g, '$1') : undefined,
            resource: resources[key]
          });
          result[key] = updatedPath;
          return result;
        }, {});
      }
      // console.log('AppManifest.containers[pathname]',AppManifest.containers[pathname]);
      if(AppManifest.containers[pathname].pageData && AppManifest.containers[pathname].pageData.title){
        window.document.title = AppManifest.containers[pathname].pageData.title;
      }
      if(AppManifest.containers[pathname].pageData && AppManifest.containers[pathname].pageData.navLabel){
        this.props.setNavLabel(AppManifest.containers[pathname].pageData.navLabel);
      } else{
        this.props.setNavLabel("");
      }
      return utilities.fetchPaths(this.props.getState().settings.basename, resources)
        .then(resources => {
          this.uiLayout = this.getRenderedComponent(layout, resources);
          this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
        })
        .catch(e => {
          this.props.errorNotification(e);
          this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
        });
    } else {
      this.uiLayout = this.getRenderedComponent(AppManifest.containers[pathname].layout);
      this.setState({ ui_is_loaded: true, });
    }
  }
  fetchDynamicErrorContent (/*pathname*/) {
    let custom404Error;
    let state = this.props.getState();
    if (state.ui && state.ui.components && state.ui.components.error && state.ui.components.error['404']) {
      let componentData = state.ui.components.error['404'];
      if (typeof componentData.status === 'undefined' || componentData.status === 'undefined' || componentData.status === 'uninitialized') {
        custom404Error = false;
      } else {
        if (componentData.resources && Object.keys(componentData.resources).length) {
          return utilities.fetchPaths(this.props.getState().settings.basename, componentData.resources)
            .then(resources => {
              this.uiLayout = this.getRenderedComponent(componentData.layout, resources);
              this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
            })
            .catch(e => {
              this.uiLayout = <AppError404 error={e}/>;
              this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
            });
        } else custom404Error = this.getRenderedComponent(componentData.layout);
      }
      custom404Error = (typeof componentData.status === 'undefined' || componentData.status === 'undefined' || componentData.status === 'uninitialized') ? false : this.getRenderedComponent(componentData.layout);
    }
    this.uiLayout = (custom404Error) ? custom404Error : <AppError404/>;
    window.document.title="Page Not Found";
    this.props.setNavLabel("Error");

    this.setState({ ui_is_loaded: true, });
  }
  fetchData (/*options = {}*/) {
    const pathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
    const state = this.props.getState();
    if (AppManifest.containers[pathname]) {
      return this.fetchDynamicPageContent(pathname);
    } else if (AppManifest.containers[pathname.replace(state.settings.auth.admin_path, '')]) {
      let adminPathname = pathname.replace(state.settings.auth.admin_path, ''); 
      return this.fetchDynamicPageContent(adminPathname);
    } else {
      let dynamicPathname = utilities.findMatchingRoute(state.manifest.containers, pathname.replace(state.settings.auth.admin_path, ''));
      console.log({ dynamicPathname });
      if (!dynamicPathname) return this.fetchDynamicErrorContent(pathname);
      return this.fetchDynamicPageContent(dynamicPathname, true);
    }
  }
  componentDidMount () { 
    // console.log('component DId Mount', this.props);
    this.handleComponentLifecycle();
    setAppManifest(this.props.getState().manifest);
  }
  componentWillReceiveProps (nextProps) { 
    // console.log('DynamicPage componentWillReceiveProps nextProps', nextProps, nextProps.getState());
    this.handleComponentLifecycle();
    setAppManifest(nextProps.getState().manifest);
  }
  render() {
    // const Props = Object.assign({}, this.props, this.props.getState());
    // console.log({ Props, });
    return (this.state.ui_is_loaded ===false)? <AppSectionLoading/> : this.uiLayout;
  }
}

export default DynamicPage;
