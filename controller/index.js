'use strict';

const path = require('path');

module.exports = function(resources) {
  const reactadmin = require(path.resolve(__dirname, './reactadmin'))(resources);
  const helper = require(path.resolve(__dirname, './helper'))(resources);
  const transform = require(path.resolve(__dirname, './transform'))(resources);
  const contentdata = require(path.resolve(__dirname, './contentdata'))(resources);

  return {
    reactadmin,
    helper,
    transform,
    contentdata,
  };
};