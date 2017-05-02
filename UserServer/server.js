var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');
const dbURL = "mongodb://localhost:27017/LoteriaUsers";
mongoose.connect(dbURL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
});


app.use('/Users', require('./app/router/user'));
app.use('/Scores', require('./app/router/score'))

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on port ' + port);