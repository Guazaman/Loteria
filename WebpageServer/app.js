var express = require('express');
var logger = require('morgan')
var app = express();

var server = require('./server/server.js');


// Configuraci�n
// Localizaci�n de los ficheros
app.use(express.static('client'));
// Muestra un log de todos los request en la consola
app.use(logger('dev'));

app.all("/*", function(req, res, next) {
			 res.sendfile("index.html", { root: __dirname + "/client" });
 });

// Escucha en el puerto 3000 y corre el server
app.listen(3000, function() {
    console.log('App listening on port 3000');
});
