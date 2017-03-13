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

function _dataList(schema, label, options, type) {
  let entity = helpers.getSchemaEntity({ schema, label, });
  let usablePrefix = helpers.getDataPrefix(options.prefix);
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
      resourceUrl: `${options.extsettings.basename}/${usablePrefix}/${pluralize(entity.toLowerCase())}/?format=json`,
    },
  };
}


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

function _content (type = 'content') {
  return {
    type: 'textarea',
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

function _datetime () {
  return {
    type: 'time',
    name: 'time',
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

function _getLine() {
  return {
    type:'line',
  };
}

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

function _dateday () {
  return {
    type: 'date',
    name: 'date',
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

exports.status = _status;
exports.dateday = _dateday;
exports.datetime = _datetime;
exports.title = _title;
exports.content = _content;

function _publishButtons (schema, label, options = {}, newEntity) {
  let usablePrefix = helpers.getDataPrefix(options.prefix);
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
            onclickBaseUrl: `${options.extsettings.basename}/${usablePrefix}/${pluralize(label)}/:id?format=json`,
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

function getContentOptions(schema, label, options) {
  let contentItems = [];
  if (schema.fileurl) {
    contentItems.push(_assetpreview(schema, label, options));
  }
  if (schema.title) {
    contentItems.push(_title());
  }
  if (schema.content) {
    contentItems.push(_content());
  }
  if (schema.tags) {
    contentItems.push(_dataList(schema, 'tags', options, 'array', true));
  }
  if (schema.categories) {
    contentItems.push(_dataList(schema, 'categories', options, 'array', true));
  }
  if (schema.contenttypes) {
    contentItems.push(_dataList(schema, 'contenttypes', options, 'array', true));
  }
  if (schema.primaryasset) {
    contentItems.push(_dataList(schema, 'primaryasset', options, '_id', true));
  }
  if (schema.assets) {
    contentItems.push(_dataList(schema, 'assets', options, 'array', true));
  }
  return contentItems;
}

exports.publishBasic = function _publishBasic(schema, label, options = {}, newEntity) {
  // console.log({ schema });
  let contentItems = getContentOptions(schema, label, options);
  let pubOptions = getPublishOptions(schema, label, options, newEntity);

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
      leftCardProps: {
        cardTitle: 'Content',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      },
      rightCardProps: {
        cardTitle: 'Publish Options',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      },
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
      leftCardProps: {
        cardTitle: 'Attributes',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      },
      rightCardProps: {
        cardTitle: 'Extension Attributes',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      },
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

exports.id = _id;
exports.name = _name;
exports.status = _status;
exports.dateday = _dateday;
exports.datetime = _datetime;
exports.createdat = _createdat;
exports.updatedat = _updatedat;
exports.publishButtons = _publishButtons;
