/**
 * File: zoomMindmap.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU42 Premi::Front-End::Controllers::HeaderController metodo "zoomMindmap"
 */
'use strict';
describe('TU42 Premi::Front-End::Controllers::HeaderController metodo "zoomMindmap"', function(){
	var $scope, mindmapAdapterService;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.service('projectService', function(){});
			$provide.service('$window', function(){});
			$provide.service('authenticationService', function(){});
			$provide.factory('mindmapAdapterService', function(){
				return {
					zoom: jasmine.createSpy('zoom')
				};
			});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, $location, projectService, $window, authenticationService, _mindmapAdapterService_, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			mindmapAdapterService = _mindmapAdapterService_;
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
	it("Dovrebbe invocare il metodo mindmapAdapterService.zoom, con il parametro value", function(){
		var value = 10;
		$scope.zoomMindmap(value);
		expect(mindmapAdapterService.zoom).toHaveBeenCalledWith(value);
	});
});
