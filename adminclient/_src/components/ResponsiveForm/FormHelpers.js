'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getCallbackFromString = getCallbackFromString;
exports.setAddNameToName = setAddNameToName;
exports.setFormNameFields = setFormNameFields;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallbackFromString(successCBProp) {
  var successCallback = void 0;
  if (typeof successCBProp === 'string' && successCBProp.indexOf('func:this.props.reduxRouter') !== -1) {
    successCallback = this.props.reduxRouter[successCBProp.replace('func:this.props.reduxRouter.', '')];
  } else if (successCBProp.indexOf('func:window') !== -1 && typeof window[successCBProp.replace('func:window.', '')] === 'function') {
    successCallback = window[successCBProp.replace('func:window.', '')].bind(this);
  } else {
    successCallback = this.props[successCBProp.replace('func:this.props.', '')];
  }
  return successCallback;
}
function setAddNameToName(options) {
  var formdata = options.formdata,
      formElementFields = options.formElementFields,
      formElm = options.formElm;
  // console.debug('addNameToName','(formElm.passProps && formElm.passProps.state===isDisabled)',(formElm.passProps && formElm.passProps.state==='isDisabled'),{ formElm });
  // skip if null, or disabled
  // console.debug({ formElm, });

  if (!formElm || formElm.disabled || formElm.passProps && formElm.passProps.state === 'isDisabled') {
    // console.debug('skip', formElm);
    //
  } else if (formElm.type === 'group') {
    if (formElm.groupElements && formElm.groupElements.length) {
      formElm.groupElements.forEach(function (formElm) {
        return setAddNameToName({ formdata: formdata, formElementFields: formElementFields, formElm: formElm });
      });
    }
  } else if (formElm.name) {
    formElementFields.push(formElm.name);
    if (formElm.type === 'hidden' || this.props.setInitialValues) {
      if (formElm.type === 'radio') {
        if (this.state || formElm.checked || formElm.passProps && formElm.passProps.checked) {
          formdata[formElm.name] = formElm.value;
        }
      } else {
        formdata[formElm.name] = this.state ? this.state[formElm.name] || formElm.value : formElm.value;
      }
    }
    if (formElm.type === 'datalist') {
      // console.debug('before',{formElm,formdata});
      if (formElm.datalist.multi && formdata[formElm.name] && formdata[formElm.name].length) {
        formdata[formElm.name] = formdata[formElm.name].map(function (datum) {
          return datum[formElm.datalist.selector || '_id'];
        });
      } else if (formdata[formElm.name] && (0, _keys2.default)(formdata[formElm.name]).length) {
        formdata[formElm.name] = formdata[formElm.name][formElm.datalist.selector || '_id'];
      }
      // console.debug('after',{formElm,formdata});
    }
  }
  return { formdata: formdata, formElementFields: formElementFields, formElement: formElm };
}
function setFormNameFields(options) {
  var formElementFields = options.formElementFields,
      formdata = options.formdata;

  var addNameToName = setAddNameToName.bind(this);

  if (this.props.formgroups && this.props.formgroups.length) {
    this.props.formgroups.forEach(function (formgroup) {
      if (formgroup.formElements && formgroup.formElements.length) {
        formgroup.formElements.forEach(function (formElement) {
          var formElementsLeft = formElement.formGroupElementsLeft && formElement.formGroupElementsLeft.length ? formElement.formGroupElementsLeft : false;
          var formElementsRight = formElement.formGroupElementsRight && formElement.formGroupElementsRight.length ? formElement.formGroupElementsRight : false;
          var formGroupLeft = formElement.formGroupCardLeft && formElement.formGroupCardLeft.length ? formElement.formGroupCardLeft : false;
          var formGroupRight = formElement.formGroupCardRight && formElement.formGroupCardRight.length ? formElement.formGroupCardRight : false;
          if (formElementsLeft || formElementsRight) {
            if (formElementsLeft) formElementsLeft.forEach(function (formElm) {
              return addNameToName({ formElementFields: formElementFields, formdata: formdata, formElm: formElm });
            });
            if (formElementsRight) formElementsRight.forEach(function (formElm) {
              return addNameToName({ formElementFields: formElementFields, formdata: formdata, formElm: formElm });
            });
          } else if (formGroupLeft || formGroupRight) {
            if (formGroupLeft) formGroupLeft.forEach(function (formElm) {
              return addNameToName({ formElementFields: formElementFields, formdata: formdata, formElm: formElm });
            });
            if (formGroupRight) formGroupRight.forEach(function (formElm) {
              return addNameToName({ formElementFields: formElementFields, formdata: formdata, formElm: formElm });
            });
          } else if (formElement.type === 'group') {
            if (formElement.groupElements && formElement.groupElements.length) formElement.groupElements.forEach(function (formElm) {
              return addNameToName({ formElementFields: formElementFields, formdata: formdata, formElm: formElm });
            });
          } else if (!formElement || formElement.disabled || formElement.passProps && formElement.passProps.state === 'isDisabled') {
            //skip if dsiabled
            // console.debug('skip', formElement);

          } else {
            if (formElement.name) {
              addNameToName({ formElementFields: formElementFields, formdata: formdata, formElm: formElement });
              // formElementFields.push(formElement.name);
            }
          }
        });
      }
    });
  }
  return { formElementFields: formElementFields, formdata: formdata };
}