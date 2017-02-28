'use strict';

const path = require('path');

module.exports = function(resources) {
    const reactadmin = require(path.resolve(__dirname, './reactadmin'))(resources);
    const helper = require(path.resolve(__dirname, './helper'))(resources);

    return {
        reactadmin,
        helper,
    };
};