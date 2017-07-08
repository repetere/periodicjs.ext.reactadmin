import React, { Component, } from 'react';
import flatten from 'flat';

class RawOutput extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, this.props.getState());
  }
  componentWillReceiveProps(nextProps) {
    console.debug({ nextProps });
    this.setState(Object.assign({}, nextProps, this.props.getState()));
    // console.log('this.state', this.state);
  }
  render() {
    // console.debug('this.props.getState()', this.props.getState());
    // console.debug('this.state', this.state);
    let displayProp = '';
    let displayData = '';
    try {
      if (this.props.flattenRawData) {
        let flattenedProps = Object({}, flatten(this.state));
        displayProp = (this.props.select) ? flattenedProps[ this.props.select ] : flattenedProps;
      } else {
        displayProp = (this.props.select) ? this.state[ this.props.select ] : this.state;
      }
      displayData = (this.props.display) ? displayProp.toString() : JSON.stringify(displayProp, null, 2);

      // console.debug({ this.state, displayData, displayProp, });
    }
    catch (e) {
      if (!global) {
        console.error(e);
      }
    }
    switch (this.props.type) {
    case 'inline':
      return (
        <span style={this.props.style}>{displayData}</span>
      );
    case 'block':
      return (
        <div style={this.props.style}>{displayData}</div>
      );
    default:
      return (
        <pre style={this.props.style}>{displayData}</pre>
      );
    }
  }
}  

export default RawOutput;
