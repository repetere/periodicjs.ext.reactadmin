(function () {
  if (global) {
    global[ '__DEV__' ] = false;
    global[ 'window' ] = {};
    global[ 'document' ] = {};
    global[ 'navigator' ] = {};
  }
})();

import React, { Component, } from 'react';
const  getRenderedComponent = require('../components/AppLayoutMap').getRenderedComponent;


class SSR extends Component {
  render() {
    return <div>{getRenderedComponent(this.props.layout, this.props.resources)}</div>;
  }
}

export default SSR;
