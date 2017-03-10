import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';

class ResponsiveChart extends Component {
  constructor(props) {
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.state = Object.assign({}, props, this.props.getState());
  }
  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps, this.props.getState()));
  }
  render() {
    return (<div style={this.props.style}>{
      this.getRenderedComponent({
        component: `recharts.${this.props.chartComponent}`,
        props: Object.assign({}, this.props.chartProps, this.state.data),
        children: this.props.children,
      })
    }</div>);
  }
}  

export default ResponsiveChart;
