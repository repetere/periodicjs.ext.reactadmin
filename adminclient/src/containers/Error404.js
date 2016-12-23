import React, { Component } from 'react';
import { Container, Content, } from 're-bulma';
import styles from '../styles';

class Error404 extends Component {
  render() {
    return (
      <Container  style={styles.mainContainer}>
        <Content>  
          <div>Error404page</div>
        </Content>  
      </Container>
    );
  }
}

export default Error404;
