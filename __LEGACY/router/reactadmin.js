'use strict';

module.exports = function(resources) {
	// console.log('setting up react admin router');
  const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
  const ReactAdminRouter = resources.express.Router();
  const reactAdminExtSettings = resources.app.controller.extension.reactadmin.settings;
  if (reactAdminExtSettings.include_index_route) {
    ReactAdminRouter.get('/', reactadminController.index);
  }
  if (!resources.app.locals.extension.reactadmin.settings.skip_catch_all_route) {
    ReactAdminRouter.get('/*', reactadminController.index);
  }

  return ReactAdminRouter;
};