import React, { Component, PropTypes, } from 'react';

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
      // console.log('this.props.location', this.props.location);
      this.props.reduxRouter.push(this.props.location);
      return false;
    }} style={Object.assign({ cursor: 'pointer', }, this.props.style)}>{this.props.children}</a>;
  }
}

ResponsiveLink.propTypes = propTypes;
ResponsiveLink.defaultProps = defaultProps;

export default ResponsiveLink;