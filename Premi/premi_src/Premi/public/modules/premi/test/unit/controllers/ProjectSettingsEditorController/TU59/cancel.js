/**
 * File: cancel.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController metodo "cancel"
 */
'use strict';
describe('TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController metodo "cancel"', function(){
	var $scope, $mdDialog,
	currentProject = {
		getName: function(){return "project";},
		getTextColor: function(){return "white";},
		getBackgroundColor: function(){return "blue";},
		getFontFamily: function(){return "Arial";} 
	};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return{
					cancel: jasmine.createSpy('cancel')
				};
			});
			$provide.factory('projectService', function(){
				return {
					getCurrentProject: jasmine.createSpy('getCurrentProject').and.returnValue(currentProject)
				};
			});
		});
		inject(function($controller, $rootScope, _$mdDialog_, projectService){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$mdDialog = _$mdDialog_;
			//crea una nuova istanza di ProjectSettingsEditorController
			$controller('ProjectSettingsEditorController', { 
				$scope: $scope, 
				$mdDialog: $mdDialog,
				projectService: projectService
			});
		});
	});

	//test
	it("Dovrebbe invocare il metodo $mdDialog.cancel", function(){
		$scope.cancel();
		expect($mdDialog.cancel).toHaveBeenCalled();
	});
});
