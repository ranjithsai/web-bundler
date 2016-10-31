# web-bundler

Why Web-bundler? 

To combine and inline all your html and javascript files into a javascript file. Similarly, all CSS files are minified into a single CSS file. Any image urls inside the css files are auto converted to inline binary texts.


Flexibility:
-----------

	1. Define your own AMD plugin.
	
	2. Define your own technical stack.

	3. Define you own build file names for JS and CSS by modifying the grunt file.


Boilerplate Technical Stack:
---------------------------

	1. RequireJS for defining plugin.

	2. Grunt for the build system.

	3. JUnit for testing.


Setting up widgets locally:
--------------------------

	Please have the following installed in the environment:

	1.  Node.js (https://nodejs.org/en/)

	2.  Grunt (http://gruntjs.com/installing-grunt)

	3.  Grunt cli (http://gruntjs.com/getting-started)


Build steps:
------------

	1.	npm install or npm install --save-dev (to install dependencies in local workspace)

	4.  Use any of the below available builds to generate the build files.

	        grunt web-bundler --> to generate a build with all the plugins

	        grunt dev --> to generate non-optimized dev build with all plugins

	        grunt web-bundler-prod --> to generate a build file for production


To run application with node server:
------------------------------------

	1.	Navigaye to the project folder and Install node express

	        npm install express --save-dev

	2.	Use the below command to run the application. You can run on your own port number by changing here.

	        node server.js

	3.	http://localhost:9999/webapp/index.html --> URL to the application
