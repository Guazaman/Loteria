var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var router = express.Router();

app.use('/User', require('./app/router/user'));
//app.use('/Score', require('./app/router/score/'));

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on port ' + port);