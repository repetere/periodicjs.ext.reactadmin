'use strict';
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const path = require('path');
const mongoose = require('mongoose');
const capitalize = require('capitalize');
const str2json = require('string-to-json');


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
  }
  Object.keys(req.body).forEach(function (key) {
    if (req.body[key] === '!!--EMPTY--single--EMTPY--!!') {
      req.body[key] = null;
    } else if (req.body[key] === '!!--EMPTY--array--EMTPY--!!') {
      req.body[key] = [];
    }
  });
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

module.exports = function (resources) {
  // periodic = resources;
  // appSettings = resources.settings;
  // themeSettings = resources.settings.themeSettings;
  // appenvironment = appSettings.application.environment;
  // CoreController = resources.core.controller;
  // CoreUtilities = resources.core.utilities;
  // logger = resources.logger;
  // extsettings = resources.app.locals.extension.reactadmin.settings;

  return { 
    fixCodeMirrorSubmit,
    fixFlattenedSubmit,
  };
};
