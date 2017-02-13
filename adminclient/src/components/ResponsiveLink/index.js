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
    return <span onClick={() => {
      // console.log('this.props.location', this.props.location);
      this.props.reduxRouter.push(this.props.location);
    }} style={Object.assign({ cursor: 'pointer', }, this.props.style)}>{this.props.children}</span>;
  }
}

ResponsiveLink.propTypes = propTypes;
ResponsiveLink.defaultProps = defaultProps;

export default ResponsiveLink;