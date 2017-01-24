'use strict';
const Promisie = require('promisie');
const fs = require('fs-extra');
const path = require('path');
const COMPONENTS = {
  login: {
    status: 'uninitialized'
  },
  main: {
    footer: { status: 'uninitialized' },
    header: { status: 'uninitialized' }
  }
};

let CoreController;
let logger;
let appSettings;
let appenvironment;
let CoreUtilities;
let dbloggerSettings;
let mongooseLogger;
let periodic;


/**
 * index page for react admin, that serves admin app
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 * @return {null}        does not return a value
 */
var admin_index = function(req,res){
  let reactSettings = periodic.app.locals.extension.reactadmin.settings;
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
      __padmin: reactSettings
      // adminPostRoute: adminPostRoute
    };

  CoreController.renderView(req, res, viewtemplate, viewdata);
};

var loadSettings = function (req, res) {
  let reactSettings = periodic.app.locals.extension.reactadmin.settings;
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: reactSettings
    }
  });
};

var loadComponent = function (req, res) {
  let component = COMPONENTS[req.params.component] || { status: 'undefined' };
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: component
    }
  });
};

module.exports = function (resources) {
  periodic = resources;
  appSettings = resources.settings;
  appenvironment = appSettings.application.environment;
  CoreController = resources.core.controller;
  CoreUtilities = resources.core.utilities;
  // dbloggerSettings = resources.app.controller.extension.dblogger.settings;

  // let dbloggerController = CoreController.controller_routes(cronSettings);

  // return dbloggerController;
  return { 
    index: admin_index,
    loadSettings,
    loadComponent
  };
};
