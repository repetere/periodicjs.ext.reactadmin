'use strict';

module.exports = function(resources) {
		console.log('setting up react admin router');
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ReactAdminRouter = resources.express.Router();

    ReactAdminRouter.get('/settings', reactadminController.loadSettings);
    ReactAdminRouter.get('/components/:component', reactadminController.loadComponent);
    ReactAdminRouter.all('/!(settings)', reactadminController.index);

    return ReactAdminRouter;
};