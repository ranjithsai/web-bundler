/**
  * @Ranjith Sai
  * @desc RequireJS config module to define paths and dependencies
*/

require.config({

    "paths": {

        // 3rd Party JS Plugins & Libraries
        "jquery": "lib/thirdparty/jquery-2.1.4",
        "jquery-private": "lib/firstparty/jquery-private",
        "text"  : "lib/thirdparty/text",
        "qunit": "lib/thirdparty/qunit/qunit",
        
        // 1st Party JS Plugins & Libraries
        "cx-helper": "lib/firstparty/cx-helper",

        // Your Plugins
        "plugin1": "plugins/plugin1/plugin1",

        //Tests
        "plugin1-tests": "tests/plugin1-tests/plugin1-tests"
    },

    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': { 'jquery': 'jquery-private' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'jquery-private': { 'jquery': 'jquery' }
    },

    // Dependencies
    "shim": {

        "wb-app": ["jquery"],
        "plugin1": ["jquery"]
    }
});


/**
  * @desc callback funcition called after loading the dependent modules
  * @param module app - the requirejs module that is called first
*/

//Note: use this code when not running with build file

/*require(["app", "jquery","text!css/css-inline.html"], function(app, $, cssInlineTpl){

    app.init();
    $(document.body).append(cssInlineTpl);

});*/