'use strict';
const helper = require('./helper');
const asset = require('./asset');

module.exports = (periodic) => {
  let reactadmin = periodic.app.locals.extension.reactadmin;
  return {
    GET: {
      [ `${reactadmin.manifest_prefix}contentdata/standard/assets/:id` ]: [
        asset.formatAssetItem(periodic),
        asset.getFileMetaInfo(periodic),
      ],
      [ `${reactadmin.manifest_prefix}contentdata/standard/assets` ]: [
        asset.formatAssetIndex(periodic),
      ],
    },
  };
};