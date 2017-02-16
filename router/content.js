

module.exports = function(resources) {
	// console.log('setting up react admin router');
  // console.log('resources.app.controller.native.account.router', resources.app.controller.native.account.router);
  const ContentRouter = resources.express.Router();
  ContentRouter.get('/accounts', resources.app.controller.native.account.router);

  return ContentRouter;
};