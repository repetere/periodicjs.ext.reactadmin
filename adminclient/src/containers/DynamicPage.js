import React, { Component, } from 'react';
// import styles from '../styles';
import AppSectionLoading from '../components/AppSectionLoading';
import AppError404 from '../components/AppError404';
import { getRenderedComponent, } from '../components/AppLayoutMap';
import utilities from '../util';

let AppManifest = {};

const setAppManifest = (props) => {
  if (props.containers && props.updatedAt !== AppManifest.updatedAt) {
    AppManifest = props;
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
  }
  fetchDynamicPageContent (pathname) {
    let layout = Object.assign({}, AppManifest.containers[pathname].layout);
    if (AppManifest.containers[pathname].resources && typeof AppManifest.containers[pathname].resources === 'object') {
      return utilities.fetchPaths(this.props.getState().settings.basename, AppManifest.containers[pathname].resources)
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
    this.setState({ ui_is_loaded: true, });
  }
  fetchData (/*options = {}*/) {
    const pathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
    const state = this.props.getState();
    if (AppManifest.containers[pathname]) {
      return this.fetchDynamicPageContent(pathname);
    } else if (AppManifest.containers[ pathname.replace(state.settings.auth.admin_path, '') ]) {
      let adminPathname = pathname.replace(state.settings.auth.admin_path, ''); 
      // console.log({ adminPathname, pathname, });
      return this.fetchDynamicPageContent(adminPathname, pathname);
    } else {
      return this.fetchDynamicErrorContent(pathname);
    }
  }
  componentDidMount() { // console.log('component DId Mount', this.props);
    this.setState({ ui_is_loaded: false, });
    this.fetchData();
  }
  componentWillReceiveProps(/*nextProps*/) { // console.log('DynamicPage componentWillReceiveProps nextProps', nextProps);
    this.setState({ ui_is_loaded: false, });
    this.fetchData();
  }
  render() {
    // const Props = Object.assign({}, this.props, this.props.getState());
    // console.log({ Props, });
    return (this.state.ui_is_loaded ===false)? <AppSectionLoading/> : this.uiLayout;
  }
}

export default DynamicPage;
