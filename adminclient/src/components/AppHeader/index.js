import React, { Component } from 'react';
import { Nav, NavGroup, NavItem, Button, Icon, NavToggle, Container, FormHorizontal, ControlLabel, Group, Input } from 're-bulma';
import { Link, } from 'react-router';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';

class AppFooter extends Component {
  render() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
    return (
      <Nav style={Object.assign(styles.fixedTop, styles.navContainer)}>
        <Container>
          <NavGroup align="left">
            <NavItem>
              <Button onClick={handleClick}  buttonStyle="isOutlined" color="isWhite">
                <Icon style={styles.noMarginLeftRight} icon="fa fa-bars" size="isSmall" />
              </Button> 
            </NavItem>
            <NavItem  style={styles.fullWidth}>
              <Input type="text" placeholder="Name" isExpanded style={styles.fullWidth}/>
            </NavItem>
          </NavGroup>
          <NavToggle />
          <NavGroup align="right" isMenu>
            <NavItem>
              <Link to="/user"  style={styles.noUnderline}>
                <Button buttonStyle="isOutlined" color="isWhite">
                   <Icon style={styles.noMarginLeftRight} icon="fa fa-user" size="isSmall" />&nbsp;
                   yawetse
                </Button>
              </Link>
            </NavItem>
            <NavItem>
              <Button buttonStyle="isOutlined" color="isWhite" onClick={handleClick}>
                <Icon style={styles.noMarginLeftRight} icon="fa fa-sign-out" size="isSmall" />
              </Button>
            </NavItem>
          </NavGroup>
        </Container>
      </Nav>
    );
  }
}

export default AppFooter;
