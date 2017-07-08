'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const componentRouter = periodic.express.Router();
// const componentSettings = utilities.getSettings();

// componentRouter.get('/dashboard', controllers.component.dashboardView);

module.exports = componentRouter;