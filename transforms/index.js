'use strict';

module.exports = (periodic) => {
  return {
    pretransform: require('./pretransform')(periodic),
    posttransform: require('./posttransform')(periodic),
  };
};