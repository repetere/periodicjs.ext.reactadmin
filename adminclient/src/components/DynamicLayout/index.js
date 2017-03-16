import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';

class DynamicLayout extends Component {
  constructor(props) {
    super(props);
    let dynamicItems = (this.props.dynamicProp)
      ? this.props.getState().dynamic[this.props.dynamicProp]
      : [];
    let Items = {
      items: Object.assign([],props.items,dynamicItems),
    };
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.state = Items;
    console.debug({props})
  }
  componentWillReceiveProps(nextProps) {
    let dynamicItems = (this.props.dynamicProp)
      ? this.props.getState().dynamic[this.props.dynamicProp]
      : [];
    let Items = {
      items: Object.assign(nextProps.items,dynamicItems),
    };
    this.setState(Items);
  }
  render() {
    console.debug('this.state.items', this.state.items,'Array.isArray(this.state.items)',Array.isArray(this.state.items));
    return (<div style={
        Object.assign({
        flexDirection: 'rows',
        display:'flex',
        }, this.props.style)
    }>{
        (this.state.items && Array.isArray(this.state.items) && this.state.items.length)
          ? this.state.items.map(item => {
            let mergedLayout = Object.assign({}, this.props.layout, {
              props: Object.assign({}, this.props.layout.props, item),
            });
            console.debug({ mergedLayout });
            return this.getRenderedComponent(mergedLayout);
          })
          : null
    }</div>);
  }
}  

export default DynamicLayout;
