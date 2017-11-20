/**
 * File: newProjectClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU38 Premi::Front-End::Controllers::DashboardController metodo "newProjectClicked"
 */
'use strict';
describe('TU38 Premi::Front-End::Controllers::DashboardController metodo "newProjectClicked"', function(){
	var $scope, $rootScope, $q, projectService, errorInShow, errorInCreateProject, errorInGetProjects, 
	getProjectsError = false,
	showError = false,
	createProjectError = false,
	projects = [],
	project = {
		"_id": "project", 
		"name": "project"
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
					createProject: jasmine.createSpy('createProject').and.callFake(function(){
						if(!createProjectError){
							return $q.when(project);
						}
						else{
							errorInCreateProject = "Something went wrong in createProject";
							return $q.reject(errorInCreateProject);
						}
					})
				}
			});
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show').and.callFake(function(){
						if(!showError)
							return $q.when(project.name);
						else{
							errorInShow = "Something went wrong in show";
							return $q.reject(errorInShow);
						}
					})
				}
			});
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
	it("Dovrebbe invocare il metodo projectService.createProject, nel caso la chiamata al metodo $mdDialog.show vada a buon fine", function(){
		expect(projectService.createProject).not.toHaveBeenCalled();
		showError = false;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect(projectService.createProject).toHaveBeenCalledWith(project.name);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInShow, nel caso la chiamata al metodo $mdDialog.show vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
		showError = false;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInShow, nel caso la chiamata al metodo $mdDialog.show non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
		showError = true;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInShow);
	});

	it("Dovrebbe non invocare il metodo projectService.createProject, nel caso la chiamata al metodo $mdDialog.show non vada a buon fine", function(){
		expect(projectService.createProject).not.toHaveBeenCalled();
		showError = true;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect(projectService.createProject).not.toHaveBeenCalledWith(project.name);
	});

	it("Dovrebbe inserire un nuovo progetto in coda all'array $scope.projects, nel caso la chiamata al metodo projectService.createProject vada a buon fine", function(){
		$scope.projects = [];
		expect($scope.projects).toEqual([]);
		showError = false;
		createProjectError = false;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect($scope.projects).toEqual([project]);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInCreateProject, nel caso la chiamata al metodo projectService.createProject vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInCreateProject);
		showError = false;
		createProjectError = false;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInCreateProject);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInCreateProject, nel caso la chiamata al metodo projectService.createProject non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInCreateProject);
		showError = false;
		createProjectError = true;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInCreateProject);
	});

	it("Dovrebbe lasciare invariato l'array $scope.projects, nel caso la chiamata al metodo projectService.createProject non vada a buon fine", function(){
		$scope.projects = [];
		expect($scope.projects).toEqual([]);
		showError = false;
		createProjectError = true;
		$scope.newProjectClicked();
		$rootScope.$digest();
		expect($scope.projects).toEqual([]);
	});
});
