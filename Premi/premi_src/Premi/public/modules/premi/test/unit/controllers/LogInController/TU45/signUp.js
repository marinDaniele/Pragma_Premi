/**
 * File: signUp.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU45 Premi::Front-End::Controllers::LogInController metodo "signUp"
 */
'use strict';
describe('TU45 Premi::Front-End::Controllers::LogInController metodo "signUp"', function(){
	var $scope, $location, authenticationService;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$location', function(){
				return {
					path: jasmine.createSpy("path")
				}
			});
			$provide.service('authenticationService', function(){});
		});
	});

	beforeEach(inject(function($controller, $rootScope, _$location_, authenticationService){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		$location = _$location_;
		//crea una nuova istanza di LogInController
		$controller('LogInController', { 
			$scope: $scope,
			$location: $location,
			authenticationService: authenticationService
		});
	}));

	//test
	it("Dovrebbe invocare il metodo $location.path con il parametro '/signup'", function(){
		$scope.signUp();
		expect($location.path).toHaveBeenCalledWith('/signup');
	});
});
