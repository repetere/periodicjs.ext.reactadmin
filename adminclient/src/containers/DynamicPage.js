import React, { Component } from 'react';
import { Hero, HeroBody, Container, Content, } from 're-bulma';
import styles from '../styles';
import AppSectionLoading from '../components/AppSectionLoading';
import { getRenderedComponent, } from '../components/AppLayoutMap';
import utilities from '../util';

let AppManifest = {};
class PageNotFound extends Component { 
  render() {
    return <Hero style={styles.mainContainer}>
    <HeroBody>  
      <Container>  
        <Content>  
          <h1>PAGE NOT FOUND</h1>  
          <div>{window.location.href}</div>
        </Content>
      </Container>
    </HeroBody>  
  </Hero>
  }
}

const setAppManifest = (props) => {
  if (props.containers && props.updatedAt !== AppManifest.updatedAt) {
    AppManifest = props;
  }
};


class DynamicPage extends Component {
  constructor(props) {
    const Props = Object.assign({}, props, props.getState());
    super(props);
    setAppManifest(Props.manifest);
    this.state = {
      ui_is_loaded: false,
      async_data_is_loaded: false,
    };
    this.uiLayout;
  }

  fetchData (options = {}) {
    const pathname = (window.location.pathname) ? window.location.pathname : this.props.location.pathname;
    if (AppManifest.containers[pathname]) {
      let layout = Object.assign({}, AppManifest.containers[pathname].layout);
      if (AppManifest.containers[pathname].resources && typeof AppManifest.containers[pathname].resources === 'object') {
        return utilities.fetchPaths(window.__padmin.basename, AppManifest.containers[pathname].resources)
          .then(resources => {
            this.uiLayout = getRenderedComponent(layout, resources);
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
          })
          .catch(e => {
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
          });
      }
      else {
        this.uiLayout = getRenderedComponent(AppManifest.containers[pathname].layout);
        this.setState({ ui_is_loaded: true });
      }
    }
    else {
      this.uiLayout = <PageNotFound/>;
      this.setState({ ui_is_loaded: true });
    }
  }
  componentDidMount() { // console.log('component DId Mount', this.props);
    this.setState({ ui_is_loaded: false });
    this.fetchData();
  }
  componentWillReceiveProps(nextProps) { // console.log('DynamicPage componentWillReceiveProps nextProps', nextProps);
    this.setState({ ui_is_loaded: false });
    this.fetchData();
  }
  render() {
    return (this.state.ui_is_loaded ===false)? <AppSectionLoading/> : this.uiLayout;
  }
}

export default DynamicPage;
