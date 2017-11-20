/**
 * File: printPage.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU43 Premi::Front-End::Controllers::HeaderController metodo "printPage"
 */
'use strict';
describe('TU43 Premi::Front-End::Controllers::HeaderController metodo "printPage"', function(){
	var $scope, $window;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.service('projectService', function(){});
			$provide.factory('$window', function(){
				return {
					print: jasmine.createSpy('print')
				}
			});
			$provide.service('authenticationService', function(){});
			$provide.service('mindmapAdapterService', function(){});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, $location, projectService, _$window_, authenticationService, mindmapAdapterService, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$window = _$window_;
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
	it("Dovrebbe invocare il metodo $window.print", function(){
		$scope.printPage();
		expect($window.print).toHaveBeenCalled();
	});
});
