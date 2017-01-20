import React, { Component } from 'react';
import { MenuLink, } from 're-bulma'; //Icon
import { Link, } from 'react-router';
class MenuAppLink extends Component {
  render() {
    return (<li>
      <Link to={this.props.href}>
        <MenuLink isActive={this.props.active}>{ this.props.label }</MenuLink>
      </Link>  
    </li>);
  }
}

export default MenuAppLink;
