var should = require('chai').should,
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8080');

var createdID = '590910acadb4456f51141ab6';

describe('GameRooms', function(){
	it('Should be able to connect to GameRooms Database',function(done){
		api.get('/gamerooms')
		.set('Accept', 'application/json')
		.expect(200, done);
	});

	it('Should be able to create a GameRoom',function(done){
		api.post('/gamerooms')
		.set('Accept', 'application/json')
		.send({
			ownerId: 'Alma', 	
			name: 'My GameRoom own3', 
			type: 'private', 	
			players: ['Alma', 'Maria','Pancho'],
			createdAt: '2016-11-16T16:15:15Z', 
			winner: 'Maria', 
			maxPlayers: 4,
		})
		.expect(200)
		.end(function(err,res){
			createdID = res.body[res.body.length-1]._id;
			done();
		});
	});

	it('Should be able to modify some fields of a GameRoom',function(done){
		api.put('/gamerooms/'+createdID)
		.set('Accept', 'application/json')
		.send({
			maxPlayers: 3,
		})
		.expect(200)
		.end(function(err,res){
			//console.log("Your new Max Players: " + res.body.maxPlayers);
			done();
		});
	});

	it('Should be able to delete a GameRoom',function(done){
		api.delete('/gamerooms/'+createdID)
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err,res){
			done();
		});
	});

	it('Should not be able to create a GameRoom without owner',function(done){
		api.post('/gamerooms')
		.set('Accept', 'application/json')
		.send({
			name: 'My GameRoom own3',  	
			players: ['Alma', 'Maria','Pancho'],
			createdAt: '2016-11-16T16:15:15Z', 
			winner: 'Maria', 
			maxPlayers: 4,
		})
		.expect(200)
		.end(function(err,res){
			expect(res.body.message).to.equal('GameRoom validation failed');
			done();
		});
	});

	it('Should not be able to create a game with more than 5 max players.',function(done){
		api.post('/gamerooms')
		.set('Accept', 'application/json')
		.send({
			ownerId: 'Romero',
			name: 'LeGame',  	
			players: ['Romero', 'Clavel','Poe'],
			createdAt: '2016-11-16T16:15:15Z', 
			maxPlayers: 6,
		})
		.expect(200)
		.end(function(err,res){
			//console.log(res.body.message);
			expect(res.body.message).to.equal('GameRoom validation failed');
			done();
		});
	});

	it('Should not be able to create a game with less than 2 max players.',function(done){
		api.post('/gamerooms')
		.set('Accept', 'application/json')
		.send({
			ownerId: 'Romero',
			name: 'LeGame',  	
			players: ['Romero', 'Clavel','Poe'],
			createdAt: '2016-11-16T16:15:15Z', 
			maxPlayers: 1,
		})
		.expect(200)
		.end(function(err,res){
			//console.log(res.body.message);
			expect(res.body.message).to.equal('GameRoom validation failed');
			done();
		});
	});

});