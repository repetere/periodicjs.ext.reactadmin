'use strict';
// const helper = require('./helper');
const account = require('./account');
const asset = require('./asset');

module.exports = (periodic) => {
  const reactadmin = periodic.app.locals.extension.reactadmin;
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
    PUT: {
      [ `${reactadmin.manifest_prefix}contentdata/standard/accounts/:id` ]: [
        account.updatedAccountProfile(periodic),
      ],
      [ `${reactadmin.manifest_prefix}contentdata/standard/account/:id` ]: [
        account.updatedAccountProfile(periodic),
      ],
    },
  };
};