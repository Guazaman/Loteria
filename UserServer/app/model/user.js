var mongoose	= require('mongoose');
var Schema 		= mongoose.Schema;

var userSchema = new Schema({
	id: String,
	name: String,
	country: String,
	score: {type: Number, default: 0},
	email: {type: String, select: false},
	boardgame: {type: String, select: false},
	password: {type: String, select: false},
	friends: [{type:mongoose.Schema.Types.ObjectId, ref: 'User', select: false}]
});

module.exports = mongoose.model('User', userSchema);
