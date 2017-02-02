import React, { Component, } from 'react';
import { Columns, Card, CardContent,  CardFooter, CardFooterItem, Notification, } from 're-bulma'; 
import utilities from '../../util';
import { getFormTextInputArea, getFormCheckbox, getFormSubmit, getCardFooterItem, } from './FormElements';

class ResponsiveForm extends Component{
  constructor(props) {
    super(props);
    console.log('this.props for ResponsiveForm', this.props);
    this.state = Object.assign({
      formDataError: null,
      formDataStatusDate: new Date(),
      formDataLists:{},
      formDataTables:{},
    }, props.formdata);
    this.datalists = {};
    // props.formgroups.forEach((formgroup) => {
    //   formgroup.formElements.forEach((formelement) => {
    //     if (formelement.type === 'datalist') {
    //       this.datalists[ formelement.name ] = {
    //         data: formelement.data || [],
    //         status: null,
    //       };
    //       this.state.formDataLists[ formelement.name ] = {
    //         data: [], //formelement.data || [],
    //         status: null,
    //       };
    //     }
    //   });
    // });
  }
  submitForm() {
    // console.log('submitting Form', this);
    let formdata = Object.assign({}, this.state);
    delete formdata.formDataError;
    delete formdata.formDataLists;
    delete formdata.formDataStatusDate;
    delete formdata.formDataTables;
    // console.log({ formdata });
    if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:this.props') !== -1) {
      this.props[this.props.onSubmit.replace('func:this.props.', '')](formdata);
    } else if (typeof this.props.onSubmit !== 'function') {
      let fetchOptions = this.props.onSubmit;
      fetch(fetchOptions.url,
        Object.assign({}, fetchOptions.options, { body: JSON.stringify(formdata), })
      )
        .then(utilities.checkStatus)
        .then(res => res.json())
        .catch(e => {
          if (typeof this.props.onError !== 'function') {
            console.error(e);
            this.props.errorNotification(e);
          } else {
            this.props.onError(e);
          }
        });
    } else {
      this.props.onSubmit(formdata);
    }
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
      // this.state[ attrArray[ 0 ] ] = {};
      this.setState({ [ attrArray[ 0 ] ]: {}, });
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
    // console.log('Form this.props', this.props);
    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      let gridProps = Object.assign({
        isMultiline: true,
        key: i,
      }, formgroup.gridProps);
      let getFormElements = (formElement, j) => {
        if (formElement.type === 'text' || formElement.type === 'textarea') {
          return getFormTextInputArea.call(this, { formElement,  i:j, formgroup, });
        } else if (formElement.type === 'checkbox') {
          return getFormCheckbox.call(this, { formElement,  i:j, formgroup, });
        // } else if (formElement.type === 'select') {
        //   return getFormSelect.call(this, { formElement,  i:j, formgroup, });
        // } else if (formElement.type === 'button') {
        //   return getFormButton.call(this, { formElement,  i:j, formgroup, });
        } else if (formElement.type === 'submit') {
          return getFormSubmit.call(this, { formElement,  i:j, formgroup, });
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
      };      
      return (<Columns {...gridProps}>
        {formgroup.formElements.map(getFormElements)}
      </Columns>);
    });
    let footerGroupData = this.props.footergroups.map((formgroup, i) => { 
      let gridProps = Object.assign({
        isMultiline: true,
        key: i,
      }, formgroup.gridProps);
      let getFormElements = (formElement, j) => {
        if (formElement.type === 'submit') {
          return getCardFooterItem.call(this, { formElement,  i:j, formgroup, });
        } else {
          return <CardFooterItem>
            <div key={j} />
          </CardFooterItem>;
        }
      };      
      return (<CardFooter {...gridProps}>
        {formgroup.formElements.map(getFormElements)}
      </CardFooter>);
    });

    if (this.props.cardForm) {
      return (<Card {...this.props.cardFormProps}>
        <CardContent>
          {formGroupData}
        </CardContent>
        {footerGroupData}
      </Card>);
    } else if(this.props.notificationForm){
      return(<div>
      <Notification>{formGroupData}</Notification>
      </div>);
    } else {
      return (<div>{ formGroupData }</div>);
    }
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate this.props.error', this.props.error);
    if (this.props.formerror) {
      this.props.onError(this.props.formerror);
    }
  }
}

export default ResponsiveForm;