import React, { Component, PropTypes, } from 'react';
import { Link, } from 'react-router';
import * as rb from 're-bulma';
import moment from 'moment';
// import styles from '../styles';


const propTypes = {
  hasPagination: PropTypes.bool,
  hasHeader: PropTypes.bool,
  hasFooter: PropTypes.bool,
  itemCount: PropTypes.number.isRequired,
  maxRows: PropTypes.number,
  currentPage: PropTypes.number,
  numButtons: PropTypes.number,
};

const defaultProps = {
  hasPagination: true,
  hasHeader: false,
  hasFooter: false,
  maxRows: 50,
  currentPage: 1,
  numPages: 1,
  numItems: 0,
  itemCount: 100,
  numButtons: 1,
};

class ResponsiveTable extends Component {
  constructor(props) {
    super(props);
    // console.log({ props });
    // let rows = props.rows || [];
    // let itemCount =  props.rows.length || props.itemCount;;
    this.state = {
      headers: props.headers || [],
      rows: props.rows || [],
      hasPagination: props.hasPagination,
      hasHeader: props.hasHeader,
      hasFooter: props.hasFooter,
      maxRows: props.maxRows,
      currentPage: props.currentPage,
      numItems: props.numItems,
      numPages: Math.ceil(props.numItems / props.maxRows),
      numButtons: props.numButtons,
    };

    console.log('this.state',this.state)
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);;
    this.setState({
      headers: nextProps.headers || [],
      rows: nextProps.rows || [],
      hasPagination: nextProps.hasPagination,
      hasHeader: nextProps.hasHeader,
      hasFooter: nextProps.hasFooter,
      maxRows: nextProps.maxRows,
      currentPage: nextProps.currentPage,
      numItems: nextProps.itemCount,
      numPages: (nextProps.itemCount / nextProps.maxRows),
      numButtons: nextProps.numButtons,
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
          <rb.PageButton isActive={currentPage === 1}>1</rb.PageButton>
        </li>
      ));
      pageButtons.push(<li key="dot-before">...</li>);
    }
//
    for (let index = start; index <= end; index += 1) {
      const inActive = ((index + 1) !== currentPage);
      if (inActive) {
        pageButtons.push((
          <li key={index}>
            <rb.PageButton>{index + 1}</rb.PageButton>
          </li>
        ));
      } else {
        pageButtons.push((
          <li key={index}>
            <rb.PageButton color="isPrimary" isActive>{index + 1}</rb.PageButton>
          </li>
        ));
      }
    }

    if (end < lastIndex) {
      pageButtons.push(<li key="dot-after">...</li>);
      pageButtons.push((
        <li key={lastIndex}>
          <rb.PageButton>{lastIndex + 1}</rb.PageButton>
        </li>
      ));
    }
    const footer = (
      <rb.Pagination>
        <rb.PageButton>Previous</rb.PageButton>
        <rb.PageButton>Next</rb.PageButton>
        <ul>
          {pageButtons}
        </ul>
      </rb.Pagination>);
    
    
    return (
      <rb.Container>
        <rb.Table {...this.props.tableProps}>
          <rb.Thead>
            <rb.Tr>
              {this.props.headers.map((header, idx) => (
                <rb.Th key={idx}>{header.label}</rb.Th>
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
        {this.state.hasPagination ? footer : ''}
      </rb.Container>
    );
  }
}
//tble

ResponsiveTable.propType = propTypes;
ResponsiveTable.defaultProps = defaultProps;

export default ResponsiveTable;
