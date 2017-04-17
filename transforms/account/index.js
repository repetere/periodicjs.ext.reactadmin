'use strict';
// const prettysize = require('prettysize');
// const helper = require('../helper');
// const https = require('https');
// const http = require('http');
// const fs = require('fs-extra');
// const path = require('path');
// const dms2dec = require('dms2dec');
// const ExifImage = require('exif').ExifImage;
const str2json = require('string-to-json');

exports.checkUpdatedAsset = (periodic) => (req) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('checkUpdatedAsset req.files', req.files);
      console.log('checkUpdatedAsset req.body', req.body);
      console.log('checkUpdatedAsset req.controllerData', req.controllerData);
      if (req.controllerData && req.controllerData.assets && req.controllerData.assets.length) {
        // req.body.primaryasset = req.controllerData.assets[ 0 ]._id;
        req.body.primaryasset = req.controllerData.assets[ 0 ];
      }
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
     
      console.log('updatedAccountProfile Initial req.controllerData', req.controllerData);

      let updatedProfile = Object.assign({}, req.body);
      delete updatedProfile.password;

      req.controllerData = {
        userdata: updatedProfile,
        username: updatedProfile.username,
        email: updatedProfile.email,
        firstname: updatedProfile.firstname,
        lastname: updatedProfile.lastname,
        // profile_image_preview: updatedProfile.profile_image_preview,
      };
      console.log('updatedAccountProfile req.body', req.body);
      console.log('updatedAccountProfile FINAL req.controllerData', req.controllerData);
      resolve(req);
    } catch (e) {
      reject(e);
    }
  });
};