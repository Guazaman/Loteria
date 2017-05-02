var should = require('chai').should,
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8080');

describe('GameRooms', function(){
	it('Should be able to connect to GameRooms Database',function(done){
		api.get('/gamerooms')
		.set('Accept', 'application/json')
		.expect(200, done);
	});

	/*it('Should be able to create a GameRoom',function(done){
		api.post('/gamerooms')
		.set('Accept', 'application/json')
		.send({
			ownerId: 'own3', 	
			name: 'My GameRoom own3', 
			type: 'private', 	
			players: ['Alma', 'Maria','Pancho'],
			createdAt: '2016-11-16T16:15:15Z', 
			winner: 'Maria', 
			maxPlayers: 4,
		})
		.expect(200)
		.end(function(err,res){
			done();
		});
	});*/

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
			//console.log(res.body.message);
			expect(res.body.message).to.equal('GameRoom validation failed');
			done();
		});
	});

});