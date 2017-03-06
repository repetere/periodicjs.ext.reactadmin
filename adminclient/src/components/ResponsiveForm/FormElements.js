import React from 'react';
import FormItem from '../FormItem';
import RACodeMirror from '../RACodeMirror';
// import RAEditor from '../RAEditor';
// import ResponsiveButton from '../ResponsiveButton';
// import { EditorState, } from 'draft-js';
import { ControlLabel, Label, Input, Button, CardFooterItem, Select, Textarea, Group, Image, } from 're-bulma'; 
import styles from '../../styles';

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
    <div style={{
      fontSize: 11,
      color:formelement.errorColor||'#ed6c63',
    }}>{state.formDataErrors[ formelement.name ][ 0 ]}</div>
  ): null;
}

function valueChangeHandler(formElement) {
  return  (event) => {
    let text = event.target.value;
    // console.debug({ text, formElement, });
    let updatedStateProp = {};
    updatedStateProp[ formElement.name ] = text;
    this.setState(updatedStateProp);
  };
}

function getFormLabel(formElement) {
  return (formElement.label)
    ? (formElement.layoutProps && formElement.layoutProps.horizontalform)
      ? (<ControlLabel {...formElement.labelProps}>{formElement.label}</ControlLabel>)
      : (<Label {...formElement.labelProps}>{formElement.label}</Label>)
    : null;
}

function getInitialValue(formElement, state) {
  // console.debug('state[ formElement.name ]', state[ formElement.name ],'typeof state[ formElement.name ] ',typeof state[ formElement.name ] );
  // console.debug('formElement.value', formElement.value,'typeof formElement.value',typeof formElement.value);
  if (state[ formElement.name ] === null || formElement.value === null || formElement.value === 'null' ) return '';
  else return (typeof state[ formElement.name ] !== 'undefined' )
    ? state[ formElement.name ]
    : formElement.value;
}

export function getFormTextInputArea(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let keyPress = (e) => {
    if (formElement.submitOnEnter && (e.key === 'Enter' || e.which === 13)) {
      this.submitForm();
    }
  };
  let fileClassname = `__reactadmin_file_${formElement.name}`;
  let hasError = getErrorStatus(this.state, formElement.name);
  if (formElement.passProps && formElement.passProps.type === 'file') { 
    formElement.passProps.className = fileClassname;
  } 
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (!onChange) {
    onChange = (event) => {
      let text = event.target.value;
      let updatedStateProp = {};
      if (formElement.passProps && formElement.passProps.type === 'file') {
        updatedStateProp.formDataFiles = Object.assign({}, this.state.formDataFiles, {
          [ formElement.name ]: document.querySelector(`.${fileClassname} input`),
        });
      } else {
        updatedStateProp[ formElement.name ] = text;
      }
      this.setState(updatedStateProp);
    };
  }

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <Input {...formElement.passProps}
      help={getFormElementHelp(hasError, this.state, formElement.name)}
      color={(hasError)?'isDanger':undefined}
      icon={(hasError)?'fa fa-warning':undefined}
      onChange={onChange}
      onKeyPress={keyPress}
      type={formElement.type||'text'}
      placeholder={formElement.placeholder}
      value={ initialValue } />
  </FormItem>);
}

export function getFormTextArea(options) {
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let hasError = getErrorStatus(this.state, formElement.name);

  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (!onChange) {
    onChange = valueChangeHandler.bind(this, formElement);
  }

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <Textarea {...formElement.passProps}
      onChange={(event)=>onChange()(event)}
      help={getFormElementHelp(hasError, this.state, formElement.name)}
      icon={(hasError)?'fa fa-warning':undefined}
      color={(hasError)?'isDanger':undefined}
      placeholder={formElement.placeholder||formElement.label}
      value={this.state[ formElement.name ] || initialValue} />
  </FormItem>);
}

export function getFormSelect(options) {
  // let { formElement, i, formgroup, width, onValueChange, onSelect, } = options;
  let { formElement, i, /*formgroup, width,*/ onChange, } = options;
  let initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  let hasError = getErrorStatus(this.state, formElement.name);
  
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
  if (!onChange) {
    onChange = valueChangeHandler.bind(this, formElement);
  }  

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <Select {...formElement.passProps}
      help={getFormElementHelp(hasError, this.state, formElement.name)}
      color={(hasError)?'isDanger':undefined}
      onChange={(event)=>onChange()(event)}
      placeholder={formElement.placeholder||formElement.label}
      value={this.state[ formElement.name ] || initialValue} >
      {formElement.options.map((opt, k) => {
        return <option key={k} value={opt.value}>{opt.label || opt.value}</option>;
      })}
    </Select>
  </FormItem>);
}

