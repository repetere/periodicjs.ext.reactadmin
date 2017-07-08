'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const securecontentRouter = periodic.express.Router();
// const securecontentSettings = utilities.getSettings();

// securecontentRouter.get('/dashboard', controllers.securecontent.dashboardView);

module.exports = securecontentRouter;