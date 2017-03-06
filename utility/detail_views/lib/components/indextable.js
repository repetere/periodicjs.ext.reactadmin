'use strict';
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
pluralize.addIrregularRule('data', 'datas');

module.exports = function (schemas, label, options) {
	let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  // console.log({schemas, usablePrefix,manifestPrefix},'options.prefix',options.prefix)
  return [{
    component: 'ResponsiveCard',
    props: {
      cardTitle: `All ${capitalize(pluralize(label))}`,
    },
    children: [
      {
        component: 'ResponsiveTable',
        props: {
          style: {
            wordWrap: 'break-word',
          },
          limit: 20,
          'filterSearch': false,
          'tableSearch': true,
          flattenRowData: true,
          baseUrl: `/${usablePrefix}/${pluralize(label)}?format=json`,
          dataMap:[{
            'key': 'rows',
            'value': `${pluralize(label)}`,
          }, {
            'key': 'numItems',
            'value': `${pluralize(label)}count`,
          }, {
            'key': 'numPages',
            'value': `${label}pages`,
          },],
          'headerLinkProps': {
            'style': {
              'textDecoration': 'none',
              // color: styles.application.blackText,
              // fontWeight: 'normal',
            },
          },
          headers: [
            {
              label: 'ID',
              sortid: '_id',
              sortable: true,
              'link': {
                'baseUrl': `${manifestPrefix}/${pluralize(label)}/:id`,
                'params': [{ 'key': ':id', 'val': '_id', },],
              },
              'linkProps': {
                'style': {
                  'textDecoration': 'none',
                },
              },
            },
            {
              label: 'Create Date', sortid: 'createdat', sortable: true, momentFormat: 'llll',
              headerColumnProps: {
                style: {
                  minWidth:150
                }
              },
              columnProps: {
                style: {
                  minWidth:150
                }
              }
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
            )
        },
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
  }];
};