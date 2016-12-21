import React, { Component } from 'react';
import { Hero, HeroBody, Title, Subtitle, Container, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';

let loginLayout = {
  component: 'Hero',
  props: { size: 'isFullheight', },
  children: [ {
    component: 'HeroBody',
    children: [ {
      component: 'Container',
      children: [ {
        component: 'Title',
        innerText: 'Login',
      },{
        component: 'Hero subtitle prop',
        innerText: 'Login',
      }]
    }]
  }]
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
    return (
      <Hero size="isFullheight">
        <HeroBody>
          <Container>
            <Title>Login</Title>
            <Subtitle>Hero subtitle</Subtitle>
            {this.props.children}
          </Container>
        </HeroBody>
      </Hero>
    );
  }
}

export default Login;
