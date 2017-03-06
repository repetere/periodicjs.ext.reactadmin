'use strict';
var utilities;
var logger;
var transforms;
const Promisie = require('promisie');

const transformRequest = (type) => (req, res, next) => {
  let transformType = (type === 'pre') ? transforms.pretransform : transforms.posttransform;
  let transformsFilters = (transformType[ req.method ])
    ? utilities.findMatchingRoute(transformType[ req.method ], req._parsedOriginalUrl.pathname)
    : false; 
  if (transformsFilters && transformsFilters.length > 0) {
    Promisie.pipe(transformType[req.method][transformsFilters])(req)
      .then(newreq=>{
        req = newreq;
        next();
      }, next);
  }  else{
    next();
  }
};

const posttransform = transformRequest('post');
const pretransform = transformRequest('pre');


const controller = function (resources) {
  logger = resources.logger;
  utilities = require('../utility')(resources);
  transforms = require('../transforms')(resources);

  return {
    pretransform,
    posttransform,
  };
};

module.exports = controller;