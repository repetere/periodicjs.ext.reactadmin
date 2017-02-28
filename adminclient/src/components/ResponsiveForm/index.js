import React, { Component, } from 'react';
import { Columns, Card, CardContent, CardFooter, CardFooterItem, Notification, Column, } from 're-bulma'; 
import ResponsiveCard from '../ResponsiveCard';
import { getRenderedComponent, } from '../AppLayoutMap';
import utilities from '../../util';
import { getFormTextInputArea, getFormCheckbox, getFormSubmit, getFormSelect, getCardFooterItem, getFormCode, getFormTextArea, /*getFormEditor,*/ getFormLink, getHiddenInput, getFormGroup, } from './FormElements';
import flatten from 'flat';
import validate from 'validate.js';

class ResponsiveForm extends Component{
  constructor(props) {
    super(props);
    let formdata = (props.flattenFormData && props.formdata) ? flatten(props.formdata, props.flattenDataOptions) : props.formdata;
    this.state = Object.assign({
      formDataError: null,
      formDataErrors: {},
      formDataStatusDate: new Date(),
      formDataLists:{},
      formDataTables:{},
      formDataFiles:{},
    }, formdata);
    this.datalists = {};

    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.getFormSubmit = getFormSubmit.bind(this);
    this.getFormCode = getFormCode.bind(this);
    this.getFormTextInputArea = getFormTextInputArea.bind(this);
    this.getFormTextArea = getFormTextArea.bind(this);
    this.getFormCheckbox = getFormCheckbox.bind(this);
    this.getCardFooterItem = getCardFooterItem.bind(this);
    this.getFormSelect = getFormSelect.bind(this);
    this.getHiddenInput = getHiddenInput.bind(this);
    // this.getFormEditor = getFormEditor.bind(this);
    this.getFormLink = getFormLink.bind(this);
    this.getFormGroup = getFormGroup.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let formdata = (nextProps.flattenFormData) ? flatten(nextProps.formdata, nextProps.flattenDataOptions) : nextProps.formdata;
    this.setState(formdata);
  }
  getFormSumitUrl(baseurl, params, prop) {
    let returnLink = baseurl;
    if (params && params.length > 0) {
      params.forEach((param) => {
        returnLink = returnLink.replace(param.key, prop[ param.val ]);
      });
    }
    return returnLink;
  }
  submitForm() {
    let state = this.props.getState();
    let headers = (state.settings.userprofile) ? state.settings.userprofile.options.headers : {};
    let formdata = Object.assign({}, this.state);
    let validationErrors = {};
    let hiddenInputs = {};
    let submitFormData = {};
    let formElementFields = [];
    delete formdata.formDataLists;
    delete formdata.formDataStatusDate;
    delete formdata.formDataTables;

    if (this.props.hiddenFields) {
      this.props.hiddenFields.forEach(hiddenField => {
        hiddenInputs[ hiddenField.form_name ] = this.state[ hiddenField.form_val ]; 
      });
      formdata = Object.assign(formdata, hiddenInputs);
    }
    if (this.props.formgroups && this.props.formgroups.length) {
      this.props.formgroups.forEach(formgroup => {
        if (formgroup.formElements && formgroup.formElements.length) {
          formgroup.formElements.forEach(formElement => {
            if (formElement.type === 'group') {
              if (formElement.groupElements && formElement.groupElements.length) {
                formElement.groupElements.forEach(groupElement => {
                  if (groupElement.name) {
                    formElementFields.push(groupElement.name);
                  }
                });
              }
            }
            else {
              if (formElement.name) {
                formElementFields.push(formElement.name);
              }
            }
          });
        }
      });
    }
    console.debug({formElementFields})
    if (this.props.validations) {
      this.props.validations.forEach(validation => {
        // console.debug(formdata[ validation.name ], { validation, });
        let validationerror = validate({ [ validation.name ]: formdata[ validation.name ], }, validation.constraints);
        if (validationerror) {
          validationErrors[ validation.name ] = validationerror[ validation.name ];
        }
      });
    } else {
      delete formdata.formDataErrors;
    }
    if (formElementFields && formElementFields.length) {
      formElementFields.forEach(formElmField => {
        submitFormData[ formElmField ] = formdata[ formElmField ];
      });
    }
    console.debug({ submitFormData, formdata });
    if (validationErrors && Object.keys(validationErrors).length < 1) {
      this.setState({ formDataErrors: {}, });
    }
    if (validationErrors && Object.keys(validationErrors).length > 0) {
      this.setState({ formDataErrors: validationErrors, });
      console.debug('has errors', validationErrors, { submitFormData, });
    } else if (!this.props.onSubmit) {
      this.props.debug(submitFormData);
    } else if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:this.props') !== -1) {
      delete formdata.formDataFiles;
      delete formdata.formDataErrors;
      this.props[this.props.onSubmit.replace('func:this.props.', '')](submitFormData);
    } else if (typeof this.props.onSubmit !== 'function') {
      let fetchOptions = this.props.onSubmit;
      let formBody = new FormData();
      let fetchPostBody;

      //if file
      if (Object.keys(formdata.formDataFiles).length) {
        delete headers[ 'Content-Type' ];
        delete headers[ 'content-type' ];
        Object.keys(formdata.formDataFiles).forEach((formFileName) => {
          let fileList = formdata.formDataFiles[ formFileName ].files;
          for (let x = 0; x < fileList.length; x++){
            formBody.append(formFileName, fileList.item(x));
          }
        });
        delete formdata.formDataErrors;
        delete formdata.formDataFiles;
        Object.keys(submitFormData).forEach(form_name => {
          formBody.append(form_name, submitFormData[ form_name ]);
        });
        fetchPostBody = formBody;
      } else {
        delete formdata.formDataErrors;
        delete formdata.formDataFiles;
        fetchPostBody = JSON.stringify(submitFormData);        
      }

      fetchOptions.options = Object.assign(
        {
          headers,
        },
        fetchOptions.options,
        {
          body: fetchPostBody, 
        });

      /*
        // https://lowrey.me/upload-files-as-a-gist-using-javascripts-fetch-api/
        // https://www.raymondcamden.com/2016/05/10/uploading-multiple-files-at-once-with-fetch
        //http://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-html5-js-fetch-api
        // https://github.com/yawetse/formie/blob/master/lib/formie.js
      */
      fetch(this.getFormSumitUrl(fetchOptions.url, fetchOptions.params, formdata),
        fetchOptions.options
      )
        .then(utilities.checkStatus)
        .then(res => {
          if (fetchOptions.success) {
            if (fetchOptions.success.modal) {
              this.props.createModal(fetchOptions.success.modal);
            } else if (fetchOptions.success.notification) {
              this.props.createNotification(fetchOptions.success.notification);
            } else {
              this.props.createNotification({ text: 'Saved', timeout:4000, type:'success',  });
            }
          } 
          return res.json();
        })
        .catch(e => {
          if (typeof this.props.onError !== 'function') {
            console.error(e);
            this.props.errorNotification(e);
          } else {
            this.props.onError(e);
          }
        });
    } else {
      this.props.onSubmit(submitFormData);
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
    let keyValue = 0;
    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      let gridProps = Object.assign({
        isMultiline: true,
        key: i,
      }, formgroup.gridProps);
      let getFormElements = (formElement, j) => {
        if (formElement.type === 'text' ) {
          return this.getFormTextInputArea({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'textarea') {
          return this.getFormTextArea({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'hidden') {
          return this.getHiddenInput({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'checkbox' || formElement.type === 'radio') {
          return this.getFormCheckbox({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'code') {
          return this.getFormCode({ formElement,  i:j, formgroup, }); 
        // } else if (formElement.type === 'editor') {
        //   return this.getFormEditor({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'link') {
          return this.getFormLink({
            formElement, i: j, button: this.getRenderedComponent(formElement.value,undefined,true),
          }); 
        } else if (formElement.type === 'select') {
          return this.getFormSelect({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'layout') {
          return (<div key={j} {...formElement.layoutProps}>{this.getRenderedComponent(formElement.value)}</div>);
        } else if (formElement.type === 'submit') {
          return this.getFormSubmit({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'group') {
          return this.getFormGroup({ formElement,  i:j, groupElements:formElement.groupElements.map(getFormElements), }); 
        } else {
          return <div key={j}>{`${formElement.label || formElement.name }(${formElement.type || 'unknown'}):${ this.state[formElement.name] || formElement.value }`}</div>;
        }
      };
      /** If the formgroup is a card and has two columns, it will create a single card with two inputs split into two columns based on which ones are set in each column */
      if (formgroup.card && formgroup.card.twoColumns) {
        keyValue++;
        keyValue += i;
        return (
          <ResponsiveCard {...formgroup.card.props} key={keyValue++}>
          <Columns>
            <Column size="isHalf">
            {formgroup.formElements[0].formGroupElementsLeft.map(getFormElements)}
            </Column>
            <Column size="isHalf">
              {formgroup.formElements[0].formGroupElementsRight.map(getFormElements)}
            </Column>  
          </Columns>
        </ResponsiveCard>);
      }

      /** If a formgroup is a card and doubleCard is true, it will create two columns, each with a card. The cards will be independant of each other but will share the same horizontal space */
      if (formgroup.card && formgroup.card.doubleCard) {
        keyValue++;
        keyValue += i;
        return (
          <Columns>
            <Column size="isHalf">
              <ResponsiveCard {...formgroup.card.leftCardProps} key={keyValue++}>
                {formgroup.formElements[0].formGroupCardLeft.map(getFormElements)}
              </ResponsiveCard>
            </Column>
            <Column size="isHalf">
              <ResponsiveCard {...formgroup.card.rightCardProps} key={keyValue++}>
                {formgroup.formElements[0].formGroupCardRight.map(getFormElements)}
              </ResponsiveCard>
            </Column>
          </Columns>);
      }

      /** If a formgroup is a card, and is not a doubleCard or twoColumns, it will be a single card in a horizontal space in a half size column  */
      if (formgroup.card && !formgroup.card.twoColumns && !formgroup.card.doubleCard) {
        keyValue++;
        keyValue += i;
        let columnProps = gridProps.subColumnProps || {};//previously was size=isHalf
        return (<Columns {...gridProps}>
          <Column {...columnProps}>  
            <ResponsiveCard {...formgroup.card.props} key={keyValue++}>
              {formgroup.formElements.map(getFormElements)}
            </ResponsiveCard>
          </Column>  
        </Columns>);
      }
      return (<Columns {...gridProps}>
        {formgroup.formElements.map(getFormElements)}
      </Columns>);
    });
    let footerGroupData = (this.props.footergroups)
      ? this.props.footergroups.map((formgroup, i) => { 
        let gridProps = Object.assign({
          isMultiline: true,
          key: i,
        }, formgroup.gridProps);
        let getFormElements = (formElement, j) => {
          if (formElement.type === 'submit') {
            return this.getCardFooterItem({ formElement,  i:j, formgroup, });
          } else {
            return <CardFooterItem>
              <div key={j} />
            </CardFooterItem>;
          }
        };      
        return (<CardFooter {...gridProps}>
          {formgroup.formElements.map(getFormElements)}
        </CardFooter>);
      })
      : [];

    if (this.props.cardForm) {
      return (<Card {...this.props.cardFormProps}>
        <CardContent>
          {formGroupData}
        </CardContent>
        {footerGroupData}
      </Card>);
    } else if(this.props.notificationForm){
      return (<div style={this.props.style}>
        <Notification {...this.props.notificationForm}>{formGroupData}</Notification>
      </div>);
    } else {
      return (<div style={this.props.style}>{ formGroupData }</div>);
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