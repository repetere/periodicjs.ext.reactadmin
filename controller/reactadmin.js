'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
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
var manifestSettings;
var navigationSettings;
var periodic;

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
  let index = data.indexOf(null);
  while (index > -1) {
    data.splice(index, 1);
    index = data.indexOf(null);
  }
  return data;
};

var readConfigurations = function (filePath) {
  filePath = path.join(process.cwd(), filePath);
  let _import = function (_path) {
    if (path.extname(_path) === '.js') return Promisie.resolve(require(_path));
    else return fs.readJsonAsync(_path);
  };
  return fs.statAsync(filePath)
    .then(stats => {
      if (stats.isFile()) return _import(filePath);
      else if (stat.isDirectory()) {
        return fs.readdirAsync(filePath)
          .then(files => {
            return Promisie.map(files, file => {
              let fullPath = path.join(filePath, file);
              return _import(fullPath);
            });
          })
          .catch(e => Promisie.reject(e));
      }
      else return Promisie.reject(new TypeError('Configuration path is not a file or directory'));
    })
    .catch(e => Promisie.reject(e));
};

var readAndStoreConfigurations = function (paths) {
  let reads = paths.map(_path => readConfigurations.bind(null, _path));
  return Promisie.settle(reads)
    .then(result => {
      let { fulfilled, rejected } = result;
      return fulfilled.reduce((result, value) => {
        if (Array.isArray(value)) return result.concat(value);
        result.push(value);
        return result;
      }, []);
    })
    .catch(e => Promisie.reject(e));
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

var pullNavigationData = function () {
  if (navigationSettings) return Promisie.resolve(navigationSettings);
  let _navigationSettings = periodic.app.locals.extension.reactadmin.settings.navigation;
  let _themeSettings = (periodic.app.themeconfig && periodic.app.themeconfig.settings) ? periodic.app.themeconfig.settings : false;
  if (_themeSettings) _navigationSettings = (themeSettings.navigation) ? themeSettings.navigation : navigationSettings;
  return readAndStoreConfigurations((Array.isArray(_navigationSettings)) ? _navigationSettings : [_navigationSettings])
    .then(result => {
      let navigation = result.reduce((final, config) => {
        final.wrapper = Object.assign(final.wrapper || {}, config.wrapper);
        final.container = Object.assign(final.container || {}, config.container);
        final.layout = final.layout || {};
        final.layout.children = (Array.isArray(final.layout.children)) ? final.layout.children.concat(config.layout.children || []) : config.layout.children;
        return final;
      }, {});
      navigationSettings = navigation;
      return navigationSettings;
    })
    .catch(e => Promisie.reject(e));
};

var loadNavigation = function (req, res, next) {
  pullNavigationData()
    .then(navigation => {
      navigation.layout = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), [navigation.layout])[0];
      res.status(200).send({
        result: 'success',
        status: 200,
        data: {
          settings: NAVIGATION,
        },
      });
    })
    .catch(next);
};

module.exports = function (resources) {
  periodic = resources;
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
