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

describe('TU32 - createUser()', function() {
	var user, user2;

	before(function(done) {
		user = driver.createUserStub();
		user2= driver.createUserStub();
		done();
	});

		it('Verificare che all\’inizializzazione dell\’applicazione la collection users sia vuota', function(done) {
			User.find({},
				function(err, users)
				{
					users.should.have.length(0);
				});
			done();
		});

		it('Verificare che sia possibile registrare un utente nel database dell\’applicazione con i campi dati richiesti',
			function(done)
			{
				user.save(function(err){
					should.not.exist(err);
				});
				done();
			}
		);

		it('Verificare che non possa essere registrato un utente con indirizzo email già esistente nel database dell’applicazione',
			function(done)
			{
				user.save();
				return user2.save(function(err) {
						should.exist(err);
						done();
					});
			});

		it('Verificare che l\’applicazione restituisca un errore quando viene passata un email vuota o un email non valida',
			function(done) {
				user.username = '';
				return user.save(function(err) {
					should.exist(err);
					done();
				});
		});

		it('Verificare che l\’applicazione restituisca un errore quando viene passata una password vuota o di lunghezza inferiore a 7 caratteri',
			function(done) {
				user.password = '';
				return user.save(function(err) {
					should.exist(err);
					done();
				});
		});
	after(function(done) {
		User.remove().exec();
		done();
	});
});
