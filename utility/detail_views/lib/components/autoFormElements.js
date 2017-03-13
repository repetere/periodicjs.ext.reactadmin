'use strict';
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
const DICTIONARY = require('../dictionary');
pluralize.addIrregularRule('data', 'datas');

var generateTableElement = function (label, data) {
  if (data.length > 1) {
    data = data.reduce((result, val, index) => {
      result[0] = result[0] || {};
      if (val && typeof val === 'object') return [Object.assign(result[0], val), ];
      else result[0][index] = val;
    }, []);
  }
  let elem = data[0];
  if (Array.isArray(elem)) return generateTableElement(label, elem);
  else {
    elem = (elem && elem.type && DICTIONARY[Symbol.for(elem.type)]) ? elem.type : elem;
    if (DICTIONARY[Symbol.for(elem)]) return [{ label: 'values', }, ];
    else return Object.keys(elem).reduce((result, key) => {
      result.push({ label: key, });
      return result;
    }, []);
  }
};

var handleTable = function (label, data) {
  return {
    component: 'ResponsiveCard',
    props: {
      cardTitle: pluralize(label),
    },
    children: [{
      component: 'ResponsiveTable',
      props: {
        headers: generateTableElement(label, data),
      },
    }, ],
  };
};

var buildInputComponent = function (label, type, schema, options) {
  let input = {
    type: (['text', 'boolean', 'id', '_id', ].indexOf(type) !== -1) ? 'text' : type,
    label: capitalize.words(label.replace(/_/g, ' ')),
    labelProps: {
      style: {
        flex:3,
      },
    },
    name: (type==='_id' &&(label==='id'||label==='_id')) ? '_id': label.replace(/\s/g, '.'),
    layoutProps: {
      horizontalform: true,
    },
  };
  if ((type === '_id' || type==='array') && (schema && schema[label])) {

    let usablePrefix = helpers.getDataPrefix(options.prefix);
    // let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
    // console.log('-----','-----','-----','-----');
    // if(!schema || !schema[label]){
    //   console.log('missing label schema',label,schema);
    // }
    // console.log('schema[label]',schema[label]);
    let entity = label;
    if(schema[label] && Array.isArray(schema[label]) &&schema[label].length && schema[label][0].ref ){
      entity = schema[label][0].ref;
    } else if(schema[label] && schema[label].ref){
      entity = schema[label].ref;
    }
    // console.log(label,'entity',entity,'schema[label].length',schema[label].length,'schema[label]',schema[label]);


    input.type = 'datalist';
    input.placeholder=`${capitalize(label)} › ${entity}`;
    input.datalist = {
      selector: '_id',
      displayField: 'title',
      multi: (type === 'array') ? true : false,
      field:label,
      entity:entity.toLowerCase(),
      resourceUrl: `${options.extsettings.basename}/${usablePrefix}/${pluralize(entity.toLowerCase())}/?format=json`,
    };
  }
  if (type === 'boolean') {
    input.type = 'select';
    input.options = [
      {
        'label': 'True',
        'value': 'true',
      },
      {
        'label': 'False',
        'value': 'false',
      },
    ];
  }
  if (label === 'entitytype') {
    input.passProps = {
      state: 'isDisabled',
    };
  }
  return input;
};

var handleFormElements = function (label, value, schema, options) {
  value = (value && value.type && DICTIONARY[Symbol.for(value.type)]) ? value.type : value;
  let type = DICTIONARY[Symbol.for(value)];
  if (type && type !== 'array' && !Array.isArray(value)) return buildInputComponent(label, type, schema, options);
  else if (value && typeof value === 'object' && !Array.isArray(value)) return buildFormGroup(label, value); 
  else if (Array.isArray(value)) return handleTable(label, value);
};

var buildFormGroup = function (label, data, isRoot = false, schema, options) {
  return {
    card: {
      twoColumns: isRoot,
      props: {
        cardTitle: `${ capitalize.words(label) }`,
      },
    },
    formElements: (isRoot) ? Object.keys(data).reduce((result, key, index) => {
      result[0] = result[0] || {
        formGroupElementsLeft: [],
        formGroupElementsRight: [],
      };
      let elem = handleFormElements(`${ label } ${ key }`, data[key], schema, options);
      result[0][(index % 2 === 0) ? 'formGroupElementsLeft' : 'formGroupElementsRight'].push(elem);
      return result;
    }, []) : Object.keys(data).reduce((result, key) => {
      let elem = handleFormElements(`${ label } ${ key }`, data[key], schema, options);
      result.push(elem);
      return result;
    }, []),
  };
};

module.exports = {
  generateTableElement,
  handleTable,
  buildInputComponent,
  handleFormElements,
  buildFormGroup,
};