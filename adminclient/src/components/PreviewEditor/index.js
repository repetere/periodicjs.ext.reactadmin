import React, { Component, PropTypes, } from 'react';
import ReactDOM from 'react-dom';

//http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

const propTypes = {
  toolbarProps: PropTypes.object,
  wrapperProps: PropTypes.object,
};
const defaultProps = {
  toolbarProps: {
    style: {
      padding:'0.25rem',
    },
  },
  wrapperProps: {
    style: {
      overflow: 'hidden',
      backgroundColor: 'white',
      border: '1px solid #d3d6db',
      borderRadius: 3,
      minHeight: '2rem',
      display:'flex',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
    },
  },
};

class PreviewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }
  componentWillReceiveProps(nextProps) {
    // console.debug({ nextProps });
    this.setState(Object.assign({}, nextProps));
  }
  render() {
    return (<div {...this.props.wrapperProps}>
      <div {...this.props.toolbarProps}></div>  
      <div {...this.props.passProps}
        className="contenteditable" 
      onInput={this.emitChange.bind(this)} 
      onBlur={this.emitChange.bind(this)}
      contentEditable
      dangerouslySetInnerHTML={{
        __html: this.state.value,
      }}></div>
    </div>);
  }
  getInnerHTML() {
    return ReactDOM.findDOMNode(this).children[ 0 ].innerHTML;
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.getInnerHTML();
  }
  componentDidUpdate() {
    if ( this.props.value !== this.getInnerHTML() ) {
      ReactDOM.findDOMNode(this).children[0].innerHTML = this.props.value;
    }
  }
  emitChange() {
    var html = this.getInnerHTML();
    // console.debug({ html });
    if (this.props.onChange && typeof this.props.onChange==='function' && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value:  ReactDOM.findDOMNode(this).children[0].innerHTML,
        },
      });
    }
    if (this.props.setDynamicData && typeof this.props.setDynamicData === 'string' && html !== this.lastHtml) {
      this.props.setDynamicData(this.props.dynamicField, html);
    }
    this.lastHtml = html;
  }
}  

PreviewEditor.propTypes = propTypes;
PreviewEditor.defaultProps = defaultProps;

export default PreviewEditor;
