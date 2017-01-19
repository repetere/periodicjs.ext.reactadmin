import React, { Component } from 'react';
import { MenuLink, } from 're-bulma'; //Icon
//https://github.com/lolJS/react-animate.css/blob/master/src/app.js
class MenuAppLink extends Component {
  render() {
    return (<li>
      <MenuLink href={{ href: this.props.href }}>{ this.props.label }</MenuLink>
    </li>);
  }
}

export default MenuAppLink;
