'use strict';

module.exports = function(resources) {
		console.log('setting up react admin router');
    const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
    const ReactAdminRouter = resources.express.Router();

    ReactAdminRouter.get('/settings', function (req, res, next) {
    	console.log('hitting settings route');
    	next();
    }, reactadminController.loadSettings);
    ReactAdminRouter.all('/!(settings)', function (req, res, next) {
    	console.log('hitting the catch all');
    	next();
   	}, reactadminController.index);

    return ReactAdminRouter;
};