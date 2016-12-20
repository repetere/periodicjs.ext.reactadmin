import React, { Component } from 'react';
import { Menu, MenuLabel, MenuLink, MenuList, } from 're-bulma'; //Icon
// import { Link, } from 'react-router';
// import Animate from 'react-animate.css';
import styles from '../../styles';

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
      <div style={Object.assign({ padding: '1rem', borderRight:'1px solid black'}, styles.fullHeight, styles.mainContainer)}
        className={(this.state.ui.sidebar_is_open) ? 'animated fadeInLeft Nav-Sidebar-Speed' : 'animated slideOutLeft Nav-Sidebar-Speed'}>
        <div style={{
          position: 'fixed',
        }}>
          <Menu>
            <MenuLabel>
              General
            </MenuLabel>
            <MenuList>
              <li><MenuLink href="#">Dashboard</MenuLink></li>
              <li><MenuLink href="#">Customers</MenuLink></li>
            </MenuList>
            <MenuLabel>
              Administration
            </MenuLabel>
            <MenuList>
              <li><MenuLink>Team Settings</MenuLink></li>
              <li>
                <MenuLink isActive>Manage Your Team</MenuLink>
                <ul>
                  <li><a href="#">Members</a></li>
                  <li><a href="#">Plugins</a></li>
                  <li><a href="#">Add a member</a></li>
                </ul>
              </li>
              <li><a href="#">Invitations</a></li>
              <li><a href="#">Authentication</a></li>
            </MenuList>
            <MenuLabel>
              Transactions
            </MenuLabel>
            <MenuList>
              <li><a href="#">Payments</a></li>
              <li><a href="#">Transfers</a></li>
              <li><a href="#">Balance</a></li>
            </MenuList>
          </Menu>
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
