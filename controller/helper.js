'use strict';

// const Promisie = require('promisie');
// const fs = Promisie.promisifyAll(require('fs-extra'));
// const path = require('path');
// const mongoose = require('mongoose');
// const capitalize = require('capitalize');
const str2json = require('string-to-json');
let assetController;

const approveOptionsRequest = (req, res, next) => {
  // console.log('req.method', req.method);
  if (req.method && typeof req.method === 'string' && req.method.toUpperCase() === 'OPTIONS') {
    res.send('ok preflight');
    // res.sendStatus(200);
  } else {
    next();
  }
};

const fixCodeMirrorSubmit = (req, res, next) => {
  if (req.body.genericdocjson) {
    req.controllerData = req.controllerData || {};
    req.controllerData.skip_xss = true;
    req.controllerData.encryptFields = true;
    var jsonbody = JSON.parse(req.body.genericdocjson);
    delete req.body.genericdocjson;
    req.body = Object.assign({}, req.body, jsonbody);
    if (!req.body.docid && req.body._id) {
      req.body.docid = req.body._id;
    }
    delete req.body._id;
    delete req.body.__v;
    // delete req.body.format;
    Object.keys(req.body).forEach(function (key) {
      if (req.body[key] === '!!--EMPTY--single--EMTPY--!!') {
        req.body[key] = null;
      } else if (req.body[key] === '!!--EMPTY--array--EMTPY--!!') {
        req.body[key] = [];
      }
    });
  }
  next();
};

const fixFlattenedSubmit = function (req, res, next) {
  if (req.query.unflatten && req.body) {
    req.body = str2json.convert(req.body);
    if (!req.body.docid && req.body._id) {
      req.body.docid = req.body._id;
    }
    // if (req.body.latest_contact.phone_number_primary) {
    //   req.body.latest_contact.phone_number_primary = req.body.latest_contact.phone_number_primary.replace(/\D/gi, '');
    // }
    delete req.body._id;
    delete req.body._csrf;
    delete req.body.__v;
  }
  next();
};

const handleFileUpload = function(req, res, next){
  if (req.query.handleupload) {
    // return [
    //   assetController.multiupload,
    //   assetController.create_assets_from_files,
    //   // handleFileResponse(req, res),
    // ];
    return assetController.multiupload(req, res, next);
  } else {
    next();
  }
};

const handleFileAssets = function(req, res, next){
  if (req.query.handleupload) {
    return assetController.create_assets_from_files(req, res, next);
  } else {
    next();
  }
};

const handleControllerDataResponse = function (req, res) {
  // console.log('req.controllerData', req.controllerData);
  // console.log('req.body', req.body);
  // console.log('req.files', req.files);
  //console.log('req.controllerData',req.controllerData);
  delete req.controllerData.authorization_header;
  res.send((req.controllerData.useSuccessWrapper) ? {
    result: 'success',
    data: req.controllerData,
  } : req.controllerData);
};

// const handleFileResponse = function (req, res, next) {
//   if (req.query.handleupload) {
//     console.log('req.controllerData', req.controllerData);
//     console.log('req.body', req.body);
//     console.log('req.files', req.files);
//     delete req.controllerData.authorization_header;
//     res.send(
//       (req.controllerData.useSuccessWrapper) 
//         ? {
//           result: 'success',
//           data: req.controllerData,
//         } 
//         : req.controllerData);
//   } else {
//     next();
//   }
// };


module.exports = function (resources) {
  assetController = resources.app.controller.native.asset;
  // periodic = resources;
  // appSettings = resources.settings;
  // themeSettings = resources.settings.themeSettings;
  // appenvironment = appSettings.application.environment;
  // CoreController = resources.core.controller;
  // CoreUtilities = resources.core.utilities;
  // logger = resources.logger;
  // extsettings = resources.app.locals.extension.reactadmin.settings;

  return { 
    approveOptionsRequest,
    fixCodeMirrorSubmit,
    fixFlattenedSubmit,
    handleFileUpload,
    handleFileAssets,
    handleControllerDataResponse,
    // handleFileResponse,
  };
};
