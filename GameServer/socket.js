var globalSocket = function(){

	this.roomMapping = new Map();

	this.createRoom = function(id){
		this.roomMapping.set(id, 1);
	}

	this.getRoomPlayers = function(id){
		let total = this.roomMapping.get(id);
		return total;
	}

	this.addPlayerToRoom = function(id){
		this.roomMapping.set(id, this.getRoomPlayers(id) + 1);
	}

	this.removePlayerFromRoom = function(id){
		this.roomMapping.set(id, this.getRoomPlayers(id) - 1);
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