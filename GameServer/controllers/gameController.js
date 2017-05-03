var manager = require("./../socket.js");
manager.createRoom("Kim");

const FULL = -1;
var interval;

exports = module.exports = function(io){

	io.on('connection', function(socket){

		console.log("a connection");

		socket.on('disconnect', function(){
	 		let room = socket.roomName;
			if(room){
				manager.removePlayerFromRoom(room, socket.id);
				let players = manager.getRoomPlayers(room);
				io.sockets.in(room).emit('disconnection', players);
			}
  		});

  		socket.on('createRoom', function(room){
  			manager.createRoom(room);
  		});

	  	socket.on('joinRoom', function(room) {

	        socket.join(room);
	        manager.addPlayerToRoom(room, socket.id);
	        console.log(manager);
	        let players = manager.getRoomPlayers(room);
	        socket.roomName = room;

			io.sockets.in(room).emit('connected', players);
	    });

	  	socket.on('startGame', function(room){

	  		currentGame = manager.startGame(room);
	  		console.log("juego comenzando!");

	  		for(i in currentGame.roomPlayers){
	  			console.log("sending this !!! ", currentGame.roomPlayers[i].grid);
	  			io.to(currentGame.roomPlayers[i].socketId).emit('emitCard', currentGame.roomPlayers[i].grid);
	  		}

	  		interval = setInterval(function() {

	  			if(currentGame.hasCards()){
	  				let currentCard =  currentGame.drawCard();
	  				console.log(currentCard);
	  				io.sockets.in(room).emit('cardDrawing', currentCard);
	  			}else{
	  				clearInterval(this);
	  				io.sockets.in(room).emit('endedGame', 'draw');
	  			}
	  		}, 500);

	  	});

	  	socket.on('proclaimWin', function() {
	  		let room = socket.roomName;
			if(room){
	  			var result = manager.checkPlayer(room, socket.id);
	  		}
	  		if(result){
	  			clearInterval(interval);
	  			io.to(socket.id).emit('winner');
	  			io.sockets.in(room).emit('endedGame', 'player');
	  		}
	    });

	});
}