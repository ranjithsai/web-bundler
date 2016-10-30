var express = require("express");
var app = express();
 
 app.use(function(req, res, next){

 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Methods", "GET,POST, PUT, DELETE");
 	res.header("Access-Control-Allow-Headers", "Content-Type");
 	next();
 });

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendFile('index.html')
 });
 
 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]); 
 });
 
 var port = process.env.PORT || 9999;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
