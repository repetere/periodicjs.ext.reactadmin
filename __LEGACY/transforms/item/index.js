'use strict';
// const prettysize = require('prettysize');
// const helper = require('../helper');
// const https = require('https');
// const http = require('http');
// const fs = require('fs-extra');
// const path = require('path');
// const dms2dec = require('dms2dec');
// const ExifImage = require('exif').ExifImage;

exports.indexFieldFilter = (periodic) => (req) => {
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
      console.log('req.body', req.body);
      resolve(req);
    } catch (e) {
      reject(e);
    }
  });
};