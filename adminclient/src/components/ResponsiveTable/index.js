import React, { Component, /*PropTypes,*/ } from 'react';
import { Link, } from 'react-router';
import * as rb from 're-bulma';
import moment from 'moment';
import numeral from 'numeral';
import utilities from '../../util';
import qs from 'querystring';
import debounce from 'debounce';
import { flatten, } from 'flat';
import { getRenderedComponent, } from '../AppLayoutMap';
// import capitalize from 'capitalize';
// import pluralize from 'pluralize';
import FileReaderInput from 'react-file-reader-input';
import path from 'path';
import { csv2json, json2csv, } from 'json-2-csv';
import RACodeMirror from '../RACodeMirror';
import ResponsiveDatalist from '../ResponsiveDatalist';
import { filterQuerySelectOptions, propTypes, defaultProps, getOptionsHeaders, getHeadersFromRows, excludeEmptyHeaders, getFilterOptions, defaultNewRowData, filterQuerySelectOptionsMap, getFilterSortableOption, } from './TableHelpers';

const filterLabelStyleProps = {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  height: '100%',
};

class ResponsiveTable extends Component {
  constructor(props) {
    super(props);
    // console.debug('this.props.getState()',this.props.getState());
    let rows = props.rows || [];
    let headers = ((!props.headers || !props.headers.length) && rows[0]) ?
      getHeadersFromRows({
        rows: props.rows,
        sortable: props.sortable,
        excludeEmptyHeaders: props.excludeEmptyHeaders,
      }) :
      props.headers;
    headers = getOptionsHeaders(props, headers);
    headers = excludeEmptyHeaders({
      headers,
      excludeEmptyHeaders: props.excludeEmptyHeaders,
    });
    if (props.flattenRowData) {
      rows = rows.map(row => Object.assign({}, row, flatten(row, props.flattenRowDataOptions)));
    }
    this.filterSelectOptions = getFilterOptions({ rows, headers, filters: this.props.filterSelectOptions, simpleSearchFilter: this.props.simpleSearchFilter, });
    this.sortableSelctOptions = getFilterSortableOption({ headers, });

    this.state = {
      headers: headers,
      rows: rows,
      hasPagination: props.hasPagination,
      hasHeader: props.hasHeader,
      hasFooter: props.hasFooter,
      limit: props.limit,
      currentPage: props.currentPage,
      numItems: props.numItems,
      numPages: Math.ceil(props.numItems / props.limit),
      numButtons: props.numButtons,
      isLoading: false,
      sortProp: this.props.searchField || 'createdat',
      sortOrder: 'desc',
      filterRowData: [],
      filterRowNewData: defaultNewRowData,
      newRowData: {},
      selectedRowData: {},
      selectedRowIndex: {},
      showFilterSearch: props.showFilterSearch,
      // usingFiltersInSearch: props.usingFiltersInSearch,
    };
    this.searchFunction = debounce(this.updateTableData, 200);
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.addRow = this.updateByAddRow.bind(this);
    this.replaceRows = this.updateByReplacingRows.bind(this);
    this.addingRows = this.updateByAddingRows.bind(this);
    this.selectRow = this.updateSelectedRow.bind(this);
    this.deleteRow = this.updateByDeleteRow.bind(this);
    this.moveRowDown = this.updateByMoveRowDown.bind(this);
    this.moveRowUp = this.updateByMoveRowUp.bind(this);
    this.updateNewRowText = this.updateNewRowDataText.bind(this);
    this.updateInlineRowText = this.updateInlineRowDataText.bind(this);
    this.getFooterAddRow = this.updateGetFooterAddRow.bind(this);
    this.removeFilterRow = this.removeFilterByDeleteRow.bind(this);
    this.addFilterRow = this.addFilterByAddRow.bind(this);
    this.updateNewFilterRowText = this.updateNewFilterRowDataText.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let rows = nextProps.rows || [];
    let headers = ((!nextProps.headers || !nextProps.headers.length) && rows[0]) ?
      getHeadersFromRows({
        rows,
        sortable: nextProps.sortable,
        excludeEmptyHeaders: nextProps.excludeEmptyHeaders,
      }) :
      nextProps.headers;
    headers = getOptionsHeaders(nextProps);
    headers = excludeEmptyHeaders({
      headers,
      excludeEmptyHeaders: nextProps.excludeEmptyHeaders,
    });
    if (nextProps.flattenRowData) {
      rows = rows.map(row => Object.assign({}, row, flatten(row, nextProps.flattenRowDataOptions)));
    }
    // console.debug('nextProps.limit', nextProps.limit);
    // console.debug('this.state.limit', this.state.limit);

    this.setState({
      headers: headers,
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
  }
  updateSelectedRow(options) {
    // console.debug({ options });
    this.updateTableData(options);
  }
  updateByReplacingRows(newrows) {
    this.updateTableData({ rows: newrows.concat([]), clearNewRowData: true, });
  }
  updateByAddingRows(newrows) {
    let rows = this.state.rows.concat(newrows || []);
    this.updateTableData({ rows, clearNewRowData: true, });
  }
  updateByAddRow() {
    let rows = this.state.rows.concat([]);
    let newRow = Object.assign({}, this.state.newRowData);
    rows.splice(rows.length, 0, newRow);
    // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
    // this.props.onChange({ rows, });
    this.updateTableData({ rows, clearNewRowData: true, });
  }
  updateByDeleteRow(rowIndex) {
    let rows = this.state.rows.concat([]);
    rows.splice(rowIndex, 1);
    // console.debug({ rowIndex, rows }, this.state.rows);
    // this.props.onChange({ rows, });
    this.updateTableData({ rows, });
  }
  updateByMoveRowUp(rowIndex) {
    let rows = this.state.rows.concat([]);
    let deletedRow = rows.splice(rowIndex, 1)[0];
    rows.splice(rowIndex - 1, 0, deletedRow);
    // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
    // this.props.onChange({ rows, });
    this.updateTableData({ rows, });
  }
  updateByMoveRowDown(rowIndex) {
    let rows = this.state.rows.concat([]);
    let deletedRow = rows.splice(rowIndex, 1)[0];
    rows.splice(rowIndex + 1, 0, deletedRow);
    // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
    // this.props.onChange({ rows, });
    this.updateTableData({ rows, });
  }
  updateNewRowDataText(options) {
    let { name, text, } = options;
    let updatedStateProp = {
      newRowData: Object.assign({},
        this.state.newRowData, {
          [name]: text, }),
    };
    this.props.headers.forEach(header => {
      if (header.sortid !== name && header.formtype && header.defaultValue && !updatedStateProp.newRowData[header.sortid]) {
        updatedStateProp.newRowData[header.sortid] = header.defaultValue;
      }
    });
    // console.debug({ updatedStateProp, options });
    this.setState(updatedStateProp);
  }
  updateInlineRowDataText(options) {
    let { name, text, rowIndex, } = options;
    let rows = this.state.rows.concat([]);
    rows[rowIndex][name] = text;
    // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
    // this.props.onChange({ rows, });
    this.updateTableData({ rows, });
  }
  handleFileUpload(type) {
    return (e, results) => {
      let updatefunction = (type === 'replace') ?
        this.replaceRows :
        this.addingRows;
      try {
        console.debug({ e, results, });
        results.forEach(result => {
          const [e, file, ] = result;
          if (path.extname(file.name) === '.csv') {
            csv2json(e.target.result, (err, newRows) => {
              if (err) throw err;
              // console.debug({ newRows, }, 'e.target.result', e.target.result);
              updatefunction(newRows);
            }, {
              options: this.props.csvOptions,
              // keys: this.state.headers.map(header => header.sortid),  
            });
          } else {
            let newRows = JSON.parse(e.target.result);
            updatefunction(newRows);
          }
        });
      } catch (e) {
        this.props.errorNotification(e);
      }
    };
  }
  removeFilterByDeleteRow(rowIndex) {
    let rows = this.state.filterRowData.concat([]);
    rows.splice(rowIndex, 1);
    this.setState({ filterRowData: rows, }, () => {
      this.updateTableData({});
    });
  }
  addFilterByAddRow() {
    let rows = this.state.filterRowData.concat([]);
    let newRow = Object.assign({}, this.state.filterRowNewData);
    rows.splice(rows.length, 0, newRow);
    if (newRow.property === '__property__') {
      this.props.createNotification({ text: 'Please select a property', type: 'error', timed: 5000, });
    } else if (newRow.filter_value === '__filter__') {
      this.props.createNotification({ text: 'Please select a filter', type: 'error', timed: 5000, });
    } else {
      // console.debug('addFilterByAddRow', { rows });
      this.setState({ filterRowData: rows, filterRowNewData: defaultNewRowData, }, () => {
        this.updateTableData({});
      });
    }
  }
  updateNewFilterRowDataText(options) {
    let { name, text, } = options;
    let updatedStateProp = {
      filterRowNewData: Object.assign({},
        this.state.filterRowNewData, {
          [name]: text, }),
    };
    // console.debug({ updatedStateProp, options });
    this.setState(updatedStateProp);
  }
  updateTableData(options) {
      // console.debug({ options, });
      let updatedState = {};
      let newSortOptions = {};
      if (options.clearNewRowData) {
        updatedState.newRowData = {};
      }
      if (typeof options.selectedRowIndex !== undefined) {
        updatedState.selectedRowIndex = options.selectedRowIndex;
      }
      if (typeof options.selectedRowData !== undefined) {
        updatedState.selectedRowData = options.selectedRowData;
      }
      if (!this.props.baseUrl) {
        // console.debug({options})
        updatedState.rows = (typeof options.rows !== 'undefined') ? options.rows : this.props.rows;
        // console.debug({ updatedState, });

        if (options.sort) {
          newSortOptions.sortProp = options.sort;
          if (this.state.sortProp === options.sort) {
            newSortOptions.sortOrder = (this.state.sortOrder !== 'desc') ? 'desc' : 'asc';
          } else {
            newSortOptions.sortOrder = 'desc';
          }
          updatedState.rows = updatedState.rows.sort(utilities.sortObject(newSortOptions.sortOrder, options.sort));
          updatedState.sortOrder = newSortOptions.sortOrder;
          updatedState.sortProp = options.sort;
        } else if (this.state.sortOrder || this.state.sortProp) {
          newSortOptions.sortProp = this.state.sortProp;
          newSortOptions.sortOrder = (this.state.sortOrder === 'desc' || this.state.sortOrder === '-') ? 'desc' : 'asc';
          updatedState.rows = updatedState.rows.sort(utilities.sortObject(newSortOptions.sortOrder, newSortOptions.sortProp));

        }
        if (this.props.tableSearch && this.props.searchField && options.search) {
          updatedState.rows = this.props.rows.filter(row => row[this.props.searchField].indexOf(options.search) !== -1);
        }
        if (this.props.tableSearch && this.state.filterRowData && this.state.filterRowData.length) {
          let filteredRows = [];
          updatedState.rows.forEach(row => {
            this.state.filterRowData.forEach(filter => {
              if (row[filter.property]) {
                switch (filter.filter_value) {
                  case 'like':
                  case 'in':
                    if (row[filter.property].indexOf(filter.value) !== -1) filteredRows.push(row);
                    break;
                  case 'not':
                    if (row[filter.property] !== filter.value) filteredRows.push(row);
                    break;
                  case 'not-like':
                  case 'not-in':
                    if (row[filter.property].indexOf(filter.value) === -1) filteredRows.push(row);
                    break;
                  case 'lt':
                    if (row[filter.property] < filter.value) filteredRows.push(row);
                    break;
                  case 'lte':
                    if (row[filter.property] <= filter.value) filteredRows.push(row);
                    break;
                  case 'gt':
                    if (row[filter.property] > filter.value) filteredRows.push(row);
                    break;
                  case 'gte':
                    if (row[filter.property] >= filter.value) filteredRows.push(row);
                    break;
                  case 'exists':
                    if (typeof row[filter.property] !== 'undefined') filteredRows.push(row);
                    break;
                  case 'size':
                    if (row[filter.property].length > filter.value) filteredRows.push(row);
                    break;
                  case 'is-date':
                    if (moment(row[filter.property]).isSame(filter.value)) filteredRows.push(row);
                    break;
                  case 'lte-date':
                    if (moment(row[filter.property]).isSameOrBefore(filter.value)) filteredRows.push(row);
                    break;
                  case 'lt-date':
                    if (moment(row[filter.property]).isBefore(filter.value)) filteredRows.push(row);
                    break;
                  case 'gte-date':
                    if (moment(row[filter.property]).isSameOrAfter(filter.value)) filteredRows.push(row);
                    break;
                  case 'gt-date':
                    if (moment(row[filter.property]).isAfter(filter.value)) filteredRows.push(row);
                    break;
                  case 'is':
                  default:
                    if (row[filter.property] === filter.value) filteredRows.push(row);
                    break;
                }
              }
            });
            // row[ this.props.searchField ].indexOf(options.search) !== -1
          });
          updatedState.rows = filteredRows;
          // console.debug('updatedState.rows', updatedState.rows, { filteredRows, });
        }
        updatedState.numPages = Math.ceil(updatedState.rows.length / this.state.limit);
        updatedState.limit = this.state.limit;
        updatedState.currentPage = (typeof options.pagenum !== 'undefined') ?
          options.pagenum :
          (this.state.currentPage && this.state.currentPage <= updatedState.numPages) ?
          this.state.currentPage :
          1;
        updatedState.isLoading = false;

        if (this.props.tableForm) {
          // console.debug('befroe', {updatedState})
          this.props.onChange(updatedState);
        }
        // else {
        this.setState(updatedState);
        // }

      } else {
        if (options.sort) {
          newSortOptions.sortProp = options.sort;
          if (this.state.sortProp === options.sort) {
            newSortOptions.sortOrder = (this.state.sortOrder === '') ? '-' : '';
          } else {
            newSortOptions.sortOrder = '';
          }
        } else if (this.state.sortOrder || this.state.sortProp) {
          newSortOptions.sortProp = this.state.sortProp;
          newSortOptions.sortOrder = (this.state.sortOrder === 'desc' || this.state.sortOrder === '-') ? '-' : '';
        }
        if (options.pagenum < 1) {
          options.pagenum = 1;
        }
        this.setState({ isLoading: true, });
        let stateProps = this.props.getState();
        let fetchURL = `${stateProps.settings.basename}${this.props.baseUrl}&${qs.stringify({
        limit: this.state.limit || this.props.limit,
        sort: (newSortOptions.sortProp)
          ? `${newSortOptions.sortOrder}${newSortOptions.sortProp}`
          : undefined,
        fq: (this.state.filterRowData && this.state.filterRowData.length)
          ? this.state.filterRowData.map(frd => {
            return `${frd.property}|||${frd.filter_value}|||${frd.value}`;
          })
          : undefined,
        search: options.search,
        allowSpecialCharacters: true,
        pagenum: options.pagenum || 1,
      })}`;
      // console.debug('this.state.filterRowData', this.state.filterRowData, { options, fetchURL, });
      let headers = Object.assign({
        'x-access-token': stateProps.user.jwt_token,
      }, stateProps.settings.userprofile.options.headers);
      utilities.fetchComponent(fetchURL, { headers, })()  
        .then(response => { 
          // let usingResponsePages = false;
          // console.debug('this.props.dataMap',this.props.dataMap)
          this.props.dataMap.forEach(data => { 
            if (data.key === 'rows') {
              let rows = response[ data.value ] || [];
              if (this.props.flattenRowData) {
                updatedState[ data.key ] = rows.map(row => flatten(row, this.props.flattenRowDataOptions));
              }
            } else {
              // if (data.key === 'numPages') {
              //   usingResponsePages = true;
              // }
              updatedState[ data.key ] = response[ data.value ];
            }
          });
          updatedState.numPages = Math.ceil(updatedState.numItems / this.state.limit);
          updatedState.limit = this.state.limit;
          updatedState.currentPage = (typeof options.pagenum !=='undefined') ? options.pagenum : this.props.currentPage;
          updatedState.isLoading = false;

          if (options.sort) {
            updatedState.sortOrder = newSortOptions.sortOrder;
            updatedState.sortProp = options.sort;
          }

          if (this.props.tableForm) {
            this.props.onChange(updatedState);
          }
          this.setState(updatedState);
        }, e => {
          this.props.errorNotification(e);
        });
    }
  }
  formatValue(value, row, options, header) {
   
    try {
       // console.debug({ value, row, options, header, });
      // console.debug(options.rowIndex,this.state.selectedRowIndex)
      let returnValue = value;
      if (header && header.stringify) {
        value = JSON.stringify(value, null, 2);
        returnValue = JSON.stringify(value, null, 2);
      }
      if (header && header.tostring) {
        value = value.toString();
        returnValue = value.toString();
      }
      if (header && header.selectedOptionRowHeader) {
        return <input type="radio" checked={(options.rowIndex===this.state.selectedRowIndex)?true:false} />;
      } else if (this.props.useInputRows && header && header.formtype && header.formtype==='code') {
        let CodeMirrorProps = Object.assign({}, {
          codeMirrorProps: {
            lineNumbers: true,
            value: value, //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
            //value: this.state[ formElement.name ] || formElement.value,
            style: {
              minHeight:200,
            },
            lineWrapping:true,
            onChange: function (text){
              // console.log({ newvalue });
              let name = header.sortid;
              let rowIndex = options.rowIndex;
              this.updateInlineRowText({ name, text, rowIndex, });
            }.bind(this),
          },
        }, header.CodeMirrorProps);
        let codeProps = Object.assign({
          wrapperProps: {
            style: {
              overflow: 'auto',
              backgroundColor: 'white',
              border: '1px solid #d3d6db',
              borderRadius: 3,
              height: 'auto',
              boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
            },
          },
        }, header.codeProps);
        return <RACodeMirror
          {...CodeMirrorProps}
          {...codeProps}
        />;
      } else if (this.props.useInputRows && header && header.formtype && header.formtype==='textarea') {
        return <rb.Textarea
          {...header.textareaProps}
          value={value}
          onChange={(event) => {
            let text = event.target.value;
            let name = header.sortid;
            let rowIndex = options.rowIndex;
            this.updateInlineRowText({ name, text, rowIndex, });
          }}
        >{value}</rb.Textarea>;
      } else if (this.props.useInputRows && header && header.formtype && header.formtype==='text') {
        return <rb.Input
          value={value}
          {...header.inputProps}
          onChange={(event) => {
            let text = event.target.value;
            let name = header.sortid;
            let rowIndex = options.rowIndex;
            this.updateInlineRowText({ name, text, rowIndex, });
          }}
        >{value}</rb.Input>;
      } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'select') {
        let selectOptions = header.formoptions || [];
        return <rb.Select
          value={value}
          {...header.selectProps}
          onChange={(event) => {
            let text = event.target.value;
            let name = header.sortid;
            let rowIndex = options.rowIndex;
            this.updateInlineRowText({ name, text, rowIndex, });
          }}>
          {selectOptions.map((opt, k) => {
            return <option key={k} disabled={opt.disabled} value={opt.value}>{opt.label || opt.value}</option>;
          })}
        </rb.Select>;
      } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'datalist') {
        let rowdata = Array.isArray(this.props.__tableOptions[ header.sortid ][ options.rowIndex ]) ? this.props.__tableOptions[ header.sortid ][ options.rowIndex ]
          : Array.isArray(this.props.__tableOptions[ header.sortid ]) ? this.props.__tableOptions[ header.sortid ]
            : [];
        return <ResponsiveDatalist
          value={value}
          {...header.datalistProps}
          datalistdata={ rowdata }
          onChange={(event) => {
            let text = event;
            let name = header.sortid;
            let rowIndex = options.rowIndex;
            this.updateInlineRowText({ name, text, rowIndex, });
          }}
        >
        </ResponsiveDatalist>
      } else if (typeof options.idx !=='undefined' && typeof returnValue==='string' && returnValue.indexOf('--idx--')!==-1) {
        returnValue = returnValue.replace('--idx--', options.idx);
      }
      if (typeof options.idx !=='undefined' && typeof returnValue==='string' && returnValue.indexOf('--idx-ctr--')!==-1) {
        returnValue = returnValue.replace('--idx-ctr--', (options.idx+1));
      }
      if (options.momentFormat) {
        returnValue = moment(value).format(options.momentFormat);
      } else if (options.numeralFormat) {
        returnValue = numeral(value).format(options.numeralFormat);
      } else if (header && header.wrapPreOutput) {
        returnValue = <pre {...header.wrapPreOutputProps}>{value}</pre>;
      } else if (options.icon && value) {
          // console.debug({value})
        if (typeof value !== 'string' && Array.isArray(value)) {
          let icons = value.map((val, i) => <rb.Icon key={i+Math.random()} {...options.iconProps} icon={val} />);
          return icons;
        } else {
          return <rb.Icon {...options.iconProps} icon={value} />;
        }
      } else if (options.image && value) {
        if (typeof value !== 'string' && Array.isArray(value)) {
          let images = value.map((val, i) => <rb.Image key={i} {...options.imageProps} src={val} />);
          return { images, };
        } else {
          return <rb.Image {...options.imageProps} src={value} />;
        }
      }
      if (typeof returnValue === 'undefined' || (returnValue === null && this.props.suppressNullValues)) {
        return '';
      // } else if (typeof returnValue !== 'object') {
      //   return JSON.stringify(returnValue);
      } else if (returnValue === null) {
        return 'null';
      } else {
        return returnValue.toString();
      }
    } catch (e) {
      console.log({ value, row, options, header, }, e);
      return 'invalid';
    }
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
  updateGetFooterAddRow(header) {
    if (header.selectedOptionRowHeader) return null;
    switch (header.formtype) {
    case 'select':
      return (<rb.Select
        {...header.footerFormElementPassProps}
        value={this.state.newRowData[ header.sortid ] || header.defaultValue}
        onChange={(event) => {
          let text = event.target.value;
          let name = header.sortid;
          this.updateNewRowText({ name, text, });
        }}>
        {header.formoptions.map((opt, k) => {
          return <option key={k} disabled={opt.disabled} value={opt.value}>{opt.label || opt.value}</option>;
        })}
      </rb.Select>);
      // break;  
    case 'textarea':
      return (<rb.Textarea
        {...header.footerFormElementPassProps}
        value={this.state.newRowData[ header.sortid ] || ''}
        onChange={(event) => {
          let text = event.target.value;
          let name = header.sortid;
          this.updateNewRowText({ name, text, });
        }}>
      </rb.Textarea>);    
      // break;  
    case 'code':
      var CodeMirrorProps = Object.assign({}, {
        codeMirrorProps: {
          lineNumbers: true,
          value: this.state.newRowData[ header.sortid ] || '', //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
          //value: this.state[ formElement.name ] || formElement.value,
          style: {
            minHeight:200,
          },
          lineWrapping:true,
          onChange: function (text){
            // console.log({ newvalue });
            let name = header.sortid;
            this.updateNewRowText({ name, text, });
          }.bind(this),
        },
      }, header.CodeMirrorProps);
      var codeProps = Object.assign({
        wrapperProps: {
          style: {
            overflow: 'auto',
            backgroundColor: 'white',
            border: '1px solid #d3d6db',
            borderRadius: 3,
            height: 'auto',
            boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
          },
        },
      }, header.codeProps);
      return (<RACodeMirror
        {...CodeMirrorProps}
        {...codeProps}
      />);  
    case 'text':
    default:
      return (<rb.Input
        {...header.footerFormElementPassProps}
        value={this.state.newRowData[ header.sortid ] || ''}
        onChange={(event) => {
          let text = event.target.value;
          let name = header.sortid;
          this.updateNewRowText({ name, text, });
        }}>
      </rb.Input>);  
      // break;  
    }
  }
  toggleAdvancedSearchFilters() {
    this.setState({ showFilterSearch: !this.state.showFilterSearch, });
    // showFilterSearch:false,  
    // usingFiltersInSearch: false,
    // showFilterSearch: props.showFilterSearch,  
    //     usingFiltersInSearch: props.usingFiltersInSearch  
  }
  render() {
    // console.debug('render this.state', this.state);
    let calcStartIndex = ((this.state.currentPage - 1) * this.state.limit);
    let startIndex = (!this.props.baseUrl)
      ? calcStartIndex
      :0 ;
    let endIndex = (!this.props.baseUrl)
      ? ((this.state.limit * this.state.currentPage))
      : this.state.limit;
    let displayRows = this.state.rows.slice(startIndex, endIndex);
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
      fbts = <rb.Button
        style={(this.state.showFilterSearch)
          ? { background: '#69707a', color: '#f5f7fa', borderColor:'transparent', }
          : (this.state.filterRowData.length > 0)
            ? { background: '#222324', color: 'white', borderColor:'transparent', }
          : undefined}
        {...this.props.filterButtonProps}
        onClick={() => {
          this.toggleAdvancedSearchFilters();
        }}
      >Advanced</rb.Button>;
    }
    return (
      <rb.Container {...this.props.containerProps}>
        
        {(this.props.tableSearch)
          ? (<rb.Addons
              {...this.props.filterAddonProps}
            >
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
              {fbts}
            </rb.Addons>)
          : null}
        {(this.state.showFilterSearch)
          ? <div className="__ra_rt_asf" {...this.props.searchFilterContainerProps}>
            <rb.Message header="Advanced Search Filters" > 
              <rb.Table {...this.props.searchFilterTableProps}>
                <rb.Thead>  
                  <rb.Tr>
                    <rb.Th >Property</rb.Th>
                    <rb.Th>Filter</rb.Th>
                    <rb.Th>Value</rb.Th>
                    <rb.Th>Options</rb.Th>
                  </rb.Tr>
                </rb.Thead>
                <rb.Tbody>
                  {(this.state.filterRowData && this.state.filterRowData.length)
                    ? this.state.filterRowData.map((filterRowDatum, l) => {
                      return <rb.Tr key={l}>
                        <rb.Td>{filterRowDatum.property}</rb.Td>
                        <rb.Td>{filterQuerySelectOptionsMap[filterRowDatum.filter_value]}</rb.Td>
                        <rb.Td>{filterRowDatum.value}</rb.Td>
                        <rb.Td><rb.Button onClick={() => {
                          this.removeFilterRow(l);
                        }}>{'⤫'}</rb.Button></rb.Td>
                      </rb.Tr>;
                    })
                    : null}  
                </rb.Tbody>
                <rb.Tfoot>
                  <rb.Tr>
                    <rb.Th>
                      <rb.Select
                        value={this.state.filterRowNewData.property || '__property__'}
                        onChange={(event) => {
                          let text = event.target.value;
                          let name = 'property';
                          this.updateNewFilterRowText({ name, text, });
                        }}
                      >{this.filterSelectOptions.map((filter, fp) => {
                        return <option value={filter.value} key={fp} disabled={filter.disabled}>{filter.label}</option>;
                      })}</rb.Select>  
                    </rb.Th>
                    <rb.Th>
                      <rb.Select 
                        value={this.state.filterRowNewData.filter_value || '__filter__'}
                        onChange={(event) => {
                          let text = event.target.value;
                          let name = 'filter_value';
                          this.updateNewFilterRowText({ name, text, });
                        }}
                        >{filterQuerySelectOptions.map((filter, ft) => {
                          return <option value={filter.value} key={ft} disabled={filter.disabled}>{filter.label}</option>;
                        })}
                      </rb.Select>  
                    </rb.Th>
                    <rb.Th>
                      <rb.Input
                        value={this.state.filterRowNewData.value || ''}
                        onChange={(event) => {
                          let text = event.target.value;
                          let name = 'value';
                          this.updateNewFilterRowText({ name, text, });
                        }} />  
                    </rb.Th>
                    <rb.Th>
                      <rb.Button style={{ width:'100%', }} onClick={() => { 
                        this.addFilterRow();
                      }}>Add filter</rb.Button>  
                    </rb.Th>
                  </rb.Tr>
                </rb.Tfoot>
              </rb.Table>
              
              <rb.Content {...this.props.searchFilterTableNoteProps}>
                <p><strong>Notes:</strong></p>  
                <ul>
                  <li><strong>Date Values:</strong> For date filters, Moment is used for date filters with the following moment format: YYYY-MM-DDTHH:MM:SS</li>
                  <li><strong>Boolean values</strong> "true" is converted to <em>true</em></li>
                </ul>
                <p><strong>Export:</strong></p> 
                <rb.Button icon="fa fa-download" onClick={() => {
                    this.props.fileSaver({
                      data: this.state.rows,
                      filename: window.location.pathname.replace(/\//gi,'_')+'.json',
                    });
                  }}>JSON</rb.Button>
                  <rb.Button icon="fa fa-download" onClick={() => {
                    // console.debug('this.state.rows', this.state.rows);
                    json2csv(this.state.rows, (err, csv) => { 
                      // console.debug('before csv',csv );
                      this.props.fileSaver({
                        data: csv,
                        type:'text/csv;charset=utf-8',
                        filename: window.location.pathname.replace(/\//gi,'_')+'.csv',
                      });
                    }, {
                      checkSchemaDifferences: false,
                      delimiter: {
                        wrap:'"',
                      },
                    });
                }}>CSV</rb.Button>
                <rb.Button icon="fa fa-download" onClick={() => {
                    // console.debug('this.state.rows', this.state.rows);
                  let headers = []; this.state.headers.forEach(header => {
                    if (header.sortid) headers.push(header.sortid);
                  });
                  let filtered_rows = this.state.rows.map(row => {
                    let copy = Object.assign({}, row);
                    Object.keys(copy).forEach(key => {
                      if (headers.indexOf(key) === -1) {
                        delete copy[ key ];
                      }
                    });
                    return copy;
                  });
                  // console.log({ filtered_rows });
                    json2csv(filtered_rows, (err, csv) => { 
                      // console.debug('before csv',csv );
                      this.props.fileSaver({
                        data: csv,
                        type:'text/csv;charset=utf-8',
                        filename: window.location.pathname.replace(/\//gi,'_')+'.csv',
                      });
                    }, {
                      checkSchemaDifferences: false,
                      delimiter: {
                        wrap:'"',
                      },
                    });
                  }}>Simple CSV</rb.Button>
                <hr/>
              </rb.Content> 
              <rb.Table {...this.props.searchFilterPaginationProps}>
                <rb.Tbody>  
                  <rb.Tr>  
                    <rb.Td>
                      <rb.Group>  
                        <rb.Label style={filterLabelStyleProps}>  
                          Sort by
                        </rb.Label>  
                        <rb.Select
                          value={this.state.sortProp || 'createdat'}
                          onChange={(event) => {
                            let text = event.target.value;
                            this.setState({ sortProp: text, }, () => {
                              this.updateTableData({});
                            });
                          }}
                          >{this.sortableSelctOptions.map((filter, fp) => {
                            return <option value={filter.value} key={fp} disabled={filter.disabled}>{filter.label}</option>;
                          })}
                        </rb.Select> 
                        <rb.Select
                          value={this.state.sortOrder || 'desc'}
                          onChange={(event) => {
                            let text = event.target.value;
                            this.setState({ sortOrder: text, }, () => {
                              this.updateTableData({});
                            });
                          }}
                          >
                          <option value="asc">ASC</option>
                          <option value="desc">DESC</option>
                        </rb.Select>   
                      </rb.Group>  
                    </rb.Td>
                    <rb.Td>
                      <rb.Group>  
                        <rb.Label style={filterLabelStyleProps}>  
                          Showing
                        </rb.Label>
                        <rb.Select
                          value={this.state.limit}
                          onChange={(event) => {
                            let text = event.target.value;
                            this.setState({ limit: text, }, () => {
                              this.updateTableData({});
                            });
                          }}
                        >{(
                          (this.props.includeAllLimits
                            )
                              ? this.props.numOfLimits.concat([ this.state.numItems, ])
                              : this.props.numOfLimits).map((lim, lp) => {
                                return <option value={lim} key={lp} disabled={lim.disabled}>{lim}</option>;
                              })}
                        </rb.Select>
                        <rb.Label style={filterLabelStyleProps}>  
                          of {this.state.numItems} rows
                        </rb.Label>   
                      </rb.Group> 
                    </rb.Td>
                    <rb.Td>
                      <rb.Group>  
                        <rb.Label style={filterLabelStyleProps}>  
                          Page
                        </rb.Label>
                        <rb.Select
                          value={this.state.currentPage}
                          onChange={(event) => {
                            let text = event.target.value;
                            this.searchFunction({ pagenum: text, });
                          }}
                        >{([ this.state.numPages, ].reduce((result, key) => {
                          let usableLimit = (key < 500) ? key : 500;  
                          for (let i = 1; i <= usableLimit; i++){
                            result.push(i);
                          }
                          return result;  
                        }, [])).map((lim, lp) => {
                          return <option value={lim} key={lp} disabled={lim===this.state.currentPage}>{lim}</option>;
                        })}
                        </rb.Select>
                        <rb.Label style={filterLabelStyleProps}>  
                          of {this.state.numPages} 
                        </rb.Label>  
                      </rb.Group>
                    </rb.Td>
                  </rb.Tr>  
                </rb.Tbody>  
              </rb.Table>
            </rb.Message>
          </div>
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
            <rb.Thead className="__ra_rt_thead">
              <rb.Tr>
                {this.state.headers.map((header, idx) => (
                  <rb.Th key={idx} style={{ cursor: 'pointer', }}  {...header.headerColumnProps}>{(header.sortable)
                    ? (<a style={{
                      cursor: 'pointer',
                    }} {...this.props.headerLinkProps} onClick={() => {
                      this.updateTableData({ sort: header.sortid, });
                    }}>{header.label}</a>)
                    : header.label
                    }</rb.Th>
                ))}
              </rb.Tr>
            </rb.Thead>
            {(this.props.tableForm && this.props.addNewRows)
              ? (<rb.Tfoot>
                <rb.Tr>
                  {this.state.headers.map((header, idx) => (
                    <rb.Th key={idx} {...header.headerColumnProps}> 
                      {(idx === this.state.headers.length - 1)
                        ? (<span className="__ra_rt_tf" style={{ display: 'flex', }} {...this.props.tableFormButtonWrapperProps}>
                          {(this.props.replaceButton)
                            ? <FileReaderInput as="text" onChange={this.handleFileUpload.call(this, 'replace')}>
                                <rb.Button {...this.props.replaceButtonProps}>{this.props.replaceButtonLabel||'Replace'}</rb.Button>  
                              </FileReaderInput>  
                            : null}
                          {(this.props.uploadAddButton)
                            ? <FileReaderInput as="text" onChange={this.handleFileUpload.call(this, 'add')}>
                                <rb.Button {...this.props.uploadAddButtonProps}>{this.props.uploadAddButtonLabel||'Upload'}</rb.Button>  
                              </FileReaderInput>   
                            :null}
                          <rb.Button
                          {...this.props.tableFormAddButtonProps}
                          style={{ width: '100%', }}
                          onClick={() => {
                            this.updateByAddRow();
                          }}>
                            {(this.props.formRowAddButtonLabel) ? this.props.formRowAddButtonLabel : 'Add'}
                          </rb.Button>
                          
                        </span>  
                        )
                        : this.updateGetFooterAddRow(header)}
                    </rb.Th>
                  ))}
                </rb.Tr>  
              </rb.Tfoot>)
              :null}
            <rb.Tbody>
              {displayRows.map((row, rowIndex) => (
                <rb.Tr key={`row${rowIndex}`} className={(this.props.selectEntireRow && rowIndex ===  this.state.selectedRowIndex)?'__selected':undefined} >
                  {this.state.headers.map((header, colIndex) => {
                    // console.debug({header});
                    if (header.link) {
                      return (
                        <rb.Td key={`row${rowIndex}col${colIndex}`} {...header.columnProps}>
                          <Link {...header.linkProps} to={this.getHeaderLinkURL(header.link, row)}>{
                            this.formatValue(
                              (typeof row[ header.sortid ] !=='undefined')
                              ? row[ header.sortid ]
                              : header.value,
                              row,
                              {
                                idx: rowIndex+calcStartIndex,
                                momentFormat: header.momentFormat,
                                numeralFormat: header.numeralFormat,
                                image: header.image,
                                imageProps: header.imageProps,
                                icon: header.icon,
                                iconProps: header.iconProps,
                              })
                          }</Link>
                        </rb.Td>
                      );
                    } else if (header.formRowButtons) {
                      // console.debug({ row, header, });
                      //http://htmlarrows.com/arrows/
                      return (
                        <rb.Td key={`row${rowIndex}col${colIndex}`} style={{ textAlign:'right', }} {...header.columnProps}>
                          {(rowIndex !== 0)
                            ? <rb.Button {...this.props.formRowUpButton} onClick={() => {
                              this.moveRowUp(rowIndex);
                            }}>{(this.props.formRowUputtonLabel)?this.props.formRowUputtonLabel:'⇧'}</rb.Button>
                            : null
                          }
                          {(rowIndex < this.state.rows.length - 1)
                            ? <rb.Button  {...this.props.formRowDownButton} onClick={() => {
                              this.moveRowDown(rowIndex);
                            }}>{(this.props.formRowDownButtonLabel)?this.props.formRowDownButtonLabel:'⇩'}</rb.Button>
                            : null
                          }
                          <rb.Button {...this.props.formRowDeleteButton} onClick={() => {
                            this.deleteRow(rowIndex);
                          }}>{(this.props.formRowDeleteButtonLabel)?this.props.formRowDeleteButtonLabel:'⤫'}</rb.Button>
                        </rb.Td>
                      );
                    } else if (header.buttons && header.buttons.length) {
                      // console.debug({ row, header, });
                      return (
                        <rb.Td key={`row${rowIndex}col${colIndex}`} {...header.columnProps}>
                          {
                            header.buttons.map(button => {
                              return this.getRenderedComponent(Object.assign({
                                component: 'ResponsiveButton',
                                props: Object.assign({
                                  onclickPropObject: row,
                                  buttonProps: {},
                                }, button.passProps),
                                children: this.formatValue(
                                  (typeof row[ header.sortid ] !=='undefined')
                                  ? row[ header.sortid ]
                                  : header.value,
                                  row,
                                  {
                                    idx: rowIndex+calcStartIndex,
                                    momentFormat: header.momentFormat,
                                    image: header.image,
                                    imageProps: header.imageProps,
                                    icon: header.icon,
                                    iconProps: header.iconProps,
                                  }) || '',
                              }, button));
                            })
                            // Object.assign
                            
                          }
                        </rb.Td>
                      );
                    
                    } else {
                      return (
                        <rb.Td key={`row${rowIndex}col${colIndex}`} {...header.columnProps} onClick={() => {
                          if (this.props.selectEntireRow) {
                            this.selectRow({
                              selectedRowData: row,
                              selectedRowIndex: rowIndex,
                            });
                          }
                          // console.debug({ event, rowIndex });
                        }}>
                          {
                            this.formatValue.call(this,
                              (typeof row[ header.sortid ] !=='undefined')
                              ? row[ header.sortid ]
                              : header.value,
                              row,
                              {
                                rowIndex: rowIndex,
                                idx: rowIndex+calcStartIndex,
                                momentFormat: header.momentFormat,
                                numeralFormat: header.numeralFormat,
                                image: header.image,
                                imageProps: header.imageProps,
                                icon: header.icon,
                                iconProps: header.iconProps,
                              },
                              header)
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

          
        {(this.state.hasPagination && displayRows.length >0) ? footer : null}
      </rb.Container>
    );
  }
}
//tble

ResponsiveTable.propType = propTypes;
ResponsiveTable.defaultProps = defaultProps;

export default ResponsiveTable;