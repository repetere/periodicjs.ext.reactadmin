'use strict';
// const path = require('path');
// const fs = require('fs-extra');
// const Errorie = require('errorie');
// var asyncAdminRouter;

module.exports = function (periodic) {
	// try {
	// 	//configure locals
	// 	periodic = require('./utility/locals')(periodic);
	// 	periodic.app.themeconfig.utility = require('./utility/index.js')(periodic);
	// 	periodic.app.themeconfig.controller = Object.assign(periodic.app.themeconfig.controller, require('./controller/index')(periodic));
	// 	asyncAdminRouter = require('./router/index')(periodic);
	// 	periodic.app.use(asyncAdminRouter);
	// }
	// catch (e) {
	// 	throw new Errorie({
	// 		name: 'Async Admin',
	// 		message: 'Config error - ' + e.message
	// 	});
	// }

	return periodic;
};