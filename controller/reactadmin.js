'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const path = require('path');
const ERROR404 = require(path.join(__dirname, '../adminclient/src/content/config/dynamic404'));
const mongoose = require('mongoose');
const capitalize = require('capitalize');
const DEFAULT_COMPONENTS = {
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
const CORE_DATA_CONFIGURATIONS = {
  manifest: null,
  navigation: null
};

var components;
var CoreController;
var logger;
var appSettings;
var appenvironment;
var CoreUtilities;
var manifestSettings;
var navigationSettings;
var periodic;
var themeSettings;
var extsettings;
var utility;

var setCoreDataConfigurations = function () {
  if (!CORE_DATA_CONFIGURATIONS.manifest || !CORE_DATA_CONFIGURATIONS.navigation) {
    if (CORE_DATA_CONFIGURATIONS.manifest === null) {
      let generated = utility.generateDetailManifests(mongoose, { prefix: 'content' });
      CORE_DATA_CONFIGURATIONS.manifest = generated;
    }
    if (CORE_DATA_CONFIGURATIONS.navigation === null && CORE_DATA_CONFIGURATIONS.manifest) {
      CORE_DATA_CONFIGURATIONS.navigation = Object.keys(CORE_DATA_CONFIGURATIONS.manifest).reduce((result, key) => {
        result.layout = result.layout || {};
        result.layout.children = result.layout.children || [{
          component: 'MenuLabel',
          children: 'Content'
        }, {
          component: 'MenuList',
          children: []
        }];
        result.layout.children[1].children.push({
          component: 'MenuAppLink',
          props: {
            href: key,
            label: capitalize(path.basename(key)),
            id: path.basename(key)
          }
        });
        return result;
      }, {});
    }
  }
  logger.silly(CORE_DATA_CONFIGURATIONS);
};

/**
 * Determines if user privileges array contains privilege code(s) that exist in defined privileges for a view
 * @param  {string[]} privileges An array of privilege codes for a user
 * @param  {Object} layout     The layout configuration object for a view or navigation link
 * @param {string[]} layout.privileges The necessary privileges for a given view or navigation link
 * @return {boolean} Returns true if user privileges exist in view privilege array. Additionally returns true if view privileges is not defined           
 */
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

/**
 * Removes null values from an Array
 * @param  {Object[]} data An array of child components that may contain null values
 * @return {Object[]}      Returns the original array with null values removed
 */
var removeNullIndexes = function (data) {
  let index = data.indexOf(null);
  while (index > -1) {
    data.splice(index, 1);
    index = data.indexOf(null);
  }
  return data;
};

/**
 * Reads a react admin configuration from a specified file path or from files that exist in a directory path (although this can read .js modules it is recommended you use json files as js files are cached and can not be reloaded)
 * @param  {string} filePath A file or directory path
 * @return {Object|Object[]}          Either a single react admin configuration or an array of configurations
 */
var readConfigurations = function (filePath) {
  filePath = path.join(__dirname, '../../../', filePath);
  let _import = function (_path) {
    if (path.extname(_path) !== '.js' && path.extname(_path) !== '.json') return undefined;
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

/**
 * Accepts a single file/directory path or any array of file/directory paths and returns an array of configuration data for all configurations that are successfully read from these paths
 * @param  {string|string[]} paths A single file/directory path or an array of file/directory paths
 * @return {Object[]}       An array of configuration objects for any successfully resolved file reads
 */
var readAndStoreConfigurations = function (paths) {
  paths = (Array.isArray(paths)) ? paths : [paths];
  let reads = paths.map(_path => {
    if (typeof _path === 'string') return readConfigurations.bind(null, _path);
    return () => Promisie.reject(new Error('No path specified'));
  });
  return Promisie.settle(reads)
    .then(result => {
      let { fulfilled } = result;
      fulfilled = fulfilled.map(data => data.value);
      let flatten = function (result, data) {
        if (Array.isArray(data)) return result.concat(data.reduce(flatten, []));
        if (data) result.push(data);
        return result;
      };
      return fulfilled.reduce(flatten, []);
    })
    .catch(e => Promisie.reject(e));
};

/**
 * Recursively iterates through a view/navigation configuration object and and removes non-permissioned values
 * @param  {string[]}  privileges An array of user privileges
 * @param  {Object}  [config={}]  The configuration object that should be filtered
 * @param  {boolean} [isRoot=false]   If true assumes that the configuration object is contained within the "layout" property of the provided object
 * @return {Object|Object[]}             Filtered configuration object
 */
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

/**
 * Merges the "containers" property of an array of manifest configuration objects
 * @param  {Object[]} manifests An array of manifest configuration objects
 * @return {Object}           Fully merged manifest object
 */
var handleManifestCompilation = function (manifests) {
  return manifests.reduce((result, manifest) => {
    result.containers = Object.assign(result.containers || {}, manifest.containers);
    return result;
  }, {});
};

/**
 * Gets manifest configuration file/directory paths from the periodic extensions list
 * @param  {Object} configuration The periodic extensions configuration object
 * @param {Object[]} configuration.extensions An array of extension configuration objects for periodic
 * @return {Object}               Aggregated manifest configurations specified by periodic extensions configuration
 */
var pullManifestSettings = function (configuration) {
  let extensions = configuration.extensions || [];
  let filePaths = extensions.reduce((result, config) => {
    if (config.enabled && config.periodicConfig && config.periodicConfig.manifests) {
      if (Array.isArray(config.periodicConfig.manifests)) return result.concat(config.periodicConfig.manifests);
      result.push(config.periodicConfig.manifests);
    }
    return result;
  }, []);
  return readAndStoreConfigurations(filePaths || [])
    .then(handleManifestCompilation)
    .catch(e => Promisie.reject(e));
};

/**
 * Merges navigation wrapper, container, layout and concats navigation links specified by periodic extensions configuration
 * @param  {Object[]} navigation An array of navigation configuration objects
 * @return {Object}            Fully merged navigation object
 */
var handleNavigationCompilation = function (navigation) {
  return navigation.reduce((result, nav) => {
    result.wrapper = Object.assign(result.wrapper || {}, nav.wrapper);
    result.container = Object.assign(result.container || {}, nav.container);
    result.layout = result.layout || { children: [] };
    result.layout = Object.assign(result.layout, nav.layout, { children: result.layout.children.concat(nav.layout.children) });
    return result;
  }, {});
};

/**
 * Gets navigation configuration from file/directory paths from the periodic extensions list
 * @param  {Object} configuration The periodic extensions configuration object
 * @param {Object[]} configuration.extensions An array of extension configuration objects for periodic
 * @return {Object}               Aggregated navigation configurations specified by periodic extensions configuration
 */
var pullNavigationSettings = function (configuration) {
  let extensions = configuration.extensions || [];
  let filePaths = extensions.reduce((result, config) => {
    if (config.enabled && config.periodicConfig && config.periodicConfig.navigation) result.push(config.periodicConfig.navigation);
    return result;
  }, []);
  return readAndStoreConfigurations(filePaths || [])
    .then(handleNavigationCompilation)
    .catch(e => Promisie.reject(e));
};

/**
 * Finalizes view/navigation configurations by aggregating theme configurations, extension configurations and react admin default configurations
 * @param  {Object} data Loaded view/navigation configurations from periodic extensions and the default react admin configuration
 * @param {Object} data.default_manifests Default manifest configurations derived from files specified by react admin extension
 * @param {Object} data.manifests Manifest configurations derived from files/directories specified in periodic extensions list
 * @param {Object} data.default_navigation Default navigation configuration derived from file specified by react admin extension
 * @param {Object} data.navigation Navigation configuration derived from files/directories specified in periodic extensions list
 * @return {Object}      Aggregated manifest and navigation configuration
 */
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
      manifests.containers = Object.assign({}, (data.default_manifests) ? data.default_manifests.containers : {}, (data.manifests) ? data.manifests.containers : {}, manifests.containers);
      navigation = handleNavigationCompilation(navigation);
      let navigationChildren = (data.default_navigation && data.default_navigation.layout && Array.isArray(data.default_navigation.layout.children)) ? data.default_navigation.layout.children : [];
      navigation.wrapper = Object.assign({}, (data.default_navigation) ? data.default_navigation.wrapper : {}, (data.navigation) ? data.navigation.wrapper : {}, navigation.wrapper);
      navigation.container = Object.assign({}, (data.default_navigation) ? data.default_navigation.container : {}, (data.navigation) ? data.navigation.container : {}, navigation.container);
      navigation.layout = navigation.layout || Object.assign({ children: [] }, (data.default_navigation) ? data.default_navigation.layout : {}, (data.navigation) ? data.navigation.layout : {});
      navigation.layout.children = (!navigation.layout.children.length) ? navigationChildren.concat((data.navigation && data.navigation.layout && Array.isArray(data.navigation.layout.children)) ? data.navigation.layout.children : []) : navigation.layout.children;
      return { manifest: manifests, navigation };
    })
    .catch(e => {
      console.error(`There is not a reactadmin config for ${ appSettings.theme || appSettings.themename }`, e);
      let manifest = { containers: Object.assign({}, (data.default_manifests) ? data.default_manifests.containers : {}, (data.manifests) ? data.manifests.containers : {}) };
      let navigationChildren = (data.default_navigation && data.default_navigation.layout && Array.isArray(data.default_navigation.layout.children)) ? data.default_navigation.layout.children : [];
      let navigation = {
        wrapper: Object.assign({}, (data.default_navigation) ? data.default_navigation.wrapper : {}, (data.navigation) ? data.navigation.wrapper : {}),
        container: Object.assign({}, (data.default_navigation) ? data.default_navigation.container : {}, (data.navigation) ? data.navigation.container : {}),
        layout: Object.assign({}, (data.default_navigation) ? data.default_navigation.layout : {}, (data.navigation) ? data.navigation.layout : {}, { 
          children: navigationChildren.concat((data.navigation && data.navigation.layout && Array.isArray(data.navigation.layout.children)) ? data.navigation.layout.children : []) 
        })
      };
      return { manifest, navigation };
    });
};

