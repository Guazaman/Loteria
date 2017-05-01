var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');
const dbURL = "mongodb://localhost:27017/LoteriaUsers";
mongoose.connect(dbURL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/Users', require('./app/router/user'));
app.use('/Scores', require('./app/router/score'))

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on port ' + port);