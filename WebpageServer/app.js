var express = require('express');  
var logger = require('morgan')
var app = express();  

var server = require('./server/server.js');


// Configuración
// Localización de los ficheros 
app.use(express.static('client'));
// Muestra un log de todos los request en la consola        
app.use(logger('dev'));
	
// Escucha en el puerto 3000 y corre el server
app.listen(3000, function() {  
    console.log('App listening on port 3000');
});