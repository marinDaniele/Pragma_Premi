/**
 * File: ProjectSettingsEditorController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController costruttore
 */
'use strict';
describe('TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController costruttore', function(){
	var $scope, projectService,
	currentProject = {
		getName: function(){return "project";},
		getTextColor: function(){return "white";},
		getBackgroundColor: function(){return "blue";},
		getFontFamily: function(){return "Arial";} 
	};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('projectService', function(){
				return {
					getCurrentProject: jasmine.createSpy('getCurrentProject').and.returnValue(currentProject)
				};
			});
		});
		inject(function($controller, $rootScope, $mdDialog, _projectService_){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			projectService = _projectService_;
			//crea una nuova istanza di ProjectSettingsEditorController
			$controller('ProjectSettingsEditorController', { 
				$scope: $scope, 
				$mdDialog: $mdDialog,
				projectService: projectService
			});
		});
	});

	//test
	it("Dovrebbe definire l'attributo $scope.colors", function(){
		expect($scope.colors).toBeDefined;
	});

	it("Dovrebbe definire l'attributo $scope.fontFamilies", function(){
		expect($scope.fontFamilies).toBeDefined;
	});

	it("Dovrebbe definire l'attributo $scope.colors", function(){
		expect($scope.colors.length).toBeGreaterThan(0);
	});

	it("Dovrebbe definire l'attributo $scope.fontFamilies", function(){
		expect($scope.fontFamilies.length).toBeGreaterThan(0);
	});

	it("Dovrebbe invocare il metodo projectService.getCurrentProject", function(){
		expect(projectService.getCurrentProject).toHaveBeenCalled();
	});

	it("Dovrebbe definire l'attributo $scope.project.name", function(){
		expect($scope.project.name).toBe(projectService.getCurrentProject().getName());
	});

	it("Dovrebbe definire l'attributo $scope.project.textColor", function(){
		expect($scope.project.textColor).toBe(projectService.getCurrentProject().getTextColor());
	});

	it("Dovrebbe definire l'attributo $scope.project.backgroundColor", function(){
		expect($scope.project.backgroundColor).toBe(projectService.getCurrentProject().getBackgroundColor());
	});

	it("Dovrebbe definire l'attributo $scope.project.fontFamily", function(){
		expect($scope.project.fontFamily).toBe(projectService.getCurrentProject().getFontFamily());
	});

	it("Dovrebbe inizializzare l'attributo $scope.stylePreview utilizzando $scope.project.textColor, $scope.project.backgroundColor, $scope.project.fontFamily", function(){
		expect($scope.stylePreview).toBe($scope.project.textColor + 'Text ' + $scope.project.backgroundColor +'Bkg ' + $scope.project.fontFamily);
	});
});
