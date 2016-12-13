import React, { Component } from 'react';
// import { Footer, Container, Content, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';


class Blog extends Component {
  render() {
    return (
      <div>
        <div>Blog</div>
        {this.props.children}
      </div>
    );
  }
}

export default Blog;
