var should = require('chai').should();
var expect = require('chai').expect; 
var supertest = require('supertest');
var api = supertest('http://localhost:8000');

describe('Score', function(){

	let userId = '590667822a8c933b0797ed5a';
	let country = 'France';

	it('should be able to retrieve score information regarding each user', function(done){
		api.get('/Scores')
		.set('Accept', 'application/json')
		.expect(200, done);
	});

	it('should be able to increment a user score', function(done){
		api.post(`/Scores/${userId}/`)
		.set('Accept', 'application/json')
		.send({
			increment: 50
		})
		.expect(200)
		.end(function(err, res){
			expect(res.body).to.have.property("score");
			expect(res.body.score).to.not.equal(50);
			done();
		});
	});


	it('should be able to get the score of an user friends', function(done){
		api.post(`/Scores/${userId}/`)
		.set('Accept', 'application/json')
		.send({
			increment: 50
		})
		.expect(200)
		.end(function(err, res){
			expect(res.body).to.have.property("score");
			done();
		});
	});

	it('should be able to get the score of an specific country', function(done){
		api.get(`/Scores/${country}/Country`)
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err, res){
			expect(res.body[0]).to.have.property("score");
			expect(res.body[0]).to.have.property("name");
			done();
		});
	});
});