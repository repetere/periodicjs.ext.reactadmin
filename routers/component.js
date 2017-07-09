'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const componentRouter = periodic.express.Router();
// const componentSettings = utilities.getSettings();

// componentRouter.get('/dashboard', controllers.component.dashboardView);
const oauth2serverControllers = periodic.controllers.extension.get('periodicjs.ext.oauth2server');
let ensureApiAuthenticated = oauth2serverControllers.auth.ensureApiAuthenticated;
//   const accountController = resources.app.controller.native.account;
const uacController = {
  loadUserRoles: (req, res, next) => {
    next();
  },
}; //resources.app.controller.extension.user_access_control.uac;
const mfaController = {
  authenticate_totp: (req, res, next) => {
    next();
  },
}; //resources.app.controller.extension.login_mfa

ensureApiAuthenticated = (req, res, next) => {
  console.log('ensureApiAuthenticated', req.headers);
  next();
};

componentRouter.post('/manifest', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactadmin.loadManifest);
componentRouter.get('/public_manifest', controllers.reactadmin.loadUnauthenticatedManifest);
componentRouter.post('/preferences', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactadmin.loadUserPreferences);
componentRouter.post('/navigation', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactadmin.loadNavigation);
componentRouter.post('/configurations', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactadmin.loadConfigurations);
componentRouter.post('/mfa', ensureApiAuthenticated, mfaController.authenticate_totp);
componentRouter.get('/components/:component', controllers.reactadmin.loadComponent);
componentRouter.get('/healthcheck', function(req, res) {
  res.status(200).send({ status: 'ok', });
});
componentRouter.get('/healthcheck/:id/:name', function(req, res) {
  console.log(req.params);
  res.status(200).send({ status: 'ok', params: req.params, });
});

module.exports = componentRouter;