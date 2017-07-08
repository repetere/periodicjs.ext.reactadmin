'use strict';
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
const DICTIONARY = require('../dictionary');
pluralize.addIrregularRule('data', 'datas');

var generateTableElement = function (label, data) {
  try {
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
      if (elem !== null && elem !== undefined) {
        elem = (elem && elem.type && DICTIONARY[Symbol.for(elem.type)]) ? elem.type : elem;
        if (DICTIONARY[Symbol.for(elem)]) return [{ label: 'values', }, ];
        else return Object.keys(elem).reduce((result, key) => {
          result.push({ label: key, });
          return result;
        }, []);
      }
    } 
  } catch (e) {
    console.log({ label, data, }, e);
    return false;
  }
 
};

var handleTable = function (label, data, schema, options) {
  let customCardProps = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customCardProps)
  ? options.extsettings.extension_overrides.customCardProps
  : {};  
  return {
    component: 'ResponsiveCard',
    props:  Object.assign({}, customCardProps, {
      cardTitle: pluralize(label),
    }),
    children: [{
      component: 'ResponsiveTable',
      props: {
        headers: generateTableElement(label, data),
      },
    }, ],
  };
};

var buildInputComponent = function (label, type, schema, options) {
  // console.log('buildInputComponent',{ label, type, schema, });
  // if (schema && schema.entitytype && schema.entitytype.default && schema.entitytype.default==='credit_engine'){
  //   console.log('buildInputComponent', 'schema.entitytype', schema.entitytype, { label, type, });
  // }

  let schema_entity_type = (schema && schema.entitytype && schema.entitytype.default)
    ? schema.entitytype.default
    : false;
  let customEntitytypeElement = (schema_entity_type && options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customEntitytypeElements && options.extsettings.extension_overrides.customEntitytypeElements[ schema_entity_type ])
    ? options.extsettings.extension_overrides.customEntitytypeElements[ schema_entity_type ]
    : false;

  let customInput = (schema_entity_type && customEntitytypeElement && customEntitytypeElement[ label ])
    ? customEntitytypeElement[ label ]
    : {};
  // console.log({customInput})
  
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
  if ((customInput && customInput.type && customInput.type==='datalist') || (type === '_id' || type==='array' ) && (schema && schema[label])) {

    let usablePrefix = helpers.getDataPrefix(options.prefix);
    let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
    
    let entity = helpers.getSchemaEntity({ schema, label, });
    // console.log(label,'entity',entity,'schema[label].length',schema[label].length,'schema[label]',schema[label]);

    input.type = 'datalist';
    input.placeholder=`${capitalize(label)} › ${entity}`;
    input.datalist = {
      selector: '_id',
      displayField: 'title',
      multi: (type === 'array') ? true : false,
      field:label,
      dbname: options.dbname ||'periodic',
      entity: entity.toLowerCase(),
      resourcePreview: `${manifestPrefix}/${pluralize(entity.toLowerCase())}`,
      resourceUrl: `${options.extsettings.basename}${usablePrefix}/${pluralize(entity.toLowerCase())}/?format=json`,
    };
    // console.log('input.datalist.resourceUrl', input.datalist.resourceUrl);
    // if(!schema || !schema[label]){
    //   console.log('missing label schema',label,schema);
    // }
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
  if (label === 'entitytype' || label === 'createdat' || label === 'updatedat' || label === 'publishat') {
    input.passProps = {
      state: 'isDisabled',
    };
  }
  if (label === 'entitytype') {
    input.passProps = {
      state: 'isDisabled',
    };
  }
  if(schema && label && schema[label] && schema[label].default){
    input.value = schema[label].default;
  }
  
  input = Object.assign({}, input, customInput);
  
  return input;
};

var handleFormElements = function (label, value, schema, options) {
  try {
    value = (value && value.type && DICTIONARY[ Symbol.for(value.type) ]) ? value.type : value;
    let type = DICTIONARY[ Symbol.for(value) ];
    if (!type) {
      if (Array.isArray(value)) {
        type = DICTIONARY[ Symbol.for(value) ] || '_id';
        if (Array.isArray(value) && value.length && typeof value[0]!=='undefined' && value[0].ref) {
          value = value[ 0 ];
        }
      }
    }
    // if (schema && schema.entitytype && schema.entitytype.default && schema.entitytype.default==='credit_engine'){
    //   console.log('handleFormElements', { label, type, value });
    // }
    if (type && type !== 'array' && !Array.isArray(value)) return buildInputComponent(label, type, schema, options);  
    else if (value && typeof value === 'object' && !Array.isArray(value)) return buildFormGroup(label, value);
    else if (Array.isArray(value)) return handleTable(label, value, schema, options);
  } catch (e) {
    console.log({ label, value, schema, }, e);
    return {
      type: 'text',
      name: label,
    };
  }
};

var buildFormGroup = function (label, data, isRoot = false, schema, options) {
  let customCardProps = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customCardProps)
  ? options.extsettings.extension_overrides.customCardProps
  : {};  
  return {
    card: {
      twoColumns: isRoot,
      props: Object.assign({},customCardProps, {
        cardTitle: `${ capitalize.words(label) }`,
      }),
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