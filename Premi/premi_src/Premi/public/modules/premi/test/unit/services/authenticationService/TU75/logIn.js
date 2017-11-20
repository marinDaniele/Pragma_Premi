/**
 * File: logIn.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di unità TU75 Premi::Front-End::Services::AuthenticationService metodo "logIn"
 */
'use strict';
describe('TU75 Premi::Front-End::Services::AuthenticationService metodo "logIn"', function () {
	var authenticationService, SERVER_URL, $httpBackend;

	beforeEach(function(){
		module('premi.services')
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		inject(function(_authenticationService_, _$httpBackend_, _SERVER_URL_){
			authenticationService = _authenticationService_;
			$httpBackend = _$httpBackend_;
			SERVER_URL = _SERVER_URL_;
		});
	});
	//test
	it('Prova di login con dati corretti e verifica del flag isLoggedIn()', function () {
		$httpBackend.whenPOST(SERVER_URL + '/login')
			.respond({status:'ok'});
		$httpBackend.expectPOST(SERVER_URL+'/login');
		var promise = authenticationService.logIn('giacomo.manzoli@gmail.com','pippo');

		promise.then(function(message){
			var logged = authenticationService.isLoggedIn();
			expect(message).toBeDefined();
			expect(logged).toBe(true);
		}, function(error){
			expect(error).toBeUndefined();
		});
		$httpBackend.flush();
	});

	it('Prova di login con dati errati', function () {
		$httpBackend.whenPOST(SERVER_URL + '/login')
			.respond(401,{
				'title': 'Accesso non autorizzato',
				'code': 401,
				'message': 'Email non trovata o password non valida'
			});

		$httpBackend.expectPOST(SERVER_URL+'/login');
		var promise = authenticationService.logIn('giacomo.manzoli@gmail.com','pluto');
		promise.then(function(message){
			expect(message).toBeUndefined();
		}, function(error){
			expect(error.getTitle()).toBe('Accesso non autorizzato');
			expect(error.getCode()).toBe(401);
			expect(error.getMessage()).toBe('Email non trovata o password non valida');
		});
		$httpBackend.flush();
	});
});
