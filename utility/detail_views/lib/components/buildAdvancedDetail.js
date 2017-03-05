'use strict';

const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
// const DICTIONARY = require('../dictionary');
// const autoFormElements = require('./autoFormElements');
pluralize.addIrregularRule('data', 'datas');

const buildAdvancedDetail = function (schema, label, options = {}) {
  let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  let top = {
    component: 'ResponsiveForm',
    asyncprops: {
      // formdata2: [helpers.getDetailLabel(label), label, ],
    },
    props: {
      stringyFormData:true,
      marginBottom: 30,
      onSubmit:{
        url: `${options.extsettings.basename}/${usablePrefix}/${pluralize(label)}/:id?format=json&unflatten=true`,
        params: [
          { 'key': ':id', 'val': '_id', },
        ],
        options:{
          method:'PUT',
        },
        success: true,
      },
      'hiddenFields': [
        {
          'form_name':'_id',
          'form_val':'_id',
        },
      ],
      footergroups: [],
      formgroups: [ {
        gridProps: {
          isMultiline: false,
        },
        card: {
          doubleCard: true,
          leftDoubleCardColumn: {
            size: 'isTwoThirds',
          },
          rightDoubleCardColumn: {
            size:'isOneThird',
          },
          leftCardProps: {
            cardTitle: `${ capitalize(label) }`,
          },
          rightCardProps: {
            cardTitle: 'Publish Options',
          },
        },
        formElements: [
          {
            formGroupCardLeft: [
              {
                type: 'code',
                name:'genericdocjson',
              },
            ],
            formGroupCardRight: [
              {
                type: 'text',
                name: '_id',
                label: 'ID',
                labelProps: {
                  style: {
                    flex:3,
                  },
                },
                passProps: {
                  state: 'isDisabled',
                },
                layoutProps:{
                  horizontalform:true,
                },
              },
              {
                type: 'text',
                name: 'createdat',
                label: 'Created',
                labelProps: {
                  style: {
                    flex:3,
                  },
                },
                passProps: {
                  state: 'isDisabled',
                },
                layoutProps:{
                  horizontalform:true,
                },
              },
              {
                type: 'text',
                name: 'updatedat',
                label: 'Updated',
                labelProps: {
                  style: {
                    flex:3,
                  },
                },
                passProps: {
                  state: 'isDisabled',
                },
                layoutProps:{
                  horizontalform:true,
                },
              },
              {
                label: ' ',
                type: 'group',
                passProps: {
                  style: {
                    justifyContent:'center',
                  },
                },
                groupElements:[
                  {
                    type: 'submit',
                    value: 'Save Changes',
                    passProps: {
                      color:'isPrimary',
                      // style: styles.buttons.primary,
                    },
                    'layoutProps':{
                      'innerFormItem':true,
                    },
                  },
                  {
                    type: 'layout',
                    'layoutProps':{
                      'innerFormItem': true,
                      
                      style: {
                        padding:0,  
                      },
                    },
                    passProps: {
                      style: {
                        padding:0,  
                      }
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
                        onclickThisProp:'formdata',
                        fetchProps:{
                          method:'DELETE',
                        },
                        successProps:{
                          success: {
                            notification: {
                              text: 'Deleted',
                              timeout: 4000,
                              type: 'success',
                            },
                          },
                          successCallback: 'func:this.props.reduxRouter.push',
                          successProps:`${manifestPrefix}/${pluralize(label)}`,
                        },
                        buttonProps: {
                          color:'isDanger',
                        },
                        confirmModal:{},
                      },
                    },
                  },
                ],
              },
            ],	
          },
        ],
      },],
    },
  };
  // let formElements = top.props.formgroups[0].formElements;
  let result = [ top, ];
  // let index = 0;
  // for (let key in schema) {
  //   let data = (schema[key] && schema[key].type && DICTIONARY[Symbol.for(schema[key].type)]) ? schema[key].type : schema[key];
  //   let type = DICTIONARY[Symbol.for(data)];
  //   if (type && type !== 'array' && !Array.isArray(data)) formElements[0][(index++ % 2 === 0) ? 'formGroupElementsLeft' : 'formGroupElementsRight'].push(autoFormElements.buildInputComponent(key, type));
  //   else if (data && typeof data === 'object' && !Array.isArray(data)) top.props.formgroups.push(autoFormElements.buildFormGroup(key, data, true));
  //   else if (Array.isArray(data)) result.push(autoFormElements.handleTable(key, data));
  // }
  return result;
};

module.exports = buildAdvancedDetail;
