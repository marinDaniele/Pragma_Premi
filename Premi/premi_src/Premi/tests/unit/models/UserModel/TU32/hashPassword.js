/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 24/05/2015
 */

'use strict';

var path = require('path'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	driver = require(path.resolve('./tests/utility/userStub'));

describe('TU32 - hashPassword()', function() {
	var user;

	before(function(done) {
		user = driver.createUserStub();
		done();
	});

	it('Verificare che passando null il metodo restituisca null', function(done) {
		var cryptedpass = 'crypted';
		user.save(function(err){
			User.findOne(
			{ username : user.username },
				function(err, usr)
				{
					usr.salt=null;
					cryptedpass= usr.hashPassword(cryptedpass);
					cryptedpass.should.be.exactly('crypted');
					done();
				});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});