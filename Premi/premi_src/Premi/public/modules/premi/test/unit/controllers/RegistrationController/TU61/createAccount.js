/**
 * File: createAccount.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU61 Premi::Front-End::Controllers::RegistrationController metodo "createAccount"
 */
'use strict';
describe('TU61 Premi::Front-End::Controllers::RegistrationController metodo "createAccount"', function(){
	var $scope, $rootScope, $location, authenticationService, $q, registrationError, logInError, 
	errorInLogIn = false;

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
					signUp: jasmine.createSpy('signUp').and.callFake(function(email, password, passwordCheck){
						if(email !== undefined && email !== null && email !== '' && password !== undefined && password !== null && password !== '' && passwordCheck !== undefined && passwordCheck !== null && passwordCheck !== '')
							return $q.when();
						else{
							registrationError = "something went wrong in registration";
							return $q.reject(registrationError);
						}
					}),
					logIn: jasmine.createSpy('logIn').and.callFake(function(email, password){
						if(!errorInLogIn)
							return $q.when();
						else{
							logInError = "something went wrong in log in";
							return $q.reject(logInError);
						}
					})
				};
			});
		});
	});

	beforeEach(inject(function($controller, _$rootScope_, _$location_, _authenticationService_, _$q_){
		//crea un nuovo scope figlio
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$location = _$location_;
		authenticationService = _authenticationService_;
		$q = _$q_;
		//crea una nuova istanza di RegistrationController
		$controller('RegistrationController', { 
			$scope: $scope,
			$location: $location,
			authenticationService: authenticationService
		});
		$scope.$emit = jasmine.createSpy('$emit');
		$scope.user = {
			'email': 'test@mail.com',
			'password': 'testpass',
			'passwordCheck': 'testpass'
		};
	}));

	//test
	it("Dovrebbe invocare il metodo authenticationService.logIn con i parametri $scope.user.email e $scope.user.password, nel caso la registrazione vada a buon fine", function(){
		expect(authenticationService.logIn).not.toHaveBeenCalledWith($scope.user.email, $scope.user.password);
		$scope.createAccount();
		$rootScope.$digest();
		expect(authenticationService.logIn).toHaveBeenCalledWith($scope.user.email, $scope.user.password);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed error, nel caso la registrazione vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error', registrationError);	
		$scope.createAccount();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error', registrationError);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed error, nel caso la registrazione non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error', registrationError);	
		$scope.user = {};
		$scope.createAccount();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error', registrationError);
	});

	it("Dovrebbe non invocare il metodo authenticationService.logIn con i parametri $scope.user.email e $scope.user.password, nel caso la registrazione non vada a buon fine", function(){
		expect(authenticationService.logIn).not.toHaveBeenCalledWith($scope.user.email, $scope.user.password);
		$scope.user = {};
		$scope.createAccount();
		$rootScope.$digest();
		expect(authenticationService.logIn).not.toHaveBeenCalledWith($scope.user.email, $scope.user.password);
	});

	it("Dovrebbe invocare il metodo $location.path con il parametro '/dashboard', nel caso il log in vada a buon fine", function(){
		expect($location.path).not.toHaveBeenCalledWith('/dashboard');
		errorInLogIn = false;
		$scope.createAccount();
		$rootScope.$digest();
		expect($location.path).toHaveBeenCalledWith('/dashboard');
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed error, nel caso il log in vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error', logInError);
		errorInLogIn = true;
		$scope.createAccount();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error', logInError);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed error, nel caso il log in non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error', logInError);
		errorInLogIn = true;
		$scope.createAccount();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error', logInError);
	});

	it("Dovrebbe non invocare il metodo $location.path con il parametro '/dashboard', nel caso il log in non vada a buon fine", function(){
		expect($location.path).not.toHaveBeenCalledWith('/dashboard');
		errorInLogIn = false;
		$scope.createAccount();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error', logInError);
	});
});
