

exports.postGameRoom = function(req, res){
	console.log("making post.. ", req.body);
}


exports.getGameRoom = function(req, res){
	console.log("fetching... ", req.body);
	res.send("<h2>Fetching data from localhost:8000</h2>");
}

exports.deleteGameRoom = function(req, res){
	//send id as msg from front not in data
	console.log("deleting the gameroom with id... ", req.param.id);
}
