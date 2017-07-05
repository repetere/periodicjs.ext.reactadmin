import { PropTypes, } from 'react';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

export const filterQuerySelectOptions = [
  { value:'__filter__', label:'Filter', disabled:'disabled', },
  { value:'is', label:' = ', },
  { value:'like', label:' % like % ', },
  { value:'not', label:' != ', },
  { value:'not-like', label:' % not like % ', },
  { value:'lt', label:' < ', },
  { value:'lte', label:' <= ', },
  { value:'gt', label:' > ', },
  { value:'gte', label:' >= ', },
  { value:'in', label:'contains any element', },
  { value:'all', label:'contains every element', },//needed in filter
  { value:'not-in', label:'does not contain any element', },
  { value:'exists', label:'exists', },
  { value:'size', label:'size',  },
  { value:'is-date', label:'date',  },
  { value:'lte-date', label:'before or same date', },
  { value:'lt-date', label:'before date', },
  { value:'gte-date', label:'after or same date', },
  { value:'gt-date', label:'after date', },
];

export const filterQuerySelectOptionsMap = filterQuerySelectOptions.reduce((result, key) => { 
  // console.debug({ result, key });
  result[ key.value ] = key.label;
  return result;
}, {});

export const propTypes = {
  hasPagination: PropTypes.bool,
  hasHeader: PropTypes.bool,
  hasFooter: PropTypes.bool,
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  numButtons: PropTypes.number,
  numPages: PropTypes.number,
  numItems: PropTypes.number,
  flattenRowData: PropTypes.bool,
  flattenRowDataOptions: PropTypes.object,
  selectedRow: PropTypes.object,
  searchTable:PropTypes.bool,
  filterSearch:PropTypes.bool,  
  showFilterSearch:PropTypes.bool,  
  usingFiltersInSearch:PropTypes.bool,  
  headers: PropTypes.array,
  __tableOptions: PropTypes.object,
  rows:PropTypes.array,  
  tableFooter:PropTypes.bool,
  onChange:PropTypes.func,
  tableForm: PropTypes.bool,
  tableFormAddButtonProps: PropTypes.bool,
  selectEntireRow: PropTypes.bool,
  sortable: PropTypes.bool,
  suppressNullValues: PropTypes.bool,
  useInputRows: PropTypes.bool,
  replaceButton: PropTypes.bool,
  replaceButtonProps: PropTypes.any,
  replaceButtonLabel: PropTypes.string,
  uploadAddButton: PropTypes.bool,
  uploadAddButtonProps: PropTypes.any,
  uploadAddButtonLabel: PropTypes.string,
};

export const defaultProps = {
  headers: [],
  rows: [],
  hasPagination: true,
  hasHeader: false,
  hasFooter: false,
  tableFooter: false,
  onChange: (event) => {
    console.debug(event);
  },
  limit: 50,
  currentPage: 1,
  numPages: 1,
  numItems: 0,
  numButtons: 1,
  flattenRowData: false,
  flattenRowDataOptions: {},
  tableSearch:false,
  // searchTable:false,
  filterSearch:false,
  showFilterSearch:false,  
  usingFiltersInSearch: false,
  tableForm: false,
  filterAddonProps:{
    style:{
      marginBottom:'20px',
    },
  },
  // filterButtonProps:{
  // },
  searchButtonProps: {
    color:'isInfo',
  },
  searchFilterTableProps: {
    isBordered:true,
    style: {
      background:'none',
    },
  },
  searchFilterPaginationProps: {
    style: {
      background: 'none',
      marginBottom:0,
    },
  },
  searchFilterTableNoteProps: {
    style: {
      marginBottom:0,
    },
  },
  searchFilterContainerProps: {
    style: {
      marginBottom:'20px',
    },
  },
  searchFilterMessageProps: {
    
  },
  filterSearchProps:{
    type:'text',
    placeholder:'Search',
    isExpanded:true, 
  },
  tableFormAddButtonProps: {
    color:'isPrimary',
  },
  selectEntireRow: false,
  useInputRows: false,
  selectOptionSortId: false,
  selectOptionSortIdLabel: false,
  sortable: true,
  suppressNullValues: false,
  addNewRows: true,
  fixCSVRow: true,
  excludeEmptyHeaders:true,
  insertSelectedRowHeaderIndex: 0,
  csvEOL: {
    // eol: '\r\n',
    trimHeaderValues: true,
    trimFieldValues: true,
  },
  includeAllLimits:true,
  numOfLimits: [ 1, 5, 10, 20, 50, 100, 500, 1000, ],
};

export function getOptionsHeaders(props, propHeaders) {
  let headers = (propHeaders || props.headers || []).concat([]);
  // console.debug('original', { headers });
  if (props.selectOptionSortId) {
    headers.unshift({
      sortid: props.selectOptionSortId,
      label: props.selectOptionSortIdLabel || capitalize(props.selectOptionSortId),
      value:'x',
      selectedOptionRowHeader:true,
    });
  }
  // console.debug('modified', { headers });
  return headers;
}

export function getHeadersFromRows(options) {
  let { rows, sortable, /*excludeEmptyHeaders,*/ } = options;
  // console.debug({ rows, sortable, excludeEmptyHeaders, });
  let headerRow = Object.assign({}, rows[ 0 ]);
  // console.debug({ headerRow, });
  let headersFromRow = Object.keys(headerRow);
  let headers = headersFromRow.map(rowkey => {
    return {
      label: capitalize(pluralize(rowkey)),
      sortid: rowkey,
      sortable: sortable,
    };
  });
  return headers;
}

export function excludeEmptyHeaders(options) {
  let { headers, excludeEmptyHeaders, } = options;
  // console.debug({ headers, excludeEmptyHeaders, });
  if (excludeEmptyHeaders) {
    headers.forEach((header, i) => {
      // console.debug('headers[ i ]', headers[ i ], { header, });
      if (!headers[ i ].sortid && !headers[ i ].label) {
        delete headers[ i ];
      }
    });
  }
  return headers;
}

export const defaultNewRowData = {
  property: '__property__',
  filter_label: 'Filter',
  filter_value: '__filter__',
  value: '',
};

export function getFilterOptions(options) {
  const { rows, headers, filters, simpleSearchFilter, } = options;
  let selectOptions = [];
  let useableheaders = headers.map(header=>header.sortid);
  if (filters) {
    filters.forEach(filter => {
      selectOptions.push({ label: filter.label || filter, value: filter.value || filter, });
    });
  } else {
    if (rows && rows.length && !simpleSearchFilter) {
      let rowheaders = Object.keys(rows[ 0 ]);
      // console.debug({ rowheaders });
      useableheaders = Object.assign([], rowheaders, useableheaders);
    }
    useableheaders.forEach(header => { 
      // console.debug({ header });
      if (header && header!=='__v') {
        selectOptions.push({ label: header, value: header, });
      }
    });
    selectOptions.splice(0, 0, { label: 'Property', value: '__property__', disabled: 'disabled', });
  }
  // console.debug({ selectOptions, useableheaders, });
  return selectOptions;
}

export function getFilterSortableOption(options) {
  const {  headers, } = options;
  return headers.filter(header => header.sortable && header.sortid).map(header => {
    return {
      value: header.sortid,
      label: header.label || header.sortid,
    };
  });
}
