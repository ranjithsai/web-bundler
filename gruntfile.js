/**
  * @desc Parent Grunt file that acts as a hub to run child gruntfiles
  * @param grunt
*/

module.exports = function (grunt){

	"use strict";

	var config = require("./grunt.config")(), pkgDetails = grunt.file.readJSON('package.json');

	//Grunt project configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			files: ['webapp/build/*', './webapp/css/main.css']
		},

		less: {
			web_bundler_less: {
				files: {
					'webapp/css/main.css': config.allLess
				}
			}                
		},

		requirejs: {
			web_bundler: {
				options: {
					namespace: "wb",
					name: "wb-app",
					include: config.modules,
					baseUrl: './webapp',
					optimize: 'uglify2',
					preserveLicenseComments: false,
					useStrict: true,
					//wrap: true,
					inlineText: true,
					stubModules: [],
					out: './webapp/build/web-bundler.min.js',
					mainConfigFile: 'webapp/require.config.js',
					paths: {
						'text': 'lib/thirdparty/text', // relative to baseUrl
						'requireLib': 'lib/thirdparty/require'
					},
					generateSourceMaps: true
					//useSourceUrl: true,
					//exclude: ['jquery']
				}
			},
			web_bundler_prod: {
				options: {
					namespace: "wb",
					name: "wb-app",
					include: config.modules,
					baseUrl: './webapp',
					optimize: 'uglify2',
					preserveLicenseComments: false,
					useStrict: true,
					//wrap: true,
					inlineText: true,
					stubModules: [],
					out: './webapp/build/web-bundler.min.js',
					mainConfigFile: 'webapp/require.config.js',
					paths: {
						'text': 'lib/thirdparty/text', // relative to baseUrl
						'requireLib': 'lib/thirdparty/require'
					},
					generateSourceMaps: false
					//useSourceUrl: true,
					//exclude: ['jquery']
				}
			},
			dev: {
				options: {
					namespace: "wb",
					name: "wb-app",
					include: config.modules,
					baseUrl: './webapp',
					optimize: 'none',
					preserveLicenseComments: false,
					useStrict: true,
					//wrap: true,
					inlineText: true,
					stubModules: [],
					out: './webapp/build/web-bundler.min.js',
					mainConfigFile: 'webapp/require.config.js',
					paths: {
						'text': 'lib/thirdparty/text', // relative to baseUrl
						'requireLib': 'lib/thirdparty/require'
					},
					generateSourceMaps: true
				}
			}		
		},

		cssUrlEmbed: {
			encodeWithBaseDir: {
				options: {
					baseDir: './webapp',
					failOnMissingUrl: false,
					useMimeTypeSniffing: false
				},
				files: {
					'webapp/css/main.css': ['webapp/css/main.css']
				}
			}
		},

		cssmin: {
   			combine: {
      			files: {
         			'webapp/build/web-bundler.min.css': ['webapp/css/main.css','webapp/lib/firstparty/ark-style/css/ark-css.prefixed.min.css', 'webapp/lib/thirdparty/intl-tel-input/css/intlTelInput.css']
      			}
  			}
  		},

		uglify: { 
			options: {
				banner: '/** ' + '<%= pkg.name %>\n' +
				' * @version: ' + '<%= pkg.version %>\n' +
				' * @license: ' + '<%= pkg.license %>\n' +
				' * @Modules Present: ' + config.modules + '\n' +
				' **/\n'
			},

			adding_version: {
				files: {
					'webapp/build/web-bundler.min.js': ['webapp/build/web-bundler.min.js']
				}
			}
		},

		jshint:{	
			options: {
				jshintrc: '.jshintrc'
			},
			all: config.alljs
		},

		qunit: {

			web_bundler: ['webapp/tests.html'],
			cxchat: ['webapp/tests-chat.html']
		},	

		qunit_junit: {
			options: {
				dest: 'webapp/build/reports/'
			}
		},

		watch: {
			scripts: {
				files: ['webapp/**/*.*', 'webapp/css/css.html', '!webapp/css/*.*', '!webapp/build/*.*', '!webapp/index.html'],
				tasks: ['dev'],
				options: {
					spawn: false
				}
			},
		},

		passfail: {
			options: {
				force: true
			},
			all: {
				success: function() {
					grunt.log.subhead("BUILD SUCCESS!!");
				},
				fail: function() {
					grunt.log.subhead("BUILD FAILURE :(");
				}
			}
		}
	});
	
	//Tasks registrations

	grunt.registerTask("default", function(){
		grunt.log.subhead("Please use one of the valid Web-Bundler Build commands:\n");
		grunt.log.writeln("1.grunt dev - To generate single optimized web-bundler.min.js file / browser debugging enabled");
		grunt.log.writeln("2.grunt web-bundler - To generate single optimized web-bundler.min.js file including all plugins, run test cases and generate JUnit xml report file");
		grunt.log.writeln("3.grunt clear - To clean web-bundler build files if any");
	});

	grunt.registerTask("dev", function(){
		require('time-grunt')(grunt);
		grunt.log.subhead("Starting Web-Bundler dev build..............");
		grunt.task.run('clean','less:web_bundler_less', 'cssUrlEmbed', 'cssmin:combine', 'requirejs:dev', 'passfail');
	});

	grunt.registerTask("web-bundler", function(){
		require('time-grunt')(grunt);
		grunt.log.subhead("Starting Web-Bundler build..............");
		grunt.task.run('clean', 'qunit_junit', 'qunit:web_bundler', 'less:web_bundler_less', 'cssUrlEmbed', 'cssmin:combine', 'requirejs:web_bundler', 'uglify', 'passfail');
	});
	
	grunt.registerTask("web-bundler-prod", function(){
		require('time-grunt')(grunt);
		grunt.log.subhead("Starting Web_Bundler build..............");
		grunt.task.run('clean', 'less:web_bundler_less', 'cssUrlEmbed', 'cssmin:combine', 'requirejs:web_bundler_prod', 'uglify', 'passfail');
	});

	grunt.registerTask("clear", function(){ 
		require('time-grunt')(grunt);
		grunt.log.subhead("Cleaning Web-Bundler build files..............");
		grunt.task.run('clean');
	});

	//Events listening

	grunt.event.on('qunit.done', function (failed, passed, total, runtime) {
		if(failed !== 0 ){
			grunt.fail.fatal("Number of Tests failed: "+failed+", aborting grunt tasks");
			//grunt.fail.fatal("my error", [99]);
		}else{
			grunt.log.subhead("All Web-Bundler unit tests passed");
		}
	});

	grunt.event.on('qunit.log', function (result, actual, expected, message, source) {
  		
  		if(!result){
  			
  			grunt.log.writeln('--------------------------------------------');
  			grunt.log.errorlns('Failed: '+ message);
  			grunt.log.errorlns(source);
  			grunt.log.writeln('--------------------------------------------');

  		}else{

  			grunt.log.writeln(message);
  		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-combo-html-css-js');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-css-url-embed');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-qunit-junit');
	grunt.loadNpmTasks('grunt-passfail');
	grunt.loadNpmTasks('grunt-fail');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};