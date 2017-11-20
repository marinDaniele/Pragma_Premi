/**
 * File: NodeContentsEditorController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU49 Premi::Front-End::Controllers::NodeContentsEditorController costruttore
 */
'use strict';
describe('TU49 Premi::Front-End::Controllers::NodeContentsEditorController costruttore', function(){
	var $scope, projectService, style = "style";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('projectService', function(){
				return {
					getStyle: jasmine.createSpy('getStyle').and.returnValue(style)
				};
			});
		});
		inject(function($controller, $rootScope, $mdDialog, _projectService_){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			projectService = _projectService_;
			$scope.$on = jasmine.createSpy('$on').and.callThrough();
			//crea una nuova istanza di NodeContentsEditorController
			$controller('NodeContentsEditorController', { 
				$scope: $scope,
				$mdDialog: $mdDialog,
				projectService: projectService
			});
		});
	});

	//test
	it("Dovrebbe inizializzare l'attributo $scope.selectedNodeContent a null", function(){
		expect($scope.selectedNodeContent).toBe(null);
	});

	it("Dovrebbe inizializzare l'attributo $scope.classString con il valore restituito dal metodo projectService.getStyle", function(){
		expect($scope.classString).toBe(projectService.getStyle());
	});

	it("Dovrebbe inizializzare l'attributo $scope.canDeleteNodeContent a true", function(){
		expect($scope.canDeleteNodeContent).toBe(true);
	});

	it("Dovrebbe invocare il metodo $scope.on, passando come parametri il valore 'nodecontent-selected' e una funzione", function(){
		expect($scope.$on).toHaveBeenCalledWith("nodecontent-selected", jasmine.any(Function));
	});
});
