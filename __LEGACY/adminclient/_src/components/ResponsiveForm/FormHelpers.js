'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.validateFormElement = validateFormElement;
exports.validateForm = validateForm;
exports.assignHiddenFields = assignHiddenFields;
exports.getCallbackFromString = getCallbackFromString;
exports.setAddNameToName = setAddNameToName;
exports.setFormNameFields = setFormNameFields;
exports.assignFormBody = assignFormBody;
exports.handleFormSubmitNotification = handleFormSubmitNotification;
exports.handleSuccessCallbacks = handleSuccessCallbacks;
exports.submitThisDotPropsFunc = submitThisDotPropsFunc;
exports.submitWindowFunc = submitWindowFunc;

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _validate3 = require('validate.js');

var _validate4 = _interopRequireDefault(_validate3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateFormElement(options) {
  try {
    var formElement = options.formElement;

    var validation = this.props.validations.filter(function (validation) {
      return validation.name === formElement.name;
    });
    validation = validation.length > 0 ? validation[0] : false;
    if (validation) {
      var validationerror = (0, _validate4.default)((0, _defineProperty3.default)({}, validation.name, this.state[validation.name]), validation.constraints);
      var validationErrors = void 0;
      if (validationerror) {
        validationErrors = (0, _assign2.default)({}, this.state.formDataErrors);
        validationErrors[validation.name] = validationerror[validation.name];
      } else {
        validationErrors = (0, _assign2.default)({}, this.state.formDataErrors);
        delete validationErrors[validation.name];
      }
      this.setState({ formDataErrors: validationErrors });
      // console.debug('has errors', validationErrors, 'this.state[formElement.name]', this.state[ formElement.name ]);
    }
  } catch (e) {
    console.debug('validation check error', e);
  }
}

function validateForm(options) {
  // console.debug('testin valdation',this.props.validations)
  var formdata = options.formdata,
      validationErrors = options.validationErrors;

  if (this.props.validations) {
    this.props.validations.forEach(function (validation) {
      var validationerror = (0, _validate4.default)((0, _defineProperty3.default)({}, validation.name, formdata[validation.name]), validation.constraints);
      // console.debug(formdata[ validation.name ], { validation, validationerror, });
      if (validationerror) {
        validationErrors[validation.name] = validationerror[validation.name];
      }
    });
  } else {
    delete formdata.formDataErrors;
  }
  return { formdata: formdata, validationErrors: validationErrors };
}

function assignHiddenFields(options) {
  var _this = this;

  var formdata = options.formdata,
      hiddenInputs = options.hiddenInputs,
      submitFormData = options.submitFormData;

  var dynamicFields = {};
  var ApplicationState = this.props.getState();

  if (this.props.hiddenFields) {
    this.props.hiddenFields.forEach(function (hiddenField) {
      var hiddenFormValue = typeof _this.state[hiddenField.form_val] === 'undefined' ? hiddenField.form_static_val : _this.state[hiddenField.form_val];
      hiddenInputs[hiddenField.form_name] = hiddenFormValue;
      submitFormData[hiddenField.form_name] = hiddenFormValue;
    });
  }
  if (this.props.dynamicFields) {
    var mergedDynamicField = this.props.mergeDynamicFields ? (0, _assign2.default)({}, ApplicationState.dynamic, (0, _flat2.default)(ApplicationState.dynamic)) : ApplicationState.dynamic;
    this.props.dynamicFields.forEach(function (dynamicHiddenField) {
      var hiddenFormValue = typeof mergedDynamicField[dynamicHiddenField.form_val] === 'undefined' ? dynamicHiddenField.form_static_val : mergedDynamicField[dynamicHiddenField.form_val];
      dynamicFields[dynamicHiddenField.form_name] = hiddenFormValue;
      submitFormData[dynamicHiddenField.form_name] = hiddenFormValue;
    });
  }
  formdata = (0, _assign2.default)(formdata, hiddenInputs, dynamicFields);
  return { formdata: formdata, hiddenInputs: hiddenInputs, submitFormData: submitFormData };
}

function getCallbackFromString(successCBProp) {
  var successCallback = void 0;
  if (Array.isArray(successCBProp) && successCBProp.length) {
    var fns = successCBProp.map(getCallbackFromString.bind(this));
    successCallback = function () {
      for (var i = 0; i < fns.length; i++) {
        var _fns$i;

        (_fns$i = fns[i]).call.apply(_fns$i, [this].concat(Array.prototype.slice.call(arguments)));
      }
    }.bind(this);
  } else {
    if (typeof successCBProp === 'string' && successCBProp.indexOf('func:this.props.reduxRouter') !== -1) {
      successCallback = this.props.reduxRouter[successCBProp.replace('func:this.props.reduxRouter.', '')];
    } else if (typeof successCBProp === 'string' && successCBProp.indexOf('func:window') !== -1 && typeof window[successCBProp.replace('func:window.', '')] === 'function') {
      successCallback = window[successCBProp.replace('func:window.', '')].bind(this);
    } else if (typeof successCBProp === 'string') {
      successCallback = this.props[successCBProp.replace('func:this.props.', '')];
    }
  }
  return successCallback;
}

function setAddNameToName(options) {
  var formdata = options.formdata,
      formElementFields = options.formElementFields,
      formElm = options.formElm;

  var recursiveSetAddNameToName = setAddNameToName.bind(this);
  // console.debug('addNameToName','(formElm.passProps && formElm.passProps.state===isDisabled)',(formElm.passProps && formElm.passProps.state==='isDisabled'),{ formElm });
  // skip if null, or disabled
  // console.debug({ formElm, });
  if (!formElm || formElm.disabled || formElm.passProps && formElm.passProps.state === 'isDisabled') {
    // console.debug('skip', formElm);
    //
  } else if (formElm.type === 'group') {
    if (formElm.groupElements && formElm.groupElements.length) {
      formElm.groupElements.forEach(function (formElm) {
        return recursiveSetAddNameToName({ formdata: formdata, formElementFields: formElementFields, formElm: formElm });
      });
    }
  } else if (formElm.name) {
    formElementFields.push(formElm.name);
    if (formElm.type === 'hidden' || this.props && this.props.setInitialValues) {
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

function assignFormBody(options) {
  var formdata = options.formdata,
      headers = options.headers,
      formBody = options.formBody,
      submitFormData = options.submitFormData,
      fetchPostBody = options.fetchPostBody,
      fetchOptions = options.fetchOptions;
  //if file

  if ((0, _keys2.default)(formdata.formDataFiles).length) {
    delete headers['Content-Type'];
    delete headers['content-type'];
    (0, _keys2.default)(formdata.formDataFiles).forEach(function (formFileName) {
      var fileList = formdata.formDataFiles[formFileName].files;
      for (var x = 0; x < fileList.length; x++) {
        formBody.append(formFileName, fileList.item(x));
      }
    });
    delete formdata.formDataErrors;
    delete formdata.formDataFiles;
    (0, _keys2.default)(submitFormData).forEach(function (form_name) {
      formBody.append(form_name, submitFormData[form_name]);
    });
    fetchPostBody = formBody;
  } else {
    delete formdata.formDataErrors;
    delete formdata.formDataFiles;
    fetchPostBody = (0, _stringify2.default)(submitFormData);
  }
  var isGetRequest = fetchOptions.options && fetchOptions.options.method && fetchOptions.options.method.toUpperCase() === 'GET';
  var bodyForFetch = isGetRequest ? {} : {
    body: fetchPostBody
  };
  if (fetchOptions.options.headers) {
    headers = (0, _assign2.default)({}, headers, fetchOptions.options.headers);
  }
  fetchOptions.options = (0, _assign2.default)({}, fetchOptions.options, {
    headers: headers
  }, bodyForFetch);

  return { formdata: formdata, headers: headers, formBody: formBody, submitFormData: submitFormData, fetchPostBody: fetchPostBody, fetchOptions: fetchOptions, isGetRequest: isGetRequest };
}

function handleFormSubmitNotification(options) {
  var fetchOptions = options.fetchOptions,
      __formStateUpdate = options.__formStateUpdate;

  if (fetchOptions.success.modal) {
    this.props.createModal(fetchOptions.success.modal);
  } else if (fetchOptions.success.notification) {
    this.props.createNotification(fetchOptions.success.notification);
  } else {
    this.props.createNotification({ text: 'Saved', timeout: 4000, type: 'success' });
  }
  if (!fetchOptions.successCallback && !fetchOptions.responseCallback) {
    __formStateUpdate();
  }
}

function handleSuccessCallbacks(options) {
  var fetchOptions = options.fetchOptions,
      submitFormData = options.submitFormData,
      successData = options.successData,
      successCallback = options.successCallback,
      responseCallback = options.responseCallback;

  if (fetchOptions.successCallback === 'func:this.props.setDynamicData') {
    this.props.setDynamicData(this.props.dynamicField, submitFormData);
  } else {
    if (fetchOptions.setDynamicData) {
      this.props.setDynamicData(this.props.dynamicField, submitFormData);
    }
    if (successCallback) {
      successCallback(fetchOptions.successProps || successData.callbackProps || (0, _assign2.default)({}, submitFormData, successData), submitFormData);
    }
  }
  if (responseCallback) {
    if (fetchOptions.responseCallback === 'func:this.props.setDynamicData') {
      this.props.setDynamicData(this.props.dynamicResponseField, successData);
    } else {
      if (fetchOptions.setDynamicResponseData) {
        this.props.setDynamicData(this.props.dynamicResponseField, successData);
      }
      responseCallback(successData.callbackProps || successData, submitFormData);
    }
  }
  if (this.props.updateFormOnResponse) {
    this.setState(this.props.flattenFormData ? (0, _assign2.default)({}, successData, (0, _flat2.default)(successData, this.props.flattenDataOptions)) : successData);
  }
}

function submitThisDotPropsFunc(options) {
  var formdata = options.formdata,
      submitFormData = options.submitFormData;

  delete formdata.formDataFiles;
  delete formdata.formDataErrors;
  if (this.props.onSubmit === 'func:this.props.setDynamicData') {
    // console.debug('this.props', this.props);
    this.props.setDynamicData(this.props.dynamicField, submitFormData);
  } else {
    this.props[this.props.onSubmit.replace('func:this.props.', '')](submitFormData);
  }
}

function submitWindowFunc(options) {
  var formdata = options.formdata,
      submitFormData = options.submitFormData;

  delete formdata.formDataFiles;
  delete formdata.formDataErrors;
  window[this.props.onSubmit.replace('func:window.', '')].call(this, submitFormData);
}