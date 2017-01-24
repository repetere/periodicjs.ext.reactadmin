import React, { Component } from 'react';
import { Menu, MenuLabel, MenuLink, MenuList, } from 're-bulma'; //Icon
import { getRenderedComponent, } from '../AppLayoutMap';
import styles from '../../styles';
import navigation from '../../content/config/navigation';

function getCustomSidebar() {
  
}

class AppSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    // this.previousRoute = {};
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);
    this.setState(nextProps);
  }
  render() {
    // console.log('this.props', this.props);
    return (
      <div style={Object.assign({ padding: '1rem', borderRight:'1px solid black'}, styles.fullHeight, styles.mainContainer)}
        className={(this.state.ui.sidebar_is_open) ? 'animated fadeInLeft Nav-Sidebar-Speed' : 'animated slideOutLeft Nav-Sidebar-Speed'}>
        <div style={{
          position: 'fixed',
        }}>
          {getRenderedComponent(navigation)}
        </div>
      </div>
    );
    // return (
    //   <Animate component="div" type="bounce">
    //     <div>sidebar</div>
    //   </Animate>
    // );
  }
}

export default AppSidebar;
