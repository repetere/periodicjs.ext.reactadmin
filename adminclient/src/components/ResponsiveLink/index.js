import React, { Component, PropTypes, } from 'react';

const propTypes = {
  location: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  location: '/',
  style: {},
};

class ResponsiveLink extends Component {
  // constructor(props) {
  //   super(props);
  //   // console.log('this obj', this,{props});
  // }
  render() {
    return <span onClick={() => {
      // console.log('clicked ResponsiveLink this',this);
      this.props.reduxRouter.push(this.props.location);
    }} style={Object.assign({cursor:"pointer"},this.props.style)}>{this.props.children}</span>;
  }
}

ResponsiveLink.propTypes = propTypes;
ResponsiveLink.defaultProps = defaultProps;

export default ResponsiveLink;

// export function ResponsiveLink(props) {
//   // console.log({ this});
  
//   return createElement('span', Object.assign({
//     onClick: () => {
//       this.props.reduxRouter.push(this.props.location);
//     }
//   },props), this.props.children);

// };