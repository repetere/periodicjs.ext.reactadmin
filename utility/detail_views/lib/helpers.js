'use strict';
// const pluralize = require('pluralize');
// const capitalize = require('capitalize');

exports.getDataPrefix = function (prefix, dbname = 'standard', schema, label, options) {
  let customDBName = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customdb && options.extsettings.extension_overrides.customdb[ label ] && options.extsettings.extension_overrides.customdb[ label ])
    ? options.extsettings.extension_overrides.customdb[label]
    : dbname;
  let customPrefix = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customResourcePrefixes && options.extsettings.extension_overrides.customResourcePrefixes[ label ] && options.extsettings.extension_overrides.customResourcePrefixes[ label ])
    ? options.extsettings.extension_overrides.customResourcePrefixes[label]
    : false;
  // console.log({ customDBName, customPrefix, label, });
  // console.log({prefix,dbname,schema,label,options})
  let useableDataPrefix;
  if (customPrefix) {
    useableDataPrefix = customPrefix;
  } else if (!prefix || typeof prefix !== 'string') {
    useableDataPrefix = `contentdata/${customDBName}`;
  } else {
    useableDataPrefix = prefix.replace('/content', `/contentdata/${customDBName}`);
  }
  useableDataPrefix = (useableDataPrefix.charAt(0) !== '/')
    ? `/${useableDataPrefix}`
    : useableDataPrefix;
  // console.log({ useableDataPrefix });
  return useableDataPrefix.replace('//', '/');
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

exports.getCustomIndexTableHeaders = function (schema, label, options) {
  let customIndexTable = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customIndexTables && options.extsettings.extension_overrides.customIndexTables[ label ])
    ? options.extsettings.extension_overrides.customIndexTables[ label ]
    : false;
  return customIndexTable;
};

exports.getCustomIndexTableProps = function (schema, label, options) {
  let customIndexTableProps = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customIndexTableProps && options.extsettings.extension_overrides.customIndexTableProps[ label ])
    ? options.extsettings.extension_overrides.customIndexTableProps[ label ]
    : false;
  return customIndexTableProps;
};

exports.getExtensionOverride = function (field, schema, label, options, defaultReturn = null) {
  let extOverride = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides[field] && options.extsettings.extension_overrides[field][ label ])
    ? options.extsettings.extension_overrides[field][ label ]
    : defaultReturn;
  return extOverride;
};

exports.getSettingOverride = function (field, schema, label, options, defaultReturn = null) {
  let extOverride = (options && options.extsettings && options.extsettings && options.extsettings[ field ] && options.extsettings[ field ][ label ])
    ? options.extsettings[ field ][ label ]
    : defaultReturn;
  return extOverride;
};

exports.getCustomCardProps = function (options) {
  let customCardProps = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.customCardProps)
    ? Object.assign({}, options.extsettings.extension_overrides.customCardProps)
    : {};
  return customCardProps;
};

exports.getManifestPathPrefix = function (prefix, dbname ='standard') {
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