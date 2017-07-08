'use strict';

var Extensions = require('periodicjs.core.extensions'),
	ExtensionCore = new Extensions({
		dirname: __dirname 
	});

ExtensionCore.uninstall({
		removepublicdir:true,
		// removeconfigdir:false,
	},
	function(err,status){
		if(err){
			throw new Error(err);
		}
		else{
			console.log(status);
		}
});