/**
 * Sanitizes the default manifest and navigation configurations provided by default configuration paths. Conforms format to format outputed by extensions list
 * @param {Object} data.default_manifests Default manifest configurations derived from files specified by react admin extension
 * @param {Object} data.manifests Manifest configurations derived from files/directories specified in periodic extensions list
 * @param {Object} data.default_navigation Default navigation configuration derived from file specified by react admin extension
 * @param {Object} data.navigation Navigation configuration derived from files/directories specified in periodic extensions list
 * @return {Object}      Returns sanitized default navigation/manifest configurations
 */
var sanitizeConfigurations = function (data) {
  return Object.keys(data).reduce((result, key) => {
    if (key === 'default_manifests') result[key] = handleManifestCompilation(data[key]);
    else if (key === 'default_navigation') result[key] = handleNavigationCompilation(data[key]);
    else result[key] = data[key];
    return result;
  }, {});
};

/**
 * Gets manifest/navigation configurations from all possible sources and aggregates data with top priority to theme configurations followed by extensions and finally the default values provided by react admin. Also defines the in-scope manifestSettings and navigationSettings variables
 * @return {Object} Returns the fully aggregated configurations for manifests and and navigation
 */
var pullConfigurationSettings = function (reload) {
  if (manifestSettings && navigationSettings && !reload) return Promisie.resolve({ manifest: manifestSettings, navigation: navigationSettings });
  return Promisie.all(fs.readJsonAsync(path.join(__dirname, '../../../content/config/extensions.json')), fs.readJsonAsync(path.join(__dirname, '../periodicjs.reactadmin.json')))
    .then(configurationData => {
      let [configuration, adminExtSettings] = configurationData;
      adminExtSettings = adminExtSettings['periodicjs.ext.reactadmin'];
      let operations = {};
      if (reload === 'manifest' || reload === true || !manifestSettings) {
        operations = Object.assign(operations, { 
          manifests: pullManifestSettings.bind(null, configuration), 
          default_manifests: readAndStoreConfigurations.bind(null, adminExtSettings.manifests || []) 
        });
      }
      if (reload === 'navigation' || reload === true || !navigationSettings) {
        operations = Object.assign(operations, { 
          navigation: pullNavigationSettings.bind(null, configuration), 
          default_navigation: readAndStoreConfigurations.bind(null, adminExtSettings.navigation || []) 
        });
      }
      return Promisie.parallel(operations);
    })
    .then(sanitizeConfigurations)
    .then(finalizeSettingsWithTheme)
    .then(result => {
      let { manifest, navigation } = result;
      manifestSettings = (reload === 'manifest' || reload === true || !manifestSettings) ? manifest : manifestSettings;
      navigationSettings = (reload === 'navigation' || reload === true || !navigationSettings) ? navigation : navigationSettings;
      return result;
    })
    .catch(e => Promisie.reject(e));
};

