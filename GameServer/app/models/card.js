// LOAD mongoose, needed to make a Schema.
var mongoose = require('mongoose');

// Define actual model, object
module.exports = mongoose.model('Card', {
	cardName: [String]
});