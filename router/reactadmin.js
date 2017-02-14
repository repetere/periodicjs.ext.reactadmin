

module.exports = function(resources) {
	// console.log('setting up react admin router');
  const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
  const ReactAdminRouter = resources.express.Router();
  ReactAdminRouter.get('/', reactadminController.index);
  ReactAdminRouter.get('/*', reactadminController.index);

  return ReactAdminRouter;
};