import React, { Component, /*PropTypes,*/ } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
const propTypes = {};
const defaultProps = {};

class RACodeMirror extends Component {
  render() {
    let options = Object.assign({ options: { lineNumbers: true, }, }, this.props.codeMirrorProps);
  
    return <div {...this.props.wrapperProps}><CodeMirror {...options}>{this.props.children}</CodeMirror></div>;
  }
}

//ok
RACodeMirror.propTypes = propTypes;
RACodeMirror.defaultProps = defaultProps;

export default RACodeMirror;
