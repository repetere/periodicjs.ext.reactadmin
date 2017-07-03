import React from 'react';
import FormItem from '../FormItem';
import RACodeMirror from '../RACodeMirror';
import PreviewEditor from '../PreviewEditor';
import ResponsiveDatalist from '../ResponsiveDatalist';
import ResponsiveTable from '../ResponsiveTable';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import capitalize from 'capitalize';
// import RAEditor from '../RAEditor';
// import ResponsiveButton from '../ResponsiveButton';
// import { EditorState, } from 'draft-js';
import Slider from 'rc-slider';
import { ControlLabel, Label, Input, Button, CardFooterItem, Select, Textarea, Group, Image, } from 're-bulma';
import MaskedInput from 'react-text-mask';
import moment from 'moment';
import numeral from 'numeral';
import pluralize from 'pluralize';
import flatten, { unflatten, } from 'flat';
import styles from '../../styles';
import { validateForm, } from './FormHelpers';

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

function getErrorStatus(state, name) {
  return (state.formDataErrors && state.formDataErrors[ name ]);
}

function getFormElementHelp(hasError, state, name) {
  return (hasError) ? {
    color: 'isDanger',
    text: state.formDataErrors[ name ][ 0 ],
  } : undefined;
}

function getCustomErrorLabel(hasError, state, formelement) {
  return (hasError) ? (
    <div style={Object.assign({
      fontSize: 11,
      color:formelement.errorColor||'#ed6c63',
    }, formelement.customErrorProps)}>{state.formDataErrors[ formelement.name ][ 0 ]}</div>
  ): null;
}

function getCustomErrorIcon(hasError, state, formelement) {
  return (hasError && (formelement.errorIconRight || formelement.errorIconLeft)) ? (<i className={'__re-bulma_fa fa fa-warning'}></i>): null;
}

function valueChangeHandler(formElement) {
  return  (event) => {
    let text = event.target.value;
    // console.debug({ text, formElement, });
    let updatedStateProp = {};
    updatedStateProp[ formElement.name ] = text;
    this.setState(updatedStateProp, () => {
      if(formElement.validateOnChange){
      this.validateFormElement({ formElement, });
    }});
  };
}

function getFormLabel(formElement) {
  return (formElement.label)
    ? (formElement.layoutProps && formElement.layoutProps.horizontalform)
      ? (<ControlLabel {...formElement.labelProps}>{
        (this && this.state && this.state[formElement.formdata_label])
        ? this.state[formElement.formdata_label]
        : formElement.label}</ControlLabel>)
      : (<Label {...formElement.labelProps}>{(this && this.state && this.state[formElement.formdata_label])
        ? this.state[formElement.formdata_label]
        : formElement.label}</Label>)
    : null;
}

function getInitialValue(formElement, state) {
  // console.debug({formElement, state})
  let formElementValue = formElement.value;
 
  if (state[ formElement.name ] === null || formElementValue === null || formElementValue === 'null') {
    return '';
  } else {
    let returnVal = (typeof state[ formElement.name ] !== 'undefined')
      ? state[ formElement.name ]
      : formElementValue;
    
    if (formElement.momentFormat) {
      returnVal = moment(returnVal).format(formElement.momentFormat);
    }
    if (formElement.numeralFormat) {
      returnVal = numeral(returnVal).format(formElement.numeralFormat);
    }

    return returnVal;
  }
}

