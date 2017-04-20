

exports.postUser = function(req, res){
	console.log("making post.. ", req.body);
}


exports.getUser = function(req, res){
	console.log("fetching... ", req.body);
	res.send("<h2>Fetching data from localhost:8000</h2>");
}

exports.deleteUser = function(req, res){
	//send id as msg from front not in data
	console.log("deleting user with id... ", req.param.id);
}