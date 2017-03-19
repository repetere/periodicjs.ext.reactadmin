'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const path = require('path');
const mongoose = require('mongoose');
const capitalize = require('capitalize');
const ERROR404 = require(path.join(__dirname, '../adminclient/src/content/config/manifests/dynamic404'));
const DEFAULT_COMPONENTS = {
  login: {
    status: 'uninitialized',
  },
  main: {
    footer: { status: 'uninitialized', },
    header: { status: 'uninitialized', },
  },
  error: {
    '404': {
      status: 'initialized',
      settings: ERROR404,
    },
  },
};
const CORE_DATA_CONFIGURATIONS = {
  manifest: null,
  navigation: null,
};

var components;
var CoreController;
var logger;
var appSettings;
var appenvironment;
var CoreUtilities;
var manifestSettings;
var navigationSettings;
var unauthenticatedManifestSettings;
var periodic;
var themeSettings;
var extsettings;
var utility;
var versions;

/**
 * Loads core data model detail views as manifest and navigation configurations
 */
var setCoreDataConfigurations = function () {
  // console.log({ extsettings });
  if (!CORE_DATA_CONFIGURATIONS.manifest || !CORE_DATA_CONFIGURATIONS.navigation) {
    if (CORE_DATA_CONFIGURATIONS.manifest === null) {
      let generated = utility.generateDetailManifests(mongoose, {
        dbname:'periodic',
        extsettings,
        prefix: (typeof periodic.app.locals.adminPath==='string' && periodic.app.locals.adminPath!=='/' && periodic.app.locals.adminPath) ? `${(periodic.app.locals.adminPath.charAt(0)==='/')?periodic.app.locals.adminPath.slice(1):periodic.app.locals.adminPath}/content`:'content',
      });
      CORE_DATA_CONFIGURATIONS.manifest = generated;
    }
    if (CORE_DATA_CONFIGURATIONS.navigation === null && CORE_DATA_CONFIGURATIONS.manifest) {
      CORE_DATA_CONFIGURATIONS.navigation = Object.keys(CORE_DATA_CONFIGURATIONS.manifest).reduce((result, key) => {
        // console.log({result,key});
        result.layout = result.layout || {};
        result.layout.children = result.layout.children || [{
          component: 'MenuLabel',
          children: 'Standard Content',
        }, {
          component: 'MenuList',
          children: [],
        }, ];
        if (key.indexOf('/:id') === -1 && key.indexOf('/new') === -1) {
          // console.log({key})
          result.layout.children[1].children.push({
            component: 'MenuAppLink',
            props: {
              href: key,
              label: capitalize(path.basename(key)),
              id: path.basename(key),
            },
          });
        }
        return result;
      }, {});
    }
  }
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
 * Used for reading the periodicjs.reactadmin.json configuration as it can be either a json or js file
 * @param  {string} filepath Path toe the reactadmin configuration file
 * @return {Object}          Resolved configuration object
 */
var handleAmbiguousExtensionType = function (filepath) {
  try { 
    let dirname = path.dirname(filepath);
    let extname = path.extname(filepath);
    let basename = path.basename(filepath, extname);
    let configuration = require(`${ dirname }/${ basename }.js`);
    return Promisie.resolve(configuration);
  } catch (e) {
    return fs.readJsonAsync(filepath);
  }
};

/**
 * Returns a bound copy of pull component settings with a pre-defined refresh argument so that it can be correctly called by the utility.reloader function
 * @param  {string} type The type of configuration that is being reloaded  
 * @return {Function}      Bound copy of pullConfigurationSettings function
 */
var handleConfigurationReload = function (type) {
  if (type.toLowerCase() === 'components') {
    return pullComponentSettings.bind(null, true);
  } else {
    return pullConfigurationSettings.bind(null, type.toLowerCase());
  }
};

/**
 * Reads a react admin configuration from a specified file path or from files that exist in a directory path (although this can read .js modules it is recommended you use json files as js files are cached and can not be reloaded)
 * @param  {string} filePath A file or directory path
 * @return {Object|Object[]}          Either a single react admin configuration or an array of configurations
 */
var readConfigurations = function (filePath, configurationType) {
  filePath = path.join(__dirname, '../../../', filePath);
  let _import = function (_path) {
    if (path.extname(_path) !== '.js' && path.extname(_path) !== '.json') return undefined;
    if (extsettings.hot_reload) {
      if (path.extname(_path) === '.js') return utility.reloader(_path, handleConfigurationReload(configurationType));
      else return utility.reloader(_path, handleConfigurationReload(configurationType));
    }
    return (path.extname(_path) === '.js') ? Promisie.resolve(require(_path)) : fs.readJsonAsync(_path);
  };
  return fs.statAsync(filePath)
    .then(stats => {
      if (stats.isFile()) return _import(filePath);
      else if (stats.isDirectory()) {
        return fs.readdirAsync(filePath)
          .then(files => {
            if (files.length) {
              return Promisie.map(files, file => {
                let fullPath = path.join(filePath, file);
                return _import(fullPath);
              });
            }
            return [];
          })
          .catch(e => Promisie.reject(e));
      } else return Promisie.reject(new TypeError('Configuration path is not a file or directory'));
    })
    .catch(e => Promisie.reject(e));
};

/**
 * Accepts a single file/directory path or any array of file/directory paths and returns an array of configuration data for all configurations that are successfully read from these paths
 * @param  {string|string[]} paths A single file/directory path or an array of file/directory paths
 * @return {Object[]}       An array of configuration objects for any successfully resolved file reads
 */
var readAndStoreConfigurations = function (paths, type) {
  paths = (Array.isArray(paths)) ? paths : [paths, ];
  let reads = paths.map(_path => {
    if (typeof _path === 'string') return readConfigurations.bind(null, _path, type);
    if (typeof _path === 'function') return _path;
    return () => Promisie.reject(new Error('No path specified'));
  });
  return Promisie.settle(reads)
    .then(result => {
      if (result.rejected.length) logger.error('Invalid Manifest', result.rejected);
      let { fulfilled, } = result;
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
var admin_index = function (req, res, next) {
  let viewtemplate = {
    viewname: 'admin/index',
    themefileext: appSettings.templatefileextension,
    extname: 'periodicjs.ext.reactadmin',
  };
  let viewdata = {
    pagedata: {
      // title: 'React Admin',
      // toplink: '&raquo; Multi-Factor Authenticator',
    },
    user: req.user,
    // adminPostRoute: adminPostRoute
  };

  if (extsettings.server_side_react) {
    return pullConfigurationSettings(false)
      .then(() => {
        // logger.silly('req._parsedOriginalUrl.pathname', req._parsedOriginalUrl.pathname);
        // logger.silly({ unauthenticatedManifestSettings });
        if (unauthenticatedManifestSettings &&
          unauthenticatedManifestSettings.containers &&
          Object.keys(unauthenticatedManifestSettings.containers).length) {
          let layoutPath = utility.findMatchingRoute(unauthenticatedManifestSettings.containers, req._parsedOriginalUrl.pathname);
          let manifest = (layoutPath) ? unauthenticatedManifestSettings.containers[ layoutPath ] :false;
          // console.log({ layoutPath, manifest });
          return utility.ssr_manifest({ layoutPath, manifest, req_url: req._parsedOriginalUrl.pathname, basename:extsettings.basename, });
        } else {
          return Promise.resolve({}, {});
        }
      })
      .then((results) => {
        let { body, pagedata, } = results;
        // console.log({ body, pagedata });
        viewdata = Object.assign({}, viewdata, { body ,}, { pagedata ,});
        CoreController.renderView(req, res, viewtemplate, viewdata);
      })
      .catch(next);
  } else {
    CoreController.renderView(req, res, viewtemplate, viewdata);
  }
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
 * @param {Boolean} [isUnauthenticated=false] Denotes if "unauthenticated_manifests" property should be read in place of "manifests" property
 * @return {Object}               Aggregated manifest configurations specified by periodic extensions configuration
 */
var pullManifestSettings = function (configuration, isUnauthenticated = false) {
  let extensions = configuration.extensions || [];
  let filePaths = extensions.reduce((result, config) => {
    if (config.enabled && config.periodicConfig && config.periodicConfig['periodicjs.ext.reactadmin'] && config.periodicConfig['periodicjs.ext.reactadmin'][(isUnauthenticated) ? 'unauthenticated_manifests' : 'manifests']) {
      if (Array.isArray(config.periodicConfig['periodicjs.ext.reactadmin'][(isUnauthenticated) ? 'unauthenticated_manifests' : 'manifests'])) return result.concat(config.periodicConfig['periodicjs.ext.reactadmin'][(isUnauthenticated) ? 'unauthenticated_manifests' : 'manifests']);
      result.push(config.periodicConfig['periodicjs.ext.reactadmin'][(isUnauthenticated) ? 'unauthenticated_manifests' : 'manifests']);
    }
    return result;
  }, []);
  return readAndStoreConfigurations(filePaths || [], (isUnauthenticated) ? 'unauthenticated' : 'manifest')
    .then(handleManifestCompilation)
    .catch(e => Promisie.reject(e));
};

/**
 * Merges navigation wrapper, container, layout and concats navigation links specified by periodic extensions configuration
 * @param  {Object[]} navigation An array of navigation configuration objects
 * @param {Boolean} isExtension If true denotes that navigation configuration should be added to Extension navigation sub-element
 * @return {Object}            Fully merged navigation object
 */
var handleNavigationCompilation = function (navigation, isExtension) {
  let extensionsNav = [{
    component: 'MenuLabel',
    children: 'Extensions',
  }, {
    component: 'MenuList',
    children: [],
  },];
  let subLinks = extensionsNav[1];
  let compiled = navigation.reduce((result, nav) => {
    result.wrapper = Object.assign(result.wrapper || {}, nav.wrapper);
    result.container = Object.assign(result.container || {}, nav.container);
    result.layout = result.layout || { children: [], };
    if (!isExtension) result.layout = Object.assign(result.layout, nav.layout, { children: result.layout.children.concat(nav.layout.children), });
    else subLinks.children = subLinks.children.concat(nav.layout.children);
    return result;
  }, {});
  if (subLinks.children.length) compiled.layout.children = compiled.layout.children.concat(extensionsNav);
  return compiled;
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
    if (config.enabled && config.periodicConfig && config.periodicConfig['periodicjs.ext.reactadmin'] && config.periodicConfig['periodicjs.ext.reactadmin'].navigation) result.push(config.periodicConfig['periodicjs.ext.reactadmin'].navigation);
    return result;
  }, []);
  return readAndStoreConfigurations(filePaths || [], 'navigation')
    .then(result => handleNavigationCompilation(result, true))
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
  return handleAmbiguousExtensionType(filePath)
    .then(result => {
      result = result['periodicjs.ext.reactadmin'];
      return Promisie.parallel({
        manifests: readAndStoreConfigurations.bind(null, result.manifests || [], 'manifest'),
        unauthenticated_manifests: readAndStoreConfigurations.bind(null, result.unauthenticated_manifests || [], 'unauthenticated'),
        navigation: readAndStoreConfigurations.bind(null, result.navigation || [], 'navigation'),
      });
    })
    .then(result => {
      let { manifests, navigation, unauthenticated_manifests, } = result;
      manifests = handleManifestCompilation(manifests);
      manifests.containers = Object.assign({}, (data.default_manifests) ? data.default_manifests.containers : {}, (data.manifests) ? data.manifests.containers : {}, manifests.containers);
      unauthenticated_manifests = handleManifestCompilation(unauthenticated_manifests);
      unauthenticated_manifests.containers = Object.assign({}, (data.default_unauthenticated_manifests) ? data.default_unauthenticated_manifests.containers : {}, (data.unauthenticated_manifests) ? data.unauthenticated_manifests.containers : {}, unauthenticated_manifests.containers);
      navigation = handleNavigationCompilation(navigation);
      let navigationChildren = (data.default_navigation && data.default_navigation.layout && Array.isArray(data.default_navigation.layout.children)) ? data.default_navigation.layout.children : [];
      navigation.wrapper = Object.assign({}, (data.default_navigation) ? data.default_navigation.wrapper : {}, (data.navigation) ? data.navigation.wrapper : {}, navigation.wrapper);
      navigation.container = Object.assign({}, (data.default_navigation) ? data.default_navigation.container : {}, (data.navigation) ? data.navigation.container : {}, navigation.container);
      if (navigation && navigation.layout && navigation.layout.children && navigation.layout.children.length) {
        navigationChildren = Object.assign([], navigation.layout.children);
      } else {
        navigationChildren = navigationChildren.concat((data.navigation && data.navigation.layout && Array.isArray(data.navigation.layout.children)) ? data.navigation.layout.children : []);
      }
      navigation.layout = navigation.layout || Object.assign({ children: [], }, (data.default_navigation) ? data.default_navigation.layout : {}, (data.navigation) ? data.navigation.layout : {});
      navigation.layout.children = navigationChildren;
      return { manifest: manifests, navigation, unauthenticated_manifest: unauthenticated_manifests, };
    })
    .catch(e => {
      console.error(`There is not a reactadmin config for ${ appSettings.theme || appSettings.themename }`, e);
      let manifest = { containers: Object.assign({}, (data.default_manifests) ? data.default_manifests.containers : {}, (data.manifests) ? data.manifests.containers : {}), };
      let unauthenticated_manifest = { containers: Object.assign({}, (data.default_unauthenticated_manifests) ? data.default_unauthenticated_manifests.containers : {}, (data.unauthenticated_manifests) ? data.unauthenticated_manifests.containers : {}), };
      let navigationChildren = (data.default_navigation && data.default_navigation.layout && Array.isArray(data.default_navigation.layout.children)) ? data.default_navigation.layout.children : [];
      let navigation = {
        wrapper: Object.assign({}, (data.default_navigation) ? data.default_navigation.wrapper : {}, (data.navigation) ? data.navigation.wrapper : {}),
        container: Object.assign({}, (data.default_navigation) ? data.default_navigation.container : {}, (data.navigation) ? data.navigation.container : {}),
        layout: Object.assign({}, (data.default_navigation) ? data.default_navigation.layout : {}, (data.navigation) ? data.navigation.layout : {}, { 
          children: navigationChildren.concat((data.navigation && data.navigation.layout && Array.isArray(data.navigation.layout.children)) ? data.navigation.layout.children : []), 
        }),
      };
      return { manifest, navigation, unauthenticated_manifest, };
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
    if (key === 'default_manifests' || key === 'default_unauthenticated_manifests') result[key] = handleManifestCompilation(data[key]);
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
  if (manifestSettings && navigationSettings && unauthenticatedManifestSettings && !reload) return Promisie.resolve({ manifest: manifestSettings, navigation: navigationSettings, unauthenticated: unauthenticatedManifestSettings, });
  return Promisie.all(fs.readJsonAsync(path.join(__dirname, '../../../content/config/extensions.json')), handleAmbiguousExtensionType(path.join(__dirname, '../periodicjs.reactadmin.json')))
    .then(configurationData => {
      let [configuration, adminExtSettings, ] = configurationData;
      adminExtSettings = adminExtSettings['periodicjs.ext.reactadmin'];
      let operations = {};
      if (reload === 'manifest' || reload === true || !manifestSettings) {
        operations = Object.assign(operations, { 
          manifests: pullManifestSettings.bind(null, configuration), 
          default_manifests: readAndStoreConfigurations.bind(null, adminExtSettings.manifests || [], 'manifest'),
        });
      }
      if (reload === 'unauthenticated' || reload === true || !unauthenticatedManifestSettings) {
        operations = Object.assign(operations, {
          unauthenticated_manifests: pullManifestSettings.bind(null, configuration, true),
          default_unauthenticated_manifests: readAndStoreConfigurations.bind(null, adminExtSettings.unauthenticated_manifests || [], 'unauthenticated'),
        });
      }
      if (reload === 'navigation' || reload === true || !navigationSettings) {
        operations = Object.assign(operations, { 
          navigation: pullNavigationSettings.bind(null, configuration), 
          default_navigation: readAndStoreConfigurations.bind(null, adminExtSettings.navigation || [], 'navigation'), 
        });
      }
      return Promisie.parallel(operations);
    })
    .then(sanitizeConfigurations)
    .then(finalizeSettingsWithTheme)
    .then(result => {
      let { manifest, navigation, unauthenticated_manifest, } = result;
      manifestSettings = (reload === 'manifest' || reload === true || !manifestSettings) ? manifest : manifestSettings;
      navigationSettings = (reload === 'navigation' || reload === true || !navigationSettings) ? navigation : navigationSettings;
      unauthenticatedManifestSettings = (reload === 'unauthenticated' || reload === true || !unauthenticatedManifestSettings) ? unauthenticated_manifest : unauthenticatedManifestSettings;
      return result;
    })
    .catch(e => Promisie.reject(e));
};

var filterInitialManifest = function (containers, location) {
  return Object.keys(containers).reduce((result, key) => {
    if (location === key || key === '/login' || key === '/mfa') result[key] = containers[key];
    return result;
  }, {});
};

/**
 * Loads manifest configuration data and sends response with settings
 * @param  {Object}   req  express request
 * @param  {Object}   res  express reponse
 * @param {Function} next express next function
 */
var loadManifest = function (req, res, next) {
  return pullConfigurationSettings((req.query && req.query.refresh) ? 'manifest' : false)
    .then(() => {
      let manifest = Object.assign({}, manifestSettings);
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') {
        logger.silly('reloaded manifest', { manifest, });
      }
      if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.manifest) {
        setCoreDataConfigurations();
        if (CORE_DATA_CONFIGURATIONS.manifest) manifest.containers = Object.assign({}, CORE_DATA_CONFIGURATIONS.manifest, manifest.containers);
      }
      if (req.query && req.query.initial) manifest.containers = filterInitialManifest(manifest.containers, req.query.location);
      manifest.containers = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), manifest.containers, true);
      if (res && typeof res.send === 'function') {
        res.status(200).send({
          result: 'success',
          status: 200,
          data: {
            versions: (req.query && req.query.initial) ? undefined : versions,
            settings: manifest,
          },
        });
      } else return manifest;
    })
    .catch(e => (typeof next === 'function') ? next(e) : Promisie.reject(e));
};

/**
 * Loads unauthenticated manifest configuration data and sends response with settings
 * @param  {Object}   req  express request
 * @param  {Object}   res  express reponse
 * @param {Function} next express next function
 */
var loadUnauthenticatedManifest = function (req, res, next) {
  return pullConfigurationSettings((req.query && req.query.refresh) ? 'unauthenticated' : false)
    .then(() => {
      let unauthenticated_manifest = Object.assign({}, unauthenticatedManifestSettings);
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') {
        logger.silly('reloaded unauthenticated manifest', { unauthenticated_manifest, });
      }
      if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.unauthenticated_manifest) {
        setCoreDataConfigurations();
        if (CORE_DATA_CONFIGURATIONS.unauthenticated_manifest) unauthenticated_manifest.containers = Object.assign({}, CORE_DATA_CONFIGURATIONS.unauthenticated_manifest, unauthenticated_manifest.containers);
      }
      if (req.query && req.query.initial) unauthenticated_manifest.containers = filterInitialManifest(unauthenticated_manifest.containers, req.query.location);
      if (res && typeof res.send === 'function') {
        res.status(200).send({
          result: 'success',
          status: 200,
          data: {
            versions: (req.query && req.query.initial) ? undefined : versions,
            settings: unauthenticated_manifest,
          },
        });
      } else return unauthenticated_manifest;
    })
    .catch(e => (typeof next === 'function') ? next(e) : Promisie.reject(e));
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
        return readAndStoreConfigurations([data[key], ], 'components')
          .then(result => {
            if (result.length) return result[0];
            return Promisie.reject('unable to read property resetting to default value');
          })
          .catch(() => (defaults && defaults[key]) ? defaults[key] : undefined);
      };
    }    else if (typeof data[key] === 'object') result[key] = Promisie.parallel.bind(Promisie, generateComponentOperations(data[key], (defaults) ? defaults[key] : undefined));
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
  }  else if (component && typeof component === 'object') {
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
  return readAndStoreConfigurations([handleAmbiguousExtensionType.bind(null, path.join(__dirname, '../periodicjs.reactadmin.json')), handleAmbiguousExtensionType.bind(null, path.join(__dirname, `../../../content/themes/${ appSettings.theme || appSettings.themename }/periodicjs.reactadmin.json`)), ])
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
      else if (typeof refresh === 'string') return { [refresh]: results[refresh], };
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
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') logger.silly(`reloaded component ${ req.params.component }`, { component, });
      res.status(200).send({
        result: 'success',
        status: 200,
        data: {
          versions,
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
  if (res && typeof res.send === 'function') {
    res.status(200).send({
      result: 'success',
      status: 200,
      data: {
        versions,
        settings: (req.user && req.user.extensionattributes && req.user.extensionattributes.preferences) ? req.user.extensionattributes.preferences : {},
      },
    });
  } else return (req.user && req.user.extensionattributes && req.user.extensionattributes.preferences) ? req.user.extensionattributes.preferences : {}; 
};

/**
 * Loads navigation configuration data and sends response with settings
 * @param  {object}   req  express request
 * @param  {object}   res  express reponse
 * @param {Function} next express next function
 */
var loadNavigation = function (req, res, next) {
  return pullConfigurationSettings((req.query && req.query.refresh) ? 'navigation' : false)
    .then(() => {
      let navigation = Object.assign({}, navigationSettings);
      if (req.query && req.query.refresh_log && req.query.refresh_log !== 'false') {
        logger.silly('reloaded navigation', { navigation, });
      }
      if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.navigation) {
        setCoreDataConfigurations();
        if (CORE_DATA_CONFIGURATIONS.navigation && CORE_DATA_CONFIGURATIONS.navigation.layout) {
          navigation.layout = Object.assign({}, navigation.layout);
          navigation.layout.children = Object.assign([], navigation.layout.children);
          navigation.layout.children = navigation.layout.children.concat(CORE_DATA_CONFIGURATIONS.navigation.layout.children || []);
        }
      }
      navigation.wrapper = extsettings.navigationLayout.wrapper;
      navigation.container = extsettings.navigationLayout.container;
      navigation.layout = recursivePrivilegesFilter(Object.keys(req.session.userprivilegesdata), [navigation.layout, ])[0];
      if (res && typeof res.send === 'function') {
        res.status(200).send({
          result: 'success',
          status: 200,
          data: {
            versions,
            settings: navigation,
          },
        });
      } else return navigation;
    })
    .catch(e => (typeof next === 'function') ? next(e) : Promisie.reject(e));
};

var loadConfigurations = function (req, res) {
  return pullConfigurationSettings((req.query && req.query.refresh) ? true : false)
    .then(() => {
      if (req.query) delete req.query.refresh;
      return Promisie.parallel({
        navigation: loadNavigation.bind(null, req),
        manifest: loadManifest.bind(null, req),
        unauthenticated_manifest: loadUnauthenticatedManifest.bind(null, req),
        preferences: loadUserPreferences.bind(null, req),
      });
    })
    .then(settings => {
      res.status(200).send({
        result: 'success',
        status: 200,
        data: { settings, versions, },
      });
    })
    .catch(e => {
      res.status(500).send({
        result: 'error',
        status: 500,
        data: {
          error: e.message,
        },
      });
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
  versions = (extsettings.application.use_offline_cache) ? {
    theme: fs.readJsonSync(path.join(__dirname, '../../../', `content/themes/${ appSettings.theme || appSettings.themename }/package.json`)).version,
    reactadmin: fs.readJsonSync(path.join(__dirname, '../package.json')).version,
  } : false;
  if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.manifest) {
    let task = setImmediate(() => {
      setCoreDataConfigurations();
      clearImmediate(task);
    });
  }
  Promisie.all(pullConfigurationSettings(), pullComponentSettings())
    .then(() => {
      logger.silly('MANIFEST SETTINGS LOADED');
    },
    logger.silly.bind(logger, 'settings error'));
    

  return { 
    index: admin_index,
    loadManifest,
    loadComponent,
    loadUserPreferences,
    loadNavigation,
    loadConfigurations,
    loadUnauthenticatedManifest,
  };
};