function getPassablePropsKeyEvents(passableProps, formElement) {
  if (formElement.keyPress) {
    let customKeyPress = () => { };
    if (typeof formElement.keyPress==='string' && formElement.keyPress.indexOf('func:this.props') !== -1) {
      customKeyPress= this.props[ formElement.keyPress.replace('func:this.props.', '') ];
    } else if (typeof formElement.keyPress==='string' && formElement.keyPress.indexOf('func:window') !== -1 && typeof window[ formElement.keyPress.replace('func:window.', '') ] ==='function') {
      customKeyPress= window[ formElement.keyPress.replace('func:window.', '') ].bind(this);
      // console.debug({ customKeyPress });
    } 
    passableProps.onKeyPress = (e) => {
      if (formElement.validateOnKeypress) {
        this.validateFormElement({ formElement, });
      }
      customKeyPress(e, formElement);
      // console.debug('custom press');
    };
  } else if(formElement.submitOnEnter){
    passableProps.onKeyPress = (e) => {
      if (formElement.submitOnEnter && (e.key === 'Enter' || e.which === 13)) {
        this.submitForm();
      }
    };
  }
  if (formElement.onBlur) {
    let customonBlur = () => { };
    if (typeof formElement.onBlur==='string' && formElement.onBlur.indexOf('func:this.props') !== -1) {
      customonBlur= this.props[ formElement.onBlur.replace('func:this.props.', '') ];
    } else if (typeof formElement.onBlur==='string' && formElement.onBlur.indexOf('func:window') !== -1 && typeof window[ formElement.onBlur.replace('func:window.', '') ] ==='function') {
      customonBlur= window[ formElement.onBlur.replace('func:window.', '') ].bind(this);
    } 
    passableProps.onBlur = (e) => {
      if (formElement.validateOnBlur) {
        this.validateFormElement({ formElement, });
      }
      customonBlur(e, formElement);
    };
  }
  if (formElement.keyUp) {
    let customkeyUp = () => { };
    if (typeof formElement.keyUp==='string' && formElement.keyUp.indexOf('func:this.props') !== -1) {
      customkeyUp= this.props[ formElement.keyUp.replace('func:this.props.', '') ];
    } else if (typeof formElement.keyUp==='string' && formElement.keyUp.indexOf('func:window') !== -1 && typeof window[ formElement.keyUp.replace('func:window.', '') ] ==='function') {
      customkeyUp= window[ formElement.keyUp.replace('func:window.', '') ].bind(this);
    } 
    passableProps.onKeyUp = (e) => {
      if (formElement.validateOnKeyup) {
        this.validateFormElement({ formElement, });
      }
      customkeyUp(e, formElement);
    };
  }
  return passableProps;
}

