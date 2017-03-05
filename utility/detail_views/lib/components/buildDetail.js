'use strict';

const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
const DICTIONARY = require('../dictionary');
const autoFormElements = require('./autoFormElements');
pluralize.addIrregularRule('data', 'datas');

const buildDetail = function (schema, label, options = {}) {
  let top = {
    component: 'ResponsiveForm',
    asyncprops: {
      formdata2: [helpers.getDetailLabel(label), label, ],
    },
    props: {
      flattenFormData:true,
      marginBottom: 30,
      footergroups: [],
      formgroups: [{
        card: {
          twoColumns: true,
          props: {
            cardTitle: `${ capitalize(label) } Details`,
          },
        },
        formElements: [{
          formGroupElementsLeft: [],
          formGroupElementsRight: [],	
        },],
      },],
    },
  };
  let formElements = top.props.formgroups[0].formElements;
  let result = [top,];
  let index = 0;
  for (let key in schema) {
    let data = (schema[key] && schema[key].type && DICTIONARY[Symbol.for(schema[key].type)]) ? schema[key].type : schema[key];
    let type = DICTIONARY[Symbol.for(data)];
    if (type && type !== 'array' && !Array.isArray(data)) formElements[0][(index++ % 2 === 0) ? 'formGroupElementsLeft' : 'formGroupElementsRight'].push(autoFormElements.buildInputComponent(key, type));
    else if (data && typeof data === 'object' && !Array.isArray(data)) top.props.formgroups.push(autoFormElements.buildFormGroup(key, data, true));
    else if (Array.isArray(data)) result.push(autoFormElements.handleTable(key, data));
  }
  return result;
};

module.exports = buildDetail;
