/**
 * File: deleteNodeContent.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "deleteNodeContent"
 */
'use strict';
describe('TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "deleteNodeContent"', function(){
	var $scope, projectService, id, 
	style = "style";

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
		$scope.node = {
			removeContent: jasmine.createSpy('removeContent')
		};
		$scope.selectedNodeContent = {
			getId: jasmine.createSpy('getId').and.returnValue("id")
		};
	});

	//test
	it("Dovrebbe invocare il metodo $scope.node.removeContent, passando come parametro il valore restituito dal metodo $scope.selectedNodeContent.getId", function(){
		id = $scope.selectedNodeContent.getId();
		expect($scope.node.removeContent).not.toHaveBeenCalledWith(id);
		$scope.deleteNodeContent();
		expect($scope.node.removeContent).toHaveBeenCalledWith(id);
	});

	it("Dovrebbe assegnare il valore 'null' all'attributo $scope.selectedNodeContent", function(){
		expect($scope.selectedNodeContent).not.toBe(null);
		$scope.deleteNodeContent();
		expect($scope.selectedNodeContent).toBe(null);
	});
});
