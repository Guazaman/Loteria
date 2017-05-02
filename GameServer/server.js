// INITIAL SETUP - import dependencies
var express  = require('express');
var app      = express();                               
var mongoose = require('mongoose');                     
var morgan = require('morgan');             			
var bodyParser = require('body-parser');    			
var methodOverride = require('method-override'); 		

var port = process.env.PORT || 8080;

// Load DB configuration, and connect using mongoose.
mongoose.connect('mongodb://localhost:27017/gameserver');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // Parsing like jsons
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());										// Use of methodoverride to use DELETE instead of PUT

// Routes API, load them to be used by Express.
require('./app/router/GameRoom/controller.js')(app);


// Set app to listen (start app: server.js)
app.listen(port);
console.log("App listening on port " + port);