'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _AppLayoutMap = require('../AppLayoutMap');

var _reactFileReaderInput = require('react-file-reader-input');

var _reactFileReaderInput2 = _interopRequireDefault(_reactFileReaderInput);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _json2Csv = require('json-2-csv');

var _RACodeMirror = require('../RACodeMirror');

var _RACodeMirror2 = _interopRequireDefault(_RACodeMirror);

var _ResponsiveDatalist = require('../ResponsiveDatalist');

var _ResponsiveDatalist2 = _interopRequireDefault(_ResponsiveDatalist);

var _TableHelpers = require('./TableHelpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import capitalize from 'capitalize';
// import pluralize from 'pluralize';
var filterLabelStyleProps = {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  height: '100%'
};

var ResponsiveTable = function (_Component) {
  (0, _inherits3.default)(ResponsiveTable, _Component);

  function ResponsiveTable(props) {
    (0, _classCallCheck3.default)(this, ResponsiveTable);

    // console.debug('this.props.getState()',this.props.getState());
    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveTable.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveTable)).call(this, props));

    var rows = props.rows || [];
    var headers = (!props.headers || !props.headers.length) && rows[0] ? (0, _TableHelpers.getHeadersFromRows)({
      rows: props.rows,
      sortable: props.sortable,
      excludeEmptyHeaders: props.excludeEmptyHeaders
    }) : props.headers;
    headers = (0, _TableHelpers.getOptionsHeaders)(props, headers);
    headers = (0, _TableHelpers.excludeEmptyHeaders)({
      headers: headers,
      excludeEmptyHeaders: props.excludeEmptyHeaders
    });
    if (props.flattenRowData) {
      rows = rows.map(function (row) {
        return (0, _assign2.default)({}, row, (0, _flat.flatten)(row, props.flattenRowDataOptions));
      });
    }
    _this.filterSelectOptions = (0, _TableHelpers.getFilterOptions)({ rows: rows, headers: headers, filters: _this.props.filterSelectOptions, simpleSearchFilter: _this.props.simpleSearchFilter });
    _this.sortableSelctOptions = (0, _TableHelpers.getFilterSortableOption)({ headers: headers });

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
      sortProp: _this.props.searchField || 'createdat',
      sortOrder: 'desc',
      filterRowData: [],
      filterRowNewData: _TableHelpers.defaultNewRowData,
      newRowData: {},
      selectedRowData: {},
      selectedRowIndex: {},
      showFilterSearch: props.showFilterSearch
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
    _this.removeFilterRow = _this.removeFilterByDeleteRow.bind(_this);
    _this.addFilterRow = _this.addFilterByAddRow.bind(_this);
    _this.updateNewFilterRowText = _this.updateNewFilterRowDataText.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var rows = nextProps.rows || [];
      var headers = (!nextProps.headers || !nextProps.headers.length) && rows[0] ? (0, _TableHelpers.getHeadersFromRows)({
        rows: rows,
        sortable: nextProps.sortable,
        excludeEmptyHeaders: nextProps.excludeEmptyHeaders
      }) : nextProps.headers;
      headers = (0, _TableHelpers.getOptionsHeaders)(nextProps);
      headers = (0, _TableHelpers.excludeEmptyHeaders)({
        headers: headers,
        excludeEmptyHeaders: nextProps.excludeEmptyHeaders
      });
      if (nextProps.flattenRowData) {
        rows = rows.map(function (row) {
          return (0, _assign2.default)({}, row, (0, _flat.flatten)(row, nextProps.flattenRowDataOptions));
        });
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
    key: 'removeFilterByDeleteRow',
    value: function removeFilterByDeleteRow(rowIndex) {
      var _this3 = this;

      var rows = this.state.filterRowData.concat([]);
      rows.splice(rowIndex, 1);
      this.setState({ filterRowData: rows }, function () {
        _this3.updateTableData({});
      });
    }
  }, {
    key: 'addFilterByAddRow',
    value: function addFilterByAddRow() {
      var _this4 = this;

      var rows = this.state.filterRowData.concat([]);
      var newRow = (0, _assign2.default)({}, this.state.filterRowNewData);
      rows.splice(rows.length, 0, newRow);
      if (newRow.property === '__property__') {
        this.props.createNotification({ text: 'Please select a property', type: 'error', timed: 5000 });
      } else if (newRow.filter_value === '__filter__') {
        this.props.createNotification({ text: 'Please select a filter', type: 'error', timed: 5000 });
      } else {
        // console.debug('addFilterByAddRow', { rows });
        this.setState({ filterRowData: rows, filterRowNewData: _TableHelpers.defaultNewRowData }, function () {
          _this4.updateTableData({});
        });
      }
    }
  }, {
    key: 'updateNewFilterRowDataText',
    value: function updateNewFilterRowDataText(options) {
      var name = options.name,
          text = options.text;

      var updatedStateProp = {
        filterRowNewData: (0, _assign2.default)({}, this.state.filterRowNewData, (0, _defineProperty3.default)({}, name, text))
      };
      // console.debug({ updatedStateProp, options });
      this.setState(updatedStateProp);
    }
  }, {
    key: 'updateTableData',
    value: function updateTableData(options) {
      var _this5 = this;

      // console.debug({ options, });
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
        updatedState.rows = typeof options.rows !== 'undefined' ? options.rows : this.props.rows;
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
        } else if (this.state.sortOrder || this.state.sortProp) {
          newSortOptions.sortProp = this.state.sortProp;
          newSortOptions.sortOrder = this.state.sortOrder === 'desc' || this.state.sortOrder === '-' ? 'desc' : 'asc';
          updatedState.rows = updatedState.rows.sort(_util2.default.sortObject(newSortOptions.sortOrder, newSortOptions.sortProp));
        }
        if (this.props.tableSearch && this.props.searchField && options.search) {
          updatedState.rows = this.props.rows.filter(function (row) {
            return row[_this5.props.searchField].indexOf(options.search) !== -1;
          });
        }
        if (this.props.tableSearch && this.state.filterRowData && this.state.filterRowData.length) {
          var filteredRows = [];
          updatedState.rows.forEach(function (row) {
            _this5.state.filterRowData.forEach(function (filter) {
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
                    if ((0, _moment2.default)(row[filter.property]).isSame(filter.value)) filteredRows.push(row);
                    break;
                  case 'lte-date':
                    if ((0, _moment2.default)(row[filter.property]).isSameOrBefore(filter.value)) filteredRows.push(row);
                    break;
                  case 'lt-date':
                    if ((0, _moment2.default)(row[filter.property]).isBefore(filter.value)) filteredRows.push(row);
                    break;
                  case 'gte-date':
                    if ((0, _moment2.default)(row[filter.property]).isSameOrAfter(filter.value)) filteredRows.push(row);
                    break;
                  case 'gt-date':
                    if ((0, _moment2.default)(row[filter.property]).isAfter(filter.value)) filteredRows.push(row);
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
        } else if (this.state.sortOrder || this.state.sortProp) {
          newSortOptions.sortProp = this.state.sortProp;
          newSortOptions.sortOrder = this.state.sortOrder === 'desc' || this.state.sortOrder === '-' ? '-' : '';
        }
        if (options.pagenum < 1) {
          options.pagenum = 1;
        }
        this.setState({ isLoading: true });
        var stateProps = this.props.getState();
        var fetchURL = '' + stateProps.settings.basename + this.props.baseUrl + '&' + _querystring2.default.stringify({
          limit: this.state.limit || this.props.limit,
          sort: newSortOptions.sortProp ? '' + newSortOptions.sortOrder + newSortOptions.sortProp : undefined,
          fq: this.state.filterRowData && this.state.filterRowData.length ? this.state.filterRowData.map(function (frd) {
            return frd.property + '|||' + frd.filter_value + '|||' + frd.value;
          }) : undefined,
          search: options.search,
          allowSpecialCharacters: true,
          pagenum: options.pagenum || 1
        });
        // console.debug('this.state.filterRowData', this.state.filterRowData, { options, fetchURL, });
        var headers = (0, _assign2.default)({
          'x-access-token': stateProps.user.jwt_token
        }, stateProps.settings.userprofile.options.headers);
        _util2.default.fetchComponent(fetchURL, { headers: headers })().then(function (response) {
          // let usingResponsePages = false;
          // console.debug('this.props.dataMap',this.props.dataMap)
          _this5.props.dataMap.forEach(function (data) {
            if (data.key === 'rows') {
              var rows = response[data.value] || [];
              if (_this5.props.flattenRowData) {
                updatedState[data.key] = rows.map(function (row) {
                  return (0, _flat.flatten)(row, _this5.props.flattenRowDataOptions);
                });
              }
            } else {
              // if (data.key === 'numPages') {
              //   usingResponsePages = true;
              // }
              updatedState[data.key] = response[data.value];
            }
          });
          updatedState.numPages = Math.ceil(updatedState.numItems / _this5.state.limit);
          updatedState.limit = _this5.state.limit;
          updatedState.currentPage = typeof options.pagenum !== 'undefined' ? options.pagenum : _this5.props.currentPage;
          updatedState.isLoading = false;

          if (options.sort) {
            updatedState.sortOrder = newSortOptions.sortOrder;
            updatedState.sortProp = options.sort;
          }

          if (_this5.props.tableForm) {
            _this5.props.onChange(updatedState);
          }
          _this5.setState(updatedState);
        }, function (e) {
          _this5.props.errorNotification(e);
        });
      }
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value, row, options, header) {
      var _this6 = this;

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
                _this6.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
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
                _this6.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
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
                _this6.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
              } }),
            selectOptions.map(function (opt, k) {
              return _react2.default.createElement(
                'option',
                { key: k, disabled: opt.disabled, value: opt.value },
                opt.label || opt.value
              );
            })
          );
        } else if (this.props.useInputRows && header && header.formtype && header.formtype === 'datalist') {
          var rowdata = Array.isArray(this.props.__tableOptions[header.sortid][options.rowIndex]) ? this.props.__tableOptions[header.sortid][options.rowIndex] : Array.isArray(this.props.__tableOptions[header.sortid]) ? this.props.__tableOptions[header.sortid] : [];
          return _react2.default.createElement(_ResponsiveDatalist2.default, (0, _extends3.default)({
            value: value
          }, header.datalistProps, {
            datalistdata: rowdata,
            onChange: function onChange(event) {
              var text = event;
              var name = header.sortid;
              var rowIndex = options.rowIndex;
              _this6.updateInlineRowText({ name: name, text: text, rowIndex: rowIndex });
            }
          }));
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
      var _this7 = this;

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
                _this7.updateNewRowText({ name: name, text: text });
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
              _this7.updateNewRowText({ name: name, text: text });
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
              _this7.updateNewRowText({ name: name, text: text });
            } }));
        // break;  
      }
    }
  }, {
    key: 'toggleAdvancedSearchFilters',
    value: function toggleAdvancedSearchFilters() {
      this.setState({ showFilterSearch: !this.state.showFilterSearch });
      // showFilterSearch:false,  
      // usingFiltersInSearch: false,
      // showFilterSearch: props.showFilterSearch,  
      //     usingFiltersInSearch: props.usingFiltersInSearch  
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

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
                return _this8.updateTableData({ pagenum: 1 });
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
                  return _this8.updateTableData({ pagenum: index + 1 });
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
                  return _this8.updateTableData({ pagenum: index + 1 });
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
                return _this8.updateTableData({ pagenum: lastIndex + 1 });
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
              return _this8.updateTableData({ pagenum: _this8.state.currentPage - 1 });
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
              return _this8.updateTableData({ pagenum: _this8.state.currentPage + 1 });
            } },
          'Next'
        )
      );

      var fbts = _react2.default.createElement('a', null);
      if (this.props.filterSearch) {
        fbts = _react2.default.createElement(
          rb.Button,
          (0, _extends3.default)({
            style: this.state.showFilterSearch ? { background: '#69707a', color: '#f5f7fa', borderColor: 'transparent' } : this.state.filterRowData.length > 0 ? { background: '#222324', color: 'white', borderColor: 'transparent' } : undefined
          }, this.props.filterButtonProps, {
            onClick: function onClick() {
              _this8.toggleAdvancedSearchFilters();
            }
          }),
          'Advanced'
        );
      }
      return _react2.default.createElement(
        rb.Container,
        this.props.containerProps,
        this.props.tableSearch ? _react2.default.createElement(
          rb.Addons,
          this.props.filterAddonProps,
          _react2.default.createElement(rb.Input, (0, _extends3.default)({}, this.props.filterSearchProps, {
            onChange: function onChange(data) {
              _this8.searchFunction({ search: data.target.value });
              _this8.searchInputTextVal = data.target.value; //TODO: this is janky fix it
            },
            ref: function ref(input) {
              _this8.searchTextInput = input;
            }
          })),
          _react2.default.createElement(
            rb.Button,
            (0, _extends3.default)({}, this.props.searchButtonProps, {
              onClick: function onClick() {
                _this8.searchFunction({ search: _this8.searchInputTextVal });
              }
            }),
            'Search'
          ),
          fbts
        ) : null,
        this.state.showFilterSearch ? _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: '__ra_rt_asf' }, this.props.searchFilterContainerProps),
          _react2.default.createElement(
            rb.Message,
            { header: 'Advanced Search Filters' },
            _react2.default.createElement(
              rb.Table,
              this.props.searchFilterTableProps,
              _react2.default.createElement(
                rb.Thead,
                null,
                _react2.default.createElement(
                  rb.Tr,
                  null,
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    'Property'
                  ),
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    'Filter'
                  ),
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    'Value'
                  ),
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    'Options'
                  )
                )
              ),
              _react2.default.createElement(
                rb.Tbody,
                null,
                this.state.filterRowData && this.state.filterRowData.length ? this.state.filterRowData.map(function (filterRowDatum, l) {
                  return _react2.default.createElement(
                    rb.Tr,
                    { key: l },
                    _react2.default.createElement(
                      rb.Td,
                      null,
                      filterRowDatum.property
                    ),
                    _react2.default.createElement(
                      rb.Td,
                      null,
                      _TableHelpers.filterQuerySelectOptionsMap[filterRowDatum.filter_value]
                    ),
                    _react2.default.createElement(
                      rb.Td,
                      null,
                      filterRowDatum.value
                    ),
                    _react2.default.createElement(
                      rb.Td,
                      null,
                      _react2.default.createElement(
                        rb.Button,
                        { onClick: function onClick() {
                            _this8.removeFilterRow(l);
                          } },
                        '⤫'
                      )
                    )
                  );
                }) : null
              ),
              _react2.default.createElement(
                rb.Tfoot,
                null,
                _react2.default.createElement(
                  rb.Tr,
                  null,
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    _react2.default.createElement(
                      rb.Select,
                      {
                        value: this.state.filterRowNewData.property || '__property__',
                        onChange: function onChange(event) {
                          var text = event.target.value;
                          var name = 'property';
                          _this8.updateNewFilterRowText({ name: name, text: text });
                        }
                      },
                      this.filterSelectOptions.map(function (filter, fp) {
                        return _react2.default.createElement(
                          'option',
                          { value: filter.value, key: fp, disabled: filter.disabled },
                          filter.label
                        );
                      })
                    )
                  ),
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    _react2.default.createElement(
                      rb.Select,
                      {
                        value: this.state.filterRowNewData.filter_value || '__filter__',
                        onChange: function onChange(event) {
                          var text = event.target.value;
                          var name = 'filter_value';
                          _this8.updateNewFilterRowText({ name: name, text: text });
                        }
                      },
                      _TableHelpers.filterQuerySelectOptions.map(function (filter, ft) {
                        return _react2.default.createElement(
                          'option',
                          { value: filter.value, key: ft, disabled: filter.disabled },
                          filter.label
                        );
                      })
                    )
                  ),
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    _react2.default.createElement(rb.Input, {
                      value: this.state.filterRowNewData.value || '',
                      onChange: function onChange(event) {
                        var text = event.target.value;
                        var name = 'value';
                        _this8.updateNewFilterRowText({ name: name, text: text });
                      } })
                  ),
                  _react2.default.createElement(
                    rb.Th,
                    null,
                    _react2.default.createElement(
                      rb.Button,
                      { style: { width: '100%' }, onClick: function onClick() {
                          _this8.addFilterRow();
                        } },
                      'Add filter'
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              rb.Content,
              this.props.searchFilterTableNoteProps,
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Notes:'
                )
              ),
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Date Values:'
                  ),
                  ' For date filters, Moment is used for date filters with the following moment format: YYYY-MM-DDTHH:MM:SS'
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Boolean values'
                  ),
                  ' "true" is converted to ',
                  _react2.default.createElement(
                    'em',
                    null,
                    'true'
                  )
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'strong',
                  null,
                  'Export:'
                )
              ),
              _react2.default.createElement(
                rb.Button,
                { icon: 'fa fa-download', onClick: function onClick() {
                    _this8.props.fileSaver({
                      data: _this8.state.rows,
                      filename: window.location.pathname.replace(/\//gi, '_') + '.json'
                    });
                  } },
                'JSON'
              ),
              _react2.default.createElement(
                rb.Button,
                { icon: 'fa fa-download', onClick: function onClick() {
                    // console.debug('this.state.rows', this.state.rows);
                    (0, _json2Csv.json2csv)(_this8.state.rows, function (err, csv) {
                      // console.debug('before csv',csv );
                      _this8.props.fileSaver({
                        data: csv,
                        type: 'text/csv;charset=utf-8',
                        filename: window.location.pathname.replace(/\//gi, '_') + '.csv'
                      });
                    }, {
                      checkSchemaDifferences: false,
                      delimiter: {
                        wrap: '"'
                      }
                    });
                  } },
                'CSV'
              ),
              _react2.default.createElement(
                rb.Button,
                { icon: 'fa fa-download', onClick: function onClick() {
                    // console.debug('this.state.rows', this.state.rows);
                    var headers = [];_this8.state.headers.forEach(function (header) {
                      if (header.sortid) headers.push(header.sortid);
                    });
                    var filtered_rows = _this8.state.rows.map(function (row) {
                      var copy = (0, _assign2.default)({}, row);
                      (0, _keys2.default)(copy).forEach(function (key) {
                        if (headers.indexOf(key) === -1) {
                          delete copy[key];
                        }
                      });
                      return copy;
                    });
                    // console.log({ filtered_rows });
                    (0, _json2Csv.json2csv)(filtered_rows, function (err, csv) {
                      // console.debug('before csv',csv );
                      _this8.props.fileSaver({
                        data: csv,
                        type: 'text/csv;charset=utf-8',
                        filename: window.location.pathname.replace(/\//gi, '_') + '.csv'
                      });
                    }, {
                      checkSchemaDifferences: false,
                      delimiter: {
                        wrap: '"'
                      }
                    });
                  } },
                'Simple CSV'
              ),
              _react2.default.createElement('hr', null)
            ),
            _react2.default.createElement(
              rb.Table,
              this.props.searchFilterPaginationProps,
              _react2.default.createElement(
                rb.Tbody,
                null,
                _react2.default.createElement(
                  rb.Tr,
                  null,
                  _react2.default.createElement(
                    rb.Td,
                    null,
                    _react2.default.createElement(
                      rb.Group,
                      null,
                      _react2.default.createElement(
                        rb.Label,
                        { style: filterLabelStyleProps },
                        'Sort by'
                      ),
                      _react2.default.createElement(
                        rb.Select,
                        {
                          value: this.state.sortProp || 'createdat',
                          onChange: function onChange(event) {
                            var text = event.target.value;
                            _this8.setState({ sortProp: text }, function () {
                              _this8.updateTableData({});
                            });
                          }
                        },
                        this.sortableSelctOptions.map(function (filter, fp) {
                          return _react2.default.createElement(
                            'option',
                            { value: filter.value, key: fp, disabled: filter.disabled },
                            filter.label
                          );
                        })
                      ),
                      _react2.default.createElement(
                        rb.Select,
                        {
                          value: this.state.sortOrder || 'desc',
                          onChange: function onChange(event) {
                            var text = event.target.value;
                            _this8.setState({ sortOrder: text }, function () {
                              _this8.updateTableData({});
                            });
                          }
                        },
                        _react2.default.createElement(
                          'option',
                          { value: 'asc' },
                          'ASC'
                        ),
                        _react2.default.createElement(
                          'option',
                          { value: 'desc' },
                          'DESC'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    rb.Td,
                    null,
                    _react2.default.createElement(
                      rb.Group,
                      null,
                      _react2.default.createElement(
                        rb.Label,
                        { style: filterLabelStyleProps },
                        'Showing'
                      ),
                      _react2.default.createElement(
                        rb.Select,
                        {
                          value: this.state.limit,
                          onChange: function onChange(event) {
                            var text = event.target.value;
                            _this8.setState({ limit: text }, function () {
                              _this8.updateTableData({});
                            });
                          }
                        },
                        (this.props.includeAllLimits ? this.props.numOfLimits.concat([this.state.numItems]) : this.props.numOfLimits).map(function (lim, lp) {
                          return _react2.default.createElement(
                            'option',
                            { value: lim, key: lp, disabled: lim.disabled },
                            lim
                          );
                        })
                      ),
                      _react2.default.createElement(
                        rb.Label,
                        { style: filterLabelStyleProps },
                        'of ',
                        this.state.numItems,
                        ' rows'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    rb.Td,
                    null,
                    _react2.default.createElement(
                      rb.Group,
                      null,
                      _react2.default.createElement(
                        rb.Label,
                        { style: filterLabelStyleProps },
                        'Page'
                      ),
                      _react2.default.createElement(
                        rb.Select,
                        {
                          value: this.state.currentPage,
                          onChange: function onChange(event) {
                            var text = event.target.value;
                            _this8.searchFunction({ pagenum: text });
                          }
                        },
                        [this.state.numPages].reduce(function (result, key) {
                          var usableLimit = key < 500 ? key : 500;
                          for (var i = 1; i <= usableLimit; i++) {
                            result.push(i);
                          }
                          return result;
                        }, []).map(function (lim, lp) {
                          return _react2.default.createElement(
                            'option',
                            { value: lim, key: lp, disabled: lim === _this8.state.currentPage },
                            lim
                          );
                        })
                      ),
                      _react2.default.createElement(
                        rb.Label,
                        { style: filterLabelStyleProps },
                        'of ',
                        this.state.numPages
                      )
                    )
                  )
                )
              )
            )
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
              { className: '__ra_rt_thead' },
              _react2.default.createElement(
                rb.Tr,
                null,
                this.state.headers.map(function (header, idx) {
                  return _react2.default.createElement(
                    rb.Th,
                    (0, _extends3.default)({ key: idx, style: { cursor: 'pointer' } }, header.headerColumnProps),
                    header.sortable ? _react2.default.createElement(
                      'a',
                      (0, _extends3.default)({ style: {
                          cursor: 'pointer'
                        } }, _this8.props.headerLinkProps, { onClick: function onClick() {
                          _this8.updateTableData({ sort: header.sortid });
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
                    idx === _this8.state.headers.length - 1 ? _react2.default.createElement(
                      'span',
                      (0, _extends3.default)({ className: '__ra_rt_tf', style: { display: 'flex' } }, _this8.props.tableFormButtonWrapperProps),
                      _this8.props.replaceButton ? _react2.default.createElement(
                        _reactFileReaderInput2.default,
                        { as: 'text', onChange: _this8.handleFileUpload.call(_this8, 'replace') },
                        _react2.default.createElement(
                          rb.Button,
                          _this8.props.replaceButtonProps,
                          _this8.props.replaceButtonLabel || 'Replace'
                        )
                      ) : null,
                      _this8.props.uploadAddButton ? _react2.default.createElement(
                        _reactFileReaderInput2.default,
                        { as: 'text', onChange: _this8.handleFileUpload.call(_this8, 'add') },
                        _react2.default.createElement(
                          rb.Button,
                          _this8.props.uploadAddButtonProps,
                          _this8.props.uploadAddButtonLabel || 'Upload'
                        )
                      ) : null,
                      _react2.default.createElement(
                        rb.Button,
                        (0, _extends3.default)({}, _this8.props.tableFormAddButtonProps, {
                          style: { width: '100%' },
                          onClick: function onClick() {
                            _this8.updateByAddRow();
                          } }),
                        _this8.props.formRowAddButtonLabel ? _this8.props.formRowAddButtonLabel : 'Add'
                      )
                    ) : _this8.updateGetFooterAddRow(header)
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
                  { key: 'row' + rowIndex, className: _this8.props.selectEntireRow && rowIndex === _this8.state.selectedRowIndex ? '__selected' : undefined },
                  _this8.state.headers.map(function (header, colIndex) {
                    // console.debug({header});
                    if (header.link) {
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        _react2.default.createElement(
                          _reactRouter.Link,
                          (0, _extends3.default)({}, header.linkProps, { to: _this8.getHeaderLinkURL(header.link, row) }),
                          _this8.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                            idx: rowIndex + calcStartIndex,
                            momentFormat: header.momentFormat,
                            numeralFormat: header.numeralFormat,
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
                          (0, _extends3.default)({}, _this8.props.formRowUpButton, { onClick: function onClick() {
                              _this8.moveRowUp(rowIndex);
                            } }),
                          _this8.props.formRowUputtonLabel ? _this8.props.formRowUputtonLabel : '⇧'
                        ) : null,
                        rowIndex < _this8.state.rows.length - 1 ? _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this8.props.formRowDownButton, { onClick: function onClick() {
                              _this8.moveRowDown(rowIndex);
                            } }),
                          _this8.props.formRowDownButtonLabel ? _this8.props.formRowDownButtonLabel : '⇩'
                        ) : null,
                        _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this8.props.formRowDeleteButton, { onClick: function onClick() {
                              _this8.deleteRow(rowIndex);
                            } }),
                          _this8.props.formRowDeleteButtonLabel ? _this8.props.formRowDeleteButtonLabel : '⤫'
                        )
                      );
                    } else if (header.buttons && header.buttons.length) {
                      // console.debug({ row, header, });
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        header.buttons.map(function (button) {
                          return _this8.getRenderedComponent((0, _assign2.default)({
                            component: 'ResponsiveButton',
                            props: (0, _assign2.default)({
                              onclickPropObject: row,
                              buttonProps: {}
                            }, button.passProps),
                            children: _this8.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
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
                            if (_this8.props.selectEntireRow) {
                              _this8.selectRow({
                                selectedRowData: row,
                                selectedRowIndex: rowIndex
                              });
                            }
                            // console.debug({ event, rowIndex });
                          } }),
                        _this8.formatValue.call(_this8, typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                          rowIndex: rowIndex,
                          idx: rowIndex + calcStartIndex,
                          momentFormat: header.momentFormat,
                          numeralFormat: header.numeralFormat,
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

ResponsiveTable.propType = _TableHelpers.propTypes;
ResponsiveTable.defaultProps = _TableHelpers.defaultProps;

exports.default = ResponsiveTable;