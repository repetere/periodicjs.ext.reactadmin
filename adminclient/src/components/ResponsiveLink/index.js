import React, { Component, PropTypes, } from 'react';
import utilities from '../../util';

const propTypes = {
  location: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  location: '/',
  style: {},
};

class ResponsiveLink extends Component {
  render() {
    return <a {...this.props.passProps} href={this.props.location} onClick={(e) => {
      e.preventDefault();
      this.props.reduxRouter.push(this.props.location);
      if (this.props.callback) {
        let callbackName = this.props.callback;
        let clean_name = utilities.getDynamicFunctionName(callbackName);
        if (callbackName.indexOf('func:this.props.reduxRouter') !== -1) {
          this.props.reduxRouter[ clean_name ](this.props.callbackProp);
        } else if (callbackName.indexOf('func:this.props') !== -1 && typeof this.props[clean_name] === 'function') {
          this.props[ clean_name ](this.props.callbackProp);
        } else if (callbackName.indexOf('func:window') !== -1 && typeof window[clean_name] === 'function') {
          window[ clean_name ].call(this, this.props.callbackProp);
        }
      }
      return false;
    }} style={Object.assign({ cursor: 'pointer', }, this.props.style)}>{this.props.children}</a>;
  }
}

ResponsiveLink.propTypes = propTypes;
ResponsiveLink.defaultProps = defaultProps;

export default ResponsiveLink;