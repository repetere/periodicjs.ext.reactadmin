'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const contentRouter = periodic.express.Router();
// const contentSettings = utilities.getSettings();

// contentRouter.get('/dashboard', controllers.content.dashboardView);

module.exports = contentRouter;