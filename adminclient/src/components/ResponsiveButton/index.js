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
  
  render() {
    let onclickFunction = (data) => {
      console.log('ResponsiveButton', { data, });
    };
    if (typeof this.props.onClick === 'string' && this.props.onClick.indexOf('func:this.props') !== -1) { 
      onclickFunction = this.props[ this.props.onClick.replace('func:this.props.', '') ];
    } else if (typeof this.props.onClick === 'string' && this.props.onClick.indexOf('func:this.props.reduxRouter') !== -1) { 
      onclickFunction = this.props.reduxRouter[ this.props.onClick.replace('func:this.props.reduxRouter', '') ];
    }
    if (this.props.buttonProps) {
      return <Button
        {...this.props.buttonProps}
        style={Object.assign({ cursor: 'pointer', }, this.props.style)}
        onClick={() => {
          onclickFunction(this.props.onclickProps);
        }}
        >
        {this.props.children}
      </Button>;
    } else {
      return <span
        {...this.props.spanProps}
        style={Object.assign({ cursor: 'pointer', }, this.props.style)}
        onClick={() => {
          onclickFunction(this.props.onclickProps);
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