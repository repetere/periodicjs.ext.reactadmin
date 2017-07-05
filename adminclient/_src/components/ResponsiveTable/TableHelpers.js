'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultNewRowData = exports.defaultProps = exports.propTypes = exports.filterQuerySelectOptionsMap = exports.filterQuerySelectOptions = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getOptionsHeaders = getOptionsHeaders;
exports.getHeadersFromRows = getHeadersFromRows;
exports.excludeEmptyHeaders = excludeEmptyHeaders;
exports.getFilterOptions = getFilterOptions;
exports.getFilterSortableOption = getFilterSortableOption;

var _react = require('react');

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterQuerySelectOptions = exports.filterQuerySelectOptions = [{ value: '__filter__', label: 'Filter', disabled: 'disabled' }, { value: 'is', label: ' = ' }, { value: 'like', label: ' % like % ' }, { value: 'not', label: ' != ' }, { value: 'not-like', label: ' % not like % ' }, { value: 'lt', label: ' < ' }, { value: 'lte', label: ' <= ' }, { value: 'gt', label: ' > ' }, { value: 'gte', label: ' >= ' }, { value: 'in', label: 'contains any element' }, { value: 'all', label: 'contains every element' }, //needed in filter
{ value: 'not-in', label: 'does not contain any element' }, { value: 'exists', label: 'exists' }, { value: 'size', label: 'size' }, { value: 'is-date', label: 'date' }, { value: 'lte-date', label: 'before or same date' }, { value: 'lt-date', label: 'before date' }, { value: 'gte-date', label: 'after or same date' }, { value: 'gt-date', label: 'after date' }];

var filterQuerySelectOptionsMap = exports.filterQuerySelectOptionsMap = filterQuerySelectOptions.reduce(function (result, key) {
  // console.debug({ result, key });
  result[key.value] = key.label;
  return result;
}, {});

var propTypes = exports.propTypes = {
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
  showFilterSearch: _react.PropTypes.bool,
  usingFiltersInSearch: _react.PropTypes.bool,
  headers: _react.PropTypes.array,
  __tableOptions: _react.PropTypes.object,
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

var defaultProps = exports.defaultProps = {
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
  tableSearch: false,
  // searchTable:false,
  filterSearch: false,
  showFilterSearch: false,
  usingFiltersInSearch: false,
  tableForm: false,
  filterAddonProps: {
    style: {
      marginBottom: '20px'
    }
  },
  // filterButtonProps:{
  // },
  searchButtonProps: {
    color: 'isInfo'
  },
  searchFilterTableProps: {
    isBordered: true,
    style: {
      background: 'none'
    }
  },
  searchFilterPaginationProps: {
    style: {
      background: 'none',
      marginBottom: 0
    }
  },
  searchFilterTableNoteProps: {
    style: {
      marginBottom: 0
    }
  },
  searchFilterContainerProps: {
    style: {
      marginBottom: '20px'
    }
  },
  searchFilterMessageProps: {},
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
  },
  includeAllLimits: true,
  numOfLimits: [1, 5, 10, 20, 50, 100, 500, 1000]
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
      sortable = options.sortable;
  // console.debug({ rows, sortable, excludeEmptyHeaders, });

  var headerRow = (0, _assign2.default)({}, rows[0]);
  // console.debug({ headerRow, });
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

var defaultNewRowData = exports.defaultNewRowData = {
  property: '__property__',
  filter_label: 'Filter',
  filter_value: '__filter__',
  value: ''
};

function getFilterOptions(options) {
  var rows = options.rows,
      headers = options.headers,
      filters = options.filters,
      simpleSearchFilter = options.simpleSearchFilter;

  var selectOptions = [];
  var useableheaders = headers.map(function (header) {
    return header.sortid;
  });
  if (filters) {
    filters.forEach(function (filter) {
      selectOptions.push({ label: filter.label || filter, value: filter.value || filter });
    });
  } else {
    if (rows && rows.length && !simpleSearchFilter) {
      var rowheaders = (0, _keys2.default)(rows[0]);
      // console.debug({ rowheaders });
      useableheaders = (0, _assign2.default)([], rowheaders, useableheaders);
    }
    useableheaders.forEach(function (header) {
      // console.debug({ header });
      if (header && header !== '__v') {
        selectOptions.push({ label: header, value: header });
      }
    });
    selectOptions.splice(0, 0, { label: 'Property', value: '__property__', disabled: 'disabled' });
  }
  // console.debug({ selectOptions, useableheaders, });
  return selectOptions;
}

function getFilterSortableOption(options) {
  var headers = options.headers;

  return headers.filter(function (header) {
    return header.sortable && header.sortid;
  }).map(function (header) {
    return {
      value: header.sortid,
      label: header.label || header.sortid
    };
  });
}