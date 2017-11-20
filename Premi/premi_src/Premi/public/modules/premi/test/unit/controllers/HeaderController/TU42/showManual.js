/**
 * File: showManual.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU42 Premi::Front-End::Controllers::HeaderController metodo "showManual"
 */
'use strict';
describe('TU42 Premi::Front-End::Controllers::HeaderController metodo "showManual"', function(){
	var $scope, $mdDialog, $location;

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
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show')
				};
			});
		});
		inject(function($controller, $rootScope, _$location_, projectService, $window, authenticationService, mindmapAdapterService, _$mdDialog_){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$mdDialog = _$mdDialog_;
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

	//test
	it("Dovrebbe assegnare il valore 'false' a $scope.sidenavOpen", function(){
		$scope.sidenavOpen = true;
		$scope.showManual();
		expect($scope.sidenavOpen).toBe(false);
	});

	it("Dovrebbe invocare il metodo $mdDialog.show", function(){
		$scope.showManual();
		expect($mdDialog.show).toHaveBeenCalled();
	});
});
