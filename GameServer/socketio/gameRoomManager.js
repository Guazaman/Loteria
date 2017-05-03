var rawCards = require('./res/cards.json');
var userCards = require('./res/usercards.js').usercards;

GameRoom = function(){

	this.numPlayers = 1;
	this.cards = rawCards.map(elem => elem.name);
	this.roomPlayers = [];
	this.doneCards = [];

	/* Shuffle of an Array */
	this.shuffle = function(array){
		for (var i = array.length - 1; i > 0; i--) {
        	var j = Math.floor(Math.random() * (i + 1));
        	[array[i],array[j]] = [array[j],array[i]]
    	}
	}
	/* Check for cards in deck */
	this.hasCards = function(){
		return this.cards.length != 0;
	}

	/* Retrieve a card and push it on a stack */
	this.drawCard = function(){
		let drawnCard = this.cards.pop();
		this.doneCards.push(drawnCard);
		return drawnCard;
	}

	/* Retrieve a socket index inside roomPlayers array */
	this.searchIndexPlayer = function(socketId){
		for(i in this.roomPlayers){
			let currentUser = this.roomPlayers[i];
			if(currentUser.socketId == socketId){
				return i;
			}
		}
		return -1;
	}

	/* Retrieve a socket inside roomPlayers array */
	this.searchPlayer = function(socketId){
		for(i in this.roomPlayers){
			let currentUser = this.roomPlayers[i];
			if(currentUser.socketId == socketId){
				return currentUser;
			}
		}
		return -1;
	}

	/* Check the validity of a certain socket card */
	this.check = function(socketId){
		let socket = this.searchPlayer(socketId);
		let winner = true;

		console.log("player cards :::: ", socket.grid);	
		console.log("current done cards::: ", this.doneCards);

		socket.grid.forEach((card) => {
			console.log("current card... ", card);
			if(this.doneCards.indexOf(card) === -1){
				winner = false;
			}
		});
		return winner;
	} 	
}


var globalSocket = function(){

	this.roomMapping = new Map();

	this.createRoom = function(room, id){
		let newGameRoom = new GameRoom();
		newGameRoom.roomPlayers.push({socketid:id, grid:undefined});
		this.roomMapping.set(room,newGameRoom);
	}

	this.checkRoom = function(room){
		let gameRoom = this.roomMapping.get(room);
		return gameRoom ? true : false;
	}


	this.getRoomPlayers = function(room){
		let gameRoom = this.roomMapping.get(room);
		return gameRoom.numPlayers;
	}

	this.addPlayerToRoom = function(room, id){
		let gameRoom = this.roomMapping.get(room);
		gameRoom.roomPlayers.push({socketId:id, grid:undefined});
		gameRoom.numPlayers += 1;
	}

	this.removePlayerFromRoom = function(room, socketid){
		let gameRoom = this.roomMapping.get(room);
		let place = gameRoom.searchIndexPlayer(socketid);
		gameRoom.roomPlayers.splice(place, 1);
		gameRoom.numPlayers -= 1;
	}

	this.startGame = function(room){
		let gameRoom = this.roomMapping.get(room);
		gameRoom.shuffle(gameRoom.cards);
		gameRoom.shuffle(userCards);

		for(i in gameRoom.roomPlayers){
			gameRoom.roomPlayers[i].grid = userCards[i];
		}
		return gameRoom;
	}

	this.drawCard = function(room){
		return room.drawCard;
	}


	this.checkPlayer = function(room, socketId){
		let gameRoom = this.roomMapping.get(room);
		return gameRoom.check(socketId);
	}	

}


/* Create Singleton */
globalSocket.instance = null;

globalSocket.getInstance = function(){
	if(this.instance === null){
		this.instance = new globalSocket();
	}
	return this.instance;
}

module.exports = globalSocket.getInstance();