/**
 * File: logIn.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU45 Premi::Front-End::Controllers::LogInController metodo "logIn"
 */
'use strict';
describe('TU45 Premi::Front-End::Controllers::LogInController metodo "logIn"', function(){
	var $scope, $rootScope, $location, authenticationService, $q, error;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$location', function(){
				return {
					path: jasmine.createSpy("path")
				}
			});
			$provide.factory('authenticationService', function(){
				return{
					logIn: jasmine.createSpy('logIn').and.callFake(function(email, password){
						if(email !== undefined && email !== null && email !== '' && password !== undefined && password !== null && password !== '')
							return $q.when();
						else{
							error = "something went wrong";
							return $q.reject(error);
						}
					})
				};
			});
		});
	});

	beforeEach(inject(function($controller, _$rootScope_, _$location_, authenticationService, _$q_){
		//crea un nuovo scope figlio
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$location = _$location_;
		$q = _$q_;
		//crea una nuova istanza di LogInController
		$controller('LogInController', { 
			$scope: $scope,
			$location: $location,
			authenticationService: authenticationService
		});
		$scope.$emit = jasmine.createSpy('$emit');
	}));

	//test
	it("Dovrebbe invocare il metodo $location.path con il parametro '/dashboard', nel caso il log in vada a buon fine", function(){
		$scope.user = {
			'email': 'test@mail.com',
			'password': 'testpass'
		};
		$scope.logIn();
		$rootScope.$digest();
		expect($location.path).toHaveBeenCalledWith('/dashboard');
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed error, nel caso il log in non vada a buon fine", function(){
		$scope.user = {};
		$scope.logIn();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error', error);
	});
});
