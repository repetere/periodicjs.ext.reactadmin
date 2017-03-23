'use strict';

const path = require('path');
// const Promisie = require('promisie');
// const fs = Promisie.promisifyAll(require('fs-extra'));
// const Errorie = require('errorie');

module.exports = function(periodic) {
  let appenvironment = periodic.settings.application.environment;
  let defaultConfig = require(path.join(__dirname, '../config/settings.js')).development;
  let config = require(path.join(__dirname, '../../../content/config/extensions/periodicjs.ext.reactadmin/settings.js'));
  let extensionConfig = Object.assign({}, defaultConfig, { adminPath: 'p-admin', }, config[ appenvironment ]);
  // console.log({ extensionConfig });
  
  periodic.app.controller.extension.reactadmin = Object.assign({}, periodic.app.controller.extension.reactadmin, { settings:extensionConfig, });

    // periodic.app.controller.extension.reactadmin.settings.getDBConnection = mongooseLogger.getDBConnection;
    // periodic.app.locals.reactadmin_util = require('../lib/log_tables')(periodic);
  periodic.app.locals.theme_name = periodic.settings.theme;
  periodic.app.locals.adminPath = extensionConfig.adminPath;
  periodic.app.locals.extension = Object.assign({}, periodic.app.locals.extension, {
    reactadmin: {
      settings: periodic.app.controller.extension.reactadmin.settings,
    },
  });

  return periodic;
};