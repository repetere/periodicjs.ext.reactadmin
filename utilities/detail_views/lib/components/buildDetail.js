'use strict';

const flatten = require('flat');
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
const DICTIONARY = require('../dictionary');
const autoFormElements = require('./autoFormElements');
const publishOptions = require('./publishOptions');
pluralize.addIrregularRule('data', 'datas');

const buildDetail = function (schema, label, options = {}, newEntity) {
  // if (label === 'creditengine') {
  //   // console.log({ label, schema, });
  // }
  let customCardProps = helpers.getCustomCardProps(options);  
  let customFormGroups = helpers.getCustomFormGroups(schema, label, options);  
  let customIgnoreFields = helpers.getCustomEntityIgnoreFields(schema, label, options);
  let elems = [];
  // let usablePrefix = helpers.getDataPrefix(options.prefix);
  let usablePrefix = helpers.getDataPrefix(options.prefix, undefined, schema, label, options);

  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  let top = {
    component: 'ResponsiveForm',
    asyncprops: {
      // formdata2: [helpers.getDetailLabel(label), label, ],
    },
    props: {
      onSubmit:{
        url: (newEntity)
          ?`${options.extsettings.basename}${usablePrefix}/${pluralize(label)}?format=json`
          :`${options.extsettings.basename}${usablePrefix}/${pluralize(label)}/:id?format=json&unflatten=true`,
        params: (newEntity)?undefined:[
          { 'key': ':id', 'val': '_id', },
        ],
        options:{
          method:(newEntity)?'POST':'PUT',
        },
        success: true,
        successCallback:(newEntity)?'func:this.props.reduxRouter.push':undefined,
        successProps:(newEntity)?`${manifestPrefix}/${pluralize(label)}`:undefined,
      },
      'hiddenFields': [
        {
          'form_name':'_id',
          'form_val':'_id',
        },
      ],
      flattenFormData: true,
      flattenDataOptions: {
        maxDepth: 2,
      },
      marginBottom: 30,
      footergroups: [],
      formgroups: [
        {
          card: {
            twoColumns: true,
            props: Object.assign({}, customCardProps, {
              cardTitle: `${ capitalize(label) } Details`,
            }),
          },
          formElements: [{
            formGroupElementsLeft: [],
            formGroupElementsRight: [],	
          }, ],
        },
      ],
    },
  };
  let formElements = top.props.formgroups[0].formElements;
  let result = [ top, ];
  let index = 0;
  let flattenedSchema = flatten(schema, { maxDepth:2,  });
  for (let key in schema) {
    let data = (schema[ key ] && schema[ key ].type && DICTIONARY[ Symbol.for(schema[ key ].type) ])
      ? schema[ key ].type
      : schema[ key ];
    let type = DICTIONARY[ Symbol.for(data) ];
    // if (label === 'creditengine') {
    //   console.log({ key, data, type, });
    // }
    elems.push({ key, label, type, data, });
    if ([ '_id', 'id', 'content', 'title', 'name', 'authors', 'primaryauthor', 'status', 'description', 'changes', 'tags', 'categories', 'contenttypes', 'assets', 'primaryasset', ].concat(customIgnoreFields).indexOf(key) !== -1) {
      // console.log({ key, schema });
    } else if (type || (data && Array.isArray(data)) && customIgnoreFields.indexOf(key) === -1) {
      if(data && Array.isArray(data)) {
        type='array';
      }
      formElements[ 0 ][
        (index++ % 2 === 0)
          ? 'formGroupElementsLeft'
          : 'formGroupElementsRight'
      ].push(autoFormElements.buildInputComponent(key, type, schema, options));
    } else if (data && typeof data === 'object' && customIgnoreFields.indexOf(key) === -1 /*&& !Array.isArray(data)*/) {
      top.props.formgroups.push(autoFormElements.buildFormGroup(key, data, true, schema, options));
    } else if (Array.isArray(data) && customIgnoreFields.indexOf(key) !== -1) {
      result.push(autoFormElements.handleTable(key, data));
    }
  }
  result[ 0 ].props.formgroups.splice(0, 0, publishOptions.publishBasic(schema, label, options, newEntity));
  if (customFormGroups) {
    if (typeof customFormGroups === 'function') {
      result[ 0 ].props.formgroups.push(...customFormGroups(schema, label, options, newEntity));
    } else {
      result[ 0 ].props.formgroups.push(...customFormGroups);
    }
  }
  result[ 0 ].props.formgroups.push(publishOptions.publishAttributes(schema, label, options));


//   result.push(
//     // {
//     //   component: 'pre',
//     //   props: {
//     //     style: {
//     //       border: '1px solid black',
//     //     },
//     //   },
//     //   children: 'label: '+JSON.stringify(label, null, 2),
//     // },
//     {
//       component: 'pre',
//       props: {
//         style: {
//           border: '1px solid black',
//         },
//       },
//       children: 'schema: '+JSON.stringify(schema, null, 2),
//     }
//     // {
//     //   component: 'pre',
//     //   props: {
//     //     style: {
//     //       border: '1px solid black',
//     //     },
//     //   },
//     //   children: 'elems: '+JSON.stringify(elems, null, 2),
//     // }
//   );
  
  return result;
};

module.exports = buildDetail;
