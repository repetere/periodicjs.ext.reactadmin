import React, { Component, PropTypes, } from 'react';

// class ContentEditable extends Component {
//   render(){
//     return <div id="contenteditable"
//       onInput={this.emitChange} 
//       onBlur={this.emitChange}
//       contentEditable
//       dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
//   }
//   shouldComponentUpdate(nextProps){
//     return nextProps.html !== this.getDOMNode().innerHTML;
//   }
//   componentDidUpdate() {
//     if ( this.props.html !== this.getDOMNode().innerHTML ) {
//       this.getDOMNode().innerHTML = this.props.html;
//     }
//   }
//   emitChange(){
//     var html = this.getDOMNode().innerHTML;
//     if (this.props.onChange && html !== this.lastHtml) {
//         this.props.onChange({
//             target: {
//                 value: html
//             }
//         });
//     }
//     this.lastHtml = html;
//   }
// };
//http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

const propTypes = {
  editorType: PropTypes.string,
};
const defaultProps = {
  editorType:'code',
  codeMirrorProps: {
  },
};

class PreviewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, this.props.getState());
  }
  componentWillReceiveProps(nextProps) {
    // this.setState(nextProps);
    // console.debug({ nextProps });
    this.setState(Object.assign({}, nextProps, this.props.getState()));
    // console.log('this.state', this.state);
  }
  // render() {
  //   return (<div contentEditable={true} tabIndex={1} dangerouslySetInnerHTML={{ __html: this.state.value }}>
  //   </div>)
  // }
  render(){
    return <div className="contenteditable"
      onInput={this.emitChange.bind(this)} 
      onBlur={this.emitChange.bind(this)}
      contentEditable
      dangerouslySetInnerHTML={{
        __html: this.state.value,
      }}></div>;
  }
  shouldComponentUpdate(nextProps){
    return nextProps.value !== this.getDOMNode().innerHTML;
  }
  componentDidUpdate() {
    if ( this.props.value !== this.getDOMNode().innerHTML ) {
      this.getDOMNode().innerHTML = this.props.value;
    }
  }
  emitChange(){
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  }
}  

PreviewEditor.propTypes = propTypes;
PreviewEditor.defaultProps = defaultProps;

export default PreviewEditor;
