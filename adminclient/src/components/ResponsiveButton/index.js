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
    let returnLink = baseurl;
    if (params && params.length > 0) {
      params.forEach((param) => {
        returnLink = returnLink.replace(param.key, prop[ param.val ]);
      });
    }
    return returnLink;
  }
  handleOnClick(options) {
    // console.debug({ options });
    let { clickprop, thisDotProp, clickThisProp, clickPropObject, clickBaseUrl, clickLinkParams, clickPassProps } = options;
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
    } else if (typeof clickprop === 'string' && clickprop.indexOf('func:this.props') !== -1) { 
      onclickFunction = this.props[ clickprop.replace('func:this.props.', '') ];
    } 
    onclickFunction(onclickProp);
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
        thisDotProp: this.props,
      };
    };
    if (this.props.selectProps) {
      let options = [];
      let selectPropsVals = this.props.selectProps.values;

      Object.keys(selectPropsVals).forEach(key => {
        options.push(<option key={`sddb-${key}`} value={key}>{selectPropsVals[key].label}</option>);
      });

      return <Select {...this.props.selectElmProps} value={this.props.selectProps.selected}  onChange={(event) => {
        // console.log({ event });
        this.handleSelect.call(this, event, this.props.selectProps.values);
      }}>
        {options}  
      </Select>;
    } else if (this.props.buttonProps) {
      return <Button
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
    } else {
      return <span
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