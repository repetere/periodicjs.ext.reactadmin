'use strict';

const path = require('path');
const capitalize = require('capitalize');
const helpers = require('../helpers');
const data_tables = require(path.resolve(__dirname, '../../../data_tables'));
const pluralize = require('pluralize');
pluralize.addIrregularRule('data', 'datas');

const getAllHeaders = function (schemas, label, options) {
  // let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return [
    {
      label: 'ID',
      sortid: '_id',
      sortable: true,
      'link': {
        'baseUrl': `${manifestPrefix}/${pluralize(label)}/:id`,
        'params': [{ 'key': ':id', 'val': '_id', }, ],
      },
      'linkProps': {
        'style': {
          'textDecoration': 'none',
          cursor:'pointer',
        },
      },
    },
    {
      label: 'Create Date', sortid: 'createdat', sortable: true, momentFormat: 'llll',
      headerColumnProps: {
        style: {
          minWidth:160,
        },
      },
      columnProps: {
        style: {
          minWidth:160,
        },
      },
    },
    {
      label: 'Name', sortid: 'name', sortable: true,
    },
  ].concat(Object.keys(schemas)
      .filter(prop => prop !== 'id' && prop !== 'createdat' && prop !== 'name' && prop !== 'updatedat' && prop !== 'entitytype' && prop !== 'contenttypes' && prop !== 'changes' && prop !== 'attributes' && prop !== 'contenttypeattributes'&& prop !== 'content' && prop!=='extensionattributes')
      .map(key => {
        return {
          label:capitalize(key),
          sortid:key,
        };
      })
    );
};
exports.getAllHeaders = getAllHeaders;

const getDefaultHeaders = function (schemas, label, options) {
  // let usablePrefix = helpers.getDataPrefix(options.prefix);
  // let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);

  return [
    data_tables.tableTitle(schemas, label, options),
    data_tables.tableCreatedDate(schemas, label, options),
    data_tables.tableTaxonomy(schemas, label, options),
    data_tables.tableOptions(schemas, label, options),
  ];
};
exports.getDefaultHeaders = getDefaultHeaders;

const getTableHeader = function _getTableHeader(schemas, label, options) {
  // console.log({ options });
  let customIndexHeader = helpers.getCustomIndexTableHeaders(schemas, label, options);
  if (customIndexHeader) {
    let customheaders = customIndexHeader.map(header => header.call(null, schemas, label, options));
    // console.log({ customheaders });
    return customheaders;
  } else if(options.extsettings && options.extsettings.data_tables && options.extsettings.data_tables[options.dbname] && options.extsettings.data_tables[options.dbname][label]) {
    return options.extsettings.data_tables[options.dbname][label].map(header=>header.call(null, schemas, label, options));
  } else {
    return getDefaultHeaders(schemas, label, options);
  }
};
exports.getTableHeader = getTableHeader;

const getTableProps = function _getTableProps(schemas, label, options) {
  let customIndexTableProps = helpers.getCustomIndexTableProps(schemas, label, options);
  if (customIndexTableProps) {
    return customIndexTableProps;
  } else if(options.extsettings.data_table_props && options.extsettings.data_table_props[options.dbname] && options.extsettings.data_table_props[options.dbname][label]) {
    return options.extsettings.data_table_props[ options.dbname ][ label ];
  } else {
    return {};
  }
};
exports.getTableProps = getTableProps;

module.exports = function (schemas, label, options) {
  let usablePrefix = helpers.getDataPrefix(options.prefix, undefined, schemas, label, options);
  let customCardProps = helpers.getCustomCardProps(options);  
  return [
    // {
    //   component: 'pre',
    //   children:JSON.stringify(schemas, null, 2),
    // },
    {
      component: 'ResponsiveCard',
      props: Object.assign({}, customCardProps, {
        cardTitle: `All ${capitalize(pluralize(label))}`,
      }),
      children: [
        {
          component: 'ResponsiveTable',
          props: Object.assign({
            style: {
              wordWrap: 'break-word',
            },
            limit: 20,
            'filterSearch': true,
            'tableSearch': true,
            flattenRowData: true,
            baseUrl: `${(usablePrefix.charAt(0)!=='/')?'/'+usablePrefix:usablePrefix}/${pluralize(label)}?format=json`,
            dataMap:[{
              'key': 'rows',
              'value': `${pluralize(label)}`,
            }, {
              'key': 'numItems',
              'value': `${pluralize(label)}count`,
            }, {
              'key': 'numPages',
              'value': `${label}pages`,
            }, ],
            'headerLinkProps': {
              'style': {
                'textDecoration': 'none',
                // color: styles.application.blackText,
                // fontWeight: 'normal',
              },
            },
            headers: getTableHeader(schemas, label, options),
          }, getTableProps(schemas, label, options)),
          asyncprops:{
            'rows': [
              helpers.getIndexLabel(label), `${pluralize(label)}`,
            ],
            'numItems': [
              helpers.getIndexLabel(label), `${pluralize(label)}count`,
            ],
            'numPages': [
              helpers.getIndexLabel(label), `${label}pages`,
            ],
          },
        },
      ],
    },
  ];
};