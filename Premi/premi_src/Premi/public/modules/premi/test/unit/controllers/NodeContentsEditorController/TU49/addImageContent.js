/**
 * File: addImageContent.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "addImageContent"
 */
'use strict';
describe('TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "addImageContent"', function(){
	var $scope, projectService, 
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
		$scope.$broadcast = jasmine.createSpy('$broadcast');
		$scope.node = {
			removeContent: jasmine.createSpy('removeContent'),
			addImage: jasmine.createSpy('addImage')
		};
		$scope.selectedNodeContent = {
			getId: jasmine.createSpy('getId').and.returnValue("id")
		};
	});

	//test
	it("Dovrebbe invocare il metodo $scope.node.addImage", function(){
		expect($scope.node.addImage).not.toHaveBeenCalled();
		$scope.addImageContent();
		expect($scope.node.addImage).toHaveBeenCalled();
	});

	it("Dovrebbe assegnare 'null' all'attributo $scope.selectedNodeContent", function(){
		expect($scope.selectedNodeContent).not.toBe(null);
		$scope.addImageContent();
		expect($scope.selectedNodeContent).toBe(null);
	});

	it("Dovrebbe invocare il metodo $scope.$broadcast, con i parametri 'nodecontent-deselect' e il valore restituito dalla funzione $scope.selectedNodeContent.getId()", function(){
		var id = $scope.selectedNodeContent.getId();
		expect($scope.$broadcast).not.toHaveBeenCalledWith('nodecontent-deselect', id);
		$scope.addImageContent();
		expect($scope.$broadcast).toHaveBeenCalledWith('nodecontent-deselect', id);
	});
});
