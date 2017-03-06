'use strict';
const helper = require('./helper');
const asset = require('./asset');

module.exports = (periodic) => {
  return {
    GET: {
      '/dsa/item/:id': [
        // item.itemFieldFilter,
      ],
    },
    PUT: {
      // [helper.getAdminPathname(periodic, '/contentdata/assets/:id')]: [
      //   asset.formatAssetUpdate(periodic),
      // ],
    },
  };
};