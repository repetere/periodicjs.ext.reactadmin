import React, { Component, } from 'react';
import { Column, FormHorizontal, } from 're-bulma'; 

class FormItem extends Component{
  render() {
    console.log('FOrmItem props',this.props)
    return <Column {...this.props}>
      {
        (this.props.horizontalform)
          ? (<FormHorizontal>{this.props.children}</FormHorizontal>)
          : (<div>{this.props.children}</div>)
      }
    </Column>  
  }
}

export default FormItem;
/*
    <Label>Email</Label>
      <Input
        color="isDanger"
        type="text"
        placeholder="Email input"
        defaultValue="hello@"
        icon="fa fa-warning"
        hasIconRight
        help={{
          color: 'isDanger',
          text: 'This email is invalid',
        }}
          />
*/