import React, { Component } from 'react';

class SubMenuLinks extends Component {
  render() {
    return (
    	<li>
        <ul>{this.props.children}</ul>
    	</li>
    );
  }
}

export default SubMenuLinks;
