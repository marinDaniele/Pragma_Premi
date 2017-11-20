/**
 * File: getTitle.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU42 Premi::Front-End::Controllers::HeaderController metodo "getTitle"
 */
'use strict';
describe('TU42 Premi::Front-End::Controllers::HeaderController metodo "getTitle"', function(){
	var $scope, projectService, currentProject;
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.factory('projectService', function(){
				return {
					getCurrentProject: jasmine.createSpy('getCurrentProject').and.callFake(function(){
						if(currentProject)
							return {
								getName: jasmine.createSpy('getName').and.returnValue('currentProject')
							};
						else
							return null;
					})
				};
			});
			$provide.service('$window', function(){});
			$provide.service('authenticationService', function(){});
			$provide.service('mindmapAdapterService', function(){});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, $location, _projectService_, $window, authenticationService, mindmapAdapterService, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			projectService = _projectService_;
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
		$scope.currentLocationContains = jasmine.createSpy('currentLocationContains').and.returnValue(true);
		currentProject = true;
	});

	//test
	it("Dovrebbe invocare il metodo projectService.getCurrentProject, nel caso il valore restituito dal metodo projectService.getCurrentProject sia uguale a false", function(){
		$scope.getTitle();
		expect(projectService.getCurrentProject).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo projectService.getCurrentProject, nel caso il valore restituito dal metodo projectService.getCurrentProject sia uguale a false", function(){
		currentProject = false;
		$scope.getTitle();
		expect(projectService.getCurrentProject).toHaveBeenCalled();
	});

	it("Dovrebbe restituire il valore ritornato dal metodo projectService.getCurrentProject().getName, nel caso il valore restituito dal metodo projectService.getCurrentProject sia uguale a false", function(){
		var output = $scope.getTitle();
		expect(output).toBe(projectService.getCurrentProject().getName());
	});

	it("Dovrebbe restituire la stringa 'Premi', nel caso il valore restituito dal metodo projectService.getCurrentProject sia uguale a false", function(){
		currentProject = false;
		var output = $scope.getTitle();
		expect(output).toBe("Premi");
	});
});
