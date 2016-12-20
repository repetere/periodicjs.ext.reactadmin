'use strict';

module.exports = function(resources) {
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ReactAdminRouter = resources.express.Router();

    ReactAdminRouter.all('*',
    	reactadminController.index);

    return ReactAdminRouter;
};