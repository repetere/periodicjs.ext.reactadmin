'use strict';
const capitalize = require('capitalize');
const pluralize = require('pluralize');
const entities = [];
// var logger;
var pds_request;

const get_entity_options = (entity) => {
  return {
    name: entity,
    plural: pluralize(entity),
    capitalized: capitalize(entity),
    pluralCapitalized: pluralize(capitalize(entity)),
  };
};

/*
const get_dsa_request = (options) => {
  const { req, entity, id, } = options; 
  const entityOptions = {
    name: entity,
    plural: pluralize(entity),
    capitalized: capitalize(entity),
    pluralCapitalized: pluralize(capitalize(entity)),
  };
  return {
    user: req.user || 'admin',
    isAuthenticated: (typeof req.isAuthenticated === 'function') ? req.isAuthenticated() : true,
    controllerData: {
      model_query: req.controllerData.customerQuery,
      limit: req.query.limit,
      sort: req.query.sort,
      order: req.query.order,
    },
    headers: {
      host: (req.headers) ? req.headers.host : 'https://promisefinancial.net',
    },
  };
};
*/

const entity_index = (req, res, next) => {
  const entity = req.params.entity_type;
  return pds_request[ `${ get_entity_options(entity).plural }` ][`load${ get_entity_options(entity).pluralCapitalized }`](req, res, next);
};

const create_entity = (req, res, next) => {
  const entity = req.params.entity_type;
  // const id = req.params.id;
  return pds_request[ `${ get_entity_options(entity).plural }` ][`create${ get_entity_options(entity).pluralCapitalized }`](req, res, next);
};

const get_entity = (req, res, next) => {
  const entity = req.params.entity_type;
  
  return pds_request[ `${ get_entity_options(entity).plural }` ][`find${ get_entity_options(entity).pluralCapitalized }`](req, res, next);
};

const update_entity = (req, res, next) => {
  const entity = req.params.entity_type;
  // const id = req.params.id;
  
  return pds_request[ `${ get_entity_options(entity).plural }` ][`update${ get_entity_options(entity).pluralCapitalized }`](req, res, next);
};

const delete_entity = (req, res, next) => {
  const entity = req.params.entity_type;
  // const id = req.params.id;
  
  return pds_request[ `${ get_entity_options(entity).plural }` ][`delete${ get_entity_options(entity).pluralCapitalized }`](req, res, next);
};

const handleControllerDataResponse = function (req, res) {
	//console.log('req.controllerData',req.controllerData);
  delete req.controllerData.authorization_header;
  res.send((req.controllerData.useSuccessWrapper) ? {
    result: 'success',
    data: req.controllerData,
  } : req.controllerData);
};


const controller = function (resources) {
  pds_request = resources.app.controller.extension.pds_request;
  // console.log({ pds_request, });
  // logger = resources.logger;
  // mongoose = resources.mongoose;
  // appSettings = resources.settings;
  // appenvironment = appSettings.application.environment;
  // ImpactRadiusData = mongoose.model('Data');
  // PDS_Applications = resources.app.controller.extension.pds_request.applications;
  // PDS_Customers = resources.app.controller.extension.pds_request.customers;
  // PDS_Files = resources.app.controller.extension.pds_request.files;
  // CoreController = resources.core.controller;
  // CoreUtilities = new Utilities(resources);
  // ilsConfig = resources.app.controller.extension.promise_ils.config;
  // ilsAdminPath = path.join(resources.app.locals.adminPath, 'ils');
  // eurekapi_key = ilsConfig.eurekapi.key;
  // User = mongoose.model('User');

  return {
    handleControllerDataResponse,
    entity_index,
    create_entity,
    get_entity,
    update_entity,
    delete_entity,
  };
};

module.exports = controller;