'use strict';

// const DICTIONARY = require('../dictionary');
// const autoFormElements = require('./autoFormElements');
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
pluralize.addIrregularRule('data', 'datas');

function _id() {
  return {
    type: 'text',
    name: '_id',
    label: 'ID',
    labelProps: {
      style: {
        flex:1,
      },
    },
    passProps: {
      state: 'isDisabled',
    },
    layoutProps:{},
  };
}
exports.id = _id;

function _dataList(schema, label, options, type) {
  let entity = helpers.getSchemaEntity({ schema, label, });
  let usablePrefix = helpers.getDataPrefix(options.prefix, undefined, schema, label, options);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);

  return {
    type: 'datalist',
    placeholder:`${capitalize(label)} › ${entity}`,
    name: label,
    label: `${capitalize(label)}`,
    labelProps: {
      style: {
        flex:1,
      },
    },
    layoutProps:{},
    datalist : {
      selector: '_id',
      displayField: 'title',
      multi: (type === 'array') ? true : false,
      field:label,
      entity: entity.toLowerCase(),
      dbname: options.dbname ||'periodic',
      resourcePreview: `${manifestPrefix}/${pluralize(entity.toLowerCase())}`,
      resourceUrl: `${options.extsettings.basename}${usablePrefix}/${pluralize(entity.toLowerCase())}/?format=json`,
    },
  };
}
exports.dataList = _dataList;

