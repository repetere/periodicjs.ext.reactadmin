

module.exports = function(resources) {
	// console.log('setting up react admin router');
  // console.log('resources.app.controller.native.account.router', resources.app.controller.native.account.router);
  const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;
  const ContentRouter = resources.express.Router();
  // ContentRouter.all(ensureApiAuthenticated)
  ContentRouter.use(ensureApiAuthenticated, resources.app.controller.native.account.router);

  return ContentRouter;
};