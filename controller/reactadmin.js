'use strict';
const Promisie = require('promisie');
const fs = require('fs-extra');
const path = require('path');

let CoreController;
let logger;
let appSettings;
let appenvironment;
let CoreUtilities;
let dbloggerSettings;
let mongooseLogger;


/**
 * index page for react admin, that serves admin app
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 * @return {null}        does not return a value
 */
var admin_index = function(req,res){
  let viewtemplate = {
      viewname: 'admin/index',
      themefileext: appSettings.templatefileextension,
      extname: 'periodicjs.ext.reactadmin'
    },
    viewdata = {
      pagedata: {
        title: 'React Admin',
        // toplink: '&raquo; Multi-Factor Authenticator',
      },
      user: req.user,
      // adminPostRoute: adminPostRoute
    };

  CoreController.renderView(req, res, viewtemplate, viewdata);
};

module.exports = function(resources) {
  appSettings = resources.settings;
  appenvironment = appSettings.application.environment;
  CoreController = resources.core.controller;
  CoreUtilities = resources.core.utilities;
  // dbloggerSettings = resources.app.controller.extension.dblogger.settings;

  // let dbloggerController = CoreController.controller_routes(cronSettings);

  // return dbloggerController;
  return { 
    index: admin_index,
  };
};