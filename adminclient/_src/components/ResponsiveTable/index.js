'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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
  selectEntireRow: _react.PropTypes.bool
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
  selectOptionSortId: false,
  selectOptionSortIdLabel: false,
  insertSelectedRowHeaderIndex: 0
};

function getOptionsHeaders(props) {
  var headers = (props.headers || []).concat([]);
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

var ResponsiveTable = function (_Component) {
  (0, _inherits3.default)(ResponsiveTable, _Component);

  function ResponsiveTable(props) {
    (0, _classCallCheck3.default)(this, ResponsiveTable);

    // console.debug('this.props.getState()',this.props.getState());
    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveTable.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveTable)).call(this, props));

    var rows = props.rows || [];
    var headers = getOptionsHeaders(props);
    if (props.flattenRowData) {
      rows = rows.map(function (row) {
        return (0, _flat2.default)(row, props.flattenRowDataOptions);
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
    _this.selectRow = _this.updateSelectedRow.bind(_this);
    _this.deleteRow = _this.updateByDeleteRow.bind(_this);
    _this.moveRowDown = _this.updateByMoveRowDown.bind(_this);
    _this.moveRowUp = _this.updateByMoveRowUp.bind(_this);
    _this.updateNewRowText = _this.updateNewRowDataText.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var rows = nextProps.rows || [];
      var headers = getOptionsHeaders(nextProps);
      if (nextProps.flattenRowData) {
        rows = rows.map(function (row) {
          return (0, _flat2.default)(row, nextProps.flattenRowDataOptions);
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
    key: 'updateTableData',
    value: function updateTableData(options) {
      var _this2 = this;

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
            return row[_this2.props.searchField].indexOf(options.search) !== -1;
          });
        }
        updatedState.numPages = Math.ceil(this.state.numItems / this.props.limit);
        updatedState.limit = this.props.limit;
        updatedState.currentPage = typeof options.pagenum !== 'undefined' ? options.pagenum : this.props.currentPage;
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
          _this2.props.dataMap.forEach(function (data) {
            if (data.key === 'rows') {
              var rows = response[data.value] || [];
              if (_this2.props.flattenRowData) {
                updatedState[data.key] = rows.map(function (row) {
                  return (0, _flat2.default)(row, _this2.props.flattenRowDataOptions);
                });
              }
            } else {
              updatedState[data.key] = response[data.value];
            }
          });
          updatedState.numPages = Math.ceil(updatedState.numItems / _this2.props.limit);
          updatedState.limit = _this2.props.limit;
          updatedState.currentPage = typeof options.pagenum !== 'undefined' ? options.pagenum : _this2.props.currentPage;
          updatedState.isLoading = false;

          if (options.sort) {
            updatedState.sortOrder = newSortOptions.sortOrder;
            updatedState.sortProp = options.sort;
          }

          if (_this2.props.tableForm) {
            _this2.props.onChange(updatedState);
          }
          _this2.setState(updatedState);
        }, function (e) {
          _this2.props.errorNotification(e);
        });
      }
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value, row, options, header) {
      // console.info({ value, row, options });
      // console.debug(options.rowIndex,this.state.selectedRowIndex)
      var returnValue = value;
      if (header && header.selectedOptionRowHeader) {
        return _react2.default.createElement('input', { type: 'radio', checked: options.rowIndex === this.state.selectedRowIndex ? true : false });
      } else if (typeof options.idx !== 'undefined' && typeof returnValue === 'string' && returnValue.indexOf('--idx--') !== -1) {
        returnValue = returnValue.replace('--idx--', options.idx);
      }
      if (typeof options.idx !== 'undefined' && typeof returnValue === 'string' && returnValue.indexOf('--idx-ctr--') !== -1) {
        returnValue = returnValue.replace('--idx-ctr--', options.idx + 1);
      }
      if (options.momentFormat) {
        returnValue = (0, _moment2.default)(value).format(options.momentFormat);
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
      return returnValue;
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
    key: 'render',
    value: function render() {
      var _this3 = this;

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
                return _this3.updateTableData({ pagenum: 1 });
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
                  return _this3.updateTableData({ pagenum: index + 1 });
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
                  return _this3.updateTableData({ pagenum: index + 1 });
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
                return _this3.updateTableData({ pagenum: lastIndex + 1 });
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
              return _this3.updateTableData({ pagenum: _this3.state.currentPage - 1 });
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
              return _this3.updateTableData({ pagenum: _this3.state.currentPage + 1 });
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
        null,
        this.props.tableSearch ? _react2.default.createElement(
          rb.Addons,
          this.props.filterAddonProps,
          fbts,
          _react2.default.createElement(rb.Input, (0, _extends3.default)({}, this.props.filterSearchProps, {
            onChange: function onChange(data) {
              _this3.searchFunction({ search: data.target.value });
              _this3.searchInputTextVal = data.target.value; //TODO: this is janky fix it
            },
            ref: function ref(input) {
              _this3.searchTextInput = input;
            }
          })),
          _react2.default.createElement(
            rb.Button,
            (0, _extends3.default)({}, this.props.searchButtonProps, {
              onClick: function onClick() {
                _this3.searchFunction({ search: _this3.searchInputTextVal });
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
                      (0, _extends3.default)({}, _this3.props.headerLinkProps, { onClick: function onClick() {
                          _this3.updateTableData({ sort: header.sortid });
                        } }),
                      header.label
                    ) : header.label
                  );
                })
              )
            ),
            this.props.tableForm ? _react2.default.createElement(
              rb.Tfoot,
              null,
              _react2.default.createElement(
                rb.Tr,
                null,
                this.state.headers.map(function (header, idx) {
                  return _react2.default.createElement(
                    rb.Th,
                    (0, _extends3.default)({ key: idx }, header.headerColumnProps),
                    idx === _this3.state.headers.length - 1 ? _react2.default.createElement(
                      rb.Button,
                      (0, _extends3.default)({}, _this3.props.tableFormAddButtonProps, {
                        style: { width: '100%' },
                        onClick: function onClick() {
                          _this3.updateByAddRow();
                        } }),
                      _this3.props.formRowAddButtonLabel ? _this3.props.formRowAddButtonLabel : 'Add'
                    ) : header.formtype === 'select' ? _react2.default.createElement(
                      rb.Select,
                      (0, _extends3.default)({}, header.footerFormElementPassProps, {
                        value: _this3.state.newRowData[header.sortid] || header.defaultValue,
                        onChange: function onChange(event) {
                          var text = event.target.value;
                          var name = header.sortid;
                          _this3.updateNewRowText({ name: name, text: text });
                        } }),
                      header.formoptions.map(function (opt, k) {
                        return _react2.default.createElement(
                          'option',
                          { key: k, value: opt.value },
                          opt.label || opt.value
                        );
                      })
                    ) : header.selectedOptionRowHeader ? null : _react2.default.createElement(rb.Input, (0, _extends3.default)({}, header.footerFormElementPassProps, {
                      value: _this3.state.newRowData[header.sortid] || '',
                      onChange: function onChange(event) {
                        var text = event.target.value;
                        var name = header.sortid;
                        _this3.updateNewRowText({ name: name, text: text });
                      } }))
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
                  { key: 'row' + rowIndex, className: _this3.props.selectEntireRow && rowIndex === _this3.state.selectedRowIndex ? '__selected' : undefined },
                  _this3.state.headers.map(function (header, colIndex) {
                    // console.debug({header});
                    if (header.link) {
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        _react2.default.createElement(
                          _reactRouter.Link,
                          (0, _extends3.default)({}, header.linkProps, { to: _this3.getHeaderLinkURL(header.link, row) }),
                          _this3.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
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
                          (0, _extends3.default)({}, _this3.props.formRowUpButton, { onClick: function onClick() {
                              _this3.moveRowUp(rowIndex);
                            } }),
                          _this3.props.formRowUputtonLabel ? _this3.props.formRowUputtonLabel : '⇧'
                        ) : null,
                        rowIndex < _this3.state.rows.length - 1 ? _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this3.props.formRowDownButton, { onClick: function onClick() {
                              _this3.moveRowDown(rowIndex);
                            } }),
                          _this3.props.formRowDownButtonLabel ? _this3.props.formRowDownButtonLabel : '⇩'
                        ) : null,
                        _react2.default.createElement(
                          rb.Button,
                          (0, _extends3.default)({}, _this3.props.formRowDeleteButton, { onClick: function onClick() {
                              _this3.deleteRow(rowIndex);
                            } }),
                          _this3.props.formRowDeleteButtonLabel ? _this3.props.formRowDeleteButtonLabel : '⤫'
                        )
                      );
                    } else if (header.buttons && header.buttons.length) {
                      // console.debug({ row, header, });
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        header.buttons.map(function (button) {
                          return _this3.getRenderedComponent((0, _assign2.default)({
                            component: 'ResponsiveButton',
                            props: (0, _assign2.default)({
                              onclickPropObject: row,
                              buttonProps: {}
                            }, button.passProps),
                            children: _this3.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
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
                            if (_this3.props.selectEntireRow) {
                              _this3.selectRow({
                                selectedRowData: row,
                                selectedRowIndex: rowIndex
                              });
                            }
                            // console.debug({ event, rowIndex });
                          } }),
                        _this3.formatValue.call(_this3, typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
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