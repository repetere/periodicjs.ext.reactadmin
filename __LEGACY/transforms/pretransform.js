'use strict';
// const helper = require('./helper');
// const asset = require('./asset');
// const item = require('./item');
const account = require('./account');

module.exports = (periodic) => {
  const reactadmin = periodic.app.locals.extension.reactadmin;
  return {
    GET: {
      // [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
      //   asset.get_file_meta_info(periodic),
      // ],
    },
    PUT: {
      [ `${reactadmin.manifest_prefix}contentdata/standard/accounts/:id` ]: [
        account.checkUpdatedAsset(periodic),
      ],
      [ `${reactadmin.manifest_prefix}contentdata/standard/account/:id` ]: [
        account.checkUpdatedAsset(periodic),
      ],
    },
  };
};