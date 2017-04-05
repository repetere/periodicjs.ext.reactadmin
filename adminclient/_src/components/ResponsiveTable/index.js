'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reBulma = require('re-bulma');

var rb = _interopRequireWildcard(_reBulma);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _AppLayoutMap = require('../AppLayoutMap');

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _reactFileReaderInput = require('react-file-reader-input');

var _reactFileReaderInput2 = _interopRequireDefault(_reactFileReaderInput);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _json2Csv = require('json-2-csv');

var _RACodeMirror = require('../RACodeMirror');

var _RACodeMirror2 = _interopRequireDefault(_RACodeMirror);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import styles from '../styles';

var propTypes = {
  hasPagination: _react.PropTypes.bool,
  hasHeader: _react.PropTypes.bool,
  hasFooter: _react.PropTypes.bool,
  limit: _react.PropTypes.number,
  currentPage: _react.PropTypes.number,
  numButtons: _react.PropTypes.number,
  numPages: _react.PropTypes.number,
  numItems: _react.PropTypes.number,
  flattenRowData: _react.PropTypes.bool,
  flattenRowDataOptions: _react.PropTypes.object,
  selectedRow: _react.PropTypes.object,
  searchTable: _react.PropTypes.bool,
  filterSearch: _react.PropTypes.bool,
  headers: _react.PropTypes.array,
  rows: _react.PropTypes.array,
  tableFooter: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  tableForm: _react.PropTypes.bool,
  tableFormAddButtonProps: _react.PropTypes.bool,
  selectEntireRow: _react.PropTypes.bool,
  sortable: _react.PropTypes.bool,
  suppressNullValues: _react.PropTypes.bool,
  useInputRows: _react.PropTypes.bool,
  replaceButton: _react.PropTypes.bool,
  replaceButtonProps: _react.PropTypes.any,
  replaceButtonLabel: _react.PropTypes.string,
  uploadAddButton: _react.PropTypes.bool,
  uploadAddButtonProps: _react.PropTypes.any,
  uploadAddButtonLabel: _react.PropTypes.string
};

var defaultProps = {
  headers: [],
  rows: [],
  hasPagination: true,
  hasHeader: false,
  hasFooter: false,
  tableFooter: false,
  onChange: function onChange(event) {
    console.debug(event);
  },
  limit: 50,
  currentPage: 1,
  numPages: 1,
  numItems: 0,
  numButtons: 1,
  flattenRowData: false,
  flattenRowDataOptions: {},
  searchTable: false,
  filterSearch: false,
  tableForm: false,
  filterAddonProps: {
    style: {
      marginBottom: '20px'
    }
  },
  filterButtonProps: {},
  searchButtonProps: {
    color: 'isInfo'
  },
  filterSearchProps: {
    type: 'text',
    placeholder: 'Search',
    isExpanded: true
  },
  tableFormAddButtonProps: {
    color: 'isPrimary'
  },
  selectEntireRow: false,
  useInputRows: false,
  selectOptionSortId: false,
  selectOptionSortIdLabel: false,
  sortable: true,
  suppressNullValues: false,
  addNewRows: true,
  fixCSVRow: true,
  excludeEmptyHeaders: true,
  insertSelectedRowHeaderIndex: 0,
  csvEOL: {
    // eol: '\r\n',
    trimHeaderValues: true,
    trimFieldValues: true
  }
};

function getOptionsHeaders(props, propHeaders) {
  var headers = (propHeaders || props.headers || []).concat([]);
  // console.debug('original', { headers });
  if (props.selectOptionSortId) {
    headers.unshift({
      sortid: props.selectOptionSortId,
      label: props.selectOptionSortIdLabel || (0, _capitalize2.default)(props.selectOptionSortId),
      value: 'x',
      selectedOptionRowHeader: true
    });
  }
  // console.debug('modified', { headers });
  return headers;
}

function getHeadersFromRows(options) {
  var rows = options.rows,
      sortable = options.sortable,
      excludeEmptyHeaders = options.excludeEmptyHeaders;

  console.debug({ rows: rows, sortable: sortable, excludeEmptyHeaders: excludeEmptyHeaders });
  var headerRow = (0, _assign2.default)({}, rows[0]);
  console.debug({ headerRow: headerRow });
  var headersFromRow = (0, _keys2.default)(headerRow);
  var headers = headersFromRow.map(function (rowkey) {
    return {
      label: (0, _capitalize2.default)((0, _pluralize2.default)(rowkey)),
      sortid: rowkey,
      sortable: sortable
    };
  });
  return headers;
}

