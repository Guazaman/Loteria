// LOAD mongoose, needed to make a Schema.
var mongoose = require('mongoose');

// Define actual model, object
module.exports = mongoose.model('GameRoom', {
	ownerId: { type: String, required: true},
	name: String,
	type: { type: String, default: 'public' },	
	players: [String],
	invited: [String],
	createdAt: { type: Date, default: Date.now },
	winner: String,
	status: { type: String, default: 'Waiting'},
	maxPlayers: { type: Number, max: 5, min: 2, default: 2 }
});