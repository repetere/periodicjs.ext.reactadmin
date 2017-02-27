import React, { Component, } from 'react';
import { Column, FormHorizontal, } from 're-bulma'; 

class FormItem extends Component{
  render() {
    if (this.props.innerFormItem) {
      return (this.props.horizontalform)
        ? (<FormHorizontal style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</FormHorizontal>)
        : (<span style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</span>);
    } else {
      return <Column {...this.props}>
        {
          (this.props.horizontalform)
            ? (<FormHorizontal style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</FormHorizontal>)
            : (<span style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</span>)
        }
      </Column>;  
    }
  }
}

export default FormItem;