'use strtict';

module.exports = function(resources) {
  const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;
  const ContentRouter = resources.express.Router();
  const assetController = resources.app.controller.native.asset;
  const helperController = resources.app.controller.extension.reactadmin.controller.helper;
  const transformController = resources.app.controller.extension.reactadmin.controller.transform;
  const contentdataController = resources.app.controller.extension.reactadmin.controller.contentdata;
  let reactadmin = resources.app.locals.extension.reactadmin;

  // ContentRouter.use(helperController.approveOptionsRequest, ensureApiAuthenticated, helperController.fixCodeMirrorSubmit, helperController.fixFlattenedSubmit);
  ContentRouter.get('/:dbname/secure-asset/:id/:filename', assetController.loadAsset, assetController.decryptAsset);

  ContentRouter.use(helperController.approveOptionsRequest, ensureApiAuthenticated);
  ContentRouter.get('/:dbname/dbstats',
    helperController.getDBStats,
    helperController.handleControllerDataResponse);
  ContentRouter.get('/:dbname/:entity_type', //get index
    transformController.pretransform,
    contentdataController.entity_index_with_count,
    contentdataController.entity_index_with_default_limit,
    contentdataController.entity_index_load,
    transformController.posttransform,
    helperController.handleControllerDataResponse); 
  ContentRouter.post('/:dbname/:entity_type', //create single
		helperController.handleFileUpload,
		helperController.handleFileAssets,  
    helperController.fixCodeMirrorSubmit,
    helperController.fixFlattenedSubmit,
		helperController.handleFileAssetsResponse,  
    transformController.pretransform,
    resources.core.controller.save_revision,
    contentdataController.create_entity,
    transformController.posttransform,
    helperController.handleControllerDataResponse); 
  ContentRouter.get('/:dbname/:entity_type/:id', //get single
    transformController.pretransform,
    contentdataController.get_entity,
    contentdataController.entity_content_pretransform,
    transformController.posttransform,
    helperController.handleControllerDataResponse); 
  ContentRouter.put('/:dbname/:entity_type/:id', //update single  
		helperController.handleFileUpload,
    helperController.handleFileAssets,
    helperController.fixCodeMirrorSubmit,
    helperController.fixFlattenedSubmit,
    transformController.pretransform,
    contentdataController.get_entity,
    contentdataController.merge_controller_data_req_body,
    contentdataController.entity_content_posttransform,
    resources.core.controller.save_revision,
    contentdataController.update_entity,
    transformController.posttransform,
    helperController.handleControllerDataResponse); 
  ContentRouter.delete('/:dbname/:entity_type/:id', //delete single
    transformController.pretransform,
    contentdataController.get_entity,
    contentdataController.delete_entity,
    transformController.posttransform,
    helperController.handleControllerDataResponse); 

  return ContentRouter;
};

/*
  ContentRouter.post('/:dbname/assetupload',
		helperController.handleFileUpload,
		helperController.handleFileAssets,
    helperController.handleControllerDataResponse);
 */