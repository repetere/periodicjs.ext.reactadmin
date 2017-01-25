import React, { Component } from 'react';
import * as rb from 're-bulma';
// import styles from '../styles';


export default class ResponsiveTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headers: ['GUID', 'Create Date', 'First Name', 'Last Name', 'Application Status', 'Selected Type', 'Selected Amount', 'Email', 'Phone', 'State'],
      rows: [{
        'GUID': {
            isUrl: true,
            url: '/application/detail/CT-BV1234567',
            value: 'CT-BV1234567'
          },
          'Create Date': '12/20/2016',
          'First Name': 'Bradley',
          'Last Name': 'Vanderstarren',
          'Application Status': 'Pre-Approved',
          'Selected Type': 'Unsecured Individual Loan',
          'Selected Amount': '$10,000',
          'Email': 'brad@promisefin.com',
          'Phone': '(917) 224-4883',
          'State': 'NY'
        },
        {
        'GUID': {
            isUrl: true,
            url: '/application/detail/CT-BV1234567',
            value: 'CT-BV1234567'
          },
          'Create Date': '12/20/2016',
          'First Name': 'Bradley',
          'Last Name': 'Vanderstarren',
          'Application Status': 'Pre-Approved',
          'Selected Type': 'Unsecured Individual Loan',
          'Selected Amount': '$10,000',
          'Email': 'brad@promisefin.com',
          'Phone': '(917) 224-4883',
          'State': 'NY'
        },
        {
        'GUID': {
            isUrl: true,
            url: '/application/detail/CT-BV1234567',
            value: 'CT-BV1234567'
          },
          'Create Date': '12/20/2016',
          'First Name': 'Bradley',
          'Last Name': 'Vanderstarren',
          'Application Status': 'Pre-Approved',
          'Selected Type': 'Unsecured Individual Loan',
          'Selected Amount': '$10,000',
          'Email': 'brad@promisefin.com',
          'Phone': '(917) 224-4883',
          'State': 'NY'
      }],
      hasPagination: props.hasPagination || false,
      hasHeader: props.hasHeader || false,
      hasFooter: props.hasFooter || false,
      maxRows: props.maxRows || 50,
      currentPage: props.currentPage || 1,
      numItems: props.itemCount,
      numPages: props.pages
    }
  }

  render() {
    let footer = (
    <rb.Pagination>
      <rb.PageButton>Previous</rb.PageButton>
      <rb.PageButton>Next</rb.PageButton>
      <ul>
        <li>
          <rb.PageButton>1</rb.PageButton>
        </li>
        <li>
          <span>...</span>
        </li>
        <li>
          <rb.PageButton>45</rb.PageButton>
        </li>
        <li>
          <rb.PageButton color="isPrimary">46</rb.PageButton>
        </li>
        <li>
          <rb.PageButton>47</rb.PageButton>
        </li>
        <li>
          <span>...</span>
        </li>
        <li>
          <rb.PageButton>{this.state.numPages}</rb.PageButton>
        </li>
      </ul>
    </rb.Pagination>)
    return (
      <rb.Container>
      <rb.Table>
        <rb.Thead>
          <rb.Tr>
            {this.state.headers.map((header, idx) => {
              return (
                <rb.Th key={idx}>{header}</rb.Th>
              )
            })}
          </rb.Tr>
        </rb.Thead>
        <rb.Tbody>
          {this.state.rows.map((row, idx) => {
            return (
              <rb.Tr>
                {Object.keys(row).map((entry, i) => {
                  if (row[entry].isUrl) return (
                    <rb.Td><a href={row[entry].url}>{row[entry].value}</a></rb.Td>
                  )
                  return (
                    <rb.Td>{row[entry]}</rb.Td>
                  )
                })}
              </rb.Tr>
            )
          })}
        </rb.Tbody>
      </rb.Table>
      {true ? footer : ""}
      </rb.Container>  
    )
  }
};