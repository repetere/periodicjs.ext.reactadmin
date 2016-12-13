import React, { Component } from 'react';
import { Nav, NavGroup, NavItem, Button, Icon, NavToggle, } from 're-bulma';
import { Link, } from 'react-router';
import 'font-awesome/css/font-awesome.css';

class AppFooter extends Component {
  render() {
    return (
      <Nav>
        <NavGroup align="left">
          <NavItem>
            <Link to="/home">
              Home
            </Link>
          </NavItem>
        </NavGroup>
        <NavGroup align="center">
          <NavItem>
            <Icon icon="fa fa-github" />
          </NavItem>
          <NavItem>
            <Icon icon="fa fa-twitter" />
          </NavItem>
        </NavGroup>
        <NavToggle />
        <NavGroup align="right" isMenu>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/documentation">Documentation</Link>
          </NavItem>
          <NavItem>
            <Link to="/blog">Blog</Link>
          </NavItem>
          <NavItem>
            <Button icon="fa fa-twitter">Tweet</Button>
            <Button icon="fa fa-download">Download</Button>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  }
}

export default AppFooter;
