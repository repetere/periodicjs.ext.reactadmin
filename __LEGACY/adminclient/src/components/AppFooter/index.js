import React, { Component, } from 'react';
import { Nav, NavGroup, NavItem, Container, /*, Button,*/ } from 're-bulma'; 
import { getRenderedComponent, } from '../AppLayoutMap';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';


class AppFooter extends Component {
  constructor(props /*, context*/) {
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
  }
  render() {
    return (
      <Nav style={Object.assign({}, styles.fixedBottom, styles.footerContainer, this.props.settings.ui.footer.navStyle)} className={(this.props.settings.ui.initialization.show_footer || this.props.user.isLoggedIn) ? 'animated fadeInUp Header-Speed reactadmin__app_footer' : 'animated slideOutUp Header-Speed reactadmin__app_footer'}>
        {(this.props.ui.components && this.props.ui.components.footer && typeof this.props.ui.components.footer==='object' && this.props.ui.components.footer.layout) 
        ? this.getRenderedComponent(this.props.ui.components.footer.layout)
        : (<Container>
          <NavGroup align="left">
            <NavItem>
              {`${this.props.settings.name} v${this.props.settings.version}`}
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
        </Container>)
        }
      </Nav>
    );
  }
}

export default AppFooter;
