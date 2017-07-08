'use strict';
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const helpers = require('./detail_views/lib/helpers');

const tableField = function (headingOptions) {
  let { title, field, link, } = headingOptions;
  return function (schemas, label, options) {
    // let usablePrefix = helpers.getDataPrefix(options.prefix);
    let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
    return {
      label: title || capitalize(field || label),
      sortid: field || label,
      sortable: true,
      image: headingOptions.image,
      imageProps: {
        style: {
          maxHeight:'4rem',
          maxWidth: '4rem',
          overflow:'hidden',
        },
        alt: title || capitalize(field || label),
      },
      icon: headingOptions.icon,
      iconProps: {
        title: title || capitalize(field || label),
      },
      'link': (link)
        ? {
          'baseUrl': `${manifestPrefix}/${pluralize(label)}/:id`,
          'params': [ { 'key': ':id', 'val': '_id', }, ],
        }
        : undefined,
      'linkProps': (link)
        ? {
          'style': {
            'textDecoration': 'none',
          },
        } : undefined,
      headerColumnProps: {
        style: headingOptions.headerStyle,
      },
      columnProps: {
        style: headingOptions.columnStyle,
      },
    };
  };
};

const tableTitle = function (schemas, label, options) {
  // let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return {
    label: 'Title',
    sortid: 'title',
    sortable: true,
    'link': {
      'baseUrl': `${manifestPrefix}/${pluralize(label)}/:id`,
      'params': [ { 'key': ':id', 'val': '_id', }, ],
    },
    'linkProps': {
      'style': {
        'textDecoration': 'none',
      },
    },
  };
};

const tableCreatedDate = function (schemas, label, options) {
  // let usablePrefix = helpers.getDataPrefix(options.prefix);
  // let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return {
    label: 'Create Date', sortid: 'createdat', sortable: true, momentFormat: 'MM/DD/YYYY |  hh:mm:ssa',
    headerColumnProps: {
      style: {
        minWidth: 160,
      },
    },
    columnProps: {
      style: {
        minWidth: 160,
      },
    },
  };
};

const tableTaxonomy = function (schemas, label, options) {
  // let usablePrefix = helpers.getDataPrefix(options.prefix);
  // let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return {
    label: 'Taxonomy',
    sortid: 'name',
    sortable: true,
  };
};

const tableOptions = function (schemas, label, options) {
  let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return {
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
          'onclickBaseUrl':`${options.extsettings.basename}${usablePrefix}/${pluralize(label)}/:id?format=json`,
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
  };
};

module.exports = {
  tableField,
  tableTitle,
  tableCreatedDate,
  tableTaxonomy,
  tableOptions,
};