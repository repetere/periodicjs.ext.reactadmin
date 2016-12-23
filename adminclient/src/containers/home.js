import React, { Component } from 'react';
import { Container, Content, } from 're-bulma';
import styles from '../styles';

class Home extends Component {
  render() {
    return (
      <Container  style={styles.mainContainer}>
        <Content>  
          <div>homepage</div>
        </Content>  
      </Container>
    );
  }
}

export default Home;
