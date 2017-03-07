
const capitalize = require('capitalize');
const helpers = require('../helpers');
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

let getDefaultHeaders = function (schemas, label, options) {
  let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);

  return [
    {
      label: 'Title',
      sortid: 'title',
      sortable: true,
      'link': {
        'baseUrl': `${manifestPrefix}/${pluralize(label)}/:id`,
        'params': [{ 'key': ':id', 'val': '_id', }, ],
      },
      'linkProps': {
        'style': {
          'textDecoration': 'none',
        },
      },
    },
    {
      label: 'Create Date', sortid: 'createdat', sortable: true, momentFormat: 'MM/DD/YYYY |  hh:mm:ssa',
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
      label: 'Taxonomy', sortid: 'name', sortable: true,
    },
    {
      label: 'Options', 
      headerColumnProps: {
        style: {
          minWidth:70,
        },
      },
      columnProps: {
        style: {
          minWidth:70,
        },
      },
      sortable: true,
      'buttons':[
        {
          'children':'',
          'passProps':{
            'onClick':'func:this.props.reduxRouter.push', 
            'onclickBaseUrl':`${manifestPrefix}/${pluralize(label)}/:id`,
            'onclickLinkParams':[{ 'key':':id', 'val':'_id',  }, ],
            
            buttonProps:{
              icon:'fa fa-pencil', 
              // color:'isDanger', 
              isIconRight:true,
              size:'isSmall',
              className:'__reactadmin_icon_button',
            },
            style:{
              marginRight:10,
            },
          },
        },
        {
          'children':'',
          'passProps':{
            'onClick':'func:this.props.fetchAction', 
            'onclickBaseUrl':`${options.extsettings.basename}/${usablePrefix}/${pluralize(label)}/:id?format=json`,
            'onclickLinkParams':[{ 'key':':id', 'val':'_id',  }, ],
            'fetchProps':{
              'method':'DELETE',
            },
            successProps: {
              success: {
                notification: {
                  text: 'Deleted',
                  timeout: 4000,
                  type: 'success',
                },
              },
              successCallback: 'func:this.props.reduxRouter.push',
              successProps: `${ manifestPrefix}/${pluralize(label)}`,
            },
            'confirmModal':{},
            buttonProps:{
              icon:'fa fa-times', 
              color:'isDanger', 
              isIconRight:true,
              size:'isSmall',
              className:'__reactadmin_icon_button',
            },
          },
        },
      ],
      // columnProps: {
      //   style: {
      //     textAlign:'center',
      //   },
      // },
    },
  ];
};

module.exports = function (schemas, label, options) {
  let usablePrefix = helpers.getDataPrefix(options.prefix);
  let tableHeaders = (options.customHeaders && options.customHeaders[label]) ? options.customHeaders[label] : getDefaultHeaders;
  // let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
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
          }, ],
          'headerLinkProps': {
            'style': {
              'textDecoration': 'none',
              // color: styles.application.blackText,
              // fontWeight: 'normal',
            },
          },
          headers: tableHeaders(schemas, label, options),
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
  }, ];
};