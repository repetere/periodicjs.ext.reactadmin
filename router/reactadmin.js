'use strict';

module.exports = function(resources) {
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ExtensionRouter = periodic.express.Router();

    ExtensionRouter.all('/process_application',
    	reactadminController.index);

    return ReactAdminRouter;
};