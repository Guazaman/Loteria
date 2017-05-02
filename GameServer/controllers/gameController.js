// previo al juego
var manager = require("./../socket.js");
manager.createRoom("Kim");
manager.createRoom("Leo123");

exports = module.exports = function(io){

	io.on('connection', function(socket){

		console.log("a connection");

		socket.on('disconnect', function(){
	 		let room = socket.roomName;

			if(room){
				manager.removePlayerFromRoom(room);
				let players = manager.getRoomPlayers(room);
				io.sockets.in(room).emit('disconnection', players);
			}
  		});

  		socket.on('createRoom', function(id){
  			manager.createRoom(id);
  		});

	  	socket.on('joinRoom', function(room) {
	        socket.join(room);
	        manager.addPlayerToRoom(room);

	        let players = manager.getRoomPlayers(room);
	        console.log(players);
	        socket.roomName = room;
			io.sockets.in(room).emit('connected', players);
	    });

	  	socket.on('startGame', function(room){
	  		//
	  	});

	});
}