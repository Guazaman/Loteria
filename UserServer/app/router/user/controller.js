var mongoose = require('mongoose');
const dbURL = "mongodb://localhost:27017/LoteriaUsers";
mongoose.connect(dbURL);
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
				gameboard: req.body.gameboard,
				password: req.body.password,
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

	User.find({}, function(err, data){
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
		res.send(user);
	})
}


exports.addFriend = function(req, res){

	User.update({req.params.user_id}, )
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