function excludeEmptyHeaders(options) {
  var headers = options.headers,
      excludeEmptyHeaders = options.excludeEmptyHeaders;
  // console.debug({ headers, excludeEmptyHeaders, });

  if (excludeEmptyHeaders) {
    headers.forEach(function (header, i) {
      // console.debug('headers[ i ]', headers[ i ], { header, });
      if (!headers[i].sortid && !headers[i].label) {
        delete headers[i];
      }
    });
  }
  return headers;
}

var ResponsiveTable = function (_Component) {
  (0, _inherits3.default)(ResponsiveTable, _Component);

  function ResponsiveTable(props) {
    (0, _classCallCheck3.default)(this, ResponsiveTable);

    // console.debug('this.props.getState()',this.props.getState());
    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveTable.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveTable)).call(this, props));

    var rows = props.rows || [];
    var headers = (!props.headers || !props.headers.length) && rows[0] ? getHeadersFromRows({
      rows: props.rows,
      sortable: props.sortable,
      excludeEmptyHeaders: props.excludeEmptyHeaders
    }) : props.headers;
    headers = getOptionsHeaders(props, headers);
    headers = excludeEmptyHeaders({
      headers: headers,
      excludeEmptyHeaders: props.excludeEmptyHeaders
    });
    if (props.flattenRowData) {
      rows = rows.map(function (row) {
        return (0, _assign2.default)({}, row, (0, _flat2.default)(row, props.flattenRowDataOptions));
      });
    }

    _this.state = {
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
      sortProp: false,
      sortOrder: '',
      newRowData: {},
      selectedRowData: {},
      selectedRowIndex: {}
    };
    _this.searchFunction = (0, _debounce2.default)(_this.updateTableData, 200);
    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.addRow = _this.updateByAddRow.bind(_this);
    _this.replaceRows = _this.updateByReplacingRows.bind(_this);
    _this.addingRows = _this.updateByAddingRows.bind(_this);
    _this.selectRow = _this.updateSelectedRow.bind(_this);
    _this.deleteRow = _this.updateByDeleteRow.bind(_this);
    _this.moveRowDown = _this.updateByMoveRowDown.bind(_this);
    _this.moveRowUp = _this.updateByMoveRowUp.bind(_this);
    _this.updateNewRowText = _this.updateNewRowDataText.bind(_this);
    _this.updateInlineRowText = _this.updateInlineRowDataText.bind(_this);
    _this.getFooterAddRow = _this.updateGetFooterAddRow.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var rows = nextProps.rows || [];
      var headers = (!nextProps.headers || !nextProps.headers.length) && rows[0] ? getHeadersFromRows({
        rows: rows,
        sortable: nextProps.sortable,
        excludeEmptyHeaders: nextProps.excludeEmptyHeaders
      }) : nextProps.headers;
      headers = getOptionsHeaders(nextProps);
      headers = excludeEmptyHeaders({
        headers: headers,
        excludeEmptyHeaders: nextProps.excludeEmptyHeaders
      });
      if (nextProps.flattenRowData) {
        rows = rows.map(function (row) {
          return (0, _assign2.default)({}, row, (0, _flat2.default)(row, nextProps.flattenRowDataOptions));
        });
      }
      // console.debug('nextProps.rows', nextProps.rows);

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
        numButtons: nextProps.numButtons
      });
    }
  }, {
    key: 'updateSelectedRow',
    value: function updateSelectedRow(options) {
      // console.debug({ options });
      this.updateTableData(options);
    }
  }, {
    key: 'updateByReplacingRows',
    value: function updateByReplacingRows(newrows) {
      this.updateTableData({ rows: newrows.concat([]), clearNewRowData: true });
    }
  }, {
    key: 'updateByAddingRows',
    value: function updateByAddingRows(newrows) {
      var rows = this.state.rows.concat(newrows || []);
      this.updateTableData({ rows: rows, clearNewRowData: true });
    }
  }, {
    key: 'updateByAddRow',
    value: function updateByAddRow() {
      var rows = this.state.rows.concat([]);
      var newRow = (0, _assign2.default)({}, this.state.newRowData);
      rows.splice(rows.length, 0, newRow);
      // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
      // this.props.onChange({ rows, });
      this.updateTableData({ rows: rows, clearNewRowData: true });
    }
  }, {
    key: 'updateByDeleteRow',
    value: function updateByDeleteRow(rowIndex) {
      var rows = this.state.rows.concat([]);
      rows.splice(rowIndex, 1);
      // console.debug({ rowIndex, rows }, this.state.rows);
      // this.props.onChange({ rows, });
      this.updateTableData({ rows: rows });
    }
  }, {
    key: 'updateByMoveRowUp',
    value: function updateByMoveRowUp(rowIndex) {
      var rows = this.state.rows.concat([]);
      var deletedRow = rows.splice(rowIndex, 1)[0];
      rows.splice(rowIndex - 1, 0, deletedRow);
      // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
      // this.props.onChange({ rows, });
      this.updateTableData({ rows: rows });
    }
  }, {
    key: 'updateByMoveRowDown',
    value: function updateByMoveRowDown(rowIndex) {
      var rows = this.state.rows.concat([]);
      var deletedRow = rows.splice(rowIndex, 1)[0];
      rows.splice(rowIndex + 1, 0, deletedRow);
      // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
      // this.props.onChange({ rows, });
      this.updateTableData({ rows: rows });
    }
  }, {
    key: 'updateNewRowDataText',
    value: function updateNewRowDataText(options) {
      var name = options.name,
          text = options.text;

      var updatedStateProp = {
        newRowData: (0, _assign2.default)({}, this.state.newRowData, (0, _defineProperty3.default)({}, name, text))
      };
      this.props.headers.forEach(function (header) {
        if (header.sortid !== name && header.formtype && header.defaultValue && !updatedStateProp.newRowData[header.sortid]) {
          updatedStateProp.newRowData[header.sortid] = header.defaultValue;
        }
      });
      // console.debug({ updatedStateProp, options });
      this.setState(updatedStateProp);
    }
  }, {
    key: 'updateInlineRowDataText',
    value: function updateInlineRowDataText(options) {
      var name = options.name,
          text = options.text,
          rowIndex = options.rowIndex;

      var rows = this.state.rows.concat([]);
      rows[rowIndex][name] = text;
      // console.debug({ rowIndex, rows, deletedRow }, this.state.rows);
      // this.props.onChange({ rows, });
      this.updateTableData({ rows: rows });
    }
  }, {
    key: 'handleFileUpload',
    value: function handleFileUpload(type) {
      var _this2 = this;

      return function (e, results) {
        var updatefunction = type === 'replace' ? _this2.replaceRows : _this2.addingRows;
        try {
          console.debug({ e: e, results: results });
          results.forEach(function (result) {
            var _result = (0, _slicedToArray3.default)(result, 2),
                e = _result[0],
                file = _result[1];

            if (_path2.default.extname(file.name) === '.csv') {
              (0, _json2Csv.csv2json)(e.target.result, function (err, newRows) {
                if (err) throw err;
                // console.debug({ newRows, }, 'e.target.result', e.target.result);
                updatefunction(newRows);
              }, {
                options: _this2.props.csvOptions
              });
            } else {
              var newRows = JSON.parse(e.target.result);
              updatefunction(newRows);
            }
          });
        } catch (e) {
          _this2.props.errorNotification(e);
        }
      };
    }
  }, {
    key: 'updateTableData',
    value: function updateTableData(options) {
      var _this3 = this;

      var updatedState = {};
      var newSortOptions = {};
      if (options.clearNewRowData) {
        updatedState.newRowData = {};
      }
      if ((0, _typeof3.default)(options.selectedRowIndex) !== undefined) {
        updatedState.selectedRowIndex = options.selectedRowIndex;
      }
      if ((0, _typeof3.default)(options.selectedRowData) !== undefined) {
        updatedState.selectedRowData = options.selectedRowData;
      }
      if (!this.props.baseUrl) {
        // console.debug({options})
        updatedState.rows = typeof options.rows !== 'undefined' ? options.rows : this.state.rows;
        // console.debug({ updatedState, });

        if (options.sort) {
          newSortOptions.sortProp = options.sort;
          if (this.state.sortProp === options.sort) {
            newSortOptions.sortOrder = this.state.sortOrder !== 'desc' ? 'desc' : 'asc';
          } else {
            newSortOptions.sortOrder = 'desc';
          }
          updatedState.rows = updatedState.rows.sort(_util2.default.sortObject(newSortOptions.sortOrder, options.sort));
          updatedState.sortOrder = newSortOptions.sortOrder;
          updatedState.sortProp = options.sort;
        }
        if (this.props.tableSearch && this.props.searchField && options.search) {
          updatedState.rows = updatedState.rows.filter(function (row) {
            return row[_this3.props.searchField].indexOf(options.search) !== -1;
          });
        }
        updatedState.numPages = Math.ceil(updatedState.rows.length / this.props.limit);
        updatedState.limit = this.props.limit;
        updatedState.currentPage = typeof options.pagenum !== 'undefined' ? options.pagenum : this.state.currentPage && this.state.currentPage <= updatedState.numPages ? this.state.currentPage : 1;
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
            newSortOptions.sortOrder = this.state.sortOrder === '' ? '-' : '';
          } else {
            newSortOptions.sortOrder = '';
          }
        }
        if (options.pagenum < 1) {
          options.pagenum = 1;
        }
        this.setState({ isLoading: true });
        var stateProps = this.props.getState();
        var fetchURL = '' + stateProps.settings.basename + this.props.baseUrl + '&' + _querystring2.default.stringify({
          limit: this.props.limit,
          sort: newSortOptions.sortProp ? '' + newSortOptions.sortOrder + newSortOptions.sortProp : undefined,
          search: options.search,
          allowSpecialCharacters: true,
          pagenum: options.pagenum || 1
        });
        // console.log({ options, fetchURL, },options.search.value);
        var headers = (0, _assign2.default)({
          'x-access-token': stateProps.user.jwt_token
        }, stateProps.settings.userprofile.options.headers);
        _util2.default.fetchComponent(fetchURL, { headers: headers })().then(function (response) {
          _this3.props.dataMap.forEach(function (data) {
            if (data.key === 'rows') {
              var rows = response[data.value] || [];
              if (_this3.props.flattenRowData) {
                updatedState[data.key] = rows.map(function (row) {
                  return (0, _flat2.default)(row, _this3.props.flattenRowDataOptions);
                });
              }
            } else {
              updatedState[data.key] = response[data.value];
            }
          });
          updatedState.numPages = Math.ceil(updatedState.numItems / _this3.props.limit);
          updatedState.limit = _this3.props.limit;
          updatedState.currentPage = typeof options.pagenum !== 'undefined' ? options.pagenum : _this3.props.currentPage;
          updatedState.isLoading = false;

          if (options.sort) {
            updatedState.sortOrder = newSortOptions.sortOrder;
            updatedState.sortProp = options.sort;
          }

          if (_this3.props.tableForm) {
            _this3.props.onChange(updatedState);
          }
          _this3.setState(updatedState);
        }, function (e) {
          _this3.props.errorNotification(e);
        });
      }
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value, row, options, header) {
      var _this4 = this;

      try {
        // console.debug({ value, row, options, header, });
        // console.debug(options.rowIndex,this.state.selectedRowIndex)
        var returnValue = value;
        if (header && header.stringify) {
          value = (0, _stringify2.default)(value, null, 2);
          returnValue = (0, _stringify2.default)(value, null, 2);
        }
        if (header && header.tostring) {
          value = value.toString();
          returnValue = value.toString();
        }
        if (header && header.selectedOptionRowHeader) {
          return _react2.default.createElement('input', { type: 'radio', checked: options.rowIndex === this.state.selectedRowIndex ? true : false });
        } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'code') {
          var CodeMirrorProps = (0, _assign2.default)({}, {
            codeMirrorProps: {
              lineNumbers: true,
              value: value, //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
              //value: this.state[ formElement.name ] || formElement.value,
              style: {
                minHeight: 200
              },
              lineWrapping: true,
              onChange: function (text) {
                // console.log({ newvalue });
                var name = header.sortid;
                var rowIndex = options.rowIndex;
                this.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
              }.bind(this)
            }
          }, header.CodeMirrorProps);
          var codeProps = (0, _assign2.default)({
            wrapperProps: {
              style: {
                overflow: 'auto',
                backgroundColor: 'white',
                border: '1px solid #d3d6db',
                borderRadius: 3,
                height: 'auto',
                boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
              }
            }
          }, header.codeProps);
          return _react2.default.createElement(_RACodeMirror2.default, (0, _extends3.default)({}, CodeMirrorProps, codeProps));
        } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'textarea') {
          return _react2.default.createElement(
            rb.Textarea,
            (0, _extends3.default)({}, header.textareaProps, {
              value: value,
              onChange: function onChange(event) {
                var text = event.target.value;
                var name = header.sortid;
                var rowIndex = options.rowIndex;
                _this4.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
              }
            }),
            value
          );
        } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'text') {
          return _react2.default.createElement(
            rb.Input,
            (0, _extends3.default)({
              value: value
            }, header.inputProps, {
              onChange: function onChange(event) {
                var text = event.target.value;
                var name = header.sortid;
                var rowIndex = options.rowIndex;
                _this4.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
              }
            }),
            value
          );
        } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'select') {
          var selectOptions = header.formoptions || [];
          return _react2.default.createElement(
            rb.Select,
            (0, _extends3.default)({
              value: value
            }, header.selectProps, {
              onChange: function onChange(event) {
                var text = event.target.value;
                var name = header.sortid;
                var rowIndex = options.rowIndex;
                _this4.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
              } }),
            selectOptions.map(function (opt, k) {
              return _react2.default.createElement(
                'option',
                { key: k, disabled: opt.disabled, value: opt.value },
                opt.label || opt.value
              );
            })
          );
        } else if (typeof options.idx !== 'undefined' && typeof returnValue === 'string' && returnValue.indexOf('--idx--') !== -1) {
          returnValue = returnValue.replace('--idx--', options.idx);
        }
        if (typeof options.idx !== 'undefined' && typeof returnValue === 'string' && returnValue.indexOf('--idx-ctr--') !== -1) {
          returnValue = returnValue.replace('--idx-ctr--', options.idx + 1);
        }
        if (options.momentFormat) {
          returnValue = (0, _moment2.default)(value).format(options.momentFormat);
        } else if (options.numeralFormat) {
          returnValue = (0, _numeral2.default)(value).format(options.numeralFormat);
        } else if (header && header.wrapPreOutput) {
          returnValue = _react2.default.createElement(
            'pre',
            header.wrapPreOutputProps,
            value
          );
        } else if (options.icon && value) {
          // console.debug({value})
          if (typeof value !== 'string' && Array.isArray(value)) {
            var icons = value.map(function (val, i) {
              return _react2.default.createElement(rb.Icon, (0, _extends3.default)({ key: i + Math.random() }, options.iconProps, { icon: val }));
            });
            return icons;
          } else {
            return _react2.default.createElement(rb.Icon, (0, _extends3.default)({}, options.iconProps, { icon: value }));
          }
        } else if (options.image && value) {
          if (typeof value !== 'string' && Array.isArray(value)) {
            var images = value.map(function (val, i) {
              return _react2.default.createElement(rb.Image, (0, _extends3.default)({ key: i }, options.imageProps, { src: val }));
            });
            return { images: images };
          } else {
            return _react2.default.createElement(rb.Image, (0, _extends3.default)({}, options.imageProps, { src: value }));
          }
        }
        if (typeof returnValue === 'undefined' || returnValue === null && this.props.suppressNullValues) {
          return '';
          // } else if (typeof returnValue !== 'object') {
          //   return JSON.stringify(returnValue);
        } else if (returnValue === null) {
          return 'null';
        } else {
          return returnValue.toString();
        }
      } catch (e) {
        console.log({ value: value, row: row, options: options, header: header }, e);
        return 'invalid';
      }
    }
  }, {
    key: 'getHeaderLinkURL',
    value: function getHeaderLinkURL(link, row) {
      var returnLink = link.baseUrl;
      if (link.params && link.params.length > 0) {
        link.params.forEach(function (param) {
          returnLink = returnLink.replace(param.key, row[param.val]);
        });
      }
      return returnLink;
    }
  }, {
    key: 'updateGetFooterAddRow',
    value: function updateGetFooterAddRow(header) {
      var _this5 = this;

      if (header.selectedOptionRowHeader) return null;
      switch (header.formtype) {
        case 'select':
          return _react2.default.createElement(
            rb.Select,
            (0, _extends3.default)({}, header.footerFormElementPassProps, {
              value: this.state.newRowData[header.sortid] || header.defaultValue,
              onChange: function onChange(event) {
                var text = event.target.value;
                var name = header.sortid;
                _this5.updateNewRowText({ name: name, text: text });
              } }),
            header.formoptions.map(function (opt, k) {
              return _react2.default.createElement(
                'option',
                { key: k, disabled: opt.disabled, value: opt.value },
                opt.label || opt.value
              );
            })
          );
        // break;  
        case 'textarea':
          return _react2.default.createElement(rb.Textarea, (0, _extends3.default)({}, header.footerFormElementPassProps, {
            value: this.state.newRowData[header.sortid] || '',
            onChange: function onChange(event) {
              var text = event.target.value;
              var name = header.sortid;
              _this5.updateNewRowText({ name: name, text: text });
            } }));
        // break;  
        case 'code':
          var CodeMirrorProps = (0, _assign2.default)({}, {
            codeMirrorProps: {
              lineNumbers: true,
              value: this.state.newRowData[header.sortid] || '', //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
              //value: this.state[ formElement.name ] || formElement.value,
              style: {
                minHeight: 200
              },
              lineWrapping: true,
              onChange: function (text) {
                // console.log({ newvalue });
                var name = header.sortid;
                this.updateNewRowText({ name: name, text: text });
              }.bind(this)
            }
          }, header.CodeMirrorProps);
          var codeProps = (0, _assign2.default)({
            wrapperProps: {
              style: {
                overflow: 'auto',
                backgroundColor: 'white',
                border: '1px solid #d3d6db',
                borderRadius: 3,
                height: 'auto',
                boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
              }
            }
          }, header.codeProps);
          return _react2.default.createElement(_RACodeMirror2.default, (0, _extends3.default)({}, CodeMirrorProps, codeProps));
        case 'text':
        default:
          return _react2.default.createElement(rb.Input, (0, _extends3.default)({}, header.footerFormElementPassProps, {
            value: this.state.newRowData[header.sortid] || '',
            onChange: function onChange(event) {
              var text = event.target.value;
              var name = header.sortid;
              _this5.updateNewRowText({ name: name, text: text });
            } }));
        // break;  
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      // console.debug('render this.state', this.state);
      var calcStartIndex = (this.state.currentPage - 1) * this.state.limit;
      var startIndex = !this.props.baseUrl ? calcStartIndex : 0;
      var endIndex = !this.props.baseUrl ? this.state.limit * this.state.currentPage : this.state.limit;
      var displayRows = this.state.rows.slice(startIndex, endIndex);
      var _state = this.state,
          numPages = _state.numPages,
          currentPage = _state.currentPage;

      var pageButtons = [];
      var lastIndex = numPages - 1;

      var start = currentPage - 2;
      var end = currentPage;
      if (start < 0) {
        end += -start;
        start = 0;
      }
      if (end > lastIndex) {
        if (start > 0) {
          start -= end - lastIndex;
          if (start < 0) {
            start = 0;
          }
        }
        end = lastIndex;
      }

      if (start > 0) {
        pageButtons.push(_react2.default.createElement(
          'li',
          { key: 0 },
          _react2.default.createElement(
            rb.PageButton,
            { isActive: currentPage === 1,
              onClick: function onClick() {
                return _this6.updateTableData({ pagenum: 1 });
              }
            },
            '1'
          )
        ));
        pageButtons.push(_react2.default.createElement(
          'li',
          { key: 'dot-before' },
          '...'
        ));
      }

      var _loop = function _loop(index) {
        var inActive = index + 1 !== currentPage;
        if (inActive) {
          pageButtons.push(_react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              rb.PageButton,
              {
                onClick: function onClick() {
                  return _this6.updateTableData({ pagenum: index + 1 });
                }
              },
              index + 1
            )
          ));
        } else {
          pageButtons.push(_react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              rb.PageButton,
              { color: 'isPrimary', isActive: true,
                onClick: function onClick() {
                  return _this6.updateTableData({ pagenum: index + 1 });
                } },
              index + 1
            )
          ));
        }
      };

      for (var index = start; index <= end; index += 1) {
        _loop(index);
      }

      if (end < lastIndex) {
        pageButtons.push(_react2.default.createElement(
          'li',
          { key: 'dot-after' },
          '...'
        ));
        pageButtons.push(_react2.default.createElement(
          'li',
          { key: lastIndex },
          _react2.default.createElement(
            rb.PageButton,
            { onClick: function onClick() {
                return _this6.updateTableData({ pagenum: lastIndex + 1 });
              } },
            lastIndex + 1
          )
        ));
      }
      var footer = _react2.default.createElement(
        rb.Pagination,
        null,
        this.state.currentPage < 2 ? _react2.default.createElement(
          rb.Button,
          { state: 'isDisabled' },
          ' Previous '
        ) : _react2.default.createElement(
          rb.PageButton,
          { onClick: function onClick() {
              return _this6.updateTableData({ pagenum: _this6.state.currentPage - 1 });
            } },
          'Previous'
        ),
        _react2.default.createElement(
          'ul',
          null,
          pageButtons
        ),
        this.state.currentPage >= this.state.numPages ? _react2.default.createElement(
          rb.Button,
          { state: 'isDisabled' },
          ' Next '
        ) : _react2.default.createElement(
          rb.PageButton,
          { onClick: function onClick() {
              return _this6.updateTableData({ pagenum: _this6.state.currentPage + 1 });
            } },
          'Next'
        )
      );

      var fbts = _react2.default.createElement('a', null);
      if (this.props.filterSearch) {
        fbts = _react2.default.createElement(
          rb.Button,
          this.props.filterButtonProps,
          'Filters'
        );
      }
      return _react2.default.createElement(
        rb.Container,
        this.props.containerProps,
        this.props.tableSearch ? _react2.default.createElement(
          rb.Addons,
          this.props.filterAddonProps,
          fbts,
          _react2.default.createElement(rb.Input, (0, _extends3.default)({}, this.props.filterSearchProps, {
            onChange: function onChange(data) {
              _this6.searchFunction({ search: data.target.value });
              _this6.searchInputTextVal = data.target.value; //TODO: this is janky fix it
            },
            ref: function ref(input) {
              _this6.searchTextInput = input;
            }
          })),
          _react2.default.createElement(
            rb.Button,
            (0, _extends3.default)({}, this.props.searchButtonProps, {
              onClick: function onClick() {
                _this6.searchFunction({ search: _this6.searchInputTextVal });
              }
            }),
            'Search'
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { style: { overflow: 'hidden', height: '100%' } },
          this.state.isLoading ? _react2.default.createElement(
            'div',
            { style: {
                textAlign: 'center',
                position: 'absolute',
                height: '80%',
                width: '100%',
                opacity: '.9',
                background: 'white',
                display: 'flex',
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center'
              } },
            _react2.default.createElement(
              rb.Button,
              { color: 'isWhite', state: 'isLoading' },
              'Loading'
            )
          ) : null,
          _react2.default.createElement(
            rb.Table,
            this.props.tableProps,
            _react2.default.createElement(
              rb.Thead,
              null,
              _react2.default.createElement(
                rb.Tr,
                null,
                this.state.headers.map(function (header, idx) {
                  return _react2.default.createElement(
                    rb.Th,
                    (0, _extends3.default)({ key: idx }, header.headerColumnProps),
                    header.sortable ? _react2.default.createElement(
                      'a',
                      (0, _extends3.default)({}, _this6.props.headerLinkProps, { onClick: function onClick() {
                          _this6.updateTableData({ sort: header.sortid });
                        } }),
                      header.label
                    ) : header.label
                  );
                })
              )
            ),
            this.props.tableForm && this.props.addNewRows ? _react2.default.createElement(
              rb.Tfoot,
              null,
              _react2.default.createElement(
                rb.Tr,
                null,
                this.state.headers.map(function (header, idx) {
                  return _react2.default.createElement(
                    rb.Th,
                    (0, _extends3.default)({ key: idx }, header.headerColumnProps),
                    idx === _this6.state.headers.length - 1 ? _react2.default.createElement(
                      'span',
                      (0, _extends3.default)({ className: '__ra_rt_tf', style: { display: 'flex' } }, _this6.props.tableFormButtonWrapperProps),
                      _this6.props.replaceButton ? _react2.default.createElement(
                        _reactFileReaderInput2.default,
                        { as: 'text', onChange: _this6.handleFileUpload.call(_this6, 'replace') },
                        _react2.default.createElement(
                          rb.Button,
                          _this6.props.replaceButtonProps,
                          _this6.props.replaceButtonLabel || 'Replace'
                        )
                      ) : null,
                      _this6.props.uploadAddButton ? _react2.default.createElement(
                        _reactFileReaderInput2.default,
                        { as: 'text', onChange: _this6.handleFileUpload.call(_this6, 'add') },
                        _react2.default.createElement(
                          rb.Button,
                          _this6.props.uploadAddButtonProps,
                          _this6.props.uploadAddButtonLabel || 'Upload'
                        )
                      ) : null,
                      _react2.default.createElement(
                        rb.Button,
                        (0, _extends3.default)({}, _this6.props.tableFormAddButtonProps, {
                          style: { width: '100%' },
                          onClick: function onClick() {
                            _this6.updateByAddRow();
                          } }),
                        _this6.props.formRowAddButtonLabel ? _this6.props.formRowAddButtonLabel : 'Add'
                      )
                    ) : _this6.updateGetFooterAddRow(header)
                  );
                })
              )
            ) : null,
            _react2.default.createElement(
              rb.Tbody,
              null,
              displayRows.map(function (row, rowIndex) {
                return _react2.default.createElement(
                  rb.Tr,
                  { key: 'row' + rowIndex, className: _this6.props.selectEntireRow && rowIndex === _this6.state.selectedRowIndex ? '__selected' : undefined },
                  _this6.state.headers.map(function (header, colIndex) {
                    // console.debug({header});
                    if (header.link) {
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        _react2.default.createElement(
                          _reactRouter.Link,
                          (0, _extends3.default)({}, header.linkProps, { to: _this6.getHeaderLinkURL(header.link, row) }),
                          _this6.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                            idx: rowIndex + calcStartIndex,
                            momentFormat: header.momentFormat,
                            image: header.image,
                            imageProps: header.imageProps,
                            icon: header.icon,
                            iconProps: header.iconProps
                          })
                        )
                      );
                    } else if (header.formRowButtons) {
                      // console.debug({ row, header, });
                      //http://htmlarrows.com/arrows/
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex, style: { textAlign: 'right' } }, header.columnProps),
                        rowIndex !== 0 ? _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this6.props.formRowUpButton, { onClick: function onClick() {
                              _this6.moveRowUp(rowIndex);
                            } }),
                          _this6.props.formRowUputtonLabel ? _this6.props.formRowUputtonLabel : '⇧'
                        ) : null,
                        rowIndex < _this6.state.rows.length - 1 ? _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this6.props.formRowDownButton, { onClick: function onClick() {
                              _this6.moveRowDown(rowIndex);
                            } }),
                          _this6.props.formRowDownButtonLabel ? _this6.props.formRowDownButtonLabel : '⇩'
                        ) : null,
                        _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this6.props.formRowDeleteButton, { onClick: function onClick() {
                              _this6.deleteRow(rowIndex);
                            } }),
                          _this6.props.formRowDeleteButtonLabel ? _this6.props.formRowDeleteButtonLabel : '⤫'
                        )
                      );
                    } else if (header.buttons && header.buttons.length) {
                      // console.debug({ row, header, });
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        header.buttons.map(function (button) {
                          return _this6.getRenderedComponent((0, _assign2.default)({
                            component: 'ResponsiveButton',
                            props: (0, _assign2.default)({
                              onclickPropObject: row,
                              buttonProps: {}
                            }, button.passProps),
                            children: _this6.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                              idx: rowIndex + calcStartIndex,
                              momentFormat: header.momentFormat,
                              image: header.image,
                              imageProps: header.imageProps,
                              icon: header.icon,
                              iconProps: header.iconProps
                            }) || ''
                          }, button));
                        })
                        // Object.assign

                      );
                    } else {
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps, { onClick: function onClick() {
                            if (_this6.props.selectEntireRow) {
                              _this6.selectRow({
                                selectedRowData: row,
                                selectedRowIndex: rowIndex
                              });
                            }
                            // console.debug({ event, rowIndex });
                          } }),
                        _this6.formatValue.call(_this6, typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                          rowIndex: rowIndex,
                          idx: rowIndex + calcStartIndex,
                          momentFormat: header.momentFormat,
                          image: header.image,
                          imageProps: header.imageProps,
                          icon: header.icon,
                          iconProps: header.iconProps
                        }, header)
                      );
                      // return (
                      //   <rb.Td>{(row[ header.sortid ] && header.momentFormat)
                      //     ? moment(row[header.sortid]).format(header.momentFormat)
                      //     :row[ header.sortid ]}</rb.Td>
                      // );
                    }
                  })
                );
              })
            )
          )
        ),
        this.state.hasPagination && displayRows.length > 0 ? footer : null
      );
    }
  }]);
  return ResponsiveTable;
}(_react.Component);
//tble

ResponsiveTable.propType = propTypes;
ResponsiveTable.defaultProps = defaultProps;

exports.default = ResponsiveTable;