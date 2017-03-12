'use strict';

const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
// const DICTIONARY = require('../dictionary');
const publishOptions = require('./publishOptions');
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
      formgroups: [
        {
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
                publishOptions.id(),
                publishOptions.createdat(),
                publishOptions.updatedat(),
                publishOptions.publishButtons(schema, label, options),
              ],	
            },
          ],
        },
      ],
    },
  };
  // let formElements = top.props.formgroups[0].formElements;
  let result = [ top, ];
  return result;
};

module.exports = buildAdvancedDetail;
