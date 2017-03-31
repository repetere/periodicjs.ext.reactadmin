'use strict';

const path = require('path');
// const Promisie = require('promisie');
// const fs = Promisie.promisifyAll(require('fs-extra'));
// const Errorie = require('errorie');

module.exports = function(periodic) {
  let appenvironment = periodic.settings.application.environment;
  let defaultConfig = require(path.join(__dirname, '../config/settings.js')).development;
  let config = require(path.join(__dirname, '../../../content/config/extensions/periodicjs.ext.reactadmin/settings.js'));
  let extensionConfig = Object.assign({}, defaultConfig, { adminPath: 'r-admin', }, config[appenvironment]);
    // console.log({ extensionConfig });
  let reactadminConfig = {
    settings: extensionConfig,
    manifest_prefix: `${(extensionConfig.adminPath === '')
      ? ''
      : (extensionConfig.adminPath && extensionConfig.adminPath.charAt(0) === '/')
        ? extensionConfig.adminPath
        : '/' + extensionConfig.adminPath}`,
  };

  periodic.app.controller.extension.reactadmin = Object.assign({}, periodic.app.controller.extension.reactadmin, reactadminConfig);

    // periodic.app.controller.extension.reactadmin.settings.getDBConnection = mongooseLogger.getDBConnection;
    // periodic.app.locals.reactadmin_util = require('../lib/log_tables')(periodic);
  periodic.app.locals.theme_name = periodic.settings.theme;
  periodic.app.locals.adminPath = extensionConfig.adminPath;
  periodic.app.locals.extension = Object.assign({}, periodic.app.locals.extension, {
    reactadmin: reactadminConfig,
  });

  return periodic;
};