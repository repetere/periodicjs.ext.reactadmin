'use strict';
const Promisie = require('promisie');
const fs = require('fs-extra');
const path = require('path');
const MANIFEST = require(path.join(__dirname, '../adminclient/src/content/config/manifest'));
const NAVIGATION = require(path.join(__dirname, '../adminclient/src/content/config/navigation'));
const COMPONENTS = {
  login: {
    status: 'uninitialized'
  },
  main: {
    footer: { status: 'uninitialized' },
    header: { status: 'uninitialized' }
  }
};

var CoreController;
var logger;
var appSettings;
var appenvironment;
var CoreUtilities;

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
      user: req.user
      // adminPostRoute: adminPostRoute
    };

  CoreController.renderView(req, res, viewtemplate, viewdata);
};

var loadManifest = function (req, res) {
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: MANIFEST
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

var loadUserPreferences = function (req, res) {
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: (req.user && req.user.extensionattributes && req.user.extensionattributes.preferences) ? req.user.extensionattributes.preferences : {}
    }
  });
};

var loadNavigation = function (req, res) {
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: NAVIGATION
    }
  });
};

module.exports = function (resources) {
  appSettings = resources.settings;
  appenvironment = appSettings.application.environment;
  CoreController = resources.core.controller;
  CoreUtilities = resources.core.utilities;
  logger = resources.logger;

  return { 
    index: admin_index,
    loadManifest,
    loadComponent,
    loadUserPreferences,
    loadNavigation
  };
};
