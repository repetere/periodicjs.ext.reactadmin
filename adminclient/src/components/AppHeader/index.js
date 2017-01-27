import React, { Component, } from 'react'; 
import { Nav, NavGroup, NavItem, Button, Container, Input, } from 're-bulma'; // FormHorizontal, NavToggle, ControlLabel, Group,
import { Link, } from 'react-router';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';
//https://github.com/lolJS/react-animate.css/blob/master/src/app.js
class AppHeader extends Component {
  constructor(props, context) {
    super(props);
    // console.log({ props, context });
    this.state = {
      // page: props.page,
      ui: props.ui,
      user: props.user,
    };
    // this.previousRoute = {};
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      // page: nextProps.page,
      ui: nextProps.ui,
      user: nextProps.user,
    });
    // console.log('AppHeader componentWillReceiveProps nextProps', nextProps);
  }
  render() {
    // function handleClick(e) {
    //   e.preventDefault();
    //   console.log('The link was clicked.');
    // }
    return (
      <Nav style={Object.assign(styles.fixedTop, styles.navContainer)}>
        <Container>
          <NavGroup align="left">
            <NavItem>
              <Button onClick={this.props.toggleUISidebar} buttonStyle="isOutlined" color="isWhite" icon="fa fa-bars" style={styles.iconButton} /> 
            </NavItem>
            <NavItem> 
              <Link to="/home"  style={styles.noUnderline}>
                <Button style={{ border: 'none', }} color="isWhite" buttonStyle="isOutlined">Admin</Button> 
              </Link>  
            </NavItem>
          </NavGroup>
          <NavGroup align="center" style={{ flex:3, }}>
            <NavItem  style={styles.fullWidth}>
              <Input type="text" placeholder="Search" isExpanded style={styles.fullWidth}/>
            </NavItem>
          </NavGroup>
          <NavGroup align="right" isMenu>
            {(this.state.user.isLoggedIn) ?
              (<NavItem>
                <Link to="/documentation" style={styles.noUnderline}>
                  <Button buttonStyle="isOutlined" color="isWhite" style={styles.noMarginLeftRight} icon="fa fa-user">
                    {this.state.user.email}
                  </Button>
                </Link>
              </NavItem>) : null}
            {(this.state.user.isLoggedIn) ? 
              (<NavItem>
                <Button buttonStyle="isOutlined" onClick={this.props.logoutUser} color="isWhite" icon="fa fa-sign-out"  style={Object.assign({paddingRight:0}, styles.noMarginLeftRight)} />
              </NavItem>)
              :
                (<NavItem>
                  <Link to="/login"  style={styles.noUnderline}>
                  <Button buttonStyle="isOutlined" color="isWhite" style={Object.assign({}, styles.noMarginLeftRight)} icon="fa fa-sign-in" />
                  </Link>
                </NavItem>)
             } 
            
          </NavGroup>
        </Container>
      </Nav>
    );
  }
}

export default AppHeader;
