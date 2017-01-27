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
  }

  fetchData (/*options = {}*/) {
    const pathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
    this.getRenderedComponent = getRenderedComponent.bind(this);
    if (AppManifest.containers[pathname]) {
      let layout = Object.assign({}, AppManifest.containers[pathname].layout);
      if (AppManifest.containers[pathname].resources && typeof AppManifest.containers[pathname].resources === 'object') {
        return utilities.fetchPaths(this.props.getState().settings.basename, AppManifest.containers[pathname].resources)
          .then(resources => {
            this.uiLayout = this.getRenderedComponent(layout, resources);
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
          })
          .catch(e => {
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true, });
          });
      } else {
        this.uiLayout = this.getRenderedComponent(AppManifest.containers[pathname].layout);
        this.setState({ ui_is_loaded: true, });
      }
    } else {
      this.uiLayout = <AppError404/>;
      this.setState({ ui_is_loaded: true, });
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
