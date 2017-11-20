/**
 * File: addTextContent.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "addTextContent"
 */
'use strict';
describe('TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "addTextContent"', function(){
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
			addText: jasmine.createSpy('addText')
		};
		$scope.selectedNodeContent = {
			getId: jasmine.createSpy('getId').and.returnValue("id")
		};
	});

	//test
	it("Dovrebbe invocare il metodo $scope.node.addText", function(){
		expect($scope.node.addText).not.toHaveBeenCalled();
		$scope.addTextContent();
		expect($scope.node.addText).toHaveBeenCalled();
	});

	it("Dovrebbe assegnare 'null' all'attributo $scope.selectedNodeContent", function(){
		expect($scope.selectedNodeContent).not.toBe(null);
		$scope.addTextContent();
		expect($scope.selectedNodeContent).toBe(null);
	});

	it("Dovrebbe invocare il metodo $scope.$broadcast, con i parametri 'nodecontent-deselect' e il valore restituito dalla funzione $scope.selectedNodeContent.getId()", function(){
		var id = $scope.selectedNodeContent.getId();
		expect($scope.$broadcast).not.toHaveBeenCalledWith('nodecontent-deselect', id);
		$scope.addTextContent();
		expect($scope.$broadcast).toHaveBeenCalledWith('nodecontent-deselect', id);
	});
});
