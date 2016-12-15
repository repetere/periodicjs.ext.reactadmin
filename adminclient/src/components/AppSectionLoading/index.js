import React, { Component } from 'react';
import { Hero, HeroBody, Container, Button, } from 're-bulma';


class Loading extends Component {
  render() {
    return (
      <Hero  size="isFullheight">
        <HeroBody>
          <Container className="has-text-centered" style={{textAlign:'center'}}>
            <Button color="isWhite" state="isLoading">Loading</Button> 
          </Container>
        </HeroBody>
      </Hero>
    );
  }
}

export default Loading;
