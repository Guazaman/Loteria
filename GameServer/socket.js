var raw_cards = require('./controllers/res/cards.json');
//var usercards = require('./controllers/res/usercards.js');
//var cards = JSON.parse(raw_cards);



const usercards = [
["el gallo", "la campana", "la garza", "el borracho", "el mundo", "el soldado", "la bandera", "el violoncello", "la estrella", "el arbol", "la maceta", "la sandia", "la escalera", "el sol", "el barril", "el negrito"],
["las jaras", "el musico", "la bandera", "el cantarito", "la botella", "el valiente", "el corazon", "el mundo", "la garza", "el pajaro", "el nopal", "el diablito", "el pino", "el catrin", "la luna", "el pescado"],
["el soldado", "la corona", "la calavera", "el negrito", "el arpa", "la luna", "la garza", "la maceta", "la estrella", "la escalera", "el paraguas", "el melon", "la bota", "la muerte", "el camaron", "el alacran"],
["la bandera", "el cotorro", "la sandia", "el barril", "la calavera", "el musico", "el mundo", "el gallo", "el cazo", "la rosa", "el cantarito", "el borracho", "el gorrito", "el pino", "la mano", "la rana"],
["la campana", "el apache", "la bota", "el bandolon", "el arbol", "el borracho", "la escalera", "el diablito", "el gallo", "la araña", "el pescado", "la muerte", "el negrito", "la corona", "el pino", "el tambor"],
["el corazon", "el diablito", "el cantarito", "e pajaro", "el negrito", "el apache", "el gallo", "el bandolon", "la estrella", "el cazo", "el melon", "el arpa", "el tambor", "la botella", "la corona", "el arbol"],
["la estrella", "el paraguas", "el cotorro", "la palma", "el pescado", "la dama", "el bandolon", "el musico", "el venado", "la sandia", "el apache", "el barril", "la mano", "la araña", "el alacran", "el pajaro"],
["el valiente", "la pera", "las jaras", "el cotorro", "la campana", "la sirena", "el arpa", "la estrella", "la rosa", "el pajaro", "el cazo", "la rana", "la luna", "la chalupa", "la botella", "el corazon"],
["el melon", "la sandia", "la dama", "el venado", "la mano", "el corazon", "el nopal", "el diablito", "la garza", "el violoncello", "la rana", "el camaron", "el barril", "la chalupa"]];


GameRoom = function(){

	this.numPlayers = 1;
	this.cards = raw_cards.map(elem => elem.name);
	console.log(usercards);
	this.roomPlayers = [];
	this.doneCards = [];

	const gridCards =  5; // 12
	const totalCards = 7; // total cards in game

	this.shuffle = function(array){
		for (var i = array.length - 1; i > 0; i--) {
        	var j = Math.floor(Math.random() * (i + 1));
        	[array[i],array[j]] = [array[j],array[i]]
    	}
	}

	this.hasCards = function(){
		return this.cards.length != 0;
	}

	this.drawCard = function(){
		let drawnCard = this.cards.pop();
		this.doneCards.push(drawnCard);
		return drawnCard;
	}

	this.searchPlayer = function(socketId){
		for(i in this.roomPlayers){
			let currentUser = this.roomPlayers[i];
			if(currentUser.userId == socketId){
				return currentUser;
			}
		}
		return -1;
	}

	this.check = function(socketId){
		let socket = this.searchPlayer(socketId);
		console.log("sus cartas ", socket.grid);
		console.log("current done cards::: ", this.doneCards);

		for(i in socket.grid){
			if(this.doneCards.indexOf(socket.grid[i]) == -1){
				return false;
			}
		}
		return true;
	} 	
}


var globalSocket = function(){

	this.roomMapping = new Map();

	this.createRoom = function(room, id){
		let newGameRoom = new GameRoom();
		newGameRoom.roomPlayers.push(id);
		this.roomMapping.set(room,newGameRoom);
	}

	this.getRoomPlayers = function(room){
		let gameRoom = this.roomMapping.get(room);
		console.log(gameRoom);
		return gameRoom.numPlayers;
	}

	this.addPlayerToRoom = function(room, id){
		let gameRoom = this.roomMapping.get(room);
		gameRoom.roomPlayers.push(id);
		gameRoom.numPlayers += 1;
		//this.roomMapping.set(id, this.getRoomPlayers(id) + 1);
	}

	this.removePlayerFromRoom = function(room, id){
		let gameRoom = this.roomMapping.get(room);
		let place = gameRoom.roomPlayers[userId].indexOf(id);
		gameRoom.roomPlayers.splice(place, 1);
		gameRoom.numPlayers -= 1;
	}

	this.startGame = function(room){
		let gameRoom = this.roomMapping.get(room);
		gameRoom.shuffle(gameRoom.cards);
		gameRoom.shuffle(usercards);

		for(i in gameRoom.roomPlayers){

			let newData = {
				userId: gameRoom.roomPlayers[i],
				grid: usercards[i] 
			}
			gameRoom.roomPlayers[i] = newData;
			console.log(gameRoom.roomPlayers[i]);
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

globalSocket.instance = null;

globalSocket.getInstance = function(){
	if(this.instance === null){
		this.instance = new globalSocket();
	}
	return this.instance;
}

module.exports = globalSocket.getInstance();