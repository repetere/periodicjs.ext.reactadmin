import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import { ResponsiveContainer, } from 'recharts';
// import * as recharts from 'recharts';

class DynamicChart extends Component {
  constructor(props) {
    super(props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.state = Object.assign({}, props.chartProps, this.props.getState().dynamic);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({},
      nextProps.chartProps,
      this.props.getState().dynamic
    ));
  }
  render() {

    return (<ResponsiveContainer key={new Date().valueOf() + '-' + Math.random()} {...this.props.passProps}>{
      this.getRenderedComponent({
        component: `recharts.${this.props.chartComponent}`,
        props: Object.assign({}, this.props.chartProps, this.state),
        children: this.props.children,
        // cloneElement: true,
      })
    }</ResponsiveContainer>);
  }
}  

export default DynamicChart;
