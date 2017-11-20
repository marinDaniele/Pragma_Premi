/**
 * File: logOut.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di unità TU75 Premi::Front-End::Services::AuthenticationService metodo "logOut"
 */
'use strict';
describe('TU75 Premi::Front-End::Services::AuthenticationService metodo "logOut"', function () {
	var authenticationService, SERVER_URL, $httpBackend;

	beforeEach(function(){
		module('premi.services')
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		})
		inject(function(_authenticationService_, _$httpBackend_, _SERVER_URL_){
			authenticationService = _authenticationService_;
			$httpBackend = _$httpBackend_;
			SERVER_URL = _SERVER_URL_;
		});
	});
	//test
	it('Prova di logout verifica del flag isLoggedIn()', function () {
		//login
		$httpBackend.whenPOST(SERVER_URL + '/login').respond({status:'ok'});
		$httpBackend.expectPOST(SERVER_URL+'/login');
		//logout
		$httpBackend.whenGET(SERVER_URL + '/logout').respond({status:'ok'});
		$httpBackend.expectGET(SERVER_URL+'/logout');

		var promise = authenticationService.logIn('giacomo.manzoli@gmail.com','pippo');
		promise.then(function(){
			return authenticationService.logOut();
		}, function(error){
			expect(error).toBeUndefined();
		})
		.then(function(status){
			var logged = authenticationService.isLoggedIn();
			expect(status).toBeDefined();
			expect(logged).toBe(false);
		},function(error){
			expect(error).toBeUndefined();
		});
		$httpBackend.flush();
	});
});
