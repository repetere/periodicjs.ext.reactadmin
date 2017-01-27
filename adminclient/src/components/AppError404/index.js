import React, { Component } from 'react';
import { Hero, HeroBody, Container, Content, } from 're-bulma';
import styles from '../../styles';

class Error404 extends Component { 
  render() {
    return (<Hero style={styles.mainContainer}>
      <HeroBody>
        <Container>
          <Content>
            <h1>PAGE NOT FOUND</h1>
            <div>{window.location.href}</div>
          </Content>
        </Container>
      </HeroBody>
    </Hero>);
  }
}

export default Error404;
