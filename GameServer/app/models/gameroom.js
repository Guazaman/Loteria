// LOAD mongoose, needed to make a Schema.
var mongoose = require('mongoose');

// Define actual model, object
module.exports = mongoose.model('GameRoom', {
	ownerId: String, 	
	name: String,
	type: String,	
	players: [String],
	createdAt: Date,
	winner: String,
	maxPlayers: Number
});