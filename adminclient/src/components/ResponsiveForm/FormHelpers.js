export function getCallbackFromString(successCBProp) {
  let successCallback;
  if (typeof successCBProp === 'string' && successCBProp.indexOf('func:this.props.reduxRouter') !== -1) {
    successCallback = this.props.reduxRouter[ successCBProp.replace('func:this.props.reduxRouter.', '') ];
  } else if (successCBProp.indexOf('func:window') !== -1 && typeof window[ successCBProp.replace('func:window.', '') ] ==='function'){
    successCallback= window[ successCBProp.replace('func:window.', '') ].bind(this);
  } else {
    successCallback = this.props[ successCBProp.replace('func:this.props.', '') ];
  }
  return successCallback;
}
export function setAddNameToName(options) {
  let { formdata, formElementFields, formElm, } = options;
  // console.debug('addNameToName','(formElm.passProps && formElm.passProps.state===isDisabled)',(formElm.passProps && formElm.passProps.state==='isDisabled'),{ formElm });
  // skip if null, or disabled
  // console.debug({ formElm, });
  if (!formElm
    || formElm.disabled
    || (formElm.passProps && formElm.passProps.state==='isDisabled')
  ) {
    // console.debug('skip', formElm);
    //
  } else if (formElm.type === 'group') {
    if (formElm.groupElements && formElm.groupElements.length) {
      formElm.groupElements.forEach(formElm => setAddNameToName({ formdata, formElementFields, formElm, }));
    }
  } else if (formElm.name) {
    formElementFields.push(formElm.name);
    if (formElm.type === 'hidden' || this.props.setInitialValues) { 
      formdata[ formElm.name ] = (this.state)
        ? this.state[ formElm.name ] || formElm.value
        : formElm.value;
    }
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
  return { formdata, formElementFields, formElement:formElm, };
}
export function setFormNameFields(options) {
  let { formElementFields, formdata, } = options;
  const addNameToName = setAddNameToName.bind(this);

  if (this.props.formgroups && this.props.formgroups.length) {
    this.props.formgroups.forEach(formgroup => {
      if (formgroup.formElements && formgroup.formElements.length) {
        formgroup.formElements.forEach(formElement => {
          let formElementsLeft = (formElement.formGroupElementsLeft && formElement.formGroupElementsLeft.length) ? formElement.formGroupElementsLeft : false;
          let formElementsRight = (formElement.formGroupElementsRight && formElement.formGroupElementsRight.length) ? formElement.formGroupElementsRight : false;
          let formGroupLeft = (formElement.formGroupCardLeft && formElement.formGroupCardLeft.length) ? formElement.formGroupCardLeft : false;
          let formGroupRight = (formElement.formGroupCardRight && formElement.formGroupCardRight.length) ? formElement.formGroupCardRight : false;
          if (formElementsLeft || formElementsRight) {
            if (formElementsLeft) formElementsLeft.forEach(formElm => addNameToName({ formElementFields, formdata, formElm, }));
            if (formElementsRight) formElementsRight.forEach(formElm => addNameToName({ formElementFields, formdata, formElm, }));
          } else if (formGroupLeft || formGroupRight) {
            if (formGroupLeft) formGroupLeft.forEach(formElm => addNameToName({ formElementFields, formdata, formElm, }));
            if (formGroupRight) formGroupRight.forEach(formElm => addNameToName({ formElementFields, formdata, formElm, }));
          } else if (formElement.type === 'group') {
            if (formElement.groupElements && formElement.groupElements.length) formElement.groupElements.forEach(formElm => addNameToName({ formElementFields, formdata, formElm, }));
          } else if (!formElement
            || formElement.disabled
            || (formElement.passProps && formElement.passProps.state==='isDisabled')
          ) { 
            //skip if dsiabled
            // console.debug('skip', formElement);

          } else {
            if (formElement.name) {
              addNameToName({ formElementFields, formdata, formElm: formElement, });
              // formElementFields.push(formElement.name);
            }
          }
        });
      }
    });
  }
  return { formElementFields, formdata, };
}
