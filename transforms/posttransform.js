'use strict';
const helper = require('./helper');
const asset = require('./asset');

module.exports = (periodic) => {
  return {
    GET: {
      [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
        asset.formatAssetItem(periodic),
        asset.getFileMetaInfo(periodic),
      ],
      [ helper.getAdminPathname(periodic, '/contentdata/assets') ]: [
        asset.formatAssetIndex(periodic),
      ],
    },
  };
};