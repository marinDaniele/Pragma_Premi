/**
 * File: selectChanged.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController metodo "selectChanged"
 */
'use strict';
describe('TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController metodo "selectChanged"', function(){
	var $scope,
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
		inject(function($controller, $rootScope, $mdDialog, projectService){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			//crea una nuova istanza di ProjectSettingsEditorController
			$controller('ProjectSettingsEditorController', { 
				$scope: $scope, 
				$mdDialog: $mdDialog,
				projectService: projectService
			});
		});
	});

	//test
	it("Dovrebbe aggiornare l'attributo $scope.stylePreview utilizzando i valori aggiornati degli attributi $scope.project.textColor, $scope.project.backgroundColor, $scope.project.fontFamily", function(){
		$scope.stylePreview = null;
		$scope.selectChanged();
		expect($scope.stylePreview).toBe($scope.project.textColor + 'Text ' + $scope.project.backgroundColor +'Bkg ' + $scope.project.fontFamily);
	});
});
