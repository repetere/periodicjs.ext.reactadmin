'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const path = require('path');
const ERROR404 = require(path.join(__dirname, '../adminclient/src/content/config/dynamic404'));

var components = {
  login: {
    status: 'uninitialized',
  },
  main: {
    footer: { status: 'uninitialized' },
    header: { status: 'uninitialized' }
  },
  error: {
    '404': {
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
var themeSettings;

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
      else if (stats.isDirectory()) {
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
  paths = (Array.isArray(paths)) ? paths : [paths];
  let reads = paths.map(_path => {
    if (typeof _path === 'string') return readConfigurations.bind(null, _path);
    return () => {
      console.log({ _path });
      return Promisie.reject(new Error('No path specified'));
    };
  });
  return Promisie.settle(reads)
    .then(result => {
      //if (result.rejected && result.rejected.length) console.log(result.rejected[0].value);
      let { fulfilled } = result;
      return fulfilled.reduce((result, data) => {
        if (Array.isArray(data)) return result.concat(data.value);
        result.push(data.value);
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

var handleManifestCompilation = function (manifests) {
  return manifests.reduce((result, manifest) => {
    result.containers = Object.assign(result.containers || {}, manifest.containers);
    return result;
  }, {});
};

var pullManifestSettings = function (configuration) {
  let extensions = configuration.extensions || [];
  let filePaths = extensions.reduce((result, config) => {
    if (config.periodicConfig && config.periodicConfig.manifests) {
      if (Array.isArray(config.periodicConfig.manifests)) return result.concat(config.periodicConfig.manifests);
      result.push(config.periodicConfig.manifests);
    }
    return result;
  }, []);
  return readAndStoreConfigurations(filePaths || [])
    .then(handleManifestCompilation)
    .catch(e => Promisie.reject(e));
};

var handleNavigationCompilation = function (navigation) {
  return navigation.reduce((result, nav) => {
    result.wrapper = Object.assign(result.wrapper || {}, nav.wrapper);
    result.container = Object.assign(result.container || {}, nav.container);
    result.layout = result.layout || { children: [] };
    result.layout.children = result.layout.children.concat(nav.layout.children);
    return result;
  }, {});
};

var pullNavigationSettings = function (configuration) {
  let extensions = configuration.extensions || [];
  let filePaths = extensions.reduce((result, config) => {
    if (config.periodicConfig && config.periodicConfig.navigation) result.push(config.periodicConfig.navigation);
    return result;
  }, []);
  return readAndStoreConfigurations(filePaths || [])
    .then(handleNavigationCompilation)
    .catch(e => Promisie.reject(e));
};

var finalizeSettingsWithTheme = function (data) {
  let filePath = path.join(__dirname, '../../../content/themes', appSettings.theme || appSettings.themename, 'periodicjs.reactadmin.json');
  return fs.accessAsync(filePath)
    .then(() => fs.readJsonAsync(filePath))
    .then(result => {
      result = result['periodicjs.ext.reactadmin'];
      return Promisie.parallel({
        manifests: readAndStoreConfigurations.bind(null, result.manifests || []),
        navigation: readAndStoreConfigurations.bind(null, result.navigation || [])
      });
    })
    .then(result => {
      let { manifests, navigation } = result;
      manifests = handleManifestCompilation(manifests);
      manifests.containers = Object.assign({}, data.default_manifests.containers, data.manifests.containers, manifests.containers);
      navigation = handleNavigationCompilation(navigation);
      let navigationChildren = (data.default_navigation.layout && Array.isArray(data.default_navigation.layout.children)) ? data.default_navigation.layout.children : [];
      navigation.wrapper = Object.assign({}, data.default_navigation.wrapper, data.navigation.wrapper, navigation.wrapper);
      navigation.container = Object.assign({}, data.default_navigation.container, data.navigation.container, navigation.container);
      navigation.layout = navigation.layout || { children: [] };
      navigation.layout.children = (!navigation.layout.children.length) ? navigationChildren.concat((data.navigation.layout && Array.isArray(data.navigation.layout.children)) ? data.navigation.layout.children : []) : navigation.layout.children;
      return { manifest: manifests, navigation };
    })
    .catch(e => {
      console.error(`There is not a reactadmin config for ${ appSettings.theme || appSettings.themename }`, e);
      let manifest = { containers: Object.assign({}, data.default_manifests.containers, data.manifests.containers) };
      let navigationChildren = (data.default_navigation.layout && Array.isArray(data.default_navigation.layout.children)) ? data.default_navigation.layout : [];
      let navigation = {
        wrapper: Object.assign({}, data.default_navigation.wrapper, data.navigation.wrapper),
        container: Object.assign({}, data.default_navigation.container, data.navigation.container),
        layout: Object.assign({}, data.default_navigation.layout, data.navigation.layout, { 
          children: navigationChildren.concat((data.navigation.layout && Array.isArray(data.navigation.layout.children)) ? data.navigation.layout.children : []) 
        })
      };
      return { manifest, navigation };
    });
};

var sanitizeConfigurations = function (data) {
  return Object.keys(data).reduce((result, key) => {
    if (key === 'default_manifests') result[key] = handleManifestCompilation(data[key]);
    else if (key === 'default_navigation') result[key] = handleNavigationCompilation(data[key]);
    else result[key] = data[key];
    return result;
  }, {});
};

var pullConfigurationSettings = function () {
  if (manifestSettings && navigationSettings) return Promisie.resolve({ manifest: manifestSettings, navigation: navigationSettings });
  return Promisie.all(fs.readJsonAsync(path.join(__dirname, '../../../content/config/extensions.json')), fs.readJsonAsync(path.join(__dirname, '../periodicjs.reactadmin.json')))
    .then(configurationData => {
      let [configuration, adminExtSettings] = configurationData;
      adminExtSettings = adminExtSettings['periodicjs.ext.reactadmin'];
      return Promisie.parallel({
        manifests: pullManifestSettings.bind(null, configuration),
        navigation: pullNavigationSettings.bind(null, configuration),
        default_manifests: readAndStoreConfigurations.bind(null, adminExtSettings.manifests || []),
        default_navigation: readAndStoreConfigurations.bind(null, adminExtSettings.navigation || [])
      });
    })
    .then(sanitizeConfigurations)
    .then(finalizeSettingsWithTheme)
    .then(result => {
      let { manifest, navigation } = result;
      manifestSettings = manifest;
      navigationSettings = navigation;
      return result;
    })
    .catch(e => Promisie.reject(e));
};

var loadManifest = function (req, res, next) {
  pullConfigurationSettings()
    .then(settings => {
      let manifest = settings.manifest;
      manifest.containers = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), manifest.containers, true);
      res.status(200).send({
        result: 'success',
        status: 200,
        data: {
          settings: manifest,
        },
      });
    })
    .catch(next);
};

var loadComponent = function (req, res) {
  let component = components[req.params.component] || { status: 'undefined', };
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

var loadNavigation = function (req, res, next) {
  pullConfigurationSettings()
    .then(settings => {
      let navigation = settings.navigation;
      navigation.layout = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), [navigation.layout])[0];
      res.status(200).send({
        result: 'success',
        status: 200,
        data: {
          settings: navigation,
        },
      });
    })
    .catch(next);
};

module.exports = function (resources) {
  periodic = resources;
  appSettings = resources.settings;
  themeSettings = resources.settings.themeSettings;
  appenvironment = appSettings.application.environment;
  CoreController = resources.core.controller;
  CoreUtilities = resources.core.utilities;
  logger = resources.logger;
  pullConfigurationSettings()
    .then(logger.silly.bind(logger, 'successfully loaded configurations in reactadmin'))
    .catch(logger.warn.bind(logger, 'there was an error loading configurations in reactadmin'));

  return { 
    index: admin_index,
    loadManifest,
    loadComponent,
    loadUserPreferences,
    loadNavigation,
  };
};
