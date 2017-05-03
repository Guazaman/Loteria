var manager = require("./gameRoomManager.js");
manager.createRoom("Kim");

const FULL = -1;
const seconds = 1;
const CARD_DELAY = seconds * 1000;

var interval;

exports = module.exports = function(io){

	io.on('connection', function(socket){

		console.log("user connected");

		/* When a socket that is connected disconnects */
		socket.on('disconnect', function(){
	 		let room = socket.roomName;
			if(room){
				manager.removePlayerFromRoom(room, socket.id);
				let players = manager.getRoomPlayers(room);
				io.sockets.in(room).emit('disconnection', players);
			}
  		});

		/* Create an instance of a Room inside the map */
  		socket.on('create:room', function(room){
  			manager.createRoom(room);
  		});

  		/* Add players (socket) to an instance of a room */
	  	socket.on('join:room', function(room) {

	  		if(!manager.checkRoom(room))
	  			return io.to(socket.id).emit('invalid', room);

	        socket.join(room);
	        manager.addPlayerToRoom(room, socket.id);

	        let players = manager.getRoomPlayers(room);
	        socket.roomName = room;
			io.sockets.in(room).emit('connected', players);
	    });

	  	/* Start emiting card evnts */
	  	socket.on('start:game', function(room){

	  		currentGame = manager.startGame(room);
	  		console.log("juego comenzando!");

	  		for(i in currentGame.roomPlayers){
	  			io.to(currentGame.roomPlayers[i].socketId).emit('card:emit', currentGame.roomPlayers[i].grid);
	  		}

	  		interval = setInterval(function() {

	  			if(currentGame.hasCards()){
	  				let currentCard =  currentGame.drawCard();
	  				console.log(currentCard);
	  				io.sockets.in(room).emit('card:draw', currentCard);
	  			}else{
	  				clearInterval(this);
	  				io.sockets.in(room).emit('end:game', 'draw');

	  			}
	  		}, CARD_DELAY);

	  	});

	  	/* Check for an user card for a valid win */
	  	socket.on('proclaim:win', function() {
	  		let room = socket.roomName;
			if(room){
	  			var validWinner = manager.checkPlayer(room, socket.id);
	  			console.log("Valid? ", validWinner);
	  		}
	  		if(validWinner){
	  			clearInterval(interval);
	  			io.to(socket.id).emit('win');
	  			io.sockets.in(room).emit('end:game', 'player');
	  		}
	    });

	});
}