export function getFormCheckbox(options) {
  let { formElement, i, onValueChange, } = options;
  let hasError = getErrorStatus(this.state, formElement.name);

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
    <input {...formElement.passProps}
      type={formElement.type || 'checkbox'}
      checked={this.state[ formElement.name ]}
      onChange={onValueChange}
    >
    </input>
    <span {...formElement.placeholderProps}>{formElement.placeholder}</span>
    {getCustomErrorLabel(hasError, this.state, formElement)}
  </FormItem>);
}

export function getHiddenInput(options) {
  let { formElement, i, } = options;
  let initialValue = this.state[ formElement.formdata_name  ] || this.state[ formElement.name  ] || formElement.value;

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
    <Image key={i}  {...imageProps}
    src={initialValue} />
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
  let CodeMirrorProps = Object.assign({
    codeMirrorProps: {
      lineNumbers: true,
      value: getInitialValue(formElement, this.state), //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
      //value: this.state[ formElement.name ] || formElement.value,
      style: {
        minHeight:200,
      },
      onChange: (!onValueChange) ? function (newvalue){
        // console.log({ newvalue });
        let updatedStateProp = {};
        updatedStateProp[ formElement.name ] = newvalue;
        this.setState(updatedStateProp);
      }.bind(this) : onValueChange,
    },
    wrapperProps: {
      style: {
        overflow: 'auto',
        backgroundColor: 'white',
        border: (hasError) ? '1px solid #ed6c63' : '1px solid #d3d6db',
        borderRadius: 3,
        height:500,
        boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
      },
    },
  }, formElement.passProps);

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <RACodeMirror key={i} {...CodeMirrorProps}  />
    {getCustomErrorLabel(hasError, this.state, formElement)}
  </FormItem>
  );
}
/*
export function getFormEditor(options) {
  let { formElement, i, onValueChange, } = options;
  let editorStateProp = EditorState.createEmpty();
  let editorPropOnChange = (editorstate) => {
    // console.log(editorstate.value)
    // console.debug({ editorstate, });
    // let contentstate = editorstate.getCurrentContent();
    // console.debug('contentstate.getPlainText()',contentstate.getPlainText())
    // console.debug({ contentstate, });
  };
  // let onContentStateChange = (contentstate) => {
  //   console.debug('contentstate.getPlainText()',contentstate.getPlainText())
  //   console.debug({ contentstate, });
  // };
  let EditorProps = Object.assign({
    wrapperProps: {
      style: {
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid #d3d6db',
        borderRadius: 3,
        boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
      },
    },
    passProps: {
      toolbarStyle: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        padding: '5px 0 0',
      },
      editorState: editorStateProp,
      onChange:editorPropOnChange,
      // onContentStateChange:onContentStateChange,
    },
    // contentState:this.state[ formElement.name ],
    value:this.state[ formElement.name ] || formElement.value,
  }, formElement.passProps);
  if (!onValueChange) {
    onValueChange = (newvalue) => {
      console.debug({ newvalue, });
      let updatedStateProp = {};
      updatedStateProp[ formElement.name ] = newvalue;
      this.setState(updatedStateProp);
    };
  }

  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <RAEditor key={i} {...EditorProps} />
  </FormItem>
  );
}

*/
export function getFormSubmit(options) {
  let { formElement, i, } = options;
  return (<FormItem key={i} {...formElement.layoutProps} >
    {getFormLabel(formElement)}  
    <Button {...formElement.passProps}
      onClick={() => { 
        (formElement.confirmModal)
          ? this.props.createModal(Object.assign({
            title: 'Please Confirm',
            text: {
              component: 'div',
              props: {
                style: {
                  textAlign:'center',
                },
              },
              children: [
                {
                  component: 'div',
                  children:formElement.confirmModal.textContent||'',
                },
                {
                  component: 'div',
                  children: [
                    {
                      component: 'ResponsiveButton',
                      props: {
                        style:{
                          margin:10
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
                      },  
                      children:'Yes' 
                    },
                    {
                      component: 'ResponsiveButton',
                      props: {
                        style:{
                          margin:10
                        },
                        buttonProps: {
                          size:'isMedium',
                        },
                        onClick: 'func:this.props.hideModal',
                        onclickProps:'last',
                      },  
                      children:'No',
                    }
                  ] 
                }
              ]
          }},formElement.confirmModal))
          : this.submitForm.call(this);
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