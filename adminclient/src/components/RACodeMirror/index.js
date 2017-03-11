import React, { Component, /*PropTypes,*/ } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';


import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/css-lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/comment/continuecomment';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlembedded/htmlembedded';

const propTypes = {};
const defaultProps = {};

class RACodeMirror extends Component {
  render() {
    let options = Object.assign({
      options: {
        lineNumbers: true,
      },
    }, this.props.codeMirrorProps);
  
    return <div {...this.props.wrapperProps}><CodeMirror {...options}>{this.props.children}</CodeMirror></div>;
  }
}

//ok
RACodeMirror.propTypes = propTypes;
RACodeMirror.defaultProps = defaultProps;

export default RACodeMirror;
