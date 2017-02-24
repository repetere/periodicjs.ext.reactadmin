import React, { Component, } from 'react';
import { Column, FormHorizontal, } from 're-bulma'; 

class FormItem extends Component{
  render() {
    if (this.props.innerFormItem) {
      return (this.props.horizontalform)
        ? (<FormHorizontal>{this.props.children}</FormHorizontal>)
        : (<span style={{width:'100%',}}>{this.props.children}</span>);
    } else {
      return <Column {...this.props}>
        {
          (this.props.horizontalform)
            ? (<FormHorizontal>{this.props.children}</FormHorizontal>)
            : (<span style={{width:'100%',}}>{this.props.children}</span>)
        }
      </Column>  
    }
  }
}

export default FormItem;