var mongoose = require('mongoose');
var User = require('./../../model/user');

exports.getScores = function(req, res){

	User.find({}, '-friends', function(err, data){
		if(err){
			res.send(err);
		}

		res.status(200).send(data);
	});
}



exports.postScore = function(req, res){

	User.findByIdAndUpdate(req.params.id, {$inc: {score: req.body.increment}}, function(err, data){
		if(err){
			res.send(err);
		}else{	
			return res.status(200).send(data);
		}
	});
}


exports.getByFriends = function(req, res){

	User.findOne({_id: req.params.id})
		.populate('friends', 'name score -_id')
		.exec(function(err, user){
			if(err){
				res.send(err);
			}else{
				res.status(200).send(user.friends);
			}
		});
}


exports.getByCountry = function(req, res){
	User.find({country:req.params.country}, '-_id -friends -__v', {sort : {score: -1 } },
		function(err, set) {
   	 		if(err){
				res.send(err);
   	 		}else{
   	 			return res.status(200).send(set);
   	 		}
  		});
}



exports.getGlobal = function(req, res){
	User.find({}, '-_id -friends -__v', {sort : {score: -1 } },
		function(err, set) {
   	 		if(err){
				res.send(err);
   	 		}else{
   	 			return res.status(200).send(set);
   	 		}
  		});
}