/**
 * Loads manifest configuration data and sends response with settings
 * @param  {Object}   req  express request
 * @param  {Object}   res  express reponse
 * @param {Function} next express next function
 */
var loadManifest = function (req, res, next) {
  pullConfigurationSettings((req.query && req.query.refresh) ? 'manifest' : false)
    .then(() => {
      let manifest = Object.assign({}, manifestSettings);
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') logger.silly('reloaded manifest', { manifest }); 
      if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.manifest) {
        setCoreDataConfigurations();
        if (CORE_DATA_CONFIGURATIONS.manifest) manifest.containers = Object.assign({}, CORE_DATA_CONFIGURATIONS.manifest, manifest.containers);
      }
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

/**
 * Recursively assigns an async function to all component configuration file paths that will read configuration data and assign value to original key or assigns default value
 * @param  {Object} data     Component configuration object with key value pairs that represent an eventual key value and a file path that should resolve with configuration data
 * @param  {Object} defaults Default component configurations provided by react admin
 * @return {Object}          Returns an object that has async read operations assigned to keys for configuration resolution
 */
var generateComponentOperations = function (data, defaults) {
  return Object.keys(data).reduce((result, key) => {
    if (typeof data[key] === 'string') {
      result[key] = function () {
        return readAndStoreConfigurations([data[key]])
          .then(result => {
            if (result.length) return result[0];
            return Promisie.reject('unable to read property resetting to default value');
          })
          .catch(() => (defaults && defaults[key]) ? defaults[key] : undefined);
      };
    }
    else if (typeof data[key] === 'object') result[key] = Promisie.parallel.bind(Promisie, generateComponentOperations(data[key], (defaults) ? defaults[key] : undefined));
    else result[key] = () => Promisie.resolve(data[key]);
    return result;
  }, {});
};

/**
 * Assigns an active status flag to nested component configuration objects
 * @param  {Object} component Component configuration object
 * @return {Object}           Original object with active status flag assigned where applicable
 */
var assignComponentStatus = function (component) {
  if (component && component.layout) {
    if (typeof component.status === 'undefined' || (component.status !== 'undefined' && component.status !== 'uninitialized')) component.status = 'active';
  }
  else if (component && typeof component === 'object') {
    component = Object.keys(component).reduce((result, key) => {
      result[key] = assignComponentStatus(component[key]);
      return result;
    }, {});
  }
  return component;
};

/**
 * Reads component configuration file paths from react admin and theme configurations and resolves actual configurations from specified paths
 * @return {Object} Component configuration objects indexed by component type
 */
var pullComponentSettings = function (refresh) {
  if (components && !refresh) return Promisie.resolve(components);
  return readAndStoreConfigurations(['node_modules/periodicjs.ext.reactadmin/periodicjs.reactadmin.json', `content/themes/${ appSettings.theme || appSettings.themename }/periodicjs.reactadmin.json`])
    .then(results => {
      switch (Object.keys(results).length.toString()) {
        case '1':
          return Object.assign({}, (results[0]['periodicjs.ext.reactadmin']) ? results[0]['periodicjs.ext.reactadmin'].components : {});
        case '2':
          return Object.assign({}, (results[0]['periodicjs.ext.reactadmin']) ? results[0]['periodicjs.ext.reactadmin'].components : {}, (results[1]['periodicjs.ext.reactadmin']) ? results[1]['periodicjs.ext.reactadmin'].components : {});
        default:
          return {};
      }
    })
    .then(results => {
      if (!components || typeof refresh !== 'string') return results;
      else if (typeof refresh === 'string') return { [refresh]: results[refresh] };
    })
    .then(results => Promisie.parallel(generateComponentOperations(results, (!components) ? DEFAULT_COMPONENTS : components)))
    .then(results => {
      components = Object.assign({}, (!components) ? DEFAULT_COMPONENTS : components, results);
      return assignComponentStatus(components);
    })
    .catch(e => Promisie.reject(e));
};

/**
 * Loads component configuration data and sends response with settings
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 * @param {Function} next express next function
 */
var loadComponent = function (req, res, next) {
  pullComponentSettings((req.query && req.query.refresh) ? req.params.component : false)
    .then(() => {
      let component = components[req.params.component] || { status: 'undefined', };
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') logger.silly(`reloaded component ${ req.params.component }`, { component });
      res.status(200).send({
        result: 'success',
        status: 200,
        data: {
          settings: assignComponentStatus(component),
        },
      });
    })
    .catch(next);
};

/**
 * Loads user preference data and sends response with settings
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 */
var loadUserPreferences = function (req, res) {
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      settings: (req.user && req.user.extensionattributes && req.user.extensionattributes.preferences) ? req.user.extensionattributes.preferences : {},
    },
  });
};