export function getFormDatatable(options){
  let { formElement, i, } = options;
  let initialValue = getInitialValue(formElement,
  (Object.keys(this.state.formDataTables).length && this.state.formDataTables[formElement.name])?this.state.formDataTables :  Object.assign({}, this.state, unflatten(this.state, { overwrite: true })));
  // console.debug({ initialValue },this.state, this.state[formElement.name]);
  let hasError = getErrorStatus(this.state, formElement.name);
  const getTableHeaders = (row) => {
    return row.map(rowkey => {
      let selectOptions = (this.state.__formOptions && this.state.__formOptions[ rowkey ])
        ? this.state.__formOptions[ rowkey ]
        : [];
      return {
        label: capitalize(rowkey),
        sortid: rowkey,
        sortable: (formElement.sortable)
          ? formElement.sortable
          : true,
        formtype: (formElement.tableHeaderType && formElement.tableHeaderType[rowkey])
          ? formElement.tableHeaderType[rowkey]
          : 'text',
        defaultValue: (formElement.tableHeaderDefaultValue && formElement.tableHeaderDefaultValue[rowkey])
          ? formElement.tableHeaderDefaultValue[rowkey]
          : (selectOptions.length)
            ? selectOptions[ 0 ].value
            : undefined,
        formoptions: selectOptions,
        footerFormElementPassProps: Object.assign({
          placeholder: capitalize(rowkey),
        }, formElement.footerFormElementPassProps),
      };
    });
  };
  let useRowButtons = formElement.rowButtons;
  let ignoreTableHeaders = formElement.ignoreTableHeaders || [];
  let tableHeaders = (formElement.headers)
    ? (formElement.useStandardHeaders)
      ? getTableHeaders( formElement.headers.map(header=>header.sortid) )
      : formElement.headers
    : (initialValue && Array.isArray(initialValue) && initialValue.length)
      ? getTableHeaders(Object.keys(initialValue[0]).filter(header=>ignoreTableHeaders.indexOf(header)===-1))
      : [];
  tableHeaders = (useRowButtons)
    ? tableHeaders.concat({
      label: formElement.rowOptionsLabel || '',
      formtype: false,
      formRowButtons: true,
      formRowButtonProps: formElement.formRowButtonProps,
    })
    : tableHeaders.concat({
      label: '',
      formtype: false,
    });
  let passedProps = Object.assign(
    {},
    this.props,
    {
      selectEntireRow: formElement.selectEntireRow,
      insertSelectedRowHeaderIndex: formElement.insertSelectedRowHeaderIndex,
      selectOptionSortId: formElement.selectOptionSortId,
      selectOptionSortIdLabel: formElement.selectOptionSortIdLabel,
      flattenRowData: formElement.flattenRowData,
      addNewRows: formElement.addNewRows,
      sortable: formElement.sortable,
      replaceButton: false,
      uploadAddButton: true,
      useInputRows: formElement.useInputRows,
      rows: initialValue,
      headers: tableHeaders,
      limit: 5000,
      hasPagination: false,
      tableForm:true,
    },
    formElement.passProps
  );// formElement.datalist,
  // console.debug({tableHeaders})
  // let shape ={};// this is the header of of the footer which has elements for new insert
  // let inlineshape ={};// if true, should look like a regular form row, else form below
  //   // console.debug({formElement,initialValue, },'this.state',this.state);
  return (<FormItem key={i} {...formElement.layoutProps} >
  {getFormLabel(formElement)}  
    <ResponsiveTable {...passedProps}
      onChange={(newvalue) => {
        let selectedRowData = (formElement.selectEntireRow && (newvalue.selectedRowData || newvalue.selectedRowIndex))
          ? {
            [ `${formElement.name}__tabledata` ]: {
              selectedRowData: newvalue.selectedRowData,
              selectedRowIndex: newvalue.selectedRowIndex,
            },
          }
          : {};
        let flattenedData = (this.props.flattenFormData)
          ? flatten(Object.assign({}, selectedRowData, { [ formElement.name ]: newvalue.rows, }))
          : {};
        let updatedStateProp = Object.assign({
          formDataTables: Object.assign({}, this.state.formDataTables, { [ formElement.name ]: newvalue.rows, }),
          [ formElement.name ]: newvalue.rows,
        }, flattenedData, selectedRowData);
        // console.debug({ flattenedData,updatedStateProp });
        this.setState(updatedStateProp);
      }}
      value={initialValue} />
    {getCustomErrorLabel(hasError, this.state, formElement)}
  </FormItem>);
}

export function getFormDatalist(options){
  let { formElement, i, } = options;
  let initialValue = getInitialValue(formElement, Object.assign({}, this.state, unflatten(this.state)));
  let hasError = getErrorStatus(this.state, formElement.name);
  let passedProps = Object.assign({},
    this.props,
    {
      wrapperProps:{
        style:{
          display: 'flex',
          width: '100%',
          flex: '5',
          alignItems: 'stretch',
          flexDirection: 'column',
        },
      },
      passableProps:{
        help:getFormElementHelp(hasError, this.state, formElement.name),
        color:(hasError)?'isDanger':undefined,
        icon:(hasError)?formElement.errorIcon || 'fa fa-warning':undefined,
        placeholder:formElement.placeholder,
        style:{
          width:'100%',
        },
      },
    },
    formElement.datalist);
    // console.debug({formElement,initialValue, },'this.state',this.state);
  // console.debug({ passedProps });
  if(formElement.datalist.staticSearch){
    // let datalistdata = this.state[formElement.name];
    let datalistdata = [];
    if(this.props.__formOptions && this.props.__formOptions[formElement.name]){
      datalistdata = this.props.__formOptions[formElement.name];
    } else {
      datalistdata = this.props.formdata[pluralize(formElement.datalist.entity)] || [];
    }
    passedProps.datalistdata = datalistdata;
  }
  return (<FormItem key={i} {...formElement.layoutProps} >
  {getFormLabel(formElement)}  
    <ResponsiveDatalist {...passedProps}
      onChange={(newvalue)=>{
        // console.debug({ newvalue });
        let updatedStateProp = {};
        updatedStateProp[ formElement.name ] = newvalue;
        this.setState(updatedStateProp);
      }}
      value={ initialValue } />
  </FormItem>);
}

