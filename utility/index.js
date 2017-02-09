'use strict';

module.exports = function (resources){
  const generateDetailManifests = require('./detail_views/index').generateManifest;
  // const geolocation = require('./geolocation')(resources);
  return {
    generateDetailManifests
  };
};