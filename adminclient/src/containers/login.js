import React, { Component, createElement, } from 'react';
// import { Hero, HeroBody, Title, Subtitle, Container, } from 're-bulma';
// import 'font-awesome/css/font-awesome.css';
import AppLayoutMap from '../components/AppLayoutMap';

let loginLayout = {
  component: 'Hero',
  props: {
    size: 'isFullheight',
    // children: 'hero body text',
  },
  children: [ {
    component: 'HeroBody',
    props: {
      // children: 'hero body text'
    },
    children: [ {
      component: 'Container',
      props: {
        // children: 'container text'
      },
      children: [ {
        component: 'Title',
        // props: {
        // },
        children: 'Login',
      }, {
        component: 'Subtitle',
        children: 'Subtitle Login',
        //   props: {
        // },  
      }]
    }]
  }]
};

let sampleText = {
  component: 'Hero',
  props: { size: 'isFullheight', children:'text from children' },
  innerText: 'this should be in a div'
}
let renderIndex = 0;

function getRenderedComponent(componentObject) {
  renderIndex++;
  console.log({ componentObject, renderIndex });
  // if (componentObject.children) {
  //   console.log(componentObject.component + ' has children');
  //   return componentObject.children.map(childComponentObject => getRenderedComponent(childComponentObject));
  // }
  // else {
    let renderedCompProps = Object.assign({key:renderIndex}, componentObject.props);
    console.log(componentObject.component + ' is rendering, with props',renderedCompProps);
    // return createElement(AppLayoutMap[ componentObject.component ],renderedCompProps);
    return createElement(
      AppLayoutMap[ componentObject.component ],
      renderedCompProps,
      (Array.isArray(componentObject.children) && typeof componentObject.children !=='string') ?
        componentObject.children.map(childComponentObject => getRenderedComponent(childComponentObject)) :
        componentObject.children
    );
  // }
}

// class ResponsiveGrid extends Component {
//   render() {
//     return();
//   }
// };
// class ResponsiveLayout extends Component {
//   render() {
//     return();
//   }
// };

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('Login componentWillReceiveProps nextProps', nextProps);
    // this.setState(nextProps);
  }
  render() {
    return getRenderedComponent(loginLayout);
  }
}

export default Login;
