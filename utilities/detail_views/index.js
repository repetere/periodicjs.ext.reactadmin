'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const gather = require('./lib/gather');
const manifest = require('./lib/manifest');

var generateManifest = function generateManifest (connection, options = {}) {
  let schemas = gather(connection);
  // console.log({ schemas,options });
  let generated = manifest(schemas, options);
  if (typeof options.filePath === 'string') return fs.writeJsonAsync(options.filePath, generated);
  return generated;
};

module.exports = {
  generateManifest,
};