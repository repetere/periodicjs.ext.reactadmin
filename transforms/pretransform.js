'use strict';
// const helper = require('./helper');
// const asset = require('./asset');

module.exports = (periodic) => {
  return {
    GET: {
      // [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
      //   asset.get_file_meta_info(periodic),
      // ],
    },
    PUT: {
      // [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
      //   asset.formatAssetUpdate(periodic),
      // ],
    },
  };
};