/**
 * File: DashboardController (no error cases).js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU37 Premi::Front-End::Controllers::DashboardController costruttore (no promises non andate a buon fine)
 */
'use strict';
describe('TU37 Premi::Front-End::Controllers::DashboardController costruttore (no promises non andate a buon fine)', function(){
	var $scope, $rootScope, $q, errorInGetProjects, 
	getProjectsError = false,
	projects = [];

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.factory('projectService', function(){
				return {
					getProjects: jasmine.createSpy('getProjects').and.callFake(function(){
						if(!getProjectsError)
							return $q.when(projects);
						else{
							errorInGetProjects = "Something went wrong in getProjects";
							return $q.reject(errorInGetProjects);
						}
					})
				}
			});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, _$rootScope_, _$q_, $location, projectService, $mdDialog){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			//crea una nuova istanza di DashboardController
			$controller('DashboardController', { 
				$scope: $scope,
				$location: $location,
				projectService: projectService,
				$mdDialog: $mdDialog
			});
		});
	});

	//test
	it("Dovrebbe inizializzare l'attributo $scope.projects con un array vuoto", function(){
		expect($scope.projects).toEqual([]);
	});

	it("Dovrebbe aggiornare il valore dell'attributo $scope.projects con quello restituito dal metodo projectService.getProjects, nel caso la relativa chiamata vada a buon fine", function(){
		$scope.projects = null;
		$rootScope.$digest();
		expect(projects).not.toBe(null);
		expect($scope.projects).toBe(projects);
	});
});
