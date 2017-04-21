'use strict';
// const prettysize = require('prettysize');
// const helper = require('../helper');
// const https = require('https');
// const http = require('http');
// const fs = require('fs-extra');
// const path = require('path');
// const dms2dec = require('dms2dec');
// const ExifImage = require('exif').ExifImage;
// const str2json = require('string-to-json');

exports.checkUpdatedAsset = (periodic) => (req) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log('checkUpdatedAsset req.files', req.files);
      // console.log('checkUpdatedAsset req.body', req.body);
      // console.log('checkUpdatedAsset req.controllerData', req.controllerData);
      // console.log('BEFORE checkUpdatedAsset req.body', req.body);
      let CoreUtilities = periodic.core.utilities;
      let reqBody = Object.assign({}, CoreUtilities.removeEmptyObjectValues(req.body));
      Object.keys(req.body).forEach(key => {
        if (!reqBody[ key ] || reqBody[ key ] === 'undefined') {
          delete reqBody[ key ];
        }
      });
      // console.log('reqBody.location', reqBody.location);
      if (reqBody.location && reqBody.location.loc && (!reqBody.location.loc.latitude || reqBody.location.loc.latitude==='undefined' || !reqBody.location.loc.longitude || reqBody.location.loc.longitude ==='undefined')) {
        delete reqBody.location.loc;
      }
      if (reqBody.location && (!reqBody.location.zip || reqBody.location.zip==='undefined')) {
        delete reqBody.location.zip;
      }
      // console.log('checkUpdatedAsset', { reqBody, });
      req.body = reqBody;
      let loginSettings = periodic.app.controller.extension.login.loginExtSettings;
      // req.body = CoreUtilities.removeEmptyObjectValues(req.body);
      req.controllerData = Object.assign({}, req.controllerData);
      if (req.body.password) {
        req.controllerData.checkuservalidation = loginSettings.new_user_validation;
        req.controllerData.checkuservalidation.useComplexity = loginSettings.complexitySettings.useComplexity;
        req.controllerData.checkuservalidation.complexity = loginSettings.complexitySettings.settings.weak;
      }
      if (req.controllerData && req.controllerData.assets && req.controllerData.assets.length) {
        req.body.primaryasset = req.controllerData.assets[ 0 ]._id;
        // req.body.primaryasset = req.controllerData.assets[ 0 ];
      }
      req.skipemptyvaluecheck = true;
      // console.log('AFTER checkUpdatedAsset req.body', req.body);
      resolve(req);
    } catch (e) {
      reject(e);
    }
  });
};

exports.updatedAccountProfile = (periodic) => (req) => {
  return new Promise((resolve, reject) => {
    try {

      // console.log(__dirname, periodic.settings.name);
      // req.controllerData.model_fields = {
      //   identification: 1,
      //   latest_contact: 1,
      //   sorad: 1,
      //   createdat: 1,
      //   user_account: 1,
      // };
      // req.controllerData.skip_population = true;
     
      // console.log('updatedAccountProfile Initial req.controllerData', req.controllerData);

      let updatedProfile = Object.assign({}, req.body);
      delete updatedProfile.password;
      if (req.controllerData.assets && req.controllerData.assets.length) {
        updatedProfile.primaryasset = req.controllerData.assets[ 0 ];
      }

      req.controllerData = {
        userdata: updatedProfile,
        username: updatedProfile.username,
        email: updatedProfile.email,
        firstname: updatedProfile.firstname,
        lastname: updatedProfile.lastname,
        profile_image_preview: (req.controllerData.assets && req.controllerData.assets.length) ? req.controllerData.assets[0].fileurl :undefined, //updatedProfile.profile_image_preview,
      };
      // console.log('updatedAccountProfile req.body', req.body);
      // console.log('updatedAccountProfile FINAL req.controllerData', req.controllerData);
      resolve(req);
    } catch (e) {
      reject(e);
    }
  });
};