export function getFormMaskedInput(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state);  
  let getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  let fileClassname = `__reactadmin_file_${formElement.name}`;
  let hasError = getErrorStatus(this.state, formElement.name);
  let hasValue = (formElement.name && this.state[formElement.name])? true : false;
  let passableProps = Object.assign({
    type: 'text',
    className: '__re-bulma_input',
  }, formElement.passProps);
  
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    onChange = () => {};
  } else if (!onChange) {
    onChange = (event) => {
      let text = event.target.value;
      let updatedStateProp = {};
      if (passableProps && passableProps.multiple) {
        document.querySelector(`.${fileClassname} input`).setAttribute('multiple', true);
      }
      updatedStateProp[ formElement.name ] = (passableProps.maxLength)? text.substring(0, passableProps.maxLength): text;
      this.setState(updatedStateProp);
    };
  }
  passableProps = getPassablePropkeyevents(passableProps, formElement);
  if (passableProps && passableProps.multiple) {
    let t = setImmediate(() => { 
      document.querySelector(`.${fileClassname} input`).setAttribute('multiple', true);
      clearImmediate(t);
    });
  }

  formElement.customErrorProps = (formElement.customErrorProps) ? Object.assign({}, { marginTop: '6px' }, formElement.customErrorProps) : {marginTop: '6px'};

  let mask = [];
  if (formElement.createNumberMask && passableProps.mask.indexOf('func:window') !== -1 && typeof window[ passableProps.mask.replace('func:window.', '') ] === 'function') {
    let numberMaskConfig = (typeof window[ passableProps.mask.replace('func:window.', '') ].call(this, formElement) === 'object') ? window[ passableProps.mask.replace('func:window.', '') ].call(this, formElement) : {};
    mask = createNumberMask(numberMaskConfig);
  } else if (passableProps.mask.indexOf('func:window') !== -1 && typeof window[ passableProps.mask.replace('func:window.', '') ] === 'function') {
    mask = window[ passableProps.mask.replace('func:window.', '') ].bind(this, formElement);
  }

  let wrapperProps = Object.assign({
    className: '__re-bulma_control',
  }, formElement.wrapperProps);
 
  wrapperProps.className = (hasError && (formElement.errorIconRight || formElement.errorIconLeft)) ? (formElement.errorIconRight) ? 
    wrapperProps.className + ' __re-bulma_has-icon __re-bulma_has-icon-right'
    : wrapperProps.className + ' __re-bulma_has-icon __re-bulma_has-icon-left'
    : wrapperProps.className;
  
  return (<FormItem key={i} {...formElement.layoutProps} hasError={hasError} hasValue={hasValue} >
    {getFormLabel(formElement)}
    <span {...wrapperProps}>
      <MaskedInput
      {...passableProps}
        mask={mask}
        className={(hasError) ? passableProps.className + ' __re-bulma_is-danger' : passableProps.className}  
      color={(hasError)?'isDanger':undefined}
      onChange={onChange}
      placeholder={formElement.placeholder}
      value={initialValue} />
      {getCustomErrorIcon(hasError, this.state, formElement)}  
      {getCustomErrorLabel(hasError, this.state, formElement)}
    </span>
  </FormItem>);
}

