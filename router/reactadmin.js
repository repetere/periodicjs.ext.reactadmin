'use strict';

module.exports = function(resources) {
		console.log('setting up react admin router');
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ReactAdminRouter = resources.express.Router();

    ReactAdminRouter.get('/manifest', reactadminController.loadManifest);
    ReactAdminRouter.get('/components/:component', reactadminController.loadComponent);
    ReactAdminRouter.all('/!(manifest|components)', reactadminController.index);

    return ReactAdminRouter;
};