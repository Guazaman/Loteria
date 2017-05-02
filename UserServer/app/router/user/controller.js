var mongoose = require('mongoose');

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
var User = require('./../../model/user');

exports.postUser = function(req, res){

	User.findOne({email: req.body.email}, function(err, user){

		if(err){
			res.send(err);
		}

		if(user){
			return res.status(402).send({success: false, error: 'Email already registered!'});
		}else{


			let newUser = new User({
				name: req.body.name,
				email: req.body.email,
				country: req.body.country,
				boardgame: req.body.boardgame,
				password: req.body.password,
				score: 0
			});

			newUser.save(function(err){

				if(err){
					res.send(err);
				}
				return res.status(200).send({success: true, name: newUser.name, id: newUser._id});
			});
		}
	});
}

//fetches all users
exports.getUsers = function(req, res){

	User.find({}, '+boardgame +email', function(err, data){
		if(err){
			res.send(err);
		}
		res.status(200).send(data);
	});
}

exports.deleteUser = function(req, res){
	//send id as msg from front not in data
	User.remove({'_id': req.params.id}, function(err, user){
		if(err){
			res.send(err);
		}
		res.status(200).send(user);
	})
}


exports.addFriend = function(req, res){

	User.findOne({email: req.body.email}, function(err, user){

		if(err){
			res.status(404).send({error: 'Email not found on database'});
		}else{
			if(user){
				User.findByIdAndUpdate(req.params.id, {$push: {friends: user._id}}, 
					{safe: true, upsert: true}, function(err, model){
					if(err){
						return res.send(err);
					}else{
						return res.status(200).send({success: true, name: user.name});
					}
				});
			}else{
				res.status(404).send({success: false, error: 'Email not found on database'});
			}
		}
	});
}


exports.getFriends = function(req, res){

	User.findOne({_id: req.params.id})
		.populate('friends')
		.exec(function(err, user){
			if(err){
				return res.send(err);
			}else{
				return res.status(200).send(user.friends);
			}
		})
}


exports.deleteFriend = function(req, res){

	User.findByIdAndUpdate(req.params.id, {$pull: {"friends": req.body.friendId }}, 
		function(err, user){
			if(err){
				res.send(err);
			}
			return res.status(200).send(user.friends);
	})
}

exports.getProfile = function(req, res){

	User.findOne({_id: req.params.id}, '+boardgame +email', function(err, user){
		if(err){
			res.send(err);
		}else{
			return res.status(200).send(user);
		}
	});
}


exports.updateProfile = function(req, res){

	console.log("IN UPDATE PROFILE", req.body);
	User.findByIdAndUpdate(req.params.id, req.body, {new: true, projection: '+boardgame +email'}, function(err, user){
		if(err){
			res.send(err);
		}else{
			return res.status(200).send(user);
		}

	})
}


exports.login = function(req, res){

	User.findOne({email: req.body.email}, '+password', function(err, user){

		if(err){
			res.send(err);
		}

		if(user){
			if(user.password != req.body.password){
				return res.status(404).send({error: 'Wrong Password', success: false});
			}

			return res.json({
					success: true,
					id: user._id,
					name: user.name
			});
		}else{
			return res.status(404).send({error: 'Email Not Found', success: false});
		}
	})
}