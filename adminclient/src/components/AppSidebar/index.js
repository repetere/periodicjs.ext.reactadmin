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
  // componentWillReceiveProps(nextProps) {
  //   this.setState(nextProps);
  // }
  // componentDidMount() {
  //   // let state = this.props.getState();
  //   // if (state.settings && state.settings.user && state.settings.user.navigation && Array.isArray(state.settings.user.navigation.children)) {
  //   //   this.setState(Object.assign({}, this.state, { navigation: state.settings.user.navigation, }));
  //   // }
  // }
  render() {
    console.log('this.props.ui.nav_data: ', this.props.ui.nav_data.container);
    return (
      <div style={Object.assign({ padding: '1rem', borderRight: '1px solid black', }, styles.fullHeight, styles.mainContainer, this.props.ui.nav_data.container.style)}
        className={(this.props.ui.sidebar_is_open) ? 'animated fadeInLeft Nav-Sidebar-Speed' : 'animated slideOutLeft Nav-Sidebar-Speed'}>
        <div style={Object.assign({
          position: 'fixed',
        }, this.props.ui.nav_data.wrapper.style)}>
          {getRenderedComponent.call(this, (this.props.ui.nav_data.layout && typeof this.props.ui.nav_data.layout === 'object') ? this.props.ui.nav_data.layout : navigation.layout)}
        </div>
      </div>
    );
  }
}

export default AppSidebar;
