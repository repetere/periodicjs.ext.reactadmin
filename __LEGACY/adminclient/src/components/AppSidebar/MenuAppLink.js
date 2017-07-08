import React, { Component, } from 'react';
// import { MenuLink, } from 're-bulma'; //Icon
import { Link, } from 'react-router';
import styles from '../../styles';
class MenuAppLink extends Component {
  constructor () {
    super(...arguments);
    this.state = { isActive: (this.props.ui.selected_nav !== undefined && ((this.props.id && this.props.ui.selected_nav === this.props.id) || (this.props.ui.selected_nav === this.props.href))), };
  }
  render () {
    return (
      <li>
        <Link style={(this.state.isActive)?styles.activeButton:undefined} to={this.props.href} onClick={() => {
          if (typeof this.props.onClick === 'string' && this.props.onClick.indexOf('func:this.props') !== -1) { 
            this.props[ this.props.onClick.replace('func:this.props.', '') ](this.props.onClickProps);
          }
          this.props.setActiveNavLink.bind(this, this.props.id || this.props.href
          );
          this.props.toggleUISidebar();
        }}>
        { this.props.label }
        </Link>  
        {/*
          <MenuLink  href={this.props.href} isActive={this.state.isActive}>{ this.props.label }</MenuLink>
          */}
      </li>
    );
  }
}

export default MenuAppLink;
