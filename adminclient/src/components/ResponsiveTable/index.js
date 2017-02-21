import React, { Component, PropTypes, } from 'react';
import { Link, } from 'react-router';
import * as rb from 're-bulma';
import moment from 'moment';
import utilities from '../../util';
import qs from 'querystring';
import debounce from 'debounce';
import flatten from 'flat';

// import styles from '../styles';

const propTypes = {
  hasPagination: PropTypes.bool,
  hasHeader: PropTypes.bool,
  hasFooter: PropTypes.bool,
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  numButtons: PropTypes.number,
};

const defaultProps = {
  hasPagination: true,
  hasHeader: false,
  hasFooter: false,
  limit: 50,
  currentPage: 1,
  numPages: 1,
  numItems: 0,
  numButtons: 1,
  flattenRowData: false,
  flattenRowDataOptions: {},
  searchTable:false,
  filterSearch:false,
  filterAddonProps:{
    style:{
      marginBottom:'20px',
    },
  },
  filterButtonProps:{
  },
  searchButtonProps: {
    color:'isInfo',
  },
  filterSearchProps:{
    type:'text',
    placeholder:'Search',
    isExpanded:true, 
  },
};

class ResponsiveTable extends Component {
  constructor(props) {
    super(props);
    // console.log({ props });
    let rows = props.rows || [];
    if (props.flattenRowData) {
      rows = rows.map(row => flatten(row, props.flattenRowDataOptions));
    }
    // let itemCount =  props.rows.length || props.itemCount;;
    this.state = {
      headers: props.headers || [],
      rows:rows,
      hasPagination: props.hasPagination,
      hasHeader: props.hasHeader,
      hasFooter: props.hasFooter,
      limit: props.limit,
      currentPage: props.currentPage,
      numItems: props.numItems,
      numPages: Math.ceil(props.numItems / props.limit),
      numButtons: props.numButtons,
      isLoading: false,
      sortProp: false,
      sortOrder: '',
    };
    this.searchFunction = debounce(this.updateTableData, 200);
    // console.log('this.state', this.state);
  }
  componentWillReceiveProps(nextProps) {
    let rows = nextProps.rows || [];
    if (nextProps.flattenRowData) {
      rows = rows.map(row => flatten(row, nextProps.flattenRowDataOptions));
    }

    this.setState({
      headers: nextProps.headers || [],
      rows: rows,
      hasPagination: nextProps.hasPagination,
      hasHeader: nextProps.hasHeader,
      hasFooter: nextProps.hasFooter,
      limit: nextProps.limit,
      currentPage: nextProps.currentPage,
      numItems: nextProps.numItems,
      numPages: Math.ceil(nextProps.numItems / nextProps.limit),
      numButtons: nextProps.numButtons,
    });
    // console.log('this.state', this.state);
  }
  updateTableData(options) {
    let newSortOptions = {};
    if (options.sort) {
      newSortOptions.sortProp = options.sort;
      if (this.state.sortProp === options.sort) {
        newSortOptions.sortOrder = (this.state.sortOrder === '') ? '-' : '';
      } else {
        newSortOptions.sortOrder = '';
      }
    }
    if (options.pagenum < 1) {
      options.pagenum = 1;
    }
    this.setState({ isLoading: true, });
    let stateProps = this.props.getState();
    let fetchURL = `${stateProps.settings.basename}${this.props.baseUrl}&${qs.stringify({
      limit: this.props.limit,
      sort: (newSortOptions.sortProp)
        ? `${newSortOptions.sortOrder}${newSortOptions.sortProp}`
        : undefined,
      search: options.search,
      pagenum: options.pagenum || 1,
    })}`;
    // console.log({ options, fetchURL, },options.search.value);
    let headers = Object.assign({
      'x-access-token': stateProps.user.jwt_token,
    }, stateProps.settings.userprofile.options.headers);
    utilities.fetchComponent(fetchURL, { headers, })()  
      .then(response => { 
        let updatedState = {};
        // if (this.props.flattenRowData) {
        //   response = flatten(response, this.props.flattenRowDataOptions);
        // }
        // console.log({ response });
        this.props.dataMap.forEach(data => { 
          if (data.key === 'rows') {
            let rows = response[ data.value ] || [];
            if (this.props.flattenRowData) {
              updatedState[ data.key ] = rows.map(row => flatten(row, this.props.flattenRowDataOptions));
            }
          } else {
            updatedState[ data.key ] = response[ data.value ];
          }
        });
        updatedState.numPages = Math.ceil(updatedState.numItems / this.props.limit);
        updatedState.limit = this.props.limit;
        updatedState.currentPage = options.pagenum;
        updatedState.isLoading = false;
        this.setState(updatedState);
      }, e => {
        this.props.errorNotification(e);
      });
  }
  formatValue(value, row, options) {
    // console.log({ value, row, options });
    let returnValue = value;
    if (typeof options.idx !=='undefined' && typeof returnValue!=='undefined' && returnValue.indexOf('--idx--')!==-1) {
      returnValue = returnValue.replace('--idx--', options.idx);
    }
    if (typeof options.idx !=='undefined' && typeof returnValue!=='undefined' && returnValue.indexOf('--idx-ctr--')!==-1) {
      returnValue = returnValue.replace('--idx-ctr--', (options.idx+1));
    }
    if (options.momentFormat) {
      returnValue = moment(value).format(options.momentFormat);
    }
    return returnValue;
  }
  getHeaderLinkURL(link, row) {
    let returnLink = link.baseUrl;
    if (link.params && link.params.length > 0) {
      link.params.forEach((param) => {
        returnLink = returnLink.replace(param.key, row[ param.val ]);
      });
    }
    return returnLink;
  }
  render() {
    // console.log(this.state);
    const { numPages, currentPage, } = this.state;
    const pageButtons = [];
    const lastIndex = numPages - 1;

    let start = currentPage - 2;
    let end = currentPage;
    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end > lastIndex) {
      if (start > 0) {
        start -= (end - lastIndex);
        if (start < 0) {
          start = 0;
        }
      }
      end = lastIndex;
    }

