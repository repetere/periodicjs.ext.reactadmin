'use strict';

var Extensions = require('periodicjs.core.extensions'),
	ExtensionCore = new Extensions({
		dirname: __dirname 
	});

ExtensionCore.install({
		// enabled:false,
		moveafter:'periodicjs.ext.user_access_control'
	},
	function(err,status){
		if(err){
			throw new Error(err);
		}
		else{
			console.log(status);
		}
});
// $ npm install --skip_ext_conf
// $ npm intsall --enable_ext