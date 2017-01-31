import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import styles from '../../styles';
import navigation from '../../content/config/default_navigation';
// import { Menu, MenuLabel, MenuLink, MenuList, } from 're-bulma'; //Icon

class AppSidebar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = props;
  // }
  // componentWillReceiveProps (props) {
  //   this.setState(props);
  // }
  // componentDidMount() {
  //   // let state = this.props.getState();
  //   // if (state.settings && state.settings.user && state.settings.user.navigation && Array.isArray(state.settings.user.navigation.children)) {
  //   //   this.setState(Object.assign({}, this.state, { navigation: state.settings.user.navigation, }));
  //   // }
  // }
  render() {
    // console.log('this.props',this.props)
    let navigationLayout = {};
    let navigationWrapper = {};
    let navigationContainer = {};
    if (this.props.settings && this.props.settings.user && this.props.settings.user.navigation && this.props.settings.user.navigation) {
      navigationLayout = this.props.settings.user.navigation.layout || {};
      navigationWrapper = this.props.settings.user.navigation.wrapper || {};
      navigationContainer = this.props.settings.user.navigation.container || {};
    }
    return (
      <div style={Object.assign({ padding: '1rem', borderRight:'1px solid black', }, styles.fullHeight, styles.mainContainer, navigationContainer.style)}
        className={(this.props.ui.sidebar_is_open) ? 'animated fadeInLeft Nav-Sidebar-Speed' : 'animated slideOutLeft Nav-Sidebar-Speed'}>
        <div style={Object.assign({
          position: 'fixed',
        }, navigationWrapper.style)}>
          {getRenderedComponent.call(this, (navigationLayout && typeof navigationLayout === 'object') ? navigationLayout : navigation.layout)}
        </div>
      </div>
    );
  }
}

export default AppSidebar;
