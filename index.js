'use strict';
const Errorie = require('errorie');
var ReactAdminRouter;

module.exports = function (periodic) {
	try {
		//configure locals
		periodic = require('./utility/locals')(periodic);
		periodic.app.themeconfig.utility = require('./utility/index.js')(periodic);
		periodic.app.themeconfig.controller = Object.assign(periodic.app.themeconfig.controller, require('./controller/index')(periodic));
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