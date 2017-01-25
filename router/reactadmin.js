'use strict';

module.exports = function(resources) {
		console.log('setting up react admin router');
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ReactAdminRouter = resources.express.Router();

    ReactAdminRouter.post('/manifest', reactadminController.loadManifest);
    ReactAdminRouter.post('/preferences', reactadminController.loadUserPreferences);
    ReactAdminRouter.post('/navigation', reactadminController.loadNavigation);
    ReactAdminRouter.get('/components/:component', reactadminController.loadComponent);
    ReactAdminRouter.all('/!(manifest|components|preferences)', reactadminController.index);

    return ReactAdminRouter;
};