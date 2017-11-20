/**
 * File: pathClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU43 Premi::Front-End::Controllers::HeaderController metodo "pathClicked"
 */
'use strict';
describe('TU43 Premi::Front-End::Controllers::HeaderController metodo "pathClicked"', function(){
	var $scope, $location;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$location', function(){
				currentPath: null;
				return {
					url: jasmine.createSpy('url').and.callFake(function(url){
						if(url !== undefined)
							this.currentPath = url;
						else
							return this.currentPath;
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
		$scope.currentLocationContains = jasmine.createSpy('currentLocationContains').and.callFake(function(url){
			return $location.url() === url;
		});
	});

	it("Dovrebbe invocare il metodo $scope.currentLocationContains, con il parametro '/paths'", function(){
		$location.url('/test');
		expect($scope.currentLocationContains('/paths')).toBe(false);
		$scope.pathClicked();
		expect($scope.currentLocationContains('/paths')).toBe(true);
	});

	it("Dovrebbe aggiornare a '/paths' il percorso corrente, nel caso il valore ritornato dal metodo $scope.currentLocationContains('/paths') sia false", function(){
		$location.url('/test');
		expect($scope.currentLocationContains('/paths')).toBe(false);
		$scope.pathClicked();
		expect($scope.currentLocationContains('/paths')).toBe(true);
	});

	it("Dovrebbe assegnare false all'attributo $scope.sidenavOpen, nel caso il valore ritornato dal metodo $scope.currentLocationContains('/paths') sia false", function(){
		$location.url('/test');
		expect($scope.currentLocationContains('/paths')).toBe(false);
		$scope.pathClicked();
		expect($scope.sidenavOpen).toBe(false);
	});

	it("Dovrebbe non assegnare false all'attributo $scope.sidenavOpen, nel caso il valore ritornato dal metodo $scope.currentLocationContains('/paths') sia true", function(){
		$location.url('/paths');
		$scope.sidenavOpen = true;
		$scope.pathClicked();
		expect($scope.sidenavOpen).toBe(true);
	});
});
