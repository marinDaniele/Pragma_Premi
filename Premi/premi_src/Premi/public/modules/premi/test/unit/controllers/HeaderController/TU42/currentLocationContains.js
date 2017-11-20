/**
 * File: currentLocationContains.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU42 Premi::Front-End::Controllers::HeaderController metodo "currentLocationContains"
 */
'use strict';
describe('TU42 Premi::Front-End::Controllers::HeaderController metodo "currentLocationContains"', function(){
	var $scope, $location, currentLocation;
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$location', function(){
				return {
					url: jasmine.createSpy('url').and.callFake(function(){
						return currentLocation;
					})
				};
			});
			$provide.service('projectService', function(){});
			$provide.service('$window', function(){});
			$provide.service('authenticationService', function(){});
			$provide.service('mindmapAdapterService', function(){});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, _$location_, projectService, $window, authenticationService, mindmapAdapterService, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$location = _$location_;
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
		currentLocation = "/presentation";
	});

	//test
	it("Dovrebbe invocare il metodo $location.url, nel caso il valore restituito dal metodo projectService.getCurrentProject sia uguale a false", function(){
		$scope.currentLocationContains(currentLocation);
		expect($location.url).toHaveBeenCalled();
	});

	it("Dovrebbe restituire true, nel caso il valore content sia contenuto nel valore restituito dal metodo $location.url", function(){
		var content = currentLocation;
		var output = $scope.currentLocationContains(content);
		expect(output).toBe(true);
	});

	it("Dovrebbe restituire false, nel caso il valore content non sia contenuto nel valore restituito dal metodo $location.url", function(){
		var content = "wrongLocation";
		var output = $scope.currentLocationContains(content);
		expect(output).toBe(false);
	});
});
