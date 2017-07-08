import React, { Component, PropTypes, } from 'react';
import { Columns, Card, CardHeader, CardHeaderTitle, CardContent, CardFooter, CardFooterItem, Notification, Column, Label, } from 're-bulma'; 
import ResponsiveCard from '../ResponsiveCard';
import { getRenderedComponent, } from '../AppLayoutMap';
import utilities from '../../util';
import { getFormTextInputArea, getFormMaskedInput, getFormCheckbox, getFormSubmit, getFormSelect, getCardFooterItem, getFormCode, getFormTextArea, getFormEditor, getFormLink, getHiddenInput, getFormGroup, getImage, getFormDatalist, getRawInput, getSliderInput, getFormDatatable, } from './FormElements';
import { getCallbackFromString, setFormNameFields, assignHiddenFields, validateForm, assignFormBody, handleFormSubmitNotification, handleSuccessCallbacks, submitThisDotPropsFunc, submitWindowFunc, validateFormElement, } from './FormHelpers';
import flatten from 'flat';
import qs from 'querystring';
// function getCallbackFromString(fetchOptions.successCallback) {

const propTypes = {
  notificationForm: PropTypes.any,
  flattenFormData: PropTypes.bool,
  stringyFormData: PropTypes.bool,
  useFormOptions: PropTypes.bool,
  setInitialValues: PropTypes.bool,
  flattenDataOptions: PropTypes.object,
  useErrorNotification: PropTypes.bool,
  useDynamicData: PropTypes.bool,
  cardForm: PropTypes.bool,
  cardFormProps: PropTypes.object,
  passProps: PropTypes.object,
  formdata: PropTypes.object,
  __formOptions: PropTypes.object,
  onSubmit: PropTypes.any,
  validations: PropTypes.array,
  hiddenFields: PropTypes.array,
  footergroups: PropTypes.array,
  formgroups: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const defaultProps = {
  notificationForm: false,
  flattenFormData: false,
  useFormOptions: false,
  useDynamicData: false,
  setInitialValues: true,
  useErrorNotification:true,
  dynamicResponseField: false,
  dynamicField: false,
  blockPageUI:false,
  cardForm: false,
  onSubmit: 'func:this.props.debug',
  formgroups:[],
};

class ResponsiveForm extends Component{
  constructor(props) {
    super(props);
    // console.debug('initialformdata', setFormNameFields.call(this,{ formElementFields: [], formdata: {}, }));
    // console.debug({ props });
    let formdata = Object.assign({},
      setFormNameFields.call({ props, }, { formElementFields: [], formdata: {}, }).formdata,  
      (props.flattenFormData && props.formdata) 
        ? flatten(Object.assign({}, props.formdata), props.flattenDataOptions)
        : props.formdata);
    // console.debug('initial', { formdata });
    if (props.stringyFormData) {
      formdata.genericdocjson = JSON.stringify(props.formdata, null, 2);
    }
    let customPropsFormdata = Object.assign({}, formdata, (props.useDynamicData && props.getState())
      ? props.getState().dynamic.formdata
      : {}, props.formdata);
    customPropsFormdata.__formOptions = (props.useFormOptions)
      ? Object.assign({},
        (props.useDynamicData && props.getState()) ? props.getState().dynamic.__formOptions : {}, props.__formOptions)
      : undefined;
    // console.debug({ formdata });
    
    this.state = Object.assign(
      {
        formDataError: null,
        formDataErrors: {},
        __formDataStatusDate: new Date().toString(),
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
    this.getFormMaskedInput = getFormMaskedInput.bind(this);
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
    this.validateFormElement = validateFormElement.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.debug('componentWillReceiveProps', nextProps);
    let formdata = (nextProps.flattenFormData)
      ? flatten(Object.assign({}, nextProps.formdata), nextProps.flattenDataOptions)
      : nextProps.formdata;
    formdata = Object.assign({},
      (nextProps.useDynamicData)
        ? this.props.getState().dynamic.formdata
        : {},
      formdata);
    let __formOptions = (nextProps.useFormOptions)
      ? Object.assign({},
        (nextProps.useDynamicData && nextProps.getState()) ? nextProps.getState().dynamic.__formOptions : {}, nextProps.__formOptions)
      : undefined;
    formdata.__formOptions = __formOptions;
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
    // console.log('this.props.blockPageUI', this.props.blockPageUI);
    if (this.props.blockPageUI) {
      this.props.setUILoadedState(false, this.props.blockPageUILayout);
    }
    let state = this.props.getState();
    let headers = (state.settings.userprofile) ? state.settings.userprofile.options.headers : {};
    let formdata = Object.assign({}, this.state);
    let validationErrors = {};
    let hiddenInputs = {};
    let submitFormData = {};
    let formElementFields = [];
    const getCBFromString = getCallbackFromString.bind(this);
    const formNameFields = setFormNameFields.bind(this);
    const getAssigedHiddenField = assignHiddenFields.bind(this);
    const getFormValidations = validateForm.bind(this);
    const getFormBody = assignFormBody.bind(this);
    const formSubmitNotification = handleFormSubmitNotification.bind(this);
    const formSuccessCallbacks = handleSuccessCallbacks.bind(this);
    const __formStateUpdate = () => {
      this.setState({
        __formDataStatusDate: new Date().toString(),
      });

      if (this.props.blockPageUI) {
        this.props.setUILoadedState(true);
      }
    };
    
    delete formdata.formDataLists;
    delete formdata.__formDataStatusDate;
    delete formdata.formDataTables;

    let assigedHiddenFields = getAssigedHiddenField({ formdata, hiddenInputs, submitFormData, });
    hiddenInputs = assigedHiddenFields.hiddenInputs;
    formdata = assigedHiddenFields.formdata;
    submitFormData = assigedHiddenFields.submitFormData;

    let updatedFormFieldsAndData = formNameFields({ formElementFields, formdata, });
    formElementFields = updatedFormFieldsAndData.formElementFields;
    formdata = updatedFormFieldsAndData.formdata;

    let validatedFormData = getFormValidations({ formdata, validationErrors, });
    validationErrors = validatedFormData.validationErrors;
    formdata = validatedFormData.formdata;

    if (formElementFields && formElementFields.length) {
      formElementFields.forEach(formElmField => {
        submitFormData[ formElmField ] = formdata[ formElmField ];
      });
    }

    if (this.props.sendSubmitButtonVal) {
      submitFormData[ 'submitButtonVal' ] = formdata.submitButtonVal;
    }
    // console.debug({ submitFormData, formdata, validationErrors });
    if (validationErrors && Object.keys(validationErrors).length < 1) {
      this.setState({ formDataErrors: {}, });
    }
    if (validationErrors && Object.keys(validationErrors).length > 0) {
      this.setState({ formDataErrors: validationErrors, });
      console.debug('has errors', validationErrors, { submitFormData, });
      if (this.props.blockPageUI) {
        this.props.setDebugUILoadedState(true);
      }
    } else if (!this.props.onSubmit) {
      this.props.debug(submitFormData);
      __formStateUpdate();
    } else if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:this.props') !== -1) {
      submitThisDotPropsFunc.call(this, { formdata, submitFormData, });
      __formStateUpdate();
    } else if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:window') !== -1) {
      submitWindowFunc.call(this, { formdata, submitFormData, });
      __formStateUpdate();
    } else if (typeof this.props.onSubmit !== 'function') {
      let fetchOptions = Object.assign({}, this.props.onSubmit);
      let formBody = new FormData();
      let fetchPostBody;
      let updatedFormBody = getFormBody({ formdata, headers, formBody, submitFormData, fetchPostBody, fetchOptions, });
      let isGetRequest = updatedFormBody.isGetRequest;
      formdata = updatedFormBody.formdata;
      headers = updatedFormBody.headers;
      formBody = updatedFormBody.formBody;
      submitFormData = updatedFormBody.submitFormData;
      fetchPostBody = updatedFormBody.fetchPostBody;
      fetchOptions = updatedFormBody.fetchOptions;
      // console.log({ headers }, 'fetchOptions.options', fetchOptions.options);
      fetch(
        this.getFormSumitUrl(`${fetchOptions.url}${
          ((isGetRequest || this.props.stringifyBody) && fetchOptions.url.indexOf('?') !== -1)
          ? '&'
          : (fetchOptions.url.indexOf('?') === -1)
            ? '?'
            : ''}${(isGetRequest || this.props.stringifyBody)
          ? qs.stringify(submitFormData)
          : ''}`,
          fetchOptions.params,
          formdata),
        fetchOptions.options
      )
        .then(utilities.checkStatus)
        .then(res => {
          if (fetchOptions.success) {
            formSubmitNotification({ fetchOptions, __formStateUpdate, });
          } 
          if (fetchOptions.successCallback || fetchOptions.responseCallback) {
            let successCallback = (fetchOptions.successCallback)
              ? getCBFromString(fetchOptions.successCallback)
              : false;
            let responseCallback = (fetchOptions.responseCallback)
              ? getCBFromString(fetchOptions.responseCallback)
              : false;
            
            res.json()
              .then(successData => {
                if (successData && (typeof successData.successCallback === 'string' || (Array.isArray(successData.successCallback) && successData.successCallback.length))) {
                  successCallback = getCBFromString(successData.successCallback);
                }
                if (successData && (typeof successData.responseCallback === 'string' || (Array.isArray(successData.responseCallback) && successData.responseCallback.length))) {
                  responseCallback = getCBFromString(successData.responseCallback);
                }
                formSuccessCallbacks({ fetchOptions, submitFormData, successData, successCallback, responseCallback, });
                __formStateUpdate();
              });
          } else {
            return res.json();
          }
        })
        .catch(e => {
          __formStateUpdate();
          if (typeof e === 'object' && (typeof e.callback === 'string' || (Array.isArray(e.callback) && e.callback.length)) &&  e.callbackProps) {
            let errorCB = getCBFromString(e.callback);
            errorCB(e.callbackProps);
          } else {
            let errorCB = getCBFromString(this.props.errorCallback);
            if (this.props.useErrorNotification) {
              console.error(e);
              this.props.errorNotification(e);
            }
            if (errorCB) {
              let errorProps = (this.props.useErrorMessageProp) ? e.message : e;
              errorCB(errorProps);
            } else if(this.props.onError && typeof this.props.onError==='function') {
              this.props.onError(e);
            }
          }
        });
    } else {
      this.props.onSubmit(submitFormData);
    }
  }
  componentWillUpdate (nextProps, nextState) {
    if (this.props.onChange) {
      let formdata = Object.assign({}, nextState);
      let submitFormData = formdata;
      delete formdata.formDataFiles;
      delete formdata.formDataErrors;
      delete formdata.formDataError;
      delete formdata.formDataStatusDate;
      delete formdata.formDataLists;
      delete formdata.formDataTables;
      // console.warn('TODO:this should eventually use the same logic as submitform');
      if (typeof this.props.onChange === 'string' && this.props.onChange.indexOf('func:this.props') !== -1) {
        if (this.props.onChange === 'func:this.props.setDynamicData') {
          this.props.setDynamicData(this.props.dynamicField, submitFormData);
        } else {
          this.props[this.props.onChange.replace('func:this.props.', '')](submitFormData);
        }
      } else if (typeof this.props.onChange === 'string' && this.props.onChange.indexOf('func:window') !== -1 && typeof window[this.props.onChange.replace('func:window.', '')] ==='function') {
        window[this.props.onChange.replace('func:window.', '')].call(this, submitFormData);
      } else if(typeof this.props.onChange ==='function') {
        this.props.onChange(nextState);
      }
    }
  }
  render() {
    // console.debug('form render', this.state);
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
        } else if (formElement.type === 'text' || formElement.type === 'file' ) {
          return this.getFormTextInputArea({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'input' ) {
          return this.getRawInput({ formElement,  i:j, formgroup, });
        } else if (formElement.type === 'maskedinput' ) {
          return this.getFormMaskedInput({ formElement,  i:j, formgroup, });
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
        } else if (formElement.type === 'slider') {
          return this.getSliderInput({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'layout') {
          return (<Column key={j} {...formElement.layoutProps}>{this.getRenderedComponent(formElement.value)}</Column>);
        } else if (formElement.type === 'submit') {
          return this.getFormSubmit({ formElement,  i:j, formgroup, }); 
        } else if (formElement.type === 'group') {
          return this.getFormGroup({ formElement,  i:j, groupElements:formElement.groupElements.map(getFormElements), }); 
        } else {
          formElement.passProps = Object.assign({}, formElement.passProps, { type: formElement.type, });
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
            {(formgroup.formElements[0 ]&& formgroup.formElements[0].formGroupElementsLeft && formgroup.formElements[0].formGroupElementsLeft.length)? formgroup.formElements[0].formGroupElementsLeft.map(getFormElements): null}
            </Column>
            <Column size="isHalf">
              {(formgroup.formElements[0] && formgroup.formElements[0] && formgroup.formElements[0].formGroupElementsRight)? formgroup.formElements[0].formGroupElementsRight.map(getFormElements):null}
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
                {(formgroup.formElements[0] && formgroup.formElements[0].formGroupCardLeft && formgroup.formElements[0].formGroupCardLeft.length)? formgroup.formElements[0].formGroupCardLeft.map(getFormElements) : null}
              </ResponsiveCard>
            </Column>
            <Column {...rightDoubleCardColumnProps}>
              <ResponsiveCard {...formgroup.card.rightCardProps} key={keyValue++}>
                {(formgroup.formElements[0] && formgroup.formElements[0].formGroupCardRight && formgroup.formElements[0].formGroupCardRight.length)? formgroup.formElements[0].formGroupCardRight.map(getFormElements):null}
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
              {(formgroup.formElements && formgroup.formElements.length)? formgroup.formElements.map(getFormElements):null}
            </ResponsiveCard>
          </Column>  
        </Columns>);
      }
      return (<Columns {...gridProps}>
        {(formgroup.formElements && formgroup.formElements.length)? formgroup.formElements.map(getFormElements):null}
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
      return (<Card className="__ra_rf" {...Object.assign({}, {
        isFullwidth: true,
      }, this.props.cardFormProps) }>
        {(this.props.cardFormTitle)
          ? (<CardHeader><CardHeaderTitle {...this.props.cardFormTitleProps}>{this.props.cardFormTitle}</CardHeaderTitle></CardHeader>)
          : null}  
        <CardContent>
          {formGroupData}
          {this.props.children}
        </CardContent>
        {footerGroupData}
      </Card>);
    } else if(this.props.notificationForm){
      return (<div className="__ra_rf" style={this.props.style}>
        <Notification {...this.props.notificationForm}>
          {formGroupData}
          {this.props.children}
        </Notification>
      </div>);
    } else {
      return (<div className="__ra_rf" style={this.props.style} {...this.props.passProps}>
        {formGroupData}
        {this.props.children}
      </div>);
    }
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate this.props.error', this.props.error);
    if (this.props.formerror) {
      this.props.onError(this.props.formerror);
    }
  }
}

ResponsiveForm.propType = propTypes;
ResponsiveForm.defaultProps = defaultProps;

export default ResponsiveForm;