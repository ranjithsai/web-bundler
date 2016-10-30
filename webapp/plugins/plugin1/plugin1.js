/**
  * @desc Interface to cx-callback plugin
  * @param
  * @return
*/

define([

	"jquery",
	"text!./plugins/plugin1/html/plugin1.html",
],

function($, tplPlugin1){
  
    'use strict';

    var $plugin1 = $(tplPlugin1);

    $(document.body).append($plugin1);
});