function _createdat () {
  return {
    type: 'text',
    name: 'createdat',
    label: 'Created',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    passProps: {
      state: 'isDisabled',
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.createdat = _createdat;

function _updatedat() {
  return {
    type: 'text',
    name: 'updatedat',
    label: 'Updated',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    passProps: {
      state: 'isDisabled',
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.updatedat = _updatedat;

function _name(schema, label, options) {
  let namefield = (schema.username) ? 'username' : 'name';
  return {
    type: 'text',
    name: namefield,
    label: capitalize(namefield),
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.name = _name;

function _title () {
  return {
    type: 'text',
    name: 'title',
    label: 'Title',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.title = _title;

function _content (type = 'content') {
  return {
    type: 'editor',
    name: type,
    label: capitalize(type),
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.content = _content;

function _status () {
  return {
    type: 'select',
    name: 'status',
    label: 'Status',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    passProps: {
      style: {
        width: '100%',
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
    options :[
      {
        'label': 'Draft',
        'value': 'draft',
      },
      {
        'label': 'Schedule in advance',
        'value': 'schedule',
      },
      {
        'label': 'Publish',
        'value': 'publish',
      },
      {
        'label': 'Review',
        'value': 'review',
      },
      {
        'label': 'Trash',
        'value': 'trash',
      },
    ],
  };
}
exports.status = _status;

function _datetime () {
  return {
    type: 'time',
    name: 'publishtime',
    label: 'Time',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.datetime = _datetime;

function _getLine() {
  return {
    type:'line',
  };
}
exports.getLine = _getLine;

function _assetField(fieldname, fieldlabel) {
  // function getFieldName(fieldname) {
  //   if(fieldname)
  //   return fieldname;
  // }
  return function () {
    return {
      type: 'text',
      name: fieldname, //getFieldName(fieldname),
      label: fieldlabel || capitalize(fieldname),
      labelProps: {
        style: {
          flex: 1,
        },
      },
      passProps: {
        state: 'isDisabled',
      },
      // layoutProps: {
      //   horizontalform: true,
      // },
    };
  };
}
exports.assetField = _assetField;

function _dateday () {
  return {
    type: 'date',
    name: 'publishdate',
    label: 'Date',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}
exports.dateday = _dateday;

function _assetpreview() {
  return {
    type: 'image',
    link:true,
    'layoutProps': {
      // 'innerFormItem': true,
      // style: {
      //   padding: 0,
      // },
    },
    passProps: {
      // style: {
      //   padding: 0,
      // },
    },
    name: 'transform.fileurl',
    preview: 'transform.previewimage',
  };
}

function _publishButtons (schema, label, options = {}, newEntity) {
  let usablePrefix = helpers.getDataPrefix(options.prefix, undefined, schema, label, options);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return {
    label: ' ',
    type: 'group',
    passProps: {
      style: {
        justifyContent: 'center',
      },
    },
    groupElements: [
      {
        type: 'submit',
        value: (newEntity)?`Create ${capitalize(label)}`:'Save Changes',
        passProps: {
          color: 'isPrimary',
          // style: styles.buttons.primary,
        },
        'layoutProps': {
          'innerFormItem': true,
        },
      },
      {
        type: 'layout',
        'layoutProps': {
          'innerFormItem': true,
                      
          style: {
            padding: 0,
          },
        },
        passProps: {
          style: {
            padding: 0,
          },
        },
        value: {
          component: 'ResponsiveButton',
          children: 'Delete',
          props: {
            onClick: 'func:this.props.fetchAction',
            onclickBaseUrl: `${options.extsettings.basename}${usablePrefix}/${pluralize(label)}/:id?format=json`,
            onclickLinkParams: [
              {
                'key': ':id',
                'val': '_id',
              },
            ],
            onclickThisProp: 'formdata',
            fetchProps: {
              method: 'DELETE',
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
              successProps: `${manifestPrefix}/${pluralize(label)}`,
            },
            buttonProps: {
              color: 'isDanger',
              state: (newEntity)?'isDisabled':undefined,
            },
            confirmModal: {},
          },
        },
      },
    ],
  };
}
exports.publishButtons = _publishButtons;

function getPublishOptions(schema, label, options, newEntity) {
  let pubOptions = [
    _id(),
    _name(schema, label, options),
  ];
  if (schema.status) {
    pubOptions.push(_status());
  }
  if (schema.publishat) {
    pubOptions = pubOptions.concat([
      _dateday(),
      _datetime(),
    ]);
  }
  if (schema.author||schema.primaryauthor) {
    pubOptions.push(_getLine());
  }
  if (schema.primaryauthor) {
    pubOptions.push(_dataList(schema, 'primaryauthor', options, '_id'));
  }
  if (schema.authors) {
    pubOptions = pubOptions.concat([
      _dataList(schema, 'authors', options, 'array'),
    ]);
  }
  if (schema.fileurl) {
    pubOptions = pubOptions.concat([
      _getLine(),
      _assetField('transform.fileurl', 'File URL')(),
      _assetField('transform.size', 'File Size')(),
      _assetField('locationtype', 'Location Type')(),
      _assetField('transform.encrypted', 'Encrypted')(),
      _assetField('attributes.periodicFilename', 'Periodic Filename')(),
    ]);
  }
  pubOptions.push(_publishButtons(schema, label, options, newEntity));

  return pubOptions;
}
exports.getPublishOptions = getPublishOptions;

function getContentOptions(schema, label, options) {
  let customIgnoreFields = helpers.getCustomEntityIgnoreFields(schema, label, options);  
  // if (customIgnoreFields) {
  //   console.log('getContentOptions', { customIgnoreFields, });
  // }
  let contentItems = [];
  if (schema.fileurl && customIgnoreFields.indexOf('fileurl') === -1) {
    contentItems.push(_assetpreview(schema, label, options));
  }
  if (schema.title && customIgnoreFields.indexOf('title') === -1) {
    contentItems.push(_title());
  }
  if (schema.content && customIgnoreFields.indexOf('content') === -1) {
    contentItems.push(_content());
  }
  if (schema.description && customIgnoreFields.indexOf('description') === -1) {
    contentItems.push(_content('description'));
  }
  if (schema.tags && customIgnoreFields.indexOf('tags') === -1) {
    contentItems.push(_dataList(schema, 'tags', options, 'array', true));
  }
  if (schema.categories && customIgnoreFields.indexOf('categories') === -1) {
    contentItems.push(_dataList(schema, 'categories', options, 'array', true));
  }
  if (schema.contenttypes && customIgnoreFields.indexOf('contenttypes') === -1) {
    contentItems.push(_dataList(schema, 'contenttypes', options, 'array', true));
  }
  if (schema.primaryasset && customIgnoreFields.indexOf('primaryasset') === -1) {
    contentItems.push(_dataList(schema, 'primaryasset', options, '_id', true));
  }
  if (schema.assets && customIgnoreFields.indexOf('assets') === -1) {
    contentItems.push(_dataList(schema, 'assets', options, 'array', true));
  }
  return contentItems;
}
exports.getContentOptions = getContentOptions;

exports.publishBasic = function _publishBasic(schema, label, options = {}, newEntity) {
  // console.log({ schema });
  let contentItems = getContentOptions(schema, label, options);
  let pubOptions = getPublishOptions(schema, label, options, newEntity);
  let customCardProps = helpers.getCustomCardProps(options);   

  let publishBasic = {
    gridProps: {
      isMultiline: false,
    },
    card: {
      doubleCard: true,
      leftDoubleCardColumn: {
        size: 'isTwoThirds',
        style: {
          display:'flex',
        },
      },
      rightDoubleCardColumn: {
        size: 'isOneThird',
        style: {
          display:'flex',
        },
      },
      leftCardProps: Object.assign({}, customCardProps, {
        cardTitle: 'Content',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      }),
      rightCardProps: Object.assign({}, customCardProps, {
        cardTitle: 'Publish Options',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      }),
    },
    formElements: [
      {
        formGroupCardLeft: contentItems,
        formGroupCardRight: pubOptions,
      },
    ],
  };

  return publishBasic;
};
exports.publishAttributes = function _publishAtrributes(schema, label, options = {}) {
  let customCardProps = helpers.getCustomCardProps(options);  
  let publishAttributesBasic = {
    gridProps: {
      isMultiline: false,
    },
    card: {
      doubleCard: true,
      leftDoubleCardColumn: {
        size: 'isHalf',
        style: {
          display:'flex',
        },
      },
      rightDoubleCardColumn: {
        size: 'isHalf',
        style: {
          display:'flex',
        },
      },
      leftCardProps: Object.assign({}, customCardProps, {
        cardTitle: 'Attributes',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      }),
      rightCardProps: Object.assign({}, customCardProps, {
        cardTitle: 'Extension Attributes',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      }),
    },
    formElements: [
      {
        formGroupCardLeft: [
          {
            type: 'code',
            name: 'attributes',
            stringify: true,
            value: {},
          },
        ],
        formGroupCardRight: [
          {
            type: 'code',
            name:'extensionattributes',
            stringify: true,
            value: {},
          },
        ],
      },
    ],
  };

  return publishAttributesBasic;
};