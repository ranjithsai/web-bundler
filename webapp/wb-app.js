/**
  * @desc To initialize modules on load
  * @param module jquery
  * @return method init
*/

define("wb-app", ["jquery"], function($){

	'use strict';

	var oPlugins = {

		mandatory: [

			"plugin1"
		]
	}

	return {

		init: function(){
			
			wb.require(oPlugins.mandatory, function(){});
		}
	};
});


/**
  * @desc callback funcition called after loading the dependent modules
  * @param module app - the requirejs module that is called first
*/

require(["wb-app", "jquery"], function(app, $){

	app.init();
});