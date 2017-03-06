'use strict';

exports.getAdminPrefix = function (periodic) {
  return (typeof periodic.app.locals.adminPath === 'string' && periodic.app.locals.adminPath !== '/' && periodic.app.locals.adminPath)
    ? periodic.app.locals.adminPath
    : '/';
};

exports.getAdminPathname = function (periodic, pathname) {
  let adminPrefix = (typeof periodic.app.locals.adminPath === 'string' && periodic.app.locals.adminPath !== '/' && periodic.app.locals.adminPath)
    ? periodic.app.locals.adminPath
    : '/';
  
  return `${adminPrefix}${pathname}`;
};