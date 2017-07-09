'use strict';

const periodic = require('periodicjs');
const utilities = require('../utilities');
const controllers = require('../controllers');
const reactadmin = utilities.reactadmin();
const reactadminRouter = periodic.express.Router();

const reactAdminExtSettings = reactadmin.settings;
if (reactAdminExtSettings.include_index_route) {
  reactadminRouter.get('/', controllers.reactadmin.index);
}
if (!reactAdminExtSettings.skip_catch_all_route) {
  reactadminRouter.get('/*', controllers.reactadmin.index);
  reactadminRouter.get('*', controllers.reactadmin.index);
}

module.exports = reactadminRouter;