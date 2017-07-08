import React, { Component, PropTypes, } from 'react';
import { Button, Select, } from 're-bulma'; 

const propTypes = {
  onClick: PropTypes.string,
  buttonProps: PropTypes.object,
  spanProps: PropTypes.object,
  style: PropTypes.object,
  onclickProps:PropTypes.any,
};

const defaultProps = {
  // onClick: '/',
  style: {},
};

class ResponsiveButton extends Component {
  // constructor(props) {
  //   super(props);
  // }
  getButtonLink(baseurl, params, prop) {
    // console.debug({ baseurl, params, prop });
    let returnLink = baseurl;
    try {
      if (params && params.length > 0) {
        params.forEach((param) => {
          returnLink = returnLink.replace(param.key, prop[ param.val ]);
        });
      }
    } catch (e) {
      console.debug(e, { baseurl, params, prop, });
    }
    return returnLink;
  }
  getHref(options) {
    let { thisDotProp, clickThisProp, clickPropObject, clickBaseUrl, clickLinkParams, clickPassProps, /*clickprop, clickFetchProps, clickSuccessProps, */ } = options;
    // console.debug('getHref',{options})  
    let linkSelectionProp = (clickThisProp)
      ? thisDotProp[clickThisProp]
      : clickPropObject;
    let onclickProp = (clickBaseUrl)
      ? this.getButtonLink(clickBaseUrl, clickLinkParams, linkSelectionProp)
      : clickPassProps;
    return onclickProp;
  }
  handleOnClick(options) {
    // console.debug({ options });
    let { clickprop, thisDotProp, clickThisProp, clickPropObject, clickBaseUrl, clickLinkParams, clickPassProps, clickFetchProps, clickSuccessProps, } = options;
    let onclickFunction = (data) => {
      console.debug('ResponsiveButton', { data, });
    };
    let linkSelectionProp = (clickThisProp)
      ? thisDotProp[clickThisProp]
      : clickPropObject;
    let onclickProp = (clickBaseUrl)
      ? this.getButtonLink(clickBaseUrl, clickLinkParams, linkSelectionProp)
      : clickPassProps;
    
    if (typeof clickprop === 'string' && clickprop.indexOf('func:this.props.reduxRouter') !== -1) { 
      onclickFunction = this.props.reduxRouter[ clickprop.replace('func:this.props.reduxRouter.', '') ];
    } else if (typeof clickprop === 'string' && clickprop.indexOf('func:this.funcs') !== -1) { 
      onclickFunction = this.funcs[ clickprop.replace('func:this.funcs.', '') ];
    } else if (typeof clickprop === 'string' && clickprop.indexOf('func:window') !== -1) { 
      onclickFunction = window[ clickprop.replace('func:window.', '') ].bind(this);
    } else if (typeof clickprop === 'string' && clickprop.indexOf('func:this.props') !== -1) { 
      // console.debug('this.props', this.props);
      onclickFunction = this.props[ clickprop.replace('func:this.props.', '') ];
    } else if (typeof clickprop === 'function') {
      onclickFunction = clickprop;
    }
    // onclickFunction = onclickFunction.bind(this);
    if (this.props.confirmModal) {
      return this.props.createModal(Object.assign({
        title: 'Please Confirm',
        text: {
          component: 'div',
          props: {
            style: {
              textAlign: 'center',
            },
          },
          children: [
            {
              component: 'div',
              children: this.props.confirmModal.textContent || '',
            },
            {
              component: 'div',
              children: [
                {
                  component: 'ResponsiveButton',
                  props: Object.assign({
                    style: {
                      margin: 10,
                    },
                    buttonProps: {
                      size: 'isMedium',
                        
                      color: 'isPrimary',
                    },
                    onClick: () => {
                      // console.debug('debugging this modal', this);
                      this.props.hideModal('last');
                      onclickFunction.call(this, onclickProp, clickFetchProps, clickSuccessProps);
                    },
                    onclickProps: 'last',
                  },this.props.confirmModal.yesButtonProps),
                  children: this.props.confirmModal.yesButtonText||'Yes',
                },
                {
                  component: 'ResponsiveButton',
                  props: Object.assign({
                    style: {
                      margin: 10,
                    },
                    buttonProps: {
                      size: 'isMedium',
                    },
                    onClick: 'func:this.props.hideModal',
                    onclickProps: 'last',
                  },this.props.confirmModal.noButtonProps),
                  children: this.props.confirmModal.noButtonText||'No',
                },
              ],
            },
          ],
        },
      }, this.props.confirmModal));
    } else {
      // console.debug('debugging this regular onclick', this);
      return onclickFunction.call(this, onclickProp, clickFetchProps, clickSuccessProps);
    }
  }
  handleSelect(event, selectProps) {
    let value = event.target.value;
    let selectedProp = selectProps[ value ];
    let buttonProps = selectedProp.buttonProps;
    this.handleOnClick.call(this, {
      clickprop: buttonProps.onClick,
      clickThisProp: buttonProps.onclickThisProp,
      clickPropObject: buttonProps.onclickPropObject,
      clickBaseUrl: buttonProps.onclickBaseUrl,
      clickLinkParams: buttonProps.onclickLinkParams,
      clickPassProps: buttonProps.onclickProps,
      clickFetchProps: buttonProps.fetchProps,
      clickSuccessProps: buttonProps.successProps,
      thisDotProp: this.props,
    });
    // console.debug({ value, selectProps });
  }
  render() {
    let getPropsForOnClick = () => {
      return {
        clickprop: this.props.onClick,
        clickThisProp: this.props.onclickThisProp,
        clickPropObject: this.props.onclickPropObject,
        clickBaseUrl: this.props.onclickBaseUrl,
        clickLinkParams: this.props.onclickLinkParams,
        clickPassProps: this.props.onclickProps,
        clickFetchProps: this.props.fetchProps,
        clickSuccessProps: this.props.successProps,
        thisDotProp: this.props,
      };
    };
    if (this.props.selectProps) {
      let options = [];
      let selectPropsVals = this.props.selectProps.values;

      Object.keys(selectPropsVals).forEach(key => {
        let additionalOptionProps =
          (typeof selectPropsVals[ key ].disabled !== 'undefined')
            ? { disabled:true, }
            : {};
        options.push(<option {...additionalOptionProps} key={`sddb-${key}`} value={key}>{selectPropsVals[key].label}</option>);
      });

      return <Select className="__ra_rb" {...this.props.selectElmProps} value={this.props.selectProps.selected}  onChange={(event) => {
        // console.log({ event });
        this.handleSelect.call(this, event, this.props.selectProps.values);
      }}>
        {options}  
      </Select>;
    } else if (this.props.buttonProps) {
      return <Button className="__ra_rb"
        {...this.props.buttonProps}
        style={Object.assign({
          cursor: 'pointer', display: 'inline-block',
        }, this.props.style)}
        onClick={this.handleOnClick.bind(this, getPropsForOnClick())}
        >
        {
          (this.props.onclickThisProp && this.props.displayThisProps)
          ? this.props[this.props.onclickThisProp][this.props.displayThisProps]
          : this.props.children
        }
      </Button>;
    } else if (this.props.aProps){ 
      return <a className="__ra_rb" {...this.props.aProps} href={this.getHref.call(this, getPropsForOnClick())}>{this.props.children}</a>;
    } else {
      return <span className="__ra_rb"
        {...this.props.spanProps}
        style={Object.assign({
          cursor: 'pointer', display: 'inline-block',
        }, this.props.style)}
        onClick={this.handleOnClick.bind(this, getPropsForOnClick())}
      >
        {
          (this.props.onclickThisProp && this.props.displayThisProps)
          ? this.props[this.props.onclickThisProp][this.props.displayThisProps]
          : this.props.children
        }
      </span>;
    }
  }
}

ResponsiveButton.propTypes = propTypes;
ResponsiveButton.defaultProps = defaultProps;

export default ResponsiveButton;