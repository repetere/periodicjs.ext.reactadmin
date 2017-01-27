import React, { Component } from 'react';
import { Nav, NavGroup, NavItem, Container, /*, Button,*/ } from 're-bulma'; //Icon
// import { Link, } from 'react-router';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';


class AppFooter extends Component {
  render() {
    return (
      <Nav style={Object.assign(styles.fixedBottom, styles.footerContainer)} className={(this.props.settings.ui.initialization.show_footer || this.props.user.isLoggedIn) ? 'animated fadeInUp Header-Speed' : 'animated slideOutUp Header-Speed'}>
        <Container>
          <NavGroup align="left">
            <NavItem>
              {`${this.props.settings.name} v${this.props.settings.version}`}
              {/*
              <Link to="/home">
                Home
              </Link>
              */}
            </NavItem>
          </NavGroup>
          <NavGroup align="center">
          </NavGroup>
          <NavGroup align="right">
                  {/*
            <NavItem>
              <a style={styles.noUnderline} href="#">
                <Button buttonStyle="isInverted" color="isInfo" >
                Debug
                  <Icon icon="fa fa-terminal" size="isSmall" />
                </Button>
              </a>
            </NavItem>
                  */}  
          </NavGroup>
        </Container>
      </Nav>
    );
  }
}

export default AppFooter;
