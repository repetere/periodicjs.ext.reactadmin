'use strict';

exports.getAdminPrefix = function (periodic) {
  return (typeof periodic.app.locals.adminPath === 'string' && periodic.app.locals.adminPath !== '/' && periodic.app.locals.adminPath)
    ? periodic.app.locals.adminPath
    : '/';
};

exports.getControllerDataEntity = function (entity) {
  return (typeof entity.toJSON==='function')
    ? entity.toJSON()
    : entity;
};

function _getAdminPathname (periodic, pathname) {
  let adminPrefix = (typeof periodic.app.locals.adminPath === 'string' && periodic.app.locals.adminPath !== '/' && periodic.app.locals.adminPath)
    ? periodic.app.locals.adminPath
    : '/';
  
  return `${adminPrefix}${pathname}`;
}

exports.getAdminPathname = _getAdminPathname;

exports.getFileURL = function (options) {
  let { periodic, req, asset, skip_decryption, } = options;
  if (skip_decryption && asset.attributes && asset.attributes.encrypted_client_side){
    return '/extensions/periodicjs.ext.reactadmin/img/icons/key167.svg';
  } else if (asset.attributes && asset.attributes.encrypted_client_side) {
    let decryptedFilePath = _getAdminPathname(periodic, `/periodic/securecontent/secure-asset/${ asset._id 
}/${ asset.attributes.periodicFilename }`);
    // asset.fileurl_encrypted = asset.fileurl;
    return (req.headers.origin === 'http://localhost:3000')
      ? 'http://localhost:8786'+decryptedFilePath
      : decryptedFilePath;
  } else {
    return asset.fileurl;
  }
};

exports.getAssetPreview = function (asset) {
  // /extensions/periodicjs.ext.reactadmin/img/icons/
  // if (asset.attributes && asset.attributes.encrypted_client_side) {
  //   return '/extensions/periodicjs.ext.reactadmin/img/icons/file82.svg';
  // } else
  if (asset.assettype && asset.assettype.match('audio')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/audio55.svg';
  }  else if (asset.assettype && asset.assettype.match('music')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/music232.svg';
  }  else if (asset.assettype && asset.assettype.match('application') || asset.assettype && asset.assettype.match('javascript') || asset.assettype && asset.assettype.match('css')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/code41.svg';
  }  else if (asset.assettype && asset.assettype.match('video')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/video170.svg';
  }  else if (asset.assettype && asset.assettype.match('word')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/word6.svg';
  }  else if (asset.assettype && asset.assettype.match('excel')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/x16.svg';
  }  else if (asset.assettype && asset.assettype.match('zip')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/compressed1.svg';
  }  else if (asset.assettype && asset.assettype.match('image')) {
    return asset.transform.fileurl;
  }  else if (asset.assettype && asset.assettype.match('text')) {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/text140.svg';
  }  else {
    return '/extensions/periodicjs.ext.reactadmin/img/icons/file87.svg';
  }
};