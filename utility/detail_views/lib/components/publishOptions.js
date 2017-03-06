'use strict';

// const DICTIONARY = require('../dictionary');
// const autoFormElements = require('./autoFormElements');
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
pluralize.addIrregularRule('data', 'datas');

function _id () {
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
    layoutProps:{
      horizontalform:true,
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
    layoutProps: {
      horizontalform: true,
    },
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
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _name () {
  return {
    type: 'text',
    name: 'name',
    label: 'Name',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    layoutProps: {
      horizontalform: true,
    },
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

function _content () {
  return {
    type: 'textarea',
    name: 'content',
    label: 'Content',
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
    layoutProps: {
      horizontalform: true,
    },
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
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _getLine() {
  return {
    type:'line',
  };
}

function _assetField(fieldname, fieldlabel) {
  return function () {
    return {
      type: 'text',
      name: fieldname,
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
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _assetpreview() {
  return {
    type: 'image',
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
    name: 'fileurl',
  };
}

exports.status = _status;
exports.dateday = _dateday;
exports.datetime = _datetime;
exports.title = _title;
exports.content = _content;

function _publishButtons (schema, label, options = {}) {
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
        value: 'Save Changes',
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
            },
            confirmModal: {},
          },
        },
      },
    ],
  };
}

exports.publishBasic = function _publishBasic(schema, label, options = {}) {
  // console.log({ schema });
  let contentItems = [
    _title(),
    _content(),
  ];
  let pubOptions = [
    _id(),
    _name(),
    _status(),
    _dateday(),
    _datetime(),
    _publishButtons(schema, label, options),
  ];
  if (schema.fileurl) {
    contentItems = [
      _assetpreview(),
      _title(),
      _content(),
    ];
    pubOptions = [
      _id(),
      _name(),
      _status(),
      _getLine(),
      _assetField('fileurl', 'File URL')(),
      _assetField('size', 'File Size')(),
      _assetField('locationtype', 'Location Type')(),
      _assetField('attributes.encrypted_client_side', 'Encrypted')(),
      _assetField('attributes.periodicFilename', 'Periodic Filename')(),
      _publishButtons(schema, label, options),
    ];
  }
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

exports.id = _id;
exports.name = _name;
exports.status = _status;
exports.dateday = _dateday;
exports.datetime = _datetime;
exports.createdat = _createdat;
exports.updatedat = _updatedat;
exports.publishButtons = _publishButtons;
