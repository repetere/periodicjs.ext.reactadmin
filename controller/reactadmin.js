'use strict';
const Promisie = require('promisie');
const fs = require('fs-extra');
const path = require('path');
const MANIFEST = require(path.join(__dirname, '../adminclient/src/content/config/manifest'));
const NAVIGATION = require(path.join(__dirname, '../adminclient/src/content/config/navigation'));
const ERROR404 = require(path.join(__dirname, '../adminclient/src/content/config/dynamic404'));
const COMPONENTS = {
  login: {
    status: 'uninitialized',
  },
  main: {
    footer: { status: 'uninitialized' },
    header: { status: 'uninitialized' }
  },
  error: {
    ['404']: {
      status: 'initialized',
      settings: ERROR404
    }
  }
};

var CoreController;
var logger;
var appSettings;
var appenvironment;
var CoreUtilities;

var determineAccess = function (privileges, layout) {
  if (!privileges.length && (!layout.privileges || !layout.privileges.length)) return true;
  let hasAccess = false;
  if (!layout.privileges) hasAccess = true;
  else {
    if (privileges.length) {
      for (let i = 0; i < privileges.length; i++) {
        hasAccess = (layout.privileges.indexOf(privileges[i]) !== -1);
        if (hasAccess) break;
      }
    }
  }
  return hasAccess;
};

var removeNullIndexes = function (data) {
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) data.splice(i, 1);
  }
  return data;
};

var recursivePrivilegesFilter = function (privileges, config = {}, isRoot = false) {
  privileges = (Array.isArray(privileges)) ? privileges : [];
  return Object.keys(config).reduce((result, key) => {
    let layout = (isRoot) ? config[key].layout : config[key];
    let hasAccess = determineAccess(privileges, layout);
    if (hasAccess) {
      result[key] = config[key];
      if (Array.isArray(layout.children) && layout.children.length) result[key].children = recursivePrivilegesFilter(privileges, result[key].children);
    }
    return (Array.isArray(result)) ? removeNullIndexes(result) : result;
  }, (Array.isArray(config)) ? [] : {});
};

/**
 * index page for react admin, that serves admin app
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 * @return {null}        does not return a value
 */
var admin_index = function(req, res){
  let viewtemplate = {
      viewname: 'admin/index',
      themefileext: appSettings.templatefileextension,
      extname: 'periodicjs.ext.reactadmin',
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

var loadManifest = function (req, res) {
  let manifest = MANIFEST;
  manifest.containers = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), manifest.containers, true);
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: manifest,
    },
  });
};

var loadComponent = function (req, res) {
  let component = COMPONENTS[req.params.component] || { status: 'undefined', };
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: component,
    },
  });
};

var loadUserPreferences = function (req, res) {
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: (req.user && req.user.extensionattributes && req.user.extensionattributes.preferences) ? req.user.extensionattributes.preferences : {},
    },
  });
};

var loadNavigation = function (req, res) {
  let navigation = NAVIGATION;
  navigation.layout = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), [navigation.layout])[0];
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: NAVIGATION,
    },
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
    loadNavigation,
  };
};
