import React, { Component } from 'react';
import * as rb from 're-bulma';
// import styles from '../styles';

function footerButtons(numbuttons) {
  return (
    <ul>
      <rb.PageButton></rb.PageButton>
    </ul>  
  );
};

export default class ResponsiveTable extends Component {

  constructor(props) {
    super(props);
    this.state = { headers: 
      [
			 {label: 'GUID', sortactive:true, sortid:'guid', sortorder:'asc'},
			 {label: 'Create Date', sortactive:true, sortid:'createdat', sortorder:'asc'},
			 {label: 'First Name', sortactive:true, sortid:'firstname', sortorder:'asc'},
			 {label: 'Last Name', sortactive:true, sortid:'lastname', sortorder:'asc'},
			 {label: 'Application Status', sortactive:true, sortid:'status', sortorder:'asc'},
			 {label: 'Selected Type', sortactive:true, sortid:'credit_product_type', sortorder:'asc'},
			 {label: 'Selected Amount', sortactive: true, sortid: 'approved_loan_amount'},
			 {label: 'Email', sortid: 'email'},
       {label: 'Phone', sortid: 'phone'},
       {label: 'State', sortid: 'state'}
			 ],
      rows: [{
        'guid': {
          isUrl: true,
          url: '/application/detail/CT-BV1234567',
          value: 'CT-BV1234567'
        },
        'createdat': '12/20/2016',
        'firstname': 'Bradley',
        'lastname': 'Vanderstarren',
        'status': 'Pre-Approved',
        'credit_product_type': 'Unsecured Individual Loan',
        'approved_loan_amount': '$10,000',
        'email': 'brad@promisefin.com',
        'phone': '(917) 224-4883',
        'state': 'NY'
        },
        {
        'guid': {
          isUrl: true,
          url: '/application/detail/CT-BV1234567',
          value: 'CT-BV1234567'
        },
        'createdat': '12/20/2016',
        'firstname': 'Bradley',
        'lastname': 'Vanderstarren',
        'status': 'Pre-Approved',
        'credit_product_type': 'Unsecured Individual Loan',
        'approved_loan_amount': '$10,000',
        'email': 'brad@promisefin.com',
        'phone': '(917) 224-4883',
        'state': 'NY'
        },
        {
        'guid': {
          isUrl: true,
          url: '/application/detail/CT-BV1234567',
          value: 'CT-BV1234567'
        },
        'createdat': '12/20/2016',
        'firstname': 'Bradley',
        'lastname': 'Vanderstarren',
        'status': 'Pre-Approved',
        'credit_product_type': 'Unsecured Individual Loan',
        'approved_loan_amount': '$10,000',
        'email': 'brad@promisefin.com',
        'phone': '(917) 224-4883',
        'state': 'NY'
      }],
      hasPagination: props.hasPagination || true,
      hasHeader: props.hasHeader || false,
      hasFooter: props.hasFooter || false,
      maxRows: props.maxRows || 50,
      currentPage: props.currentPage || 10,
      numItems: props.itemCount || 1000,
      numPages: 20,
      numButtons: props.numButtons
    }
  }

  render() {
        const { numPages, currentPage } = this.state;

        const pageButtons = [];

        let start = currentPage - 2;
        let end = currentPage;
        const lastIndex = numPages - 1;
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
            pageButtons.push(<li key='dot-before'>...</li>);
        }

        for (let index = start; index <= end; index++) {
          let inActive = ((index + 1) !== currentPage) ? true : false;
          if (inActive) {
            pageButtons.push((
                <li key={index}>
                  <rb.PageButton>{index + 1}</rb.PageButton>
                </li>
            ));
          } else {
            pageButtons.push((
              <li key={index}>
                <rb.PageButton color="isPrimary" isActive={true}>{index + 1}</rb.PageButton>
              </li>
            ))
          }
        }

        if (end < lastIndex) {
            pageButtons.push(<li key='dot-after'>...</li>);
            pageButtons.push((
                <li key={lastIndex}>
                    <rb.PageButton>{lastIndex + 1}</rb.PageButton>
                </li>
            ));
        }
    let footer = (
    <rb.Pagination>
      <rb.PageButton>Previous</rb.PageButton>
      <rb.PageButton>Next</rb.PageButton>
      <ul>
      {pageButtons}
      </ul>
    </rb.Pagination>)
    return (
      <rb.Container>
      <rb.Table>
        <rb.Thead>
          <rb.Tr>
            {this.state.headers.map((header, idx) => {
              return (
                <rb.Th key={idx}>{header.label}</rb.Th>
              )
            })}
          </rb.Tr>
        </rb.Thead>
        <rb.Tbody>
          {this.state.rows.map((row, idx) => {
            return (
              <rb.Tr>
                {this.state.headers.map((header, i) => {
                  if (row[header.sortid].isUrl) return (
                    <rb.Td><a href={row[header.sortid].url}>{row[header.sortid].value}</a></rb.Td>
                  )
                  return (
                    <rb.Td>{row[header.sortid]}</rb.Td>
                  )
                })}
              </rb.Tr>
            )
          })}
        </rb.Tbody>
      </rb.Table>
      {this.state.hasPagination ? footer : ""}
      </rb.Container>  
    )
  }
};