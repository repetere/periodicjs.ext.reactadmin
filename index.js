'use strict';
const Errorie = require('errorie');
var ReactAdminRouter;

module.exports = function (periodic) {
	try {
		//configure locals
		periodic = require('./utility/locals')(periodic);
		periodic.app.controller.extension.reactadmin.utility = require('./utility/index.js')(periodic);
		periodic.app.controller.extension.reactadmin.controller = Object.assign(periodic.app.controller.extension.reactadmin.controller, require('./controller/index')(periodic));
		ReactAdminRouter = require('./router/index')(periodic);
		periodic.app.use(ReactAdminRouter);
	}
	catch (e) {
		throw new Errorie({
			name: 'React Admin',
			message: 'Config error - ' + e.message
		});
	}

	return periodic;
};