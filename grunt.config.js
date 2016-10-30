/**
  * @desc Config file to define all paths
  * @return object config
*/
module.exports = function(){

	'use strict';

	var config = {

		//all js files
		alljs: [

			'./webapp/*.js',
			'!./webapp/lib/**/*.js'
		],

		allLess: [
		
			'webapp/css/css-loader-ext.less',
			'webapp/plugins/**/less/*.less'
		],

		modules: [
	
			'requireLib',
			'plugin1'
		]
	};

	return config;
};