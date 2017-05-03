import React, { Component, } from 'react';
import { Hero, HeroBody, Button, } from 're-bulma';
import { getRenderedComponent, } from '../AppLayoutMap';

class Loading extends Component {
  constructor(props) {
    // console.debug({ props });
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);
    this.setState(nextProps);
  }
  render() {
    // this.getRenderedComponent(formElement.value, undefined, true)
    return (
      (this.props.display)
        ? (<Hero size="isFullheight" {...this.props.heroProps} style={
            Object.assign({ textAlign: 'center', }, this.props.wrapperstyle)
          }>
        <HeroBody {...this.props.bodyProps}>
          <div className="has-text-centered" style={
            Object.assign({ textAlign: 'center', margin:'auto', }, this.props.style)
            }>
              {
                (this.props.ui && this.props.ui.custom_ui_layout)
                ? this.getRenderedComponent(this.props.ui.custom_ui_layout)
                : <Button color="isWhite" buttonStyle="isOutlined" state="isLoading" style={{ border:'none', }}>Loading</Button>
              }    
          </div>
        </HeroBody>
        {this.props.children}
        </Hero>)
      : null  
    );
  }
}

export default Loading;
