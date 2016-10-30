# web-bundler
A boilerplate that can embed all your HTML, CSS and JavaScript files into a single JavaScript file.

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

	        grunt widgets --> to generate a build with all the plugins

	        grunt dev --> to generate non-optimized dev build with all plugins


To run application with node server:
------------------------------------

	1.	Navigaye to the project folder and Install node express

	        npm install express --save-dev

	2.	Use the below command to run the application. You can run on your own port number by changing here.

	        node server.js

	3.	http://localhost:9999/webapp/index.html --> URL to the application
