const path = require('path');

module.exports = function(periodic) {
  const ExtensionRouter = periodic.express.Router();
  const ReactAdminRouter = require(path.resolve(__dirname, './reactadmin'))(periodic);
  const ComponentRouter = require(path.resolve(__dirname, './component'))(periodic);
  const ContentRouter = require(path.resolve(__dirname, './content'))(periodic);
  // console.log('periodic.app.locals.adminPath', periodic.app.locals.adminPath);
  if (typeof periodic.app.locals.adminPath==='string' && periodic.app.locals.adminPath!=='/' && periodic.app.locals.adminPath) {
    ExtensionRouter.use(`${periodic.app.locals.adminPath}/contentdata`, ContentRouter);
    ExtensionRouter.use(`${periodic.app.locals.adminPath}/load`, ComponentRouter);
    ExtensionRouter.use(`${periodic.app.locals.adminPath}`, ReactAdminRouter);   
  } else {
    ExtensionRouter.use('/contentdata', ContentRouter);
    ExtensionRouter.use('/load', ComponentRouter);
    ExtensionRouter.use('/', ReactAdminRouter);
  }

  return ExtensionRouter;
};