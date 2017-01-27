'use strict';

module.exports = function(resources) {
	console.log('setting up react admin router');
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ReactAdminRouter = resources.express.Router();
    const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;

    ReactAdminRouter.post('/manifest', ensureApiAuthenticated, reactadminController.loadManifest);
    ReactAdminRouter.post('/preferences', ensureApiAuthenticated, reactadminController.loadUserPreferences);
    ReactAdminRouter.post('/navigation', ensureApiAuthenticated, reactadminController.loadNavigation);
    ReactAdminRouter.get('/components/:component', reactadminController.loadComponent);
    ReactAdminRouter.get('/healthcheck', function (req, res) {
    	res.status(200).send({ status: 'ok' });
    });
    ReactAdminRouter.all('/!(manifest|components|preferences)', reactadminController.index);

    return ReactAdminRouter;
};