import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import styles from '../../styles';
// import navigation from '../../content/config/default_navigation';
// import { Menu, MenuLabel, MenuLink, MenuList, } from 're-bulma'; //Icon

class AppSidebar extends Component {
  constructor(props) {
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
  }
  // componentWillReceiveProps (props) {
  //   this.setState(props);
  // }
  componentDidMount () {
    if (this.props.ui && !this.props.ui.selected_nav) this.props.setActiveNavLink(this.props.location.pathname);
  }
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
      // {(this.props.ui.components.footer && typeof this.props.ui.components.footer==='object' && this.props.ui.components.footer.layout) 
      //   ? this.getRenderedComponent(this.props.ui.components.footer.layout)
      //   : ()
      // }


      <div style={Object.assign({ padding: '1rem', borderRight:'1px solid black', }, styles.fullHeight, styles.mainContainer, styles.sidebarContainer, navigationContainer.style)}
        className={(this.props.ui.sidebar_is_open) ? 'animated fadeInLeft Nav-Sidebar-Speed  __ra_sb_s' : 'animated slideOutLeft Nav-Sidebar-Speed  __ra_sb_s'}>
        <div style={Object.assign({
          position: 'fixed',
          height: '100%',
          overflowY:'auto',
        }, navigationWrapper.style)}
          className=" __ra_sb_w"
        >
          {
            this.getRenderedComponent((navigationLayout && typeof navigationLayout === 'object')
              ? navigationLayout
              : {})
          }
        </div>
      </div>
    );
  }
}

export default AppSidebar;