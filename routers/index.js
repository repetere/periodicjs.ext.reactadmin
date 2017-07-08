'use strict';

const periodic = require('periodicjs');
const extensionRouter = periodic.express.Router();
const utilities = require('../utilities');
const reactadminRouter = require('./reactadmin');
const securecontentRouter = require('./securecontent');
const contentRouter = require('./content');
const componentRouter = require('./component');
console.log('reactadmin p settings', periodic.settings);
// const reactadmin = utilities.reactadmin();

// extensionRouter.use(`${reactadmin.manifest_prefix}securecontent`, securecontentRouter);
// extensionRouter.use(`${reactadmin.manifest_prefix}contentdata`, contentRouter);
// extensionRouter.use(`${reactadmin.manifest_prefix}load`, componentRouter);
// extensionRouter.use(`${reactadmin.manifest_prefix}`, reactadminRouter);

module.exports = extensionRouter;