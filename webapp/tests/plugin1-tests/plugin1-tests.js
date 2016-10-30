define(['jquery', 'qunit' ], 
	   function($, qunit) {
	'use strict';

	return function() {
		/*************  Module 1: CX-Test-Plugin ******************************/
		qunit.module("plugin1-tests");
		qunit.test("Plugin1 self tests", function(assert) {
			
			assert.expect(1);

			//publish test
			assert.ok(true, "Plugin1 Tests!");

			$('.plugin1').hide();
		});	
	};
});