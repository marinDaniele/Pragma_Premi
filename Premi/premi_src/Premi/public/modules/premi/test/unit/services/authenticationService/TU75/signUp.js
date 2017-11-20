/**
 * File: signUp.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di unità TU75 Premi::Front-End::Services::AuthenticationService metodo "signUp"
 */
'use strict';
describe('TU75 Premi::Front-End::Services::AuthenticationService metodo "signUp"', function () {
	var authenticationService, SERVER_URL, $httpBackend;

	beforeEach(function(){
		module('premi.services');
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
	it('Prova della registrazione di un nuovo account con dati corretti', function(){
		$httpBackend.whenPOST(SERVER_URL + '/signup').respond({status:'ok'});
		$httpBackend.expectPOST(SERVER_URL+'/signup');

		authenticationService.signUp('giacomo.manzoli@gmail.com','qwerty12','qwerty12')
			.then(function(status){
				expect(status).toBeDefined();
			},function(error){
				expect(error).toBeUndefined();
			});
	});

	it('Prova della registrazione di un account con dati già presenti', function(){
		$httpBackend.whenPOST(SERVER_URL + '/signup').respond(11000,{
			'title': 'Unicità del campo dati richiesto',
			'code': 11000,
			'message': 'E11000 duplicate key error index: premi-dev.users.$email_1 dup key: { : \'qwe@qwe.qwe\' }'
		});
		$httpBackend.expectPOST(SERVER_URL+'/signup'); //con la password troppo corta la richiesta non dovrebbe partire

		authenticationService.signUp('giacomo.manzoli@gmail.com','asd','asd')
			.then(function(status){
				expect(status).toBeUndefined();
			},function(error){
				expect(error.getTitle()).toBe('Unicità del campo dati richiesto');
				expect(error.getCode()).toBe(11000);
				expect(error.getMessage()).toBe('E11000 duplicate key error index: premi-dev.users.$email_1 dup key: { : \'qwe@qwe.qwe\' }');
			});
	});

	it('Prova di una richiesta con il server offline',function(){
		$httpBackend.whenPOST(SERVER_URL + '/signup').respond(400,null);
		$httpBackend.expectPOST(SERVER_URL+'/signup'); //con la password troppo corta la richiesta non dovrebbe partire

		authenticationService.signUp('giacomo.manzoli@gmail.com','asd','asd')
			.then(function(status){
				expect(status).toBeUndefined();
			},function(error){
				expect(error.getTitle()).toBe('Impossibile contattare il server');
				expect(error.getCode()).toBe(0);
				expect(error.getMessage()).toBe('Ci sono dei problemi di comnicazione con il serverquesto può essere ' +
				'dovuto ad un problema della connessione ad internet oppure ad un problema del nostro');
			});
	});
});
