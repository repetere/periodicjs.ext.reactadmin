'use strict';
const prettysize = require('prettysize');
const helper = require('../helper');

exports.formatAssetItem = (periodic) => (req) => {
  return new Promise((resolve, reject) => {
    try {
      let asset = (req.controllerData.asset.toJSON())
        ? req.controllerData.asset.toJSON()
        : req.controllerData.asset;
      asset.transform = {};
      // console.log({ asset },' prettysize(asset.size)', prettysize(asset.size));
      asset.transform.encrypted = (asset.attributes.encrypted_client_side) ? true : false;
      if (asset.attributes.encrypted_client_side) {
        let decryptedFilePath = helper.getAdminPathname(periodic, `/securecontent/secure-asset/${ asset._id 
}/${ asset.attributes.periodicFilename }`);
        // asset.fileurl_encrypted = asset.fileurl;
        asset.transform.fileurl = (req.headers.origin === 'http://localhost:3000')
          ? 'http://localhost:8786'+decryptedFilePath
          : decryptedFilePath;
      } else {
        asset.transform.fileurl = asset.fileurl;
      }
      asset.transform.size = prettysize(asset.size);
      req.controllerData.asset = asset;
      resolve(req);
    } catch (e) {
      reject(e);
    }
  });
};

// exports.formatAssetUpdate = (periodic) => (req) => {
//   return new Promise((resolve, reject) => {
//     try {
// //       let asset = (req.controllerData.asset.toJSON())
// //         ? req.controllerData.asset.toJSON()
// //         : req.controllerData.asset;
// //       // console.log({ asset },' prettysize(asset.size)', prettysize(asset.size));
// //       asset.attributes.encrypted_client_side = (asset.attributes.encrypted_client_side) ? true : false;
// //       if (asset.attributes.encrypted_client_side) {
// //         let decryptedFilePath = helper.getAdminPathname(periodic, `/securecontent/secure-asset/${asset._id
// // }/${asset.attributes.periodicFilename
// //           }`);
// //         asset.fileurl_encrypted = asset.fileurl;
// //         asset.fileurl = (req.headers.origin === 'http://localhost:3000')
// //           ? 'http://localhost:8786'+decryptedFilePath
// //           : decryptedFilePath;
// //       }
// //       asset.size = prettysize(asset.size);
// //       req.controllerData.asset = asset;
//       let postBody = Object.assign({}, req.body);

//       console.log({ postBody });
//       delete postBody.fileurl;
//       console.log('updated',{ postBody });
      
//       req.body = postBody;      
//       resolve(req);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


// exports.indexFieldFilter = (periodic) => (req) => {
//   return new Promise((resolve, reject) => {
//     try {
//       // console.log(__dirname, periodic.settings.name);
//       req.controllerData.model_fields = {
//         identification: 1,
//         latest_contact: 1,
//         sorad: 1,
//         createdat: 1,
//         user_account: 1,
//       };
//       req.controllerData.skip_population = true;
//       resolve(req);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };