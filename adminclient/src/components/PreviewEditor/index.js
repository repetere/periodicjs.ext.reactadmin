import React, { Component, PropTypes, } from 'react';
import ReactDOM from 'react-dom';
import * as rb from 're-bulma';
import * as editorHelper from './editorHelper';

//http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable

const saveSelection = function () {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  }	else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
};

const restoreSelection = function (range) {
  if (range) {
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }		else if (document.selection && range.select) {
      range.select();
    }
  }
};

const propTypes = {
  toolbarProps: PropTypes.object,
  wrapperProps: PropTypes.object,
  buttonProps: PropTypes.object,
  useToolbar: PropTypes.bool,
};
const defaultProps = {
  toolbarProps: {
    style: {
      padding:'0.25rem',
      borderBottom: '1px solid #d3d6db',
    },
  },
  wrapperProps: {
    style: {
      overflow: 'hidden',
      backgroundColor: 'white',
      border: '1px solid #d3d6db',
      borderRadius: 3,
      minHeight: '2rem',
      display: 'flex',
      flexDirection:'column',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
    },
  },
  buttonProps: {
    style: {
      paddingRight: 0,
      paddingLeft:'0.25rem',
      marginRight:'0.25rem',
    },
    size:'isSmall',
  },
  useToolbar:true,
  showEditor:false,
};

class PreviewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useToolbar: props.useToolbar,
      showEditor: props.showEditor,
      value: props.value,
    };
    this.buttons = [
      {
        onClickFunction: editorHelper.button_gobold,
        icon:'fa fa-bold',
      },
      {
        onClickFunction: editorHelper.button_goitalic,
        icon:'fa fa-italic',
      },
      {
        onClickFunction: editorHelper.button_gounderline,
        icon:'fa fa-underline',
      },
      {
        icon:'sep',
      },
      {
        onClickFunction: editorHelper.button_gotext_left,
        icon:'fa fa-align-left',
      },
      {
        onClickFunction: editorHelper.button_gotext_center,
        icon:'fa fa-align-center',
      },
      {
        onClickFunction: editorHelper.button_gotext_right,
        icon:'fa fa-align-right',
      },
      {
        onClickFunction: editorHelper.button_gotext_justifyfull,
        icon:'fa fa-align-justify',
      },
      {
        icon:'sep',
      },
      {
        onClickFunction: editorHelper.button_golist,
        icon:'fa fa-list-ol',
      },
      {
        onClickFunction: editorHelper.button_gobullet,
        icon:'fa fa-list-ul',
      },
      {
        onClickFunction: editorHelper.button_go_outdent,
        icon:'fa fa-outdent',
      },
      {
        onClickFunction: editorHelper.button_go_indent,
        icon:'fa fa-indent',
      },
      {
        icon:'sep',
      },
      {
        onClickFunction: editorHelper.button_gotextlink.bind(this),
        icon:'fa fa-link',
      },
      {
        onClickFunction: editorHelper.button_goimg.bind(this),
        icon:'fa fa-picture-o',
      },
      {
        icon:'sep',
      },
      {
        onClickFunction: editorHelper.button_togglecodeeditor.bind(this),
        icon:'fa fa-code',
      },
    ].concat(props.customButttons || []);
    this.contentIndex = (props.useToolbar) ? 1 : 0;
    this.options = {};
  }
  componentWillReceiveProps(nextProps) {
    // console.debug({ nextProps });
    this.setState(Object.assign({}, nextProps));
  }
  render() {
    console.debug('this.state', this.state);
    return (<div className="__ra_pe_w" {...this.props.wrapperProps}>
      <div className="__ra_pe_tb" {...this.props.toolbarProps}>
        {this.buttons.map((button, i) => {
          if (button.icon === 'sep') {
            return <span key={i} style={{
              marginRight:'0.25rem',
            }}> </span>;
          }
          return (<rb.Button
            key={i}
            onClick={button.onClickFunction}
            icon={button.icon}
            color={(this.state.showEditor && button.icon==='fa fa-code')?'isBlack':undefined}
            {...this.props.buttonProps } />
          );
        })}  
      </div>  
      <div  className="__ra_pe_ce" {...this.props.passProps}
        className="contenteditable" 
      onInput={this.emitChange.bind(this)} 
      onBlur={this.emitChange.bind(this)}
      contentEditable
      dangerouslySetInnerHTML={{
        __html: this.state.value,
      }}></div>
      {
        (this.state.showEditor)
          ? <div>editor</div>
          : null
      }
    </div>);
  }
  getInnerHTML() {
    return ReactDOM.findDOMNode(this).children[ this.contentIndex ].innerHTML;
  }
  shouldComponentUpdate(nextProps) {
    console.debug('nextProps.value', nextProps.value);
    console.debug('this.getInnerHTML()', this.getInnerHTML() );
    console.debug('this.state.showEditor', this.state.showEditor );
    console.debug('nextProps.showEditor',  nextProps.showEditor);
    console.debug('nextProps.value !== this.getInnerHTML()', nextProps.value !== this.getInnerHTML() );
    console.debug('this.state.showEditor!== nextProps.showEditor', this.state.showEditor !== nextProps.showEditor);
    console.debug('nextProps.value !== this.getInnerHTML() || this.state.showEditor!== nextProps.showEditor', nextProps.value !== this.getInnerHTML() || this.state.showEditor !== nextProps.showEditor);
    return nextProps.value !== this.getInnerHTML() || this.state.showEditor!== nextProps.showEditor;
  }
  componentDidUpdate() {
    if ( this.state.value !== this.getInnerHTML() ) {
      ReactDOM.findDOMNode(this).children[this.contentIndex].innerHTML = this.state.value;
    }
  }
  emitChange() {
    var html = this.getInnerHTML();
    // console.debug({ html });
    if (this.props.onChange && typeof this.props.onChange==='function' && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value:  this.getInnerHTML(),
        },
      });
    }
    if (this.props.setDynamicData && typeof this.props.setDynamicData === 'string' && html !== this.lastHtml) {
      this.props.setDynamicData(this.props.dynamicField, html);
    }
    this.lastHtml = html;
  }
  saveSelection() {
    this.options.selection = (saveSelection()) ? saveSelection() : null;
  }
  restoreSelection() {
    this.options.preview_selection = this.options.selection;
    restoreSelection(this.options.selection);
  }

}  

PreviewEditor.propTypes = propTypes;
PreviewEditor.defaultProps = defaultProps;

export default PreviewEditor;
