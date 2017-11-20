/**
 * File: logout.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU43 Premi::Front-End::Controllers::HeaderController metodo "logout"
 */
'use strict';
describe('TU43 Premi::Front-End::Controllers::HeaderController metodo "logout"', function(){
	var $scope, mindmapAdapterService, authenticationService, $location;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$location', function(){
				return {
					url: jasmine.createSpy('url')
				};
			});
			$provide.service('projectService', function(){});
			$provide.service('$window', function(){});
			$provide.factory('authenticationService', function(){
				return {
					logOut: jasmine.createSpy('logOut')
				};
			});
			$provide.service('mindmapAdapterService', function(){});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, _$location_, projectService, $window, _authenticationService_, mindmapAdapterService, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$location = _$location_;
			authenticationService = _authenticationService_;
			//crea una nuova istanza di HeaderController
			$controller('HeaderController', { 
				$scope: $scope,
				$location: $location,
				projectService: projectService,
				$window: $window,
				authenticationService: authenticationService,
				mindmapAdapterService: mindmapAdapterService, 
				$mdDialog: $mdDialog
			});
		});
	});

	//test
	it("Dovrebbe invocare il metodo authenticationService.logOut", function(){
		$scope.logout();
		expect(authenticationService.logOut).toHaveBeenCalledWith();
	});

	it("Dovrebbe invocare il metodo $location.url, con il parametro '/login'", function(){
		$scope.logout();
		expect($location.url).toHaveBeenCalledWith('/login');
	});
});
