'use strict';
// const pluralize = require('pluralize');
// const capitalize = require('capitalize');

exports.getDataPrefix = function(prefix, dbname ='periodic'){
  if (!prefix || typeof prefix !== 'string') {
    return `contentdata/${dbname}`;
  } else {
    return prefix.replace('/content', `/contentdata/${dbname}`);
  }
};

exports.getManifestPathPrefix = function (prefix, dbname ='periodic') {
  return (prefix)
    ? `/${prefix}/${dbname}`
    : `/${dbname}`;
};

exports.getDetailLabel = function (label) {
  return `${label}_detail`;
};

exports.getIndexLabel = function (label) {
  return `${label}_index`;
};

exports.getSchemaEntity = function(options){
  let { label, schema, } = options;
  let entity = label;
  if(schema[label] && Array.isArray(schema[label]) &&schema[label].length && schema[label][0].ref ){
    entity = schema[label][0].ref;
  } else if(schema[label] && schema[label].ref){
    entity = schema[label].ref;
  }
  return entity;
}