import React from 'react';
import FormItem from '../FormItem';
import RACodeMirror from '../RACodeMirror';
import { ControlLabel, Label, Input, Button, CardFooterItem, Checkbox, Select, } from 're-bulma'; 


export function getPropertyAttribute(options) {
  let { property, element, } = options;
  let attribute = element.name;
  let selector = element.idSelector;
  // console.log({ options });
  let returnVal; 
  if (attribute.indexOf('.') === -1) {
    returnVal = property[ attribute ];
  } else {
    let attrArray = attribute.split('.');
    returnVal = (property[ attrArray[ 0 ] ])? property[ attrArray[ 0 ] ][ attrArray[ 1 ] ]:undefined;
  }
  
  if (selector && !options.skipSelector) {
    return returnVal[ selector ]; 
  } else {
    return returnVal;
  }
}

export function getFormTextInputArea(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let keyPress = (e) => {
    if (formElement.submitOnEnter && (e.key === 'Enter' || e.which === 13)) {
      this.submitForm();
    }
  };

  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (!onChange) {
    onChange = (event) => {
      let text = event.target.value;
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = text;
      this.setState(updatedStateProp);
    };
  }

  return (<FormItem key={i} {...formElement.layoutProps} >
    {(formElement.layoutProps && formElement.layoutProps.horizontalform) ? (<ControlLabel>{formElement.label}</ControlLabel>) : (<Label>{formElement.label}</Label>)}  
    <Input {...formElement.passProps}
      onChange={onChange}
      onKeyPress={keyPress}
      placeholder={formElement.placeholder||formElement.label}
      value={this.state[ formElement.name ] || initialValue} />
  </FormItem>);
}

export function getFormSelect(options) {
  // let { formElement, i, formgroup, width, onValueChange, onSelect, } = options;
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element: formElement, property: this.state, });

  
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (!onChange) {
    onChange = (event) => {
      let text = event.target.value;
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = text;
      this.setState(updatedStateProp);
    };
  }  

  return (<FormItem key={i} {...formElement.layoutProps} >
    {(formElement.layoutProps && formElement.layoutProps.horizontalform) ? (<ControlLabel>{formElement.label}</ControlLabel>) : (<Label>{formElement.label}</Label>)}  
    <Select {...formElement.passProps}
      onChange={onChange}
      placeholder={formElement.placeholder||formElement.label}
      value={this.state[ formElement.name ] || initialValue} >
      {formElement.options.map((opt, k) => {
        return <option key={k} value={opt.value}>{opt.label || opt.value}</option>;
      })}
    </Select>
  </FormItem>);
}

export function getFormCheckbox(options) {
  let { formElement, i, onValueChange, } = options;
  if (!onValueChange) {
    onValueChange = (event) => {
      let value = event.target.value;
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = value;
      this.setState(updatedStateProp);
    };
  }
  return (<FormItem key={i} {...formElement.layoutProps} >
    {(formElement.layoutProps.horizontalform) ? (<ControlLabel>{formElement.label}</ControlLabel>) : (<Label>{formElement.label}</Label>)}  
    <Checkbox {...formElement.passProps}
      onChange={onValueChange.bind(this)} >
        {formElement.placeholder}
    </Checkbox>
  </FormItem>);
}

export function getFormCode(options) {
  let { formElement, i, onValueChange, } = options;
  let CodeMirrorProps = Object.assign({
    options: {
      lineNumbers: true,
    },
    value:this.state[ formElement.name ] || formElement.value,
  }, formElement.passProps);
  if (!onValueChange) {
    onValueChange = (newvalue) => {
      // console.log({ newvalue });
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = newvalue;
      this.setState(updatedStateProp);
    };
  }

  return (<RACodeMirror key={i} {...CodeMirrorProps} onChange={onValueChange.bind(this)} />);
}


export function getFormSubmit(options) {
  let { formElement, i, } = options;
  return (<FormItem key={i} {...formElement.layoutProps} >
    <Button {...formElement.passProps}
      onClick={this.submitForm.bind(this)}>
      {formElement.value}
    </Button>
  </FormItem>);
}

export function getCardFooterItem(options) {
  let { formElement, i, } = options;
  formElement.layoutProps = Object.assign({
    style: { cursor: 'pointer', textAlign:'center', },
  }, formElement.layoutProps);
  return (<CardFooterItem key={i} {...formElement.layoutProps} onClick={this.submitForm.bind(this)}>
    <Label {...formElement.passProps}>
      {formElement.value}
    </Label>
  </CardFooterItem>);
}