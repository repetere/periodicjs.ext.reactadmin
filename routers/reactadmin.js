'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const reactadminRouter = periodic.express.Router();
// const reactadminSettings = utilities.getSettings();

// reactadminRouter.get('/dashboard', controllers.reactadmin.dashboardView);

module.exports = reactadminRouter;