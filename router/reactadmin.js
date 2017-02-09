

module.exports = function(resources) {
	// console.log('setting up react admin router');
  const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
  const ReactAdminRouter = resources.express.Router();
<<<<<<< HEAD
  const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;
//   const accountController = resources.app.controller.native.account;
  const uacController = resources.app.controller.extension.user_access_control.uac;

  ReactAdminRouter.post('/manifest', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadManifest);
  ReactAdminRouter.post('/preferences', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadUserPreferences);
  ReactAdminRouter.post('/navigation', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadNavigation);
  ReactAdminRouter.post('/mfa', ensureApiAuthenticated, reactadminController.validateMFAToken);
  ReactAdminRouter.get('/components/:component', reactadminController.loadComponent);
  ReactAdminRouter.get('/healthcheck', function (req, res) {
    res.status(200).send({ status: 'ok', });
  });
  ReactAdminRouter.all('/!(manifest|components|preferences)', reactadminController.index);
=======
 
>>>>>>> ff60b2c46ed74c34bdfadc37680e01bde0787e54
  ReactAdminRouter.get('/', reactadminController.index);
  ReactAdminRouter.get('/*', reactadminController.index);

  return ReactAdminRouter;
};