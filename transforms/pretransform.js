'use strict';
// const item = require('./item');

module.exports = (periodic) => {
  return {
    GET: {
      '/dsa/item/:id': [
        // item.itemFieldFilter,
      ],
    },
    PUT: {
      '/dsa/item/:id': [
        // item.itemUpdate(periodic),
      ],
    },
  };
};