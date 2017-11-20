/**
 * File: LogInController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU45 Premi::Front-End::Controllers::LogInController costruttore
 */
'use strict';
describe('TU45 Premi::Front-End::Controllers::LogInController', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.service('authenticationService', function(){});
		});
	});

	beforeEach(inject(function($controller, $rootScope, $location, authenticationService){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		//crea una nuova istanza di LogInController
		$controller('LogInController', { 
			$scope: $scope,
			$location: $location,
			authenticationService: authenticationService
		});
	}));

	//test
	it("Dovrebbe definire l'attributo $scope.user", function(){
		expect($scope.user).toBeDefined();
	});

	it("Dovrebbe definire l'attributo $scope.user.email", function(){
		expect($scope.user.email).toBeDefined();
	});

	it("Dovrebbe definire l'attributo $scope.user.password", function(){
		expect($scope.user.password).toBeDefined();
	});
});