export function getFormTextInputArea(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  let fileClassname = `__reactadmin_file_${formElement.name}`;
  let hasError = getErrorStatus(this.state, formElement.name);
  let hasValue = (formElement.name && this.state[formElement.name])? true : false;
  let passableProps = Object.assign({
    type: formElement.type || 'text',
  }, formElement.passProps);
  if (passableProps && passableProps.type === 'file') { 
    passableProps.className = fileClassname;
  } 
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    onChange = () => {};
  } else if (!onChange) {
    onChange = (event) => {
      let text = event.target.value;
      let updatedStateProp = {};
      if (passableProps && passableProps.multiple) {
        document.querySelector(`.${fileClassname} input`).setAttribute('multiple', true);
      }
      
      if (passableProps && passableProps.type === 'file') {
        updatedStateProp.formDataFiles = Object.assign({}, this.state.formDataFiles, {
          [ formElement.name ]: document.querySelector(`.${fileClassname} input`),
        });
      } else {
        updatedStateProp[ formElement.name ] =(passableProps.maxLength)? text.substring(0, passableProps.maxLength): text;
      }
      this.setState(updatedStateProp);
    };
  }
  passableProps = getPassablePropkeyevents(passableProps, formElement);

  // console.debug({ passableProps });
  if (passableProps && passableProps.multiple) {
    let t = setImmediate(() => { 
      document.querySelector(`.${fileClassname} input`).setAttribute('multiple', true);
      clearImmediate(t);
    });
  }
  return (<FormItem key={i} {...formElement.layoutProps} hasError={hasError} hasValue={hasValue} >
    {getFormLabel(formElement)}  
    <Input {...passableProps}
      help={getFormElementHelp(hasError, this.state, formElement.name)}
      color={(hasError)?'isDanger':undefined}
      icon={(hasError) ? formElement.errorIcon || 'fa fa-warning' : undefined}
      hasIconRight={formElement.errorIconRight}
      onChange={onChange}
      placeholder={formElement.placeholder}
      value={ initialValue } />
  </FormItem>);
}

export function getFormTextArea(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let hasError = getErrorStatus(this.state, formElement.name);
  let hasValue = (formElement.name && this.state[formElement.name])? true : false;
  let passableProps = Object.assign({
  }, formElement.passProps);
  let getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  passableProps = getPassablePropkeyevents(passableProps, formElement);

  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    onChange = () => { return () => {}};
  } else if (!onChange) {
    onChange = valueChangeHandler.bind(this, formElement);
  }

  return (<FormItem key={i} {...formElement.layoutProps} hasError={hasError} hasValue={hasValue} >
    {getFormLabel(formElement)}  
    <Textarea {...passableProps}
      onChange={(event)=>onChange()(event)}
      help={getFormElementHelp(hasError, this.state, formElement.name)}
      icon={(hasError)?formElement.errorIcon || 'fa fa-warning':undefined}
      color={(hasError)?'isDanger':undefined}
      hasIconRight={formElement.errorIconRight}
      placeholder={formElement.placeholder||formElement.label}
      value={this.state[ formElement.name ] || initialValue} />
  </FormItem>);
}

export function getFormSelect(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let hasError = getErrorStatus(this.state, formElement.name);
  let hasValue = (formElement.name && this.state[formElement.name])? true : false;
  let selectOptions = (this.state.__formOptions && this.state.__formOptions[ formElement.name ])
    ? this.state.__formOptions[ formElement.name ]
    : formElement.options || [];
  
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    onChange = () => { return () => {}};
  } else if (!onChange) {
    onChange = valueChangeHandler.bind(this, formElement);
  }  
  let customCallbackfunction;
  if (formElement.customOnChange) {
    if (formElement.customOnChange.indexOf('func:this.props') !== -1) {
      customCallbackfunction= this.props[ formElement.customOnChange.replace('func:this.props.', '') ];
    } else if (formElement.customOnChange.indexOf('func:window') !== -1 && typeof window[ formElement.customOnChange.replace('func:window.', '') ] ==='function') {
      customCallbackfunction= window[ formElement.customOnChange.replace('func:window.', '') ].bind(this, formElement);
    } 
  }

  return (<FormItem key={i} {...formElement.layoutProps} hasError={hasError} hasValue={hasValue} >
    {getFormLabel(formElement)}  
    <Select {...formElement.passProps}
      help={getFormElementHelp(hasError, this.state, formElement.name)}
      color={(hasError)?'isDanger':undefined}
      onChange={(event)=>{
        onChange()(event);
        if(customCallbackfunction) customCallbackfunction(event);
      }}
      placeholder={formElement.placeholder||formElement.label}
      value={this.state[ formElement.name ] || initialValue} >
      {selectOptions.map((opt, k) => {
        return <option key={k} disabled={opt.disabled} value={opt.value}>{opt.label || opt.value}</option>;
      })}
    </Select>
  </FormItem>);
}

