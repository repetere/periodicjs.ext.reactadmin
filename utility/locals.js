'use strict';
const path = require('path');
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const Errorie = require('errorie');

module.exports = function(periodic) {
    let appenvironment = periodic.settings.application.environment;
    let config = fs.readJsonSync(path.join(__dirname, '../../../content/config/extensions/periodicjs.ext.reactadmin/settings.json'));
    let extensionConfig = Object.assign({adminPath:'p-admin'},config[appenvironment])
    periodic.app.controller.extension.reactadmin = Object.assign({},periodic.app.controller.extension.reactadmin,{settings:extensionConfig})

    // periodic.app.controller.extension.reactadmin.settings.getDBConnection = mongooseLogger.getDBConnection;
    // periodic.app.locals.reactadmin_util = require('../lib/log_tables')(periodic);
    periodic.app.locals.theme_name = periodic.settings.theme;
    periodic.app.locals.adminPath = extensionConfig.adminPath;
    periodic.app.locals.extension = Object.assign({}, periodic.app.locals.extension, {
        reactadmin: {
            settings: periodic.app.controller.extension.reactadmin.settings
        }
    });

    return periodic;
};