var mongoose	= require('mongoose');
var Schema 		= mongoose.Schema;

var userSchema = new Schema({
	id: String,
	name: String,
	email: String,
	country: String,
	boardgame: String,
	password: {type: String, select: false},
	friends: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('User', userSchema);
