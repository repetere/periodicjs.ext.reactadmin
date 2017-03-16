import React, { Component, } from 'react';
import { Columns, Card, CardContent, CardFooter, CardFooterItem, Notification, Column, Label, } from 're-bulma'; 
import ResponsiveCard from '../ResponsiveCard';
import { getRenderedComponent, } from '../AppLayoutMap';
import utilities from '../../util';
import { getFormTextInputArea, getFormCheckbox, getFormSubmit, getFormSelect, getCardFooterItem, getFormCode, getFormTextArea, /*getFormEditor,*/ getFormLink, getHiddenInput, getFormGroup, getImage, getFormDatalist, getRawInput, getSliderInput, getFormDatatable, } from './FormElements';
import flatten from 'flat';
import validate from 'validate.js';

class ResponsiveForm extends Component{
  constructor(props) {
    super(props);
    let formdata = Object.assign({},
      (props.flattenFormData && props.formdata) 
        ? flatten(props.formdata, props.flattenDataOptions)
        : props.formdata);
    if (props.stringyFormData) {
      formdata.genericdocjson = JSON.stringify(props.formdata, null, 2);
    }
    let customPropsFormdata = Object.assign({}, (props.useDynamicData)?props.getState().dynamic.formdata:{}, props.formdata, formdata);
    // console.debug({ formdata });
    // console.debug('ResponsiveForm',{ props });
    this.state = Object.assign({
      formDataError: null,
      formDataErrors: {},
      formDataStatusDate: new Date(),
      formDataLists:{},
      formDataTables:{},
      formDataFiles:{},
    },
      // customProps.formdata,
      customPropsFormdata);
    this.datalists = {};

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
    // this.getFormEditor = getFormEditor.bind(this);
    this.getFormLink = getFormLink.bind(this);
    this.getFormGroup = getFormGroup.bind(this);
    this.getImage = getImage.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let formdata = (nextProps.flattenFormData) ? flatten(nextProps.formdata, nextProps.flattenDataOptions) : nextProps.formdata;
    formdata = Object.assign({}, (nextProps.useDynamicData) ? this.props.getState().dynamic.formdata : {}, formdata);
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
    let addNameToName = (formElm) => {
      // console.debug('addNameToName','(formElm.passProps && formElm.passProps.state===isDisabled)',(formElm.passProps && formElm.passProps.state==='isDisabled'),{ formElm });
      // skip if null, or disabled
      if (!formElm
        || formElm.disabled
        || (formElm.passProps && formElm.passProps.state==='isDisabled')
      ) {
        // console.debug('skip', formElm);
        //
      } else if (formElm.type === 'group') {
        if (formElm.groupElements && formElm.groupElements.length) {
          formElm.groupElements.forEach(addNameToName);
        }
      } else if (formElm.name) {
        formElementFields.push(formElm.name);
        if(formElm.type==='datalist'){
          // console.debug('before',{formElm,formdata});
          if(formElm.datalist.multi && formdata[formElm.name] && formdata[formElm.name].length){
            formdata[formElm.name] = formdata[formElm.name].map(datum=>datum[formElm.datalist.selector||'_id']);
          } else if(formdata[formElm.name] && Object.keys(formdata[formElm.name]).length){
            formdata[formElm.name] = formdata[formElm.name][formElm.datalist.selector||'_id'];
          }
          // console.debug('after',{formElm,formdata});
        }
      }
    };
    delete formdata.formDataLists;
    delete formdata.formDataStatusDate;
    delete formdata.formDataTables;


    if (this.props.hiddenFields) {
      this.props.hiddenFields.forEach(hiddenField => {
        hiddenInputs[ hiddenField.form_name ] = this.state[ hiddenField.form_val ] || hiddenField.form_static_val; 
        submitFormData[ hiddenField.form_name ] = this.state[ hiddenField.form_val ] || hiddenField.form_static_val; 
      });
      formdata = Object.assign(formdata, hiddenInputs);
    }
    if (this.props.formgroups && this.props.formgroups.length) {
      this.props.formgroups.forEach(formgroup => {
        if (formgroup.formElements && formgroup.formElements.length) {
          formgroup.formElements.forEach(formElement => {
            let formElementsLeft = (formElement.formGroupElementsLeft && formElement.formGroupElementsLeft.length) ? formElement.formGroupElementsLeft : false;
            let formElementsRight = (formElement.formGroupElementsRight && formElement.formGroupElementsRight.length) ? formElement.formGroupElementsRight : false;
            let formGroupLeft = (formElement.formGroupCardLeft && formElement.formGroupCardLeft.length) ? formElement.formGroupCardLeft : false;
            let formGroupRight = (formElement.formGroupCardRight && formElement.formGroupCardRight.length) ? formElement.formGroupCardRight : false;
            if (formElementsLeft || formElementsRight) {
              if (formElementsLeft) formElementsLeft.forEach(addNameToName);
              if (formElementsRight) formElementsRight.forEach(addNameToName);
            } else if (formGroupLeft || formGroupRight) {
              if (formGroupLeft) formGroupLeft.forEach(addNameToName);
              if (formGroupRight) formGroupRight.forEach(addNameToName);
            } else if (formElement.type === 'group') {
              if (formElement.groupElements && formElement.groupElements.length) formElement.groupElements.forEach(addNameToName);
            } else if (!formElement
              || formElement.disabled
              || (formElement.passProps && formElement.passProps.state==='isDisabled')
            ) { 
              //skip if dsiabled
              // console.debug('skip', formElement);

            } else {
              // console.debug({ formElement });
              if (formElement.name) formElementFields.push(formElement.name);
            }
          });
        }
      });
    }
    // console.debug({ formElementFields });
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
    // console.debug({ submitFormData, formdata });
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
      if (this.props.onSubmit === 'func:this.props.setDynamicData') {
        // console.debug('this.props', this.props);
        this.props.setDynamicData(this.props.dynamicField, submitFormData);
      } else {
        this.props[this.props.onSubmit.replace('func:this.props.', '')](submitFormData);
      }
    } else if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:window') !== -1) {
      delete formdata.formDataFiles;
      delete formdata.formDataErrors;
      window[this.props.onSubmit.replace('func:this.props.', '')].call(this,submitFormData);
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
          if (fetchOptions.successCallback) {
            let successCallback = (typeof fetchOptions.successCallback === 'string' && fetchOptions.successCallback.indexOf('func:this.props.reduxRouter') !== -1)
              ? this.props.reduxRouter[ fetchOptions.successCallback.replace('func:this.props.reduxRouter.', '') ]
              : this.props[ fetchOptions.successCallback.replace('func:this.props.', '') ];
            res.json()
              .then(successData => {
                if (fetchOptions.successCallback === 'func:this.props.setDynamicData') {
                  this.props.setDynamicData(this.props.dynamicField, submitFormData);
                } else {
                  if(fetchOptions.setDynamicData){
                    this.props.setDynamicData(this.props.dynamicField, submitFormData);
                  }
                  successCallback(fetchOptions.successProps || successData, submitFormData);
                }
              });
          } else {
            return res.json();
          }
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
  render() {
    let keyValue = 0;
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
          return this.getFormDatalist({ formElement,  i:j, formgroup, });
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
        // } else if (formElement.type === 'editor') {
        //   return this.getFormEditor({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'link') {
          return this.getFormLink({
            formElement, i: j, button: this.getRenderedComponent(formElement.value, undefined, true),
          }); 
        } else if (formElement.type === 'select') {
          return this.getFormSelect({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'image') {
          return this.getImage({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'slider') {
          return this.getSliderInput({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'layout') {
          return (<Column key={j} {...formElement.layoutProps}>{this.getRenderedComponent(formElement.value)}</Column>);
        } else if (formElement.type === 'submit') {
          return this.getFormSubmit({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'group') {
          return this.getFormGroup({ formElement,  i:j, groupElements:formElement.groupElements.map(getFormElements), }); 
        } else {
          return this.getFormTextInputArea({ formElement,  i:j, formgroup, });

          // return <Column key={j} {...formElement.layoutProps}>{`${formElement.label || formElement.name }(${formElement.type || 'unknown'}):${ this.state[formElement.name] || formElement.value }`}</Column>;
        }
      };
      /** If the formgroup is a card and has two columns, it will create a single card with two inputs split into two columns based on which ones are set in each column */
      if (formgroup.card && formgroup.card.twoColumns) {
        keyValue++;
        keyValue += i;
        return (
          <ResponsiveCard {...formgroup.card.props} key={keyValue++}>
          <Columns {...gridProps}>
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
        let leftDoubleCardColumnProps = Object.assign({
          size: 'isHalf',
          display: 'flex',
        }, formgroup.card.leftDoubleCardColumn);
        let rightDoubleCardColumnProps = Object.assign({
          size: 'isHalf',
          display: 'flex',
        }, formgroup.card.rightDoubleCardColumn);
        return (
          <Columns {...gridProps}>
            <Column {...leftDoubleCardColumnProps}>
              <ResponsiveCard {...formgroup.card.leftCardProps} key={keyValue++}>
                {formgroup.formElements[0].formGroupCardLeft.map(getFormElements)}
              </ResponsiveCard>
            </Column>
            <Column {...rightDoubleCardColumnProps}>
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