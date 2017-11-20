/**
 * File: toogleSidenav.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU42 Premi::Front-End::Controllers::HeaderController metodo "toogleSidenav"
 */
'use strict';
describe('TU42 Premi::Front-End::Controllers::HeaderController metodo "toogleSidenav"', function(){
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
	it("Dovrebbe assegnare il valore 'false' a $scope.sidenavOpen, nel caso $scope.sidenavOpen valga 'true'", function(){
		$scope.sidenavOpen = true;
		$scope.toggleSidenav();
		expect($scope.sidenavOpen).toBe(false);
	});

	it("Dovrebbe assegnare il valore 'true' a $scope.sidenavOpen, nel caso $scope.sidenavOpen valga 'false'", function(){
		$scope.sidenavOpen = false;
		$scope.toggleSidenav();
		expect($scope.sidenavOpen).toBe(true);
	});
});