/**
 * Loads navigation configuration data and sends response with settings
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 * @param {Function} next express next function
 */
var loadNavigation = function (req, res, next) {
  pullConfigurationSettings((req.query && req.query.refresh) ? 'navigation' : false)
    .then(() => {
      let navigation = Object.assign({}, navigationSettings);
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') logger.silly('reloaded navigation', { navigation });
      if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.navigation) {
        setCoreDataConfigurations();
        if (CORE_DATA_CONFIGURATIONS.navigation && CORE_DATA_CONFIGURATIONS.navigation.layout) navigation.layout.children = navigation.layout.children.concat(CORE_DATA_CONFIGURATIONS.navigation.layout.children || []);
      }
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

var validateMFAToken = function (req, res, next) {
  res.status(200).send({
    result: 'success',
    status: 200,
    data: {
      isAuthenticated: true,
    },
  });
};

module.exports = function (resources) {
  periodic = resources;
  appSettings = resources.settings;
  themeSettings = resources.settings.themeSettings;
  appenvironment = appSettings.application.environment;
  CoreController = resources.core.controller;
  CoreUtilities = resources.core.utilities;
  logger = resources.logger;
  extsettings = resources.app.locals.extension.reactadmin.settings;
  utility = require(path.join(__dirname, '../utility/index'))(resources);
  if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.manifest) setCoreDataConfigurations();
  Promisie.all(pullConfigurationSettings(), pullComponentSettings())
    .then(logger.silly.bind(logger, 'successfully loaded configurations in reactadmin'))
    .catch(logger.warn.bind(logger, 'there was an error loading configurations in reactadmin'));

  return { 
    index: admin_index,
    loadManifest,
    loadComponent,
    loadUserPreferences,
    loadNavigation,
    validateMFAToken
  };
};
