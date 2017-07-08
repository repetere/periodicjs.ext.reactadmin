'use strtict';

module.exports = function(resources) {
  const SecureContentRouter = resources.express.Router();
  const assetController = resources.app.controller.native.asset;

  SecureContentRouter.get('/secure-asset/:id/:filename', assetController.loadAsset, assetController.decryptAsset);

  return SecureContentRouter;
};