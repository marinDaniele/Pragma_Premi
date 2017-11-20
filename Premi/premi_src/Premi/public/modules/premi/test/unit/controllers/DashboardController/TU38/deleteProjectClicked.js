/**
 * File: deleteProjectClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU38 Premi::Front-End::Controllers::DashboardController metodo "deleteProjectClicked"
 */
'use strict';
describe('TU38 Premi::Front-End::Controllers::DashboardController metodo "deleteProjectClicked"', function(){
	var $scope, $rootScope, $q, projectService, errorInDeleteProject, errorInGetProjects, 
	getProjectsError = false,
	deleteProjectError = false,
	projects = [],
	project = {
		"_id": "project", 
		"name": "project"
	},
	project2 = {
		"_id": "project2", 
		"name": "project2"
	};

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
					}),
					deleteProject: jasmine.createSpy('deleteProject').and.callFake(function(){
						if(!deleteProjectError){
							return $q.when();
						}
						else{
							errorInDeleteProject = "Something went wrong in deleteProject";
							return $q.reject(errorInDeleteProject);
						}
					})
				}
			});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, _$rootScope_, _$q_, $location, _projectService_, $mdDialog){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			projectService = _projectService_;
			//crea una nuova istanza di DashboardController
			$controller('DashboardController', { 
				$scope: $scope,
				$location: $location,
				projectService: projectService,
				$mdDialog: $mdDialog
			});
		});
		$scope.$emit = jasmine.createSpy('$emit');
		$rootScope.$digest();
	});

	//test
	it("Dovrebbe invocare il metodo projectService.deleteProject, nel caso la chiamata al metodo $scope.deleteProjectClicked vada a buon fine", function(){
		expect(projectService.deleteProject).not.toHaveBeenCalled();
		deleteProjectError = false;
		$scope.deleteProjectClicked(project._id);
		$rootScope.$digest();
		expect(projectService.deleteProject).toHaveBeenCalledWith(project.name);
	});

	it("Dovrebbe invocare il metodo projectService.deleteProject, nel caso la chiamata al metodo $scope.deleteProjectClicked non vada a buon fine", function(){
		expect(projectService.deleteProject).not.toHaveBeenCalled();
		deleteProjectError = true;
		$scope.deleteProjectClicked(project._id);
		$rootScope.$digest();
		expect(projectService.deleteProject).toHaveBeenCalledWith(project.name);
	});

	it("Dovrebbe eliminare il primo progetto avente id progetto pari al valore di projectId (sempre che ce ne sia almeno uno), a partire dalla testa dell'array $scope.projects, nel caso la chiamata al metodo $scope.deleteProjectClicked vada a buon fine", function(){
		$scope.projects = [project, project, project2, project];
		deleteProjectError = false;
		$scope.deleteProjectClicked(project._id);
		$rootScope.$digest();
		expect($scope.projects).toEqual([project, project2, project]);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInDeleteProject, nel caso la chiamata al metodo $scope.deleteProjectClicked vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInDeleteProject);
		deleteProjectError = false;
		$scope.deleteProjectClicked(project._id);
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInDeleteProject);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInDeleteProject, nel caso la chiamata al metodo $scope.deleteProjectClicked non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInDeleteProject);
		deleteProjectError = true;
		$scope.deleteProjectClicked(project._id);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInDeleteProject);
	});
});
