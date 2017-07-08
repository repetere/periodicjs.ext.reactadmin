const path = require('path');

module.exports = function(periodic) {
  // console.log(periodic.app.controller.native.asset)
  const ExtensionRouter = periodic.express.Router();
  const ReactAdminRouter = require(path.resolve(__dirname, './reactadmin'))(periodic);
  const ComponentRouter = require(path.resolve(__dirname, './component'))(periodic);
  const ContentRouter = require(path.resolve(__dirname, './content'))(periodic);
  const SecureContentRouter = require(path.resolve(__dirname, './securecontent'))(periodic);
  const reactadmin = periodic.app.locals.extension.reactadmin;

  ExtensionRouter.use(`${reactadmin.manifest_prefix}securecontent`, SecureContentRouter);
  ExtensionRouter.use(`${reactadmin.manifest_prefix}contentdata`, ContentRouter);
  ExtensionRouter.use(`${reactadmin.manifest_prefix}load`, ComponentRouter);
  ExtensionRouter.use(`${reactadmin.manifest_prefix}`, ReactAdminRouter);

  return ExtensionRouter;
};