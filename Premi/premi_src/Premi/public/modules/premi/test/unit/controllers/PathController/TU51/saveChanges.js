/**
 * File: saveChanges.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU51 Premi::Front-End::Controllers::PathController metodo "saveChanges"
 */
'use strict';
describe('TU51 Premi::Front-End::Controllers::PathController metodo "saveChanges"', function(){
	var $scope, $rootScope, $q, pathService, errorInfinalizePathUpdates, 
	nodeId = "node", 
	finalizePathUpdatesError = false;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('pathService', function(){
				return {
					finalizePathUpdates: jasmine.createSpy('finalizePathUpdates').and.callFake(function(){
						if(!finalizePathUpdatesError)
							return $q.when();
						else{
							errorInfinalizePathUpdates = "Something went wrong in finalizePathUpdates!";
							return $q.reject(errorInfinalizePathUpdates);
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
		$scope.deselectPath = jasmine.createSpy('deselectPath');
		$scope.selectedPath = jasmine.createSpyObj('selectedPath', ['setName']);
	});

	//test
	it("Dovrebbe invocare il metodo $scope.selectedPath.setName, con parametro il valore dell'attributo $scope.pathName", function(){
		expect($scope.selectedPath.setName).not.toHaveBeenCalledWith($scope.pathName);
		$scope.saveChanges();
		$rootScope.$digest();
		expect($scope.selectedPath.setName).toHaveBeenCalledWith($scope.pathName);
	});

	it("Dovrebbe invocare il metodo pathService.finalizePathUpdates, con parametro il valore restituito dal metodo $scope.selectedPath", function(){
		expect(pathService.finalizePathUpdates).not.toHaveBeenCalled();
		$scope.saveChanges();
		$rootScope.$digest();
		expect(pathService.finalizePathUpdates).toHaveBeenCalledWith($scope.selectedPath);
	});

	it("Dovrebbe invocare il metodo $scope.deselectPath, nel caso la chiamata al metodo $scope.saveChanges vada a buon fine", function(){
		expect($scope.deselectPath).not.toHaveBeenCalled();
		finalizePathUpdatesError = false;
		$scope.saveChanges();
		$rootScope.$digest();
		expect($scope.deselectPath).toHaveBeenCalled();
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInfinalizePathUpdates, nel caso la chiamata al metodo $scope.saveChanges vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInfinalizePathUpdates);
		finalizePathUpdatesError = false;
		$scope.saveChanges();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInfinalizePathUpdates);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInfinalizePathUpdates, nel caso la chiamata al metodo $scope.saveChanges non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInfinalizePathUpdates);
		finalizePathUpdatesError = true;
		$scope.saveChanges();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInfinalizePathUpdates);
	});

	it("Dovrebbe non invocare il metodo $scope.deselectPath, nel caso la chiamata al metodo $scope.saveChanges non vada a buon fine", function(){
		expect($scope.deselectPath).not.toHaveBeenCalled();
		finalizePathUpdatesError = true;
		$scope.saveChanges();
		$rootScope.$digest();
		expect($scope.deselectPath).not.toHaveBeenCalled();
	});
});
