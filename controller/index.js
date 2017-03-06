'use strict';

const path = require('path');

module.exports = function(resources) {
  const reactadmin = require(path.resolve(__dirname, './reactadmin'))(resources);
  const helper = require(path.resolve(__dirname, './helper'))(resources);
  const transform = require(path.resolve(__dirname, './transform'))(resources);

  return {
    reactadmin,
    helper,
    transform,
  };
};