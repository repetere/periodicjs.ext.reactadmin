

module.exports = function(resources) {
	// console.log('setting up react admin router');
  // console.log('resources.app.controller.native.account.router', resources.app.controller.native.account.router);
  const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;
  const ContentRouter = resources.express.Router();
  const assetController = resources.app.controller.native.asset;
  // ContentRouter.all(ensureApiAuthenticated)
  ContentRouter.use(ensureApiAuthenticated, resources.app.controller.native.account.router);
  ContentRouter.options('/assets', (req, res, next) => {
    console.log('in options route');
    res.sendStatus(200);
    res.send('ok');
   });
  ContentRouter.post('/assets',
		assetController.multiupload,
		assetController.create_assets_from_files,
    (req, res) => {
      console.log('req.controllerData', req.controllerData);
      console.log('req.body', req.body);
      console.log('req.files', req.files);
      res.send({ result: 'success', data: req.controllerData });
    });

  return ContentRouter;
};