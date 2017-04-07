import React, { Component, } from 'react';
import { Column, FormHorizontal, } from 're-bulma'; 

class FormItem extends Component{
  render() {
    let className = (this.props.hasValue)? '__form_element_has_value':'';
    className = (this.props.hasError)? `${(className)? `${className} `:''}__form_element_has_error`:className;
    if (this.props.innerFormItem) {
      return (this.props.horizontalform)
        ? (<FormHorizontal className={className} style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</FormHorizontal>)
        : (<span className={className} style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</span>);
    } else {
      return <Column {...this.props}>
        {
          (this.props.horizontalform)
            ? (<FormHorizontal className={className} style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</FormHorizontal>)
            : (<span className={className} style={Object.assign({ width:'100%',  }, this.props.formItemStyle)}>{this.props.children}</span>)
        }
      </Column>;  
    }
  }
}

export default FormItem;
