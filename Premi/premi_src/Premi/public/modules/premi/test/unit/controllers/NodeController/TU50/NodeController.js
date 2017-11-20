/**
 * File: NodeController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU50 Premi::Front-End::Controllers::NodeController costruttore
 */
'use strict';
describe('TU50 Premi::Front-End::Controllers::NodeController', function(){
	var $scope, projectService;
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('projectService', function(){
				return {
					getStyle: jasmine.createSpy('getStyle')
				};
			});
		});
	});

	beforeEach(inject(function($controller, $rootScope, _projectService_){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		projectService = _projectService_;
		//crea una nuova istanza di NodeController
		$controller('NodeController', { 
			$scope: $scope,
			projectService: projectService
		});
	}));

	//test
	it("Dovrebbe inizializzare l'attributo $scope.classString con il valore ritornato dal metodo projectService.getStyle", function(){
		expect($scope.classString).toBe(projectService.getStyle());
	});
});
