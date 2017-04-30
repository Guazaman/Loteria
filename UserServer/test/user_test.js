var should = require('chai').should();
var expect = require('chai').expect; 
var supertest = require('supertest');
var api = supertest('http://localhost:8000');


describe('User', function(){

	it('should not be able to create users with duplicate email', function(done){
		api.post('/Users')
		.set('Accept', 'application/json')
		.send({
			name: 'Kevin',
			email: 'kevin@example.com',
			country: 'Tailand',
			boardgame: 'chess',
			password: 'K12345',
		})
		.expect(402)
		.end(function(err, res){
			expect(res.body.success).to.equal(false);
			done();
		});
	});

	it('should retrieve the list of all users', function(done){
		api.get('/Users')
		.set('Accept', 'application/json')
		.expect(200, done);
	});

	it('should be an object with keys and values', function(done){
		api.get('/Users')
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err,res){
			expect(res.body[0]).to.have.property("name");
			expect(res.body[0].name).to.not.equal(null);
			done();
		});
	});

	it('should not contain the password', function(done){
		api.get('/Users')
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err,res){
			expect(res.body[0]).to.not.have.property("password");
			done();
		});
	});

	it('should be able to identify a wrong password', function(done){
		api.post('/Users/Login')
		.set('Accept', 'application/json')
		.send({
			email: 'kevin@example.com',
			password: 'K1234',
		})
		.expect(404)
		.end(function(err, res){
			expect(res.body.success).to.not.equal(true);
			done();
		});
	});

	it('should be able to make login', function(done){
		api.post('/Users/Login')
		.set('Accept', 'application/json')
		.send({
			email: 'kevin@example.com',
			password: 'K12345',
		})
		.expect(200)
		.end(function(err, res){
			expect(res.body.success).to.equal(true);
			done();
		});
	});





});