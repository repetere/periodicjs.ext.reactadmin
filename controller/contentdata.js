'use strict';

const capitalize = require('capitalize');
const pluralize = require('pluralize');
pluralize.addIrregularRule('data', 'datas');
var resources;

const get_entity_options = (entity) => {
  let usableEntity = pluralize.singular(entity);
  return {
    name: usableEntity,
    plural: pluralize(usableEntity),
    capitalized: capitalize(usableEntity),
    pluralCapitalized: pluralize(capitalize(usableEntity)),
  };
};

const entity_index_with_count = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name][`load${ entity.pluralCapitalized }WithCount`](req, res, next);
};

const entity_index_with_default_limit = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name][`load${ entity.pluralCapitalized }WithDefaultLimit`](req, res, next);
};

const entity_index_load = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name][`load${ entity.pluralCapitalized }`](req, res, next);
};

const create_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name].ccreate(req, res, next);
};

const get_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name][`loadFull${ entity.capitalized }`](req, res, next);
};

const update_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  // console.log('entity.name', entity.name, resources.app.controller.native[ entity.name ]);
  return resources.app.controller.native[entity.name].update(req, res, next);
};

const delete_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  // console.log('delete','req.controllerData',req.controllerData,{entity})
  return resources.app.controller.native[entity.name].remove(req, res, next);
};

const mergeControllerDataReqBody = (req, res, next) => {
  const entity = get_entity_options(req.params.entity_type);
  req.body = Object.assign({},
    (req.controllerData[ entity.name ].toJSON())
      ? req.controllerData[ entity.name ].toJSON()
      : req.controllerData[ entity.name ],
    req.body);
  delete req.body.transform;
  // console.log('req.body', req.body);
  next();
};

const controller = function (periodic) {
  resources = periodic;

  return {
    entity_index_with_count,
    entity_index_with_default_limit,
    entity_index_load,
    create_entity,
    get_entity,
    update_entity,
    delete_entity,
    mergeControllerDataReqBody,
  };
};

module.exports = controller;