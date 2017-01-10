import React, { Component } from 'react';
import { Columns, ControlLabel, Label, Input } from 're-bulma'; 
import FormItem from '../FormItem';

function getPropertyAttribute(options) {
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

function getFormTextInputArea(options) {
  console.log({options})
  let { formElement, i, /*formgroup, width,*/ onChangeText, } = options;
  let initialValue = formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });

  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (!onChangeText) {
    onChangeText = (text) => {
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = text;
      this.setState(updatedStateProp);
    };
  }
  console.log('about to render FormItem',FormItem)
  return (<FormItem key={i} {...formElement.layoutProps} >
    {(formElement.layoutProps.horizontalform) ? (<ControlLabel>{formElement.label}</ControlLabel>) : (<Label>{formElement.label}</Label>)}  
    <Input {...formElement.passProps}
      onChangeText={onChangeText}
      placeholder={formElement.label}
      value={initialValue} />
  </FormItem>);
}

class ResponsiveForm extends Component{
  constructor(props) {
    super(props);
    this.state = Object.assign({
      formDataError: null,
      formDataStatusDate: new Date(),
      formDataLists:{},
      formDataTables:{},
    }, props.formdata);
    this.datalists = {};
    props.formgroups.forEach((formgroup) => {
      formgroup.formElements.forEach((formelement) => {
        if (formelement.type === 'datalist') {
          this.datalists[ formelement.name ] = {
            data: formelement.data || [],
            status: null,
          };
          this.state.formDataLists[ formelement.name ] = {
            data: [], //formelement.data || [],
            status: null,
          };
        }
      });
    });
  }
  submitForm() {
    let formdata = Object.assign({}, this.state);
    delete formdata.formDataError;
    delete formdata.formDataLists;
    delete formdata.formDataStatusDate;
    delete formdata.formDataTables;
    this.props.onSubmit(formdata);
  }
  componentWillUpdate(prevProps, prevState) {
    if (this.props.onChange) {
      this.props.onChange(prevState);
    }
  }
  removeFromSingleItemProp(options) {
    let { value, attribute, } = options;
    let attrArray = attribute.split('.');
    let arrayToSet = Object.assign([], this.state[ attrArray[ 0 ] ][ attrArray[ 1 ] ]);
    // let removedItem = arrayToSet.splice(value, 1);
    arrayToSet.splice(value, 1);

    this.setFormSingleProp({ value: arrayToSet, attribute, });    
    // console.log('remove prop form state', { value, attribute, arrayToSet, removedItem, });
  }
  addSingleItemProp(options) {
    // console.log('addSingleItemProp');
    let { value, attribute, } = options;
    let attrArray = attribute.split('.');
    if (!this.state[ attrArray[ 0 ] ]) {
      this.state[ attrArray[ 0 ] ] = {};
    }
    let arrayToSet = Object.assign([], this.state[ attrArray[ 0 ] ][ attrArray[ 1 ] ]);
    // let removedItem = arrayToSet.splice(value, 1);
    arrayToSet.push(value);

    this.setFormSingleProp({ value: arrayToSet, attribute, });    
    // console.log('remove prop form state', { value, attribute, arrayToSet, removedItem, });
  }
  setFormSingleProp(options) {
    // console.log('setFormSingleProp');
    let { value, attribute, } = options;
    let updatedStateProp = {};
    // console.log('setFormSingleProp prop form state', { value, attribute, }, 'this.state.formDataLists', this.state.formDataLists);
    let updatedFormData = Object.assign({}, this.state.formDataLists);
    updatedFormData[ attribute ].data = [];
    // let dataFromState = this.state.formDataLists[ formElement.name ].data;

    if (attribute.indexOf('.') === -1) {
      updatedStateProp[ attribute ] = value;
      updatedStateProp.formDataLists = updatedFormData;
      this.setState(updatedStateProp);
    } else {
      let attrArray = attribute.split('.');
      let stateToSet = Object.assign({}, this.state[ attrArray[ 0 ] ]);
      stateToSet[attrArray[1]]=value;
      this.setState({
        [ attrArray[ 0 ] ]: stateToSet,
        formDataLists: updatedFormData,
      });
    }
  }
  render() {
    console.log('Form this.props', this.props);
    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      let gridProps = Object.assign({
        isMultiline: true,
        key: 1,
      }, formgroup.gridProps);
      console.log({formgroup})
      return (<Columns {...gridProps}>
        {formgroup.formElements.map((formElement, j) => {
          if (formElement.type === 'text' || formElement.type === 'textarea') {
            return getFormTextInputArea.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'checkbox') {
          //   return getFormCheckbox.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'select') {
          //   return getFormSelect.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'button') {
          //   return getFormButton.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'submit') {
          //   return getFormSubmit.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'datalist') {
          //   return getFormDatalist.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'datatable') {
          //   return getFormDataTable.call(this, { formElement,  i:j, formgroup, });
          // } else if (formElement.type === 'divider') {
          //   return (<HR key={j}/>);
          // } else if (formElement.type === 'textblock') {
          //   return (<Text key={j} style={{ marginTop:10, marginBottom:10, }}>{formElement.value}</Text>);
          } else {
            return <div key={j} />;
          }
        })}
      </Columns>);
    });
    return (<formGroupData/>);
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate this.props.error', this.props.error);
    if (this.props.formerror) {
      this.props.onError(this.props.formerror);
    }
  }
}

export default ResponsiveForm;
