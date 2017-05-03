// LOAD mongoose, needed to make a Schema.
var mongoose = require('mongoose');

// Define actual model, object
module.exports = mongoose.model('GameRoom', {
	ownerId: { type: String, required: true},
	name: String,
	type: { type: String, default: 'public' },	
	players: [String],
	invited: [String],
	createdAt: Date,
	winner: String,
	status: String,
	maxPlayers: { type: Number, max: 5, min: 2 }
});