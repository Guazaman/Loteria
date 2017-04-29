var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/Users', require('./app/router/users'));
//app.use('/Score', require('./app/router/score/'))


var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on port ' + port);