/**
 * File: removeNode.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU51 Premi::Front-End::Controllers::PathController metodo "removeNode"
 */
'use strict';
describe('TU51 Premi::Front-End::Controllers::PathController metodo "removeNode"', function(){
	var $scope, $rootScope, $q, pathService, errorInRemoveNodeFromPath, 
	nodeId = "node", 
	removeNodeFromPathError = false;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('pathService', function(){
				return {
					removeNodeFromPath: jasmine.createSpy('removeNodeFromPath').and.callFake(function(){
						if(!removeNodeFromPathError)
							return $q.when();
						else{
							errorInRemoveNodeFromPath = "Something went wrong in removeNodeFromPath!";
							return $q.reject(errorInRemoveNodeFromPath);
						}
					})
				};
			});
		});
		inject(function($controller, _$rootScope_, _$q_, _pathService_){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			pathService = _pathService_;
			$scope.$watch = jasmine.createSpy('$watch');
			//crea una nuova istanza di PathController
			$controller('PathController', { 
				$scope: $scope,
				pathService: pathService
			});
		});
		$scope.$emit = jasmine.createSpy('$emit');
		$scope.selectedPath = {
			deleteStep: jasmine.createSpy('deleteStep'),
			getId: jasmine.createSpy('getId').and.returnValue("id")
		};
	});

	//test
	it("Dovrebbe invocare il metodo pathService.removeNodeFromPath, con il parametro nodeId e il valore restituito dal metodo $scope.selectedPath.getId()", function(){
		expect(pathService.removeNodeFromPath).not.toHaveBeenCalled();
		$scope.removeNode(nodeId);
		$rootScope.$digest();
		expect(pathService.removeNodeFromPath).toHaveBeenCalledWith(nodeId, $scope.selectedPath.getId());
	});

	it("Dovrebbe invocare il metodo $scope.selectedPath.deleteStep, con il parametro nodeId, nel caso la chiamata al metodo $scope.removeNode vada a buon fine", function(){
		expect($scope.selectedPath.deleteStep).not.toHaveBeenCalledWith(nodeId);
		removeNodeFromPathError = false;
		$scope.removeNode(nodeId);
		$rootScope.$digest();
		expect($scope.selectedPath.deleteStep).toHaveBeenCalledWith(nodeId);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInRemoveNodeFromPath, nel caso la chiamata al metodo $scope.removeNode vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInRemoveNodeFromPath);
		removeNodeFromPathError = false;
		$scope.removeNode(nodeId);
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInRemoveNodeFromPath);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInRemoveNodeFromPath, nel caso la chiamata al metodo $scope.removeNode non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInRemoveNodeFromPath);
		removeNodeFromPathError = true;
		$scope.removeNode(nodeId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInRemoveNodeFromPath);
	});

	it("Dovrebbe non invocare il metodo $scope.selectedPath.deleteStep, con il parametro nodeId, nel caso la chiamata al metodo $scope.removeNode non vada a buon fine", function(){
		expect($scope.selectedPath.deleteStep).not.toHaveBeenCalledWith(nodeId);
		removeNodeFromPathError = true;
		$scope.removeNode(nodeId);
		$rootScope.$digest();
		expect($scope.selectedPath.deleteStep).not.toHaveBeenCalledWith(nodeId);
	});
});
