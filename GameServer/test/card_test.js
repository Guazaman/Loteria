var should = require('chai').should,
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8080');

describe('Cards', function(){
	it('Should be able to connect to Cards Database',function(done){
		api.get('/cards')
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err,res){
			done();
		});
	});

	/*it('Should be an object with values',function(done){
		api.get('/users/1')
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err,res){
			expect(res.body).to.have.property("name");
			expect(res.body.name).to.not.equal(null);
			expect(res.body).to.have.property("email");
			expect(res.body.email).to.not.equal(null);
			done();
		});
	});*/

});