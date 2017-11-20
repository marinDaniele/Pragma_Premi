/**
 * File: HeaderController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU41 Premi::Front-End::Controllers::HeaderController costruttore
 */
'use strict';
describe('TU41 Premi::Front-End::Controllers::HeaderController costruttore', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.service('projectService', function(){});
			$provide.service('$window', function(){});
			$provide.service('authenticationService', function(){});
			$provide.service('mindmapAdapterService', function(){});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, $location, projectService, $window, authenticationService, mindmapAdapterService, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
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
	it("Dovrebbe inizializzare l'attributo $scope.sidenavOpen a false", function(){
		expect($scope.sidenavOpen).toBe(false);
	});
});
