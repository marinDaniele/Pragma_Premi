/**
 * File: pathSelected.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU54 Premi::Front-End::Controllers::PathsListController metodo "pathSelected"
 */
'use strict';
describe('TU54 Premi::Front-End::Controllers::PathsListController metodo "pathSelected"', function(){
	var $scope, $rootScope, $q, error, pathService, errorOccurred,
	path = {"id": "path"};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.factory('pathService', function(){
				return {
					getPath: jasmine.createSpy('getPath').and.callFake(function(){
						if(!errorOccurred)
							return $q.when(path);
						else{
							error = "Something went wrong!";
							return $q.reject(error);
						}
					})
				};
			});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, _$rootScope_, _$q_, $location, _pathService_, $mdDialog){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			pathService = _pathService_;
			//crea una nuova istanza di PathsListController
			$controller('PathsListController', { 
				$scope: $scope,
				$location: $location,
				pathService: pathService,
				$mdDialog: $mdDialog
			});
		});
		$scope.$emit = jasmine.createSpy('$emit');
		$scope.selectPath = jasmine.createSpy('selectPath');
	});

	//test
	it("Dovrebbe invocare il metodo pathService.getPath, con il parametro path.id, nel caso la chiamata $scope.pathSelect vada a buon fine", function(){
		expect(pathService.getPath).not.toHaveBeenCalledWith(path.id);
		errorOccurred = false;
		$scope.pathSelected(path.id);
		$rootScope.$digest();
		expect(pathService.getPath).toHaveBeenCalledWith(path.id);
	});

	it("Dovrebbe invocare il metodo pathService.getPath, con il parametro path.id, nel caso la chiamata $scope.pathSelect non vada a buon fine", function(){
		expect(pathService.getPath).not.toHaveBeenCalledWith(path.id);
		errorOccurred = true;
		$scope.pathSelected(path.id);
		$rootScope.$digest();
		expect(pathService.getPath).toHaveBeenCalledWith(path.id);
	});

	it("Dovrebbe invocare il metodo $scope.selectPath, con il parametro {'path': path}, nel caso la chiamata $scope.pathSelect vada a buon fine", function(){
		expect($scope.selectPath).not.toHaveBeenCalledWith({'path': path});
		errorOccurred = false;
		$scope.pathSelected(path.id);
		$rootScope.$digest();
		expect($scope.selectPath).toHaveBeenCalledWith({'path': path});
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con i parametri 'premi-error' ed error, nel caso la chiamata $scope.pathSelect non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',error);
		errorOccurred = true;
		$scope.pathSelected(path.id);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',error);
	});
});
