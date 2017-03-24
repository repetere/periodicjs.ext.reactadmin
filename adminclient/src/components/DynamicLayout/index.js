import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import { Columns, } from 're-bulma';

class DynamicLayout extends Component {
  constructor(props) {
    super(props);
    let dynamicItems = (this.props.dynamicProp)
      ? this.props.getState().dynamic[this.props.dynamicProp]
      : [];
    let Items = {
      items: Object.assign([], props.items , dynamicItems),
    };
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.state = Items;
    // console.debug({props})
  }
  componentWillReceiveProps(nextProps) {
    let dynamicItems = (this.props.dynamicProp)
      ? this.props.getState().dynamic[this.props.dynamicProp]
      : [];
    let Items = {
      items: Object.assign(nextProps.items, dynamicItems),
    };
    this.setState(Items);
  }
  render() {
    try {
      let mappedItemLayout = ((this.state.items && Array.isArray(this.state.items) && this.state.items.length)
            ? this.state.items.map(item => {
              let mergedLayout = Object.assign({}, this.props.layout, {
                props: Object.assign({}, this.props.layout.props, item),
              });
              // console.debug({ mergedLayout });
              return this.getRenderedComponent(mergedLayout);
            })
            : null)

      let dynamicComponentLayout = (this.props.isColumns)
        ? (<Columns {...this.props.columnsProps}>{mappedItemLayout}</Columns>)
        : (<div style={
        Object.assign({
          flexDirection: 'rows',
          display: 'flex',
        },
          this.props.style)
      }>{mappedItemLayout}</div>);
      // console.debug({dynamicComponentLayout})
      return dynamicComponentLayout;
    } catch (e) {
      console.debug(e, 'this.state', this.state, 'this.props', this.props);
      return null;
    }
    // console.debug('this.state.items', this.state.items,'Array.isArray(this.state.items)',Array.isArray(this.state.items));
  }
}  

export default DynamicLayout;
