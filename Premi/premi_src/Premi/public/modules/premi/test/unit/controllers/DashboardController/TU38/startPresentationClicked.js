/**
 * File: startPresentationClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU38 Premi::Front-End::Controllers::DashboardController metodo "startPresentationClicked"
 */
'use strict';
describe('TU38 Premi::Front-End::Controllers::DashboardController metodo "startPresentationClicked"', function(){
	var $scope, $rootScope, $q, projectService, $location, errorInLoadProject, errorInGetProjects, 
	getProjectsError = false,
	loadProjectError = false,
	projects = [],
	pathId = "path",
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
			$provide.factory('$location', function(){
				return {
					path: jasmine.createSpy('path')
				}
			});
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
					loadProject: jasmine.createSpy('loadProject').and.callFake(function(){
						if(!loadProjectError){
							return $q.when();
						}
						else{
							errorInLoadProject = "Something went wrong in loadProject";
							return $q.reject(errorInLoadProject);
						}
					})
				}
			});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, _$rootScope_, _$q_, _$location_, _projectService_, $mdDialog){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			projectService = _projectService_;
			$location = _$location_;
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
	it("Dovrebbe invocare il metodo projectService.loadProject, nel caso la chiamata al metodo $scope.startPresentationClicked vada a buon fine", function(){
		expect(projectService.loadProject).not.toHaveBeenCalled();
		loadProjectError = false;
		$scope.startPresentationClicked(pathId, project._id);
		$rootScope.$digest();
		expect(projectService.loadProject).toHaveBeenCalledWith(project._id);
	});

	it("Dovrebbe invocare il metodo projectService.loadProject, nel caso la chiamata al metodo $scope.startPresentationClicked non vada a buon fine", function(){
		expect(projectService.loadProject).not.toHaveBeenCalled();
		loadProjectError = true;
		$scope.startPresentationClicked(pathId, project._id);
		$rootScope.$digest();
		expect(projectService.loadProject).toHaveBeenCalledWith(project._id);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInLoadProject, nel caso la chiamata al metodo $scope.startPresentationClicked vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInLoadProject);
		loadProjectError = false;
		$scope.startPresentationClicked(pathId, project._id);
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInLoadProject);
	});

	it("Dovrebbe invocare il metodo $location.path, passando come parametro il valore '/presentation/' concatenato con il parametro pathId, nel caso la chiamata al metodo $scope.startPresentationClicked vada a buon fine", function(){
		expect($location.path).not.toHaveBeenCalled();
		loadProjectError = false;
		$scope.startPresentationClicked(pathId, project._id);
		$rootScope.$digest();
		expect($location.path).toHaveBeenCalledWith('/presentation/'+pathId);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInLoadProject, nel caso la chiamata al metodo $scope.startPresentationClicked non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInLoadProject);
		loadProjectError = true;
		$scope.startPresentationClicked(pathId, project._id);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInLoadProject);
	});

	it("Dovrebbe non invocare il metodo $location.path, passando come parametro il valore '/presentation/' concatenato con il parametro pathId, nel caso la chiamata al metodo $scope.startPresentationClicked non vada a buon fine", function(){
		expect($location.path).not.toHaveBeenCalled();
		loadProjectError = true;
		$scope.startPresentationClicked(pathId, project._id);
		$rootScope.$digest();
		expect($location.path).not.toHaveBeenCalledWith('/presentation/'+pathId);
	});
});
