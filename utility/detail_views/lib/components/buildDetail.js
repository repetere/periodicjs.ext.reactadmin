'use strict';

const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
const DICTIONARY = require('../dictionary');
const autoFormElements = require('./autoFormElements');
const publishOptions = require('./publishOptions');
pluralize.addIrregularRule('data', 'datas');

const buildDetail = function (schema, label, options = {}) {
  let elems = [];
  let usablePrefix = helpers.getDataPrefix(options.prefix);
  let top = {
    component: 'ResponsiveForm',
    asyncprops: {
      // formdata2: [helpers.getDetailLabel(label), label, ],
    },
    props: {
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
      flattenFormData:true,
      marginBottom: 30,
      footergroups: [],
      formgroups: [
        {
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
        },
      ],
    },
  };
  let formElements = top.props.formgroups[0].formElements;
  let result = [ top, ];
  let index = 0;
  for (let key in schema) {
    let data = (schema[ key ] && schema[ key ].type && DICTIONARY[ Symbol.for(schema[ key ].type) ])
      ? schema[ key ].type
      : schema[ key ];
    let type = DICTIONARY[ Symbol.for(data) ];
    elems.push({key,label,type,data});
    if ([ '_id', 'id', 'content', 'title', 'name', 'status', 'description', ].indexOf(key) !== -1) {
      // console.log({ key, schema });
    } else if (type || (data && Array.isArray(data))) {
      if(data && Array.isArray(data)) {
        type='array';
      }
      formElements[ 0 ][
        (index++ % 2 === 0)
          ? 'formGroupElementsLeft'
          : 'formGroupElementsRight'
      ].push(autoFormElements.buildInputComponent(key, type, schema, options));
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      top.props.formgroups.push(autoFormElements.buildFormGroup(key, data, true));
    } else if (Array.isArray(data)) {
      result.push(autoFormElements.handleTable(key, data));
    }
  }
  result[ 0 ].props.formgroups.splice(0, 0, publishOptions.publishBasic(schema, label, options));
  result.push(
    {
      component: 'pre',
      props: {
        style: {
          border: '1px solid black',
        },
      },
      children: 'label: '+JSON.stringify(label, null, 2),
    },
    {
      component: 'pre',
      props: {
        style: {
          border: '1px solid black',
        },
      },
      children: 'schema: '+JSON.stringify(schema, null, 2),
    },
    {
      component: 'pre',
      props: {
        style: {
          border: '1px solid black',
        },
      },
      children: 'elems: '+JSON.stringify(elems, null, 2),
    }
  );
  return result;
};

module.exports = buildDetail;
