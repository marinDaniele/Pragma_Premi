/**
 * File: logIn.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU61 Premi::Front-End::Controllers::RegistrationController metodo "logIn"
 */
'use strict';
describe('TU61 Premi::Front-End::Controllers::RegistrationController metodo "logIn"', function(){
	var $scope, $location;

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
		//crea una nuova istanza di RegistrationController
		$controller('RegistrationController', { 
			$scope: $scope,
			$location: $location,
			authenticationService: authenticationService
		});
	}));

	//test
	it("Dovrebbe invocare il metodo $location.path con il parametro '/login'", function(){
		$scope.logIn();
		expect($location.path).toHaveBeenCalledWith('/login');
	});
});
