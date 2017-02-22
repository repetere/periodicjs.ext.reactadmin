import React, { Component, PropTypes, } from 'react';
import { Button, } from 're-bulma'; 

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
  render() {
    let onclickFunction = (data) => {
      console.log('ResponsiveButton', { data, });
    };
    let onclickProp = (this.props.onclickBaseUrl) ? this.getButtonLink(this.props.onclickBaseUrl, this.props.onclickLinkParams, this.props.onclickPropObject) : this.props.onclickProps;

    console.info('onclickProp', onclickProp);
    if (typeof this.props.onClick === 'string' && this.props.onClick.indexOf('func:this.props.reduxRouter') !== -1) { 
      onclickFunction = this.props.reduxRouter[ this.props.onClick.replace('func:this.props.reduxRouter.', '') ];
    } else if (typeof this.props.onClick === 'string' && this.props.onClick.indexOf('func:this.props') !== -1) { 
      onclickFunction = this.props[ this.props.onClick.replace('func:this.props.', '') ];
    } 
    if (this.props.buttonProps) {
      return <Button
        {...this.props.buttonProps}
        style={Object.assign({ cursor: 'pointer', }, this.props.style)}
        onClick={() => {
          onclickFunction(onclickProp);
        }}
        >
        {this.props.children}
      </Button>;
    } else {
      return <span
        {...this.props.spanProps}
        style={Object.assign({ cursor: 'pointer', }, this.props.style)}
        onClick={() => {
          onclickFunction(onclickProp);
        }}
        >
        {this.props.children}
      </span>;
    }
  }
}

ResponsiveButton.propTypes = propTypes;
ResponsiveButton.defaultProps = defaultProps;

export default ResponsiveButton;

// export function ResponsiveButton(props) {
//   // console.log({ this});
  
//   return createElement('span', Object.assign({
//     onClick: () => {
//       this.props.reduxRouter.push(this.props.location);
//     }
//   },props), this.props.children);

// };