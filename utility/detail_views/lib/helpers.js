'use strict';
const pluralize = require('pluralize');
const capitalize = require('capitalize');

exports.getDataPrefix = function(prefix){
	if (!prefix || typeof prefix !== 'string') {
		return 'contentdata';
	} else {
		return prefix.replace('/content', '/contentdata');
	}
};

exports.getManifestPathPrefix = function (prefix) {
  return (prefix)
    ? `/${prefix}`
    : '';
}

exports.getDetailLabel = function (label) {
  return `${label}_detail`;
};

exports.getIndexLabel = function (label) {
  return `${label}_index`;
};