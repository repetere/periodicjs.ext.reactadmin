import React, { Component, PropTypes, } from 'react';
import flatten from 'flat';
import * as rb from 're-bulma';
import debounce from 'debounce';
import utilities from '../../util';

const propTypes = {
  disabled: PropTypes.bool,
  selector: PropTypes.string,
  displayfield: PropTypes.string,
  multi: PropTypes.bool,
  createable: PropTypes.bool,
  flattenDataList: PropTypes.bool,
  flattenDataListOptions: PropTypes.any,
  resourceUrl: PropTypes.string,
  createResourceUrl: PropTypes.string,
  data: PropTypes.array,
  selectedData: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

const defaultProps = {
  disabled: false,
  data: false,
  selectedData: false,
  createable: false,
  value:undefined,
  flattenDataList:true,
  flattenDataListOptions: {},
  selector:'_id',
  displayField:'title',
  onChange:(data)=>{console.debug('ResponsiveDatalist onChange',{data})}
};

class ResponsiveDatalist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled,
      data: props.data,
      value: props.value,
      selectedData: props.selectedData || props.value,
    };
    // console.debug({props});
    this.searchFunction = debounce(this.updateDataList, 200);

  }
  componentWillReceiveProps(nextProps) {
    // console.debug({ nextProps });
    // this.setState(Object.assign({}, nextProps, this.props.getState()));
    // // console.log('this.state', this.state);
  }
  onChangeHandler(event){

  }
  onKeyPressHandler(event){

  }
  render() {
    let notificationStyle={
      marginBottom: '5px', 
      padding:'5px', 
      border:'1px solid lightgrey',
    };
    let selectData = (this.props.multi) 
      ? (this.state.value && this.state.value.length ) 
        ? (this.state.value.map(selected=>{
          return (<rb.Notification
            enableCloseButton
            closeButtonProps={{ onClick: () => console.debug('clicked') }}
            style={notificationStyle}
          >
            {selected[this.props.displayField]||selected[this.props.selector]}
          </rb.Notification>)
        }))
        : null
      : (this.state.value)
        ?(<rb.Notification
            enableCloseButton
            closeButtonProps={{ 
              onClick: () => console.debug('clicked'),
              style:{
                margin:'-6px -5px 0 20px'
              }
            }}
            style={notificationStyle}
          >
            {this.state.value[this.props.displayField]||this.state.value[this.props.selector]}
          </rb.Notification>)
        : null;
    let displayOptions = (this.state.data && this.state.data.length)
      ? this.state.data.map(datum=>{
        return (
          <rb.Notification
            color="isInfo"
            enableCloseButton
            closeButtonProps={{ onClick: () => console.debug('clicked') }}
            style={notificationStyle}
          >
            {datum[this.props.displayField]||datum[this.props.selector]}
          </rb.Notification>)
        })
      : null;
    return(<div {...this.props.wrapperProps}>
      <div style={{width:'100%'}}>
        <rb.Input {...this.props.passableProps}
          onChange={this.onChangeHandler.bind(this)}
          onKeyPress={this.onKeyPressHandler.bind(this)}
        />
      </div>
      <div> { displayOptions }</div>
      <div>{ selectData }</div>
    </div>)
  }
}
ResponsiveDatalist.propType = propTypes;
ResponsiveDatalist.defaultProps = defaultProps;

export default ResponsiveDatalist;