    if (start > 0) {
      pageButtons.push((
        <li key={0}>
          <rb.PageButton isActive={currentPage === 1}
          onClick={()=>this.updateTableData({ pagenum: 1, })}
          >1
          </rb.PageButton>
        </li>
      ));
      pageButtons.push(<li key="dot-before">...</li>);
    }

    for (let index = start; index <= end; index += 1) {
      const inActive = ((index + 1) !== currentPage);
      if (inActive) {
        pageButtons.push((
          <li key={index}>
            <rb.PageButton
              onClick={()=>this.updateTableData({ pagenum: (index + 1), })}
            >{index + 1}</rb.PageButton>
          </li>
        ));
      } else {
        pageButtons.push((
          <li key={index}>
            <rb.PageButton color="isPrimary" isActive
              onClick={() => this.updateTableData({ pagenum: (index + 1), })}>
              {index + 1}
            </rb.PageButton>
          </li>
        ));
      }
    }

    if (end < lastIndex) {
      pageButtons.push(<li key="dot-after">...</li>);
      pageButtons.push((
        <li key={lastIndex}>
          <rb.PageButton onClick={()=>this.updateTableData({ pagenum: (lastIndex + 1), })}>
            {lastIndex + 1}
          </rb.PageButton>
        </li>
      ));
    }
    const footer = (
      <rb.Pagination>
        {(this.state.currentPage < 2)
          ? (<rb.Button state="isDisabled"> Previous </rb.Button>)
          : (<rb.PageButton onClick={()=>this.updateTableData({ pagenum: (this.state.currentPage - 1), })}>Previous</rb.PageButton>)}  
        <ul>
          {pageButtons}
        </ul>
        {(this.state.currentPage >= this.state.numPages)
          ? (<rb.Button state="isDisabled"> Next </rb.Button>)
          : (<rb.PageButton onClick={()=>this.updateTableData({ pagenum: (this.state.currentPage+1), })}>Next</rb.PageButton>)}  
      </rb.Pagination>);
    
    var fbts= <a/>;
    if(this.props.filterSearch){
      fbts = <rb.Button {...this.props.filterButtonProps}>Filters</rb.Button>;
    }
    return (
      <rb.Container>
        {(this.props.tableSearch)
          ? (<rb.Addons
              {...this.props.filterAddonProps}
            >
              {fbts}
              <rb.Input {...this.props.filterSearchProps}
                onChange={(data) => {
                  this.searchFunction({ search: data.target.value, });
                  this.searchInputTextVal = data.target.value;  //TODO: this is janky fix it
                }}
                ref={(input) => {
                  this.searchTextInput = input;
                }}
              />
              <rb.Button {...this.props.searchButtonProps}
              onClick={() => {
                this.searchFunction({ search: this.searchInputTextVal, });
              }}
              >Search</rb.Button>
            </rb.Addons>)
          : null}
        <div style={{ overflow:'hidden', height:'100%', }}>
          {(this.state.isLoading)
            ? (<div style={{
              textAlign: 'center',
              position: 'absolute',
              height: '80%',
              width: '100%',
              opacity: '.9',
              background: 'white',
              display: 'flex',
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <rb.Button color="isWhite" state="isLoading">Loading</rb.Button> 
          </div>)
            : null
          }   
          <rb.Table {...this.props.tableProps}>
            <rb.Thead>
              <rb.Tr>
                {this.props.headers.map((header, idx) => (
                  <rb.Th key={idx}>{(header.sortable)
                    ? (<a href="#" {...this.props.headerLinkProps} onClick={() => {
                      this.updateTableData({ sort: header.sortid, });
                    }}>{header.label}</a>)
                    : header.label
                    }</rb.Th>
                ))}
              </rb.Tr>
            </rb.Thead>
            <rb.Tbody>
              {this.state.rows.map((row, rowIndex) => (
                <rb.Tr key={`row${rowIndex}`}>
                  {this.state.headers.map((header, colIndex) => {
                    // console.log({header});
                    if (header.link) {
                      return (
                        <rb.Td key={`row${rowIndex}col${colIndex}`}>
                          <Link {...header.linkProps} to={this.getHeaderLinkURL(header.link, row)}>{
                            this.formatValue(
                              row[ header.sortid ] || header.value,
                              row,
                              {
                                idx: rowIndex,
                                momentFormat: header.momentFormat,
                              })
                          }</Link>
                        </rb.Td>
                      );
                    } else {
                      return (
                        <rb.Td key={`row${rowIndex}col${colIndex}`}>
                          {
                            this.formatValue(
                              row[ header.sortid ] || header.value,
                              row,
                              {
                                idx: rowIndex,
                                momentFormat: header.momentFormat,
                              })
                          }
                        </rb.Td>
                      );
                      // return (
                      //   <rb.Td>{(row[ header.sortid ] && header.momentFormat)
                      //     ? moment(row[header.sortid]).format(header.momentFormat)
                      //     :row[ header.sortid ]}</rb.Td>
                      // );
                    }
                  })}
                </rb.Tr>
                ))}
            </rb.Tbody>
          </rb.Table>
        </div>  

          
        {this.state.hasPagination ? footer : ''}
      </rb.Container>
    );
  }
}
//tble

ResponsiveTable.propType = propTypes;
ResponsiveTable.defaultProps = defaultProps;

export default ResponsiveTable;
