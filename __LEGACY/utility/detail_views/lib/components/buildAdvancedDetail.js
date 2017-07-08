'use strict';

const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
// const DICTIONARY = require('../dictionary');
const publishOptions = require('./publishOptions');
pluralize.addIrregularRule('data', 'datas');

const buildAdvancedDetail = function (schema, label, options = {}, newEntity) {
  let customCardProps = helpers.getCustomCardProps(options);  
  let usablePrefix = helpers.getDataPrefix(options.prefix, undefined, schema, label, options);

  // let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  let top = {
    component: 'ResponsiveForm',
    asyncprops: {
      // formdata2: [helpers.getDetailLabel(label), label, ],
    },
    props: {
      stringyFormData:true,
      marginBottom: 30,
      onSubmit:{
        url: (newEntity)
          ?`${options.extsettings.basename}${usablePrefix}/${pluralize(label)}/?format=json&unflatten=true`
          :`${options.extsettings.basename}${usablePrefix}/${pluralize(label)}/:id?format=json&unflatten=true`,
        params: (newEntity)
          ? undefined
          : [
            { 'key': ':id', 'val': '_id', },
          ],
        options:{
          method: (newEntity)
            ? 'POST'
            : 'PUT',
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
            leftCardProps: Object.assign({}, customCardProps, {
              cardTitle:  `${ capitalize(label) }`,
            }),
            rightCardProps: Object.assign({}, customCardProps, {
              cardTitle: 'Publish Options',
            }),
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
                publishOptions.publishButtons(schema, label, options, newEntity),
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
