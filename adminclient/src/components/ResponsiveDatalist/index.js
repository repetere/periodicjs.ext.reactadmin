import React, { Component, PropTypes, } from 'react';
import { Link, } from 'react-router';
// import flatten from 'flat';
import qs from 'querystring';
import * as rb from 're-bulma';
// import debounce from 'debounce';
import utilities from '../../util';
import pluralize from 'pluralize';

const propTypes = {
  disabled: PropTypes.bool,
  selector: PropTypes.string,
  displayfield: PropTypes.string,
  dbname: PropTypes.string,
  multi: PropTypes.bool,
  createable: PropTypes.bool,
  flattenDataList: PropTypes.bool,
  flattenDataListOptions: PropTypes.any,
  resourceUrl: PropTypes.string,
  createResourceUrl: PropTypes.string,
  data: PropTypes.array,
  selectedData: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  limit: PropTypes.number,
  datalistdata: PropTypes.array,
};

const defaultProps = {
  disabled: false,
  data: false,
  selectedData: [],
  createable: false,
  value: undefined,
  flattenDataList:true,
  flattenDataListOptions: {},
  selector:'_id',
  displayField:'title',
  dbname:'periodic',
  limit: 10,
  datalistdata: [],
  onChange:(data)=>{
    console.debug('ResponsiveDatalist onChange', { data, })  
;
  },
  onFocus: (data)=>{
    console.debug('ResponsiveDatalist onFocus', { data, })  
;
  },
};

