'use strict';
const data_tables = require('../utility/data_tables');
const usertables = [
  data_tables.tableField({
    field: 'email',
    link: true,
    headerStyle: {
      maxWidth: 200,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    columnStyle: {
      maxWidth: 200,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }),
  data_tables.tableCreatedDate,
  data_tables.tableField({
    title: 'First Name',
    field: 'firstname',
  }),
  data_tables.tableField({
    title: 'Last Name',
    field: 'lastname',
  }),
  data_tables.tableField({
    // title: 'Last Name',
    field: 'activated',
  }),
  data_tables.tableField({
    title: 'User Roles',
    field: 'userroles',
  }),
  data_tables.tableField({
    title: 'Account Type',
    field: 'accounttype',
  }),
  data_tables.tableOptions,
];
module.exports = {
  user: usertables,
  account: usertables,
  userrole: [
    data_tables.tableField({
      field: 'name',
      link: true,
      headerStyle: {
        maxWidth: 150,
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
      },
      columnStyle: {
        maxWidth: 150,
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
      }
    }),
    data_tables.tableField({
      title: 'Role ID',
      field: 'userroleid',
    }),
    data_tables.tableField({
      title: 'Privileges',
      field: 'privileges',
    }),
    data_tables.tableField({
      title: 'Description',
      field: 'description',
    }),
    data_tables.tableOptions,
  ],
  userprivilege: [
    data_tables.tableField({
      field: 'name',
      link: true,
      headerStyle: {
        maxWidth: 150,
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
      },
      columnStyle: {
        maxWidth: 150,
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
      }
    }),
    data_tables.tableField({
      title: 'Privilege ID',
      field: 'userprivilegeid',
    }),
    data_tables.tableField({
      title: 'Label',
      field: 'label',
    }),
    data_tables.tableField({
      title: 'Description',
      field: 'description',
    }),
    data_tables.tableOptions,
  ],
};