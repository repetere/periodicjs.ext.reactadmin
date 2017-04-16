'use strict';

const path = require('path');
const route_prefixes = require('./route_prefixes');
// const Promisie = require('promisie');
// const fs = Promisie.promisifyAll(require('fs-extra'));
// const Errorie = require('errorie');

module.exports = function (periodic) {
  let appenvironment = periodic.settings.application.environment;
  let defaultConfig = require(path.join(__dirname, '../config/settings.js')).development;
  let config = require(path.join(__dirname, '../../../content/config/extensions/periodicjs.ext.reactadmin/settings.js'));
  let extensionConfig = Object.assign({}, defaultConfig, { adminPath: 'r-admin', }, config[appenvironment]);
  //   // console.log({ extensionConfig });
  // let route_prefix = `${(extensionConfig.adminPath === '')
  //   ? '/'
  //   : (extensionConfig.adminPath && extensionConfig.adminPath.charAt(0) === '/')
  //     ? extensionConfig.adminPath
  //     : '/' + extensionConfig.adminPath}`;
  // let admin_prefix = route_prefix.substr(1);
  // let manifest_prefix = (admin_prefix.length > 0) ? `/${admin_prefix}/` : '/';

  // console.log({
  //   route_prefix,
  //   admin_prefix,
  //   manifest_prefix,
  // });
  // console.log({
  //   'route_prefixes.route_prefix':route_prefixes.route_prefix(extensionConfig.adminPath),
  //   'route_prefixes.admin_prefix':route_prefixes.admin_prefix(extensionConfig.adminPath),
  //   'route_prefixes.manifest_prefix':route_prefixes.manifest_prefix(extensionConfig.adminPath),
  // });
  let reactadminConfig = {
    settings: extensionConfig,
    route_prefix: route_prefixes.route_prefix(extensionConfig.adminPath),
    admin_prefix: route_prefixes.admin_prefix(extensionConfig.adminPath),
    manifest_prefix: route_prefixes.manifest_prefix(extensionConfig.adminPath),
  };
  // console.log({
  //   route_prefix, /r-admin
  //   admin_prefix, r-admin
  //   manifest_prefix, /r-admin/
  // });

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