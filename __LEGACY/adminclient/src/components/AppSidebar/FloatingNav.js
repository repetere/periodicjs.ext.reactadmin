import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import styles from '../../styles';
// import navigation from '../../content/config/default_navigation';
import { Container, } from 're-bulma'; //Icon

class FloatingNav extends Component {
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
    let navigationFloatingContainer = {};
    if (this.props.settings && this.props.settings.user && this.props.settings.user.navigation && this.props.settings.user.navigation) {
      navigationLayout = this.props.settings.user.navigation.layout || {};
      navigationWrapper = this.props.settings.user.navigation.wrapper || {};
      navigationContainer = this.props.settings.user.navigation.container || {};
      navigationFloatingContainer = this.props.settings.user.navigation.floatingContainer || {};
    }
    return (
      <div style={Object.assign({
        padding: '1rem',
        paddingTop:'0',
        height: 'auto',
        position: 'fixed',
        width:'100%',
      }, styles.mainContainer, styles.floatingSidebarContainer, navigationContainer.style)}
        className={(this.props.ui.sidebar_is_open) ? 'animated fadeInDown Nav-Sidebar-Speed __ra_f_sc' : 'animated slideOutUp Nav-Sidebar-Speed  __ra_f_sc'}
      onClick={this.props.toggleUISidebar}
      >
        <Container {...navigationFloatingContainer}>
          <div style={Object.assign({
            overflow: 'hidden',
            overflowY: 'auto',
            backgroundColor: 'white',
            maxHeight: '20rem',
            width: '20rem',
          },
            navigationWrapper.style)}
            className=" __ra_f_w"
          >
            {
              this.getRenderedComponent((navigationLayout && typeof navigationLayout === 'object')
              ? navigationLayout
              : {})
            }
          </div>
        </Container>
      </div>
    );
  }
}

export default FloatingNav;