export function getFormCheckbox(options) {
  let { formElement, i, onValueChange, } = options;
  let hasError = getErrorStatus(this.state, formElement.name);
  let hasValue = (formElement.name && this.state[formElement.name])? true : false;
  let getFormDataLabel = getFormLabel.bind(this);
  if (formElement.disableOnChange) {
    onValueChange = () => {};
  } else if (!onValueChange) {
    onValueChange = (/*event*/) => {
      // let text = event.target.value;
      let updatedStateProp = {};
      // console.debug('before', { updatedStateProp, formElement, }, event.target);
      if (formElement.type === 'radio') {
        // event.target.value = 'on';
        updatedStateProp[ this.state[ formElement.formdata_name] || formElement.name ] = this.state[ formElement.formdata_value] || formElement.value || 'on';
      } else {
        updatedStateProp[ this.state[ formElement.formdata_name] || formElement.name ] = (this.state[ this.state[ formElement.formdata_name] || formElement.name ] ) ? 0 : 'on';
      }
      // console.debug('after', { updatedStateProp, formElement, }, event.target);
      this.setState(updatedStateProp, () => {
        if(formElement.validateOnChange){
          this.validateFormElement({ formElement, });
        }
      });
    };
  }

  return (<FormItem key={i} {...formElement.layoutProps} hasError={hasError} hasValue={hasValue} >
    {getFormDataLabel(formElement)}  
    <input {...formElement.passProps}
      type={formElement.type || 'checkbox'}
      name={this.state[ formElement.formdata_name] || formElement.name}
      checked={(formElement.type === 'radio')
        ? this.state[ formElement.name ] === formElement.value
        : this.state[ formElement.name ]}
      onChange={onValueChange}
    >
    </input>
    <span {...formElement.placeholderProps}>{this.state[ formElement.formdata_placeholder] || formElement.placeholder}</span>
    {getCustomErrorLabel(hasError, this.state, formElement)}
  </FormItem>);
}

export function getRawInput(options) {
  let { formElement, i, onValueChange, } = options;
  let hasError = getErrorStatus(this.state, formElement.name);
  let wrapperProps = Object.assign({
    style: {
      overflow: 'auto',
      backgroundColor: 'white',
      border: (hasError) ? '1px solid #ed6c63' : '1px solid #d3d6db',
      borderRadius: 3,
      height:'auto',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
    },
  }, formElement.wrapperProps);
  let passableProps = formElement.passProps;
  let getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  passableProps = getPassablePropkeyevents(passableProps, formElement);
  if (!onValueChange) {
    onValueChange = (/*event*/) => {
      // let text = event.target.value;
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = (this.state[ formElement.name ] ) ? false : 'on';
      // console.log({ updatedStateProp });
      this.setState(updatedStateProp);
    };
  }

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <div {...wrapperProps}>
      <input {...passableProps}
        type={formElement.type}
        checked={this.state[ formElement.name ]}
        onChange={onValueChange}
      >
      </input>
      {getCustomErrorLabel(hasError, this.state, formElement)}
    </div>  
  </FormItem>);
}

export function getSliderInput(options) {
  let { formElement, i, onValueChange, } = options;
  // const Handle = (
  // );
  let hasError = getErrorStatus(this.state, formElement.name);
  let wrapperProps = Object.assign({
    style: {
      overflow: 'auto',
      backgroundColor: 'white',
      border: (hasError) ? '1px solid #ed6c63' : '1px solid #d3d6db',
      borderRadius: 3,
      height:'auto',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
    },
  }, formElement.wrapperProps);
  let passableProps = Object.assign({}, formElement.passProps);
  let customCallbackfunction = () => { };
  if (formElement.handle) {
    passableProps.handle = ({ value, offset, }) => (
      <div style={{ left: `${offset}%`, }} className="__reactadmin_slider__handle">
        <span className="__reactadmin_arrow-left" />
        {(formElement.numeralFormat) ? numeral(value).format(formElement.numeralFormat) : value}
        <span className="__reactadmin_arrow-right" />
      </div>
    );
  }
  if (formElement.customOnChange) {
    if (formElement.customOnChange.indexOf('func:this.props') !== -1) {
      customCallbackfunction= this.props[ formElement.customOnChange.replace('func:this.props.', '') ];
    } else if (formElement.customOnChange.indexOf('func:window') !== -1 && typeof window[ formElement.customOnChange.replace('func:window.', '') ] ==='function') {
      customCallbackfunction= window[ formElement.customOnChange.replace('func:window.', '') ].bind(this);
    } 
  }
  if (!onValueChange) {
    onValueChange = (val) => {
      // console.debug({ val });
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = val;
      // console.log({ updatedStateProp });
      this.setState(updatedStateProp);
      customCallbackfunction(val);
    };
  }
  

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <div {...wrapperProps}>
      <Slider {...passableProps}
        onChange={onValueChange}
      >
        {(formElement.leftLabel)
          ? (<span className="__reactadmin_slider__label __reactadmin_slider__label_left">{formElement.leftLabel}</span>)
          : null
        } 
        {(formElement.rightLabel)
          ? (<span className="__reactadmin_slider__label __reactadmin_slider__label_right">{formElement.rightLabel}</span>)
          : null
        }  
      </Slider>  
      {getCustomErrorLabel(hasError, this.state, formElement)}
    </div>  
  </FormItem>);
}

export function getHiddenInput(options) {
  let { formElement, i, } = options;
  let initialValue = this.state[ formElement.formdata_name ] || this.state[ formElement.name ] || formElement.value;
  
  return <input key={i}  {...formElement.passProps}
    type="hidden"
    value={initialValue} />;
}

export function getImage(options) {
  let { formElement, i, } = options;
  let initialValue = getInitialValue(formElement, this.state);
  let imageProps = Object.assign({
    style: {
      textAlign:'center',
    },
  }, formElement.passProps);
  //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    {(formElement.link)
      ? (<a href={initialValue} target="_blank"><Image key={i}  {...imageProps} src={this.state[formElement.preview]||initialValue} /></a>)
      : <Image key={i}  {...imageProps} src={this.state[formElement.preview]||initialValue} />
    }
  </FormItem>);
}

export function getFormLink(options) {
  let { formElement, i, button, } = options;
  let wrapperProps = Object.assign({
    style:styles.inputStyle,
  }, formElement.wrapperProps);
  let linkWrapperProps = Object.assign({
    style: {
      padding: '0 5px',
    },
  }, formElement.linkWrapperProps);
  // console.debug({ linkWrapperProps, formElement });

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <span {...wrapperProps}>
      <span {...linkWrapperProps}>
      {button}
      </span>  
    </span>
  </FormItem>);
}

export function getFormGroup(options) {
  let { formElement, i, groupElements, } = options;

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <Group {...formElement.passProps}
    >
      {groupElements}  
    </Group>
  </FormItem>);
}

export function getFormCode(options) {
  let { formElement, i, onValueChange, } = options;
  let hasError = getErrorStatus(this.state, formElement.name);
  let initialVal = getInitialValue(formElement, this.state);
  let CodeMirrorProps = Object.assign({
    codeMirrorProps: Object.assign({
      lineNumbers: true,
      value: (formElement.stringify)?JSON.stringify(initialVal, null, 2):initialVal, //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
      //value: this.state[ formElement.name ] || formElement.value,
      style: {
        minHeight:200,
      },
      lineWrapping:true,
      onChange: (!onValueChange) ? function (newvalue){
        // console.log({ newvalue });
        newvalue = (formElement.stringify) ? JSON.parse(newvalue) : newvalue;
        let updatedStateProp = {};
        updatedStateProp[ formElement.name ] = newvalue;
        this.setState(updatedStateProp);
      }.bind(this) : onValueChange,
    }, formElement.codeMirrorProps),
    wrapperProps: Object.assign({
      style: {
        overflow: 'auto',
        backgroundColor: 'white',
        border: (hasError) ? '1px solid #ed6c63' : '1px solid #d3d6db',
        borderRadius: 3,
        height:'auto',
        boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
      },
    }, formElement.codeMirrorWrapperProps),
  }, formElement.passProps);

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <RACodeMirror key={i} {...CodeMirrorProps}  />
    {getCustomErrorLabel(hasError, this.state, formElement)}
  </FormItem>
  );
}

export function getFormEditor(options) {
  let { formElement, i, onValueChange, } = options;
  let initialVal = getInitialValue(formElement, this.state);
  if (!onValueChange) {
    onValueChange = (newvalue) => {
      // console.debug({ newvalue, });
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = newvalue.target.value;
      this.setState(updatedStateProp);
    };
  }
  // console.debug({ initialVal });
  let EditorProps = Object.assign({}, this.props, {
    // wrapperProps: {
    //   style: {
    //     overflow: 'hidden',
    //     backgroundColor: 'white',
    //     border: '1px solid #d3d6db',
    //     borderRadius: 3,
    //     minHeight:'2rem',
    //     display:'flex',
    //     boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
    //   },
    // },
    passProps: {
      // toolbarStyle: {
      //   borderTop: 'none',
      //   borderLeft: 'none',
      //   borderRight: 'none',
      //   padding: '5px 0 0',
      // },
    },
    onChange:onValueChange,
  }, formElement.passProps);

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <PreviewEditor key={i} {...EditorProps} value={initialVal} />
  </FormItem>
  );
}

export function getFormSubmit(options) {
  let { formElement, i, } = options;
  let passableProps = Object.assign({
    state: (formElement.confirmModal && Object.keys(this.state.formDataErrors).length>0)
      ? 'isDisabled'
      : undefined,
  }, formElement.passProps);
  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <Button {...passableProps}
      onClick={() => { 
        let validated_formdata = validateForm.call(this, { formdata: this.state, validationErrors: {} });
        let updateStateData = {
          formDataErrors: validated_formdata.validationErrors
        };
        if (this.props.sendSubmitButtonVal) {
          updateStateData[ 'submitButtonVal' ] = formElement.value;
        }
        this.setState(updateStateData, () => {
          (formElement.confirmModal && Object.keys(this.state.formDataErrors).length<1)
            ? this.props.createModal(Object.assign({
              title: 'Please Confirm',
              text: {
                component: 'div',
                props: {
                  style: {
                    textAlign:'center',
                  },
                  className:'__ra_rf_fe_s_cm',
                },
                children: [
                  {
                    component: 'div',
                    props: {
                      className:'__ra_rf_fe_s_cm_t',
                    },
                    children: formElement.confirmModal.textContent || '',
                  },
                  {
                    component: 'div',
                    props: Object.assign({
                      className:'__ra_rf_fe_s_cm_bc',
                    }, formElement.confirmModal.buttonWrapperProps),
                    children: [
                      {
                        component: 'ResponsiveButton',
                        props: Object.assign({
                          style:{
                            margin:10,
                          },
                          buttonProps: {
                            size:'isMedium',
                            
                            color:'isPrimary',
                          },
                          onClick: () => {
                            this.props.hideModal('last');
                            this.submitForm.call(this);
                          },
                          onclickProps:'last',
                        }, formElement.confirmModal.yesButtonProps),  
                        children:formElement.confirmModal.yesButtonText||'Yes', 
                      },
                      {
                        component: 'ResponsiveButton',
                        props: Object.assign({
                          style:{
                            margin:10,
                          },
                          buttonProps: {
                            size:'isMedium',
                          },
                          onClick: 'func:this.props.hideModal',
                          onclickProps:'last',
                        }, formElement.confirmModal.noButtonProps),  
                        children:formElement.confirmModal.noButtonText||'No',
                      },
                    ], 
                  },
                ],
              } ,}, formElement.confirmModal))
            : this.submitForm.call(this);
        });
      }}>
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
