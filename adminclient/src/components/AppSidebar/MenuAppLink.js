import React, { Component } from 'react';
import { MenuLink, } from 're-bulma'; //Icon
import { Link, } from 'react-router';
class MenuAppLink extends Component {
	constructor () {
		super(...arguments);
		this.state = { isActive: (this.props.ui.selected_nav !== undefined && ((this.props.id && this.props.ui.selected_nav === this.props.id) || (this.props.ui.selected_nav === this.props.href))) };
	}
  render () {
    return (
    	<li>
				<Link to={this.props.href} onClick={() => {
					if (typeof this.props.onClick === 'string' && this.props.onClick.indexOf('func:this.props') !== -1) { 
						this.props[ this.props.onClick.replace('func:this.props.', '') ](this.props.onClickProps);
					}
					this.props.setActiveNavLink.bind(this, this.props.id || this.props.href
					);
				}}>
	        <MenuLink isActive={this.state.isActive}>{ this.props.label }</MenuLink>
	      </Link>  
    	</li>
    );
  }
}

export default MenuAppLink;
