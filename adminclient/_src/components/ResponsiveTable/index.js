'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import styles from '../styles';

var propTypes = {
  hasPagination: _react.PropTypes.bool,
  hasHeader: _react.PropTypes.bool,
  hasFooter: _react.PropTypes.bool,
  limit: _react.PropTypes.number,
  currentPage: _react.PropTypes.number,
  numButtons: _react.PropTypes.number
};

var defaultProps = {
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
  searchTable: false,
  filterSearch: false,
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
  }
};

var ResponsiveTable = function (_Component) {
  (0, _inherits3.default)(ResponsiveTable, _Component);

  function ResponsiveTable(props) {
    (0, _classCallCheck3.default)(this, ResponsiveTable);

    // console.debug({ props });
    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveTable.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveTable)).call(this, props));

    var rows = props.rows || [];
    if (props.flattenRowData) {
      rows = rows.map(function (row) {
        return (0, _flat2.default)(row, props.flattenRowDataOptions);
      });
    }
    _this.state = {
      headers: props.headers || [],
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
      sortOrder: ''
    };
    _this.searchFunction = (0, _debounce2.default)(_this.updateTableData, 200);
    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var rows = nextProps.rows || [];
      if (nextProps.flattenRowData) {
        rows = rows.map(function (row) {
          return (0, _flat2.default)(row, nextProps.flattenRowDataOptions);
        });
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
        numButtons: nextProps.numButtons
      });
      // console.log('this.state', this.state);
    }
  }, {
    key: 'updateTableData',
    value: function updateTableData(options) {
      var _this2 = this;

      if (!this.props.baseUrl) {
        var updatedState = {};
        updatedState.numPages = Math.ceil(this.state.numItems / this.props.limit);
        updatedState.limit = this.props.limit;
        updatedState.currentPage = options.pagenum;
        updatedState.isLoading = false;
        this.setState(updatedState);
      } else {
        var newSortOptions = {};
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
          var updatedState = {};
          // if (this.props.flattenRowData) {
          //   response = flatten(response, this.props.flattenRowDataOptions);
          // }
          // console.log({ response });
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
          updatedState.currentPage = options.pagenum;
          updatedState.isLoading = false;
          _this2.setState(updatedState);
        }, function (e) {
          _this2.props.errorNotification(e);
        });
      }
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value, row, options) {
      // console.log({ value, row, options });
      var returnValue = value;
      if (typeof options.idx !== 'undefined' && typeof returnValue === 'string' && returnValue.indexOf('--idx--') !== -1) {
        returnValue = returnValue.replace('--idx--', options.idx);
      }
      if (typeof options.idx !== 'undefined' && typeof returnValue === 'string' && returnValue.indexOf('--idx-ctr--') !== -1) {
        returnValue = returnValue.replace('--idx-ctr--', options.idx + 1);
      }
      if (options.momentFormat) {
        returnValue = (0, _moment2.default)(value).format(options.momentFormat);
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

      var calcStartIndex = (this.state.currentPage - 1) * this.state.limit;
      var startIndex = !this.props.baseUrl ? calcStartIndex : 0;
      var endIndex = !this.props.baseUrl ? this.state.limit * this.state.currentPage : this.state.limit;
      var displayRows = this.state.rows.slice(startIndex, endIndex);
      // console.debug({
      //   startIndex,
      //   endIndex,
      // });
      // console.debug('this.state',this.state);
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
                this.props.headers.map(function (header, idx) {
                  return _react2.default.createElement(
                    rb.Th,
                    (0, _extends3.default)({ key: idx }, header.headerColumnProps),
                    header.sortable ? _react2.default.createElement(
                      'a',
                      (0, _extends3.default)({ href: '#' }, _this3.props.headerLinkProps, { onClick: function onClick() {
                          _this3.updateTableData({ sort: header.sortid });
                        } }),
                      header.label
                    ) : header.label
                  );
                })
              )
            ),
            _react2.default.createElement(
              rb.Tbody,
              null,
              displayRows.map(function (row, rowIndex) {
                return _react2.default.createElement(
                  rb.Tr,
                  { key: 'row' + rowIndex },
                  _this3.state.headers.map(function (header, colIndex) {
                    // console.log({header});
                    if (header.link) {
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        _react2.default.createElement(
                          _reactRouter.Link,
                          (0, _extends3.default)({}, header.linkProps, { to: _this3.getHeaderLinkURL(header.link, row) }),
                          _this3.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                            idx: rowIndex + calcStartIndex,
                            momentFormat: header.momentFormat
                          })
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
                              momentFormat: header.momentFormat
                            }) || ''
                          }, button));
                        })
                        // Object.assign

                      );
                    } else {
                      return _react2.default.createElement(
                        rb.Td,
                        (0, _extends3.default)({ key: 'row' + rowIndex + 'col' + colIndex }, header.columnProps),
                        _this3.formatValue(typeof row[header.sortid] !== 'undefined' ? row[header.sortid] : header.value, row, {
                          idx: rowIndex + calcStartIndex,
                          momentFormat: header.momentFormat
                        })
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