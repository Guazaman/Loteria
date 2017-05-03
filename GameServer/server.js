
// INITIAL SETUP - import dependencies
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');                     
var morgan = require('morgan');             			
var bodyParser = require('body-parser');    			
var methodOverride = require('method-override'); 		

var port = process.env.PORT || 8081;

// Load DB configuration, and connect using mongoose.
mongoose.connect('mongodb://localhost:27017/gameserver');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // Parsing like jsons
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());										// Use of methodoverride to use DELETE instead of PUT

app.use(function(req, res, next){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
});

var gameController = require('./controllers/gameController')(io);
// Routes API, load them to be used by Express.
require('./app/router/GameRoom/controller.js')(app);


// Set app to listen (start app: server.js)
http.listen(port, function(){
  console.log('listening on *:', port);
});
