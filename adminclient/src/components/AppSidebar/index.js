import React, { Component } from 'react';
// import { Nav, NavGroup, NavItem, Container, Button, } from 're-bulma'; //Icon
// import { Link, } from 'react-router';
// import Animate from 'react-animate.css';
// import styles from '../../styles';

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
    return (
      <div
        className={(this.state.ui.sidebar_is_open)?'animated fadeInLeft Nav-Sidebar-Speed':'animated slideOutLeft Nav-Sidebar-Speed'}>
        sidebar

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