class ResponsiveDatalist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled,
      data: props.data,
      value: props.value,
      selectedData: props.selectedData,
      isSearching:false,
    };
    // console.log('this.state', this.state, { props });
    this.inputProps = Object.assign({}, this.props.passableProps);
    // this.searchFunction = debounce(this.updateDataList, 200);
    this.searchFunction = this.updateDataList.bind(this);
    this.filterStaticData = this.filterStaticData.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.debug({ nextProps });
    // this.setState(Object.assign({}, nextProps, this.props.getState()));
    // // console.log('this.state', this.state);
  }

  filterStaticData(options) {
    console.log('in filterStaticData');
    console.log({ options });
    return (options.search)
      ? this.props.datalistdata.filter(item => (item[ this.props.field ].indexOf(options.search) > -1))
      : this.props.datalistdata;
  }

  updateDataList(options) {
    if(this.props.resourceUrl){
      this.setState({ isSearching: true, });
      let stateProps = this.props.getState();
      let fetchURL = `${this.props.resourceUrl}&${qs.stringify({
        limit: this.props.limit,
        // sort: (newSortOptions.sortProp)
        //   ? `${newSortOptions.sortOrder}${newSortOptions.sortProp}`
        //   : undefined,
        search: options.search,
        allowSpecialCharacters: true,
        // pagenum: options.pagenum || 1,
      })}`;
      let headers = Object.assign({
        'x-access-token': stateProps.user.jwt_token,
      }, stateProps.settings.userprofile.options.headers);
      utilities.fetchComponent(fetchURL, { headers, })()
        .then(response => { 
          let updatedState = {};
          updatedState.selectedData = response[pluralize(this.props.entity)];
          updatedState.isSearching = false;
          // console.debug({updatedState,response});
          this.setState(updatedState);
        }, e => {
          this.props.errorNotification(e);
        });
    } else if (this.props.staticSearch) {

        this.setState({ isSearching: true, });
        //options.search is the actual content
        let updatedState = {};
        updatedState.selectedData = this.filterStaticData(options);
        updatedState.isSearching = false;
        // console.debug({updatedState,response});
        this.setState(updatedState);
        
      //value is the array of selected values
      //selectedData is the filtered list that changes everytime user types
    } else{
      console.debug({ options,  });
    }
  }
  onChangeHandler(event) {
    console.log('event target value');
    console.log(event.target.value);
    this.searchFunction({ search: event.target.value||'', });
  }
  onFocusHandler(event) {
    console.log('in onclickhandler');
    let updatedState = {};
    // updatedState.selectedData = this.props.datalistdata;
    updatedState.selectedData = this.props.datalistdata.map(data => data.value);
    updatedState.isSearching = false;
    this.setState(updatedState);
    // this.searchFunction({ search: event.target.value, });
  }
  getDatalistDisplay(options){
    let { displayField, selector, datum, } = options;
    let displayText = (datum[ displayField ] || datum.title || datum.name || datum.username || datum.email || datum[ selector ] || '');
    return (<span style={{
      wordBreak: 'break-all',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    }}>
      {
        (datum && datum.fileurl && datum.transform && datum.transform.preview)
          ?<rb.Image src={datum.transform.preview} size="is24X24" style={{ float:'left', marginRight:'5px',  }}/>
          :null
      }
      {
        (this.props.resourcePreview)
          ? <Link title={datum.title||displayText} to={`${this.props.resourcePreview}/${datum[selector]||datum}`}>{displayText}</Link>
          : displayText
      }
      {
        (this.props.resourceDescription)
          ? <rb.Content><p>{datum.description}</p></rb.Content>
          : null
      }
    </span>);
  }
  removeDatalistItem(index) {
    // console.debug('clicked datalist',{index});
    // console.debug('clicked onclick',this.props);
    if(this.props.multi){
      let newValue = [].concat(this.state.value);
      newValue.splice(index, 1);
      // let oldValue = this.state.value;
      // console.debug({ oldValue, newValue });
      this.setState({
        value:newValue,
        selectedData: false,
      });
      this.props.onChange(newValue);
    }    else {
      let datum = undefined;
      this.setState({
        value:datum,
        selectedData: false,
      });
      // console.debug({ datum });
      this.props.onChange(datum);
    }
  }

  onBlurHandler() {
    setTimeout(() => {
        this.setState({ selectedData: [] });
    }, 400)
  }

  render() {
    try {
      let notificationStyle={
        marginBottom: '5px', 
        padding:'5px', 
        border:'1px solid lightgrey',
      };
      let notificationCloseStyle={
        margin: '0px 0px 0px 20px',
        borderRadius: '19px',
      };
      let selectData = (this.props.multi) 
        ? (this.state.value && this.state.value.length ) 
          ? (this.state.value.map((selected, k)=>{
            return (<rb.Notification
            key={k}
              enableCloseButton
              closeButtonProps={{ 
                onClick: this.removeDatalistItem.bind(this, k),
                style: notificationCloseStyle,
              }}
              style={notificationStyle}
            >
              {this.getDatalistDisplay({
                datum:selected,
                displayField: this.props.displayField,
                selector: this.props.selector,
              })}
            </rb.Notification>);
          }))
          : null
        : (this.state.value)
          ?(<rb.Notification
              enableCloseButton
              closeButtonProps={{ 
                onClick: this.removeDatalistItem.bind(this),
                style: notificationCloseStyle,
              }}
              style={notificationStyle}
            >
  
              {this.getDatalistDisplay({
                datum:this.state.value,
                displayField: this.props.displayField,
                selector: this.props.selector,
              })}
            </rb.Notification>)
          : null;
      

      let displayOptions = (Array.isArray(this.state.selectedData) &&this.state.selectedData && this.state.selectedData.length)
        ? this.state.selectedData.map((datum, k)=>{
          return (
            <rb.Notification
              key={k}
              color="isDanger"
              style={notificationStyle}
            >
               <rb.Button 
                 icon="fa fa-plus" 
                 size="isSmall" 
                 style={{
                   alignSelf:'flex-end',
                   borderRadius:'20px',
                   float: 'right',
                   paddingRight: '0px',
                 }}
                 onClick={()=>{
                    console.debug('clicked onclick',this.props);
                   if(this.props.multi){
                     let newValue = (this.state.value && Array.isArray(this.state.value) && this.state.value.length)
                       ? this.state.value.concat([datum, ])
                       : [datum, ];
                     this.setState({
                       value:newValue,
                       selectedData: false,
                     });
                     this.props.onChange(newValue);
                   } else {
                     this.setState({
                       value:datum,
                       selectedData: false,
                     });
                     this.props.onChange(datum);
                   }
                 }}/>
               {this.getDatalistDisplay({
                 datum,
                 displayField: this.props.displayField,
                 selector: this.props.selector,
               })}
            </rb.Notification>
          );
        }
        )
        : null;
    
      return (<div {...this.props.wrapperProps}>
      <div style={{ width:'100%', }}>
        <rb.Input {...this.inputProps}
          state={this.state.isSearching || undefined}
          onChange={this.onChangeHandler.bind(this)}
          onFocus={this.onChangeHandler.bind(this)}
          onBlur={this.onBlurHandler.bind(this)}  
          ref={(input)=>{
            this.textInput = input; 
          }}
        />
      </div>
      <div> { displayOptions }</div>
      <div>{ selectData }</div>
    </div>); 
            
    } catch (e) {
      console.error(e);
      return <span>some error</span>
      }
     
  }
}
ResponsiveDatalist.propType = propTypes;
ResponsiveDatalist.defaultProps = defaultProps;

export default ResponsiveDatalist;
