'use strict';

const path = require('path');

module.exports = function(periodic) {
    const ExtensionRouter = periodic.express.Router();
    const ReactAdminRouter = require(path.resolve(__dirname, './reactadmin'))(periodic);

    ExtensionRouter.use(`/${periodic.app.locals.adminPath}`, ReactAdminRouter);

    return ExtensionRouter;
};