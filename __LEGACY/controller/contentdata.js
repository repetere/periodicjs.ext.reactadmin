'use strict';

const capitalize = require('capitalize');
const pluralize = require('pluralize');
const moment = require('moment');
pluralize.addIrregularRule('data', 'datas');
const helper = require('../transforms/helper');

var resources;
var CoreController;

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

const entity_index_load = (req, res, next) => {
  const entity = get_entity_options(req.params.entity_type);
  req.controllerData = Object.assign({}, req.controllerData, {
    model_fields: {
      changes: 0,
    },
  });
  return resources.app.controller.native[entity.name][`load${ entity.pluralCapitalized }`](req, res, next);
};

const create_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name].create(req, res, next);
};

const get_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  return resources.app.controller.native[entity.name][`loadFull${ entity.capitalized }`](req, res, next);
};

const update_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  // console.log('entity.name', entity.name, resources.app.controller.native[ entity.name ]);
  // console.log('req.body', req.body);
  // console.log('req.controllerData', req.controllerData);
  // req.controllerData.updateCallback
    
  if (req.query.updatecallback) {
    // let update_entity_controller_updates = resources.app.controller.native[ entity.name ].controllerOptions;
    // CoreController.updateModel
    req.controllerData.updateCallback = (err, updateddoc) => {
      req.controllerData.updateddoc = updateddoc;
      // console.log({ err, updateddoc, });
      next();
    };
    return resources.app.controller.native[ entity.name ].update(req, res, next);
  } else {
    return resources.app.controller.native[entity.name].update(req, res, next);
  }
};

const delete_entity = (req, res, next) =>{
  const entity = get_entity_options(req.params.entity_type);
  // console.log('delete','req.controllerData',req.controllerData,{entity})
  return resources.app.controller.native[entity.name].remove(req, res, next);
};

const merge_controller_data_req_body = (req, res, next) => {
  const entity = get_entity_options(req.params.entity_type);
  // console.log('merge_controller_data_req_body ORIGINAL req.body', req.body);
  if (!req.body.password) {
    req.skippassword = true;
  }
  req.body = Object.assign({},
    (req.controllerData[ entity.name ].toJSON())
      ? req.controllerData[ entity.name ].toJSON()
      : req.controllerData[ entity.name ],
    req.body);
  delete req.body.transform;
  if (req.body.assets && !req.body.assets.length) {
    delete req.body.assets;
  }
  if (req.body._id && !req.body.docid) {
    req.body.docid = req.body._id;
  }

  // console.log('merge_controller_data_req_body MERGED req.body', req.body);
  next();
};

const entity_content_pretransform = (req, res, next)=>{
  const entity = get_entity_options(req.params.entity_type);
  const getTransformedAsset = (asset)=>{
    // let asset = Object.assign({},entity.primaryasset);
    asset.transform = Object.assign({}, asset.transform);
    asset.transform.fileurl = helper.getFileURL({ 
      asset, 
      periodic:resources, 
      req, 
      skip_decryption:true, 
    });
    let assetpreviewImg = helper.getAssetPreview(asset);
    asset.transform.preview = `${
      (req.headers.origin === 'http://localhost:3000' && assetpreviewImg.indexOf('http') === -1)
        ? 'http://localhost:8786'
        : ''}${assetpreviewImg}`;
    return asset;
  };
  const getTransformedEntity = (entity)=>{
    if (entity.primaryasset){
      entity.primaryasset = getTransformedAsset(Object.assign({}, entity.primaryasset));
    } 
    if (entity.asset){
      entity.asset = getTransformedAsset(Object.assign({}, entity.asset));
    } 
    if (entity.assets){
      entity.assets = entity.assets.map(asset=>getTransformedAsset(Object.assign({}, asset)));
    }
    if(entity.publishat){
      entity.publishdate = moment(entity.publishat).format('YYYY-MM-DD');
      entity.publishtime = moment(entity.publishat).format('HH:mm');
      entity.publishat_localtime = new Date(entity.publishat).toString();
    }
    if(entity.createdat){
      entity.createdat_localtime = new Date(entity.createdat).toString();
    }
    if(entity.updatedat){
      entity.updatedat_localtime = new Date(entity.updatedat).toString();
    }
    // console.log({ entity, });
    return entity;
  };
  if(req.controllerData[entity.name]){
    req.controllerData[entity.name] = getTransformedEntity(helper.getControllerDataEntity(req.controllerData[entity.name]));
  } else if(req.controllerData[entity.plural]){
    req.controllerData[entity.plural] = getTransformedEntity(helper.getControllerDataEntity(req.controllerData[entity.plural]));
  }
  next();
};

const entity_content_posttransform = (req, res, next)=>{
  if (req.body.publishdate && req.body.publishtime) {
    req.body.publishat = new Date(moment(req.body.publishdate + ' ' + req.body.publishtime).format());
  }

  next();
};

const controller = function (periodic) {
  resources = periodic;
  CoreController = periodic.core.controller;

  return {
    entity_index_with_count,
    entity_index_with_default_limit,
    entity_index_load,
    create_entity,
    get_entity,
    update_entity,
    delete_entity,
    entity_content_pretransform,
    entity_content_posttransform,
    merge_controller_data_req_body,
  };
};

module.exports = controller;