import React, { Component, } from 'react';
import { Hero, HeroBody, Button, } from 're-bulma';


class Loading extends Component {
  render() {
    return (
      (this.props.display)
        ? (<Hero size="isFullheight" {...this.props.heroProps} style={
            Object.assign({ textAlign: 'center', }, this.props.wrapperstyle)
          }>
        <HeroBody {...this.props.bodyProps}>
          <div className="has-text-centered" style={
            Object.assign({ textAlign: 'center', margin:'auto'}, this.props.style)
          }>
            <Button color="isWhite" buttonStyle="isOutlined" state="isLoading" style={{border:'none'}}>Loading</Button>
          </div>
        </HeroBody>
        {this.props.children}
        </Hero>)
      : null  
    );
  }
}

export default Loading;
