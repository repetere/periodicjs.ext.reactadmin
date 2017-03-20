'use strict';
// const pluralize = require('pluralize');
// const capitalize = require('capitalize');

exports.getDataPrefix = function (prefix, dbname = 'periodic', schema, label, options) {
  let customDBName = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customdb && options.extsettings.extension_overrides.customdb[ label ] && options.extsettings.extension_overrides.customdb[ label ])
    ? options.extsettings.extension_overrides.customdb[label]
    : dbname;
  let customPrefix = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customResourcePrefixes && options.extsettings.extension_overrides.customResourcePrefixes[ label ] && options.extsettings.extension_overrides.customResourcePrefixes[ label ])
    ? options.extsettings.extension_overrides.customResourcePrefixes[label]
    : false;
  // console.log({ customDBName, customPrefix, label, });
  // console.log({prefix,dbname,schema,label,options})
  if (customPrefix) {
    return customPrefix;
  } else if (!prefix || typeof prefix !== 'string') {
    return `contentdata/${customDBName}`;
  } else {
    return prefix.replace('/content', `/contentdata/${customDBName}`).replace('//','/');
  }
};

exports.getCustomEntityIgnoreFields = function (schema, label, options) {
  let customIgnoreFields = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.ignoreEntityFields && options.extsettings.extension_overrides.ignoreEntityFields[ label ])
    ? options.extsettings.extension_overrides.ignoreEntityFields[ label ]
    : [];
  return customIgnoreFields;
};

exports.getCustomFormGroups = function (schema, label, options) {
  let customFormGroups = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customFormgroups && options.extsettings.extension_overrides.customFormgroups[ label ])
    ? options.extsettings.extension_overrides.customFormgroups[ label ]
    : null;
  return customFormGroups;
};

exports.getCustomCardProps = function (options) {
  let customCardProps = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customCardProps)
    ? options.extsettings.extension_overrides.customCardProps
    : {};
  return customCardProps;
};

exports.getManifestPathPrefix = function (prefix, dbname ='periodic') {
  let manifestPrefix =  (prefix)
    ? `/${prefix}/${dbname}`
    : `/${dbname}`;
  return manifestPrefix.replace('//', '/');
};

exports.getDetailLabel = function (label) {
  return `${label}_detail`;
};

exports.getIndexLabel = function (label) {
  return `${label}_index`;
};

exports.getSchemaEntity = function (options) {
  let { label, schema, } = options;
  let entity = label;
  if (schema[ label ] && Array.isArray(schema[ label ]) && schema[ label ].length && schema[ label ][ 0 ].ref) {
    entity = schema[ label ][ 0 ].ref;
  } else if (schema[ label ] && schema[ label ].ref) {
    entity = schema[ label ].ref;
  }
  return entity;
};