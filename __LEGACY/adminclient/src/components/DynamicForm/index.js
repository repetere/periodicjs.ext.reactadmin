import React, { Component, } from 'react';
import { Columns, Column, Label, } from 're-bulma'; 
import { getRenderedComponent, } from '../AppLayoutMap';
// import utilities from '../../util';
import { getFormTextInputArea, getFormCheckbox, getFormSubmit, getFormSelect, getCardFooterItem, getFormCode, getFormTextArea, getFormEditor, getFormLink, getHiddenInput, getFormGroup, getImage, getFormDatalist, getRawInput, getSliderInput, getFormDatatable, } from '../ResponsiveForm/FormElements';
import flatten from 'flat';

class DynamicForm extends Component{
  constructor(props) {
    super(props);
    //initialdata
    let initialData = props.initialData;
    let dynamicData = props.getState().dynamic;
    let formElementData = Object.assign({}, initialData, dynamicData);
    let flattenedData = (props.flattenData)
      ? flatten(formElementData, props.flattenDataOptions)
      : {};
    let initialState = Object.assign({}, (props.useDynamicData) ? props.dynamic.formdata : {}, formElementData, flattenedData);
    initialState.__formOptions = (props.useFormOptions)
      ? Object.assign({},
        (props.useDynamicData) ? props.getState().dynamic.__formOptions : {}, props.__formOptions)
      : undefined;
    // console.debug({props,initialState});
    this.state = initialState;

    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.getFormSubmit = getFormSubmit.bind(this);
    this.getFormDatalist = getFormDatalist.bind(this);
    this.getFormCode = getFormCode.bind(this);
    this.getFormTextInputArea = getFormTextInputArea.bind(this);
    this.getFormTextArea = getFormTextArea.bind(this);
    this.getFormCheckbox = getFormCheckbox.bind(this);
    this.getCardFooterItem = getCardFooterItem.bind(this);
    this.getFormSelect = getFormSelect.bind(this);
    this.getRawInput = getRawInput.bind(this);
    this.getSliderInput = getSliderInput.bind(this);
    this.getFormDatatable = getFormDatatable.bind(this);
    this.getHiddenInput = getHiddenInput.bind(this);
    this.getFormEditor = getFormEditor.bind(this);
    this.getFormLink = getFormLink.bind(this);
    this.getFormGroup = getFormGroup.bind(this);
    this.getImage = getImage.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.debug('getting next props');
    let initialData = this.props.initialData;
    let dynamicData = nextProps.getState().dynamic;
    let formElementData = Object.assign({},  (nextProps.useDynamicData)?nextProps.dynamic.formdata:{}, initialData, dynamicData);
    let flattenedData = (this.props.flattenData)
      ? flatten(formElementData, this.props.flattenDataOptions)
      : {};
    let __formOptions = (nextProps.useFormOptions)
      ? Object.assign({},
        (nextProps.useDynamicData) ? nextProps.getState().dynamic.__formOptions : {}, nextProps.__formOptions)
      : undefined;
    let newState = Object.assign({ __formOptions, }, formElementData, flattenedData);
    // console.debug({newState,nextProps});
    this.setState(newState);
  }
  // componentWillUpdate(prevProps, prevState) {
  //   if (this.props.onChange) {
  //     this.props.onChange(prevState);
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
    
  // }
  // componentWillUpdate (nextProps, nextState) {
    
  // }
  render() {
    // let keyValue = 0;
    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      let gridProps = Object.assign({
        isMultiline: true,
        key: i,
      }, formgroup.gridProps);
      let getFormElements = (formElement, j) => {
        // console.debug({ formElement });
        if (!formElement) {
          return null;
        } else if (formElement.type === 'text' ) {
          return this.getFormTextInputArea({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'input' ) {
          return this.getRawInput({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'textarea') {
          return this.getFormTextArea({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'hidden') {
          return this.getHiddenInput({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'datalist') {
          return this.getFormDatalist({ formElement, i: j, formgroup, });
        } else if (formElement.type === 'datatable') {
          return this.getFormDatatable({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'checkbox' || formElement.type === 'radio') {
          return this.getFormCheckbox({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'label') {
          return (<Column key={j} {...formElement.layoutProps}>
            <Label key={j} {...formElement.labelProps}>{formElement.label}</Label>
          </Column>);
        } else if (formElement.type === 'line') {
          return (<Column key={j} {...formElement.layoutProps}>
            <hr {...formElement.passProps} />
          </Column>);
        } else if (formElement.type === 'code') {
          return this.getFormCode({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'editor') {
          return this.getFormEditor({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'link') {
          return this.getFormLink({
            formElement, i: j, button: this.getRenderedComponent(formElement.value, undefined, true),
          }); 
        } else if (formElement.type === 'select') {
          return this.getFormSelect({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'image') {
          return this.getImage({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'layout') {
          return (<Column key={j} {...formElement.layoutProps}>{this.getRenderedComponent(formElement.value)}</Column>);
        } else if (formElement.type === 'submit') {
          return this.getFormSubmit({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'group') {
          return this.getFormGroup({ formElement,  i:j, groupElements:formElement.groupElements.map(getFormElements), }); 
        } else {
          return this.getFormTextInputArea({ formElement,  i:j, formgroup, });
        }
      };
      return (<Columns {...gridProps}>
        {formgroup.formElements.map(getFormElements)}
      </Columns>);
    });

    return (<div style={this.props.style}>{ formGroupData }</div>);
  }
}

export default DynamicForm;