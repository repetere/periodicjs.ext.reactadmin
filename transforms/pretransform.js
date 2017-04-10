'use strict';
// const helper = require('./helper');
// const asset = require('./asset');
// const item = require('./item');

module.exports = (periodic) => {
  // const reactadmin = periodic.app.locals.extension.reactadmin;
  return {
    GET: {
      // [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
      //   asset.get_file_meta_info(periodic),
      // ],
    },
    PUT: {
      // [`${reactadmin.manifest_prefix}contentdata/standard/items/:id`]:item.indexFieldFilter(periodic),
      // [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
      //   asset.formatAssetUpdate(periodic),
      // ],
    },
  };
};