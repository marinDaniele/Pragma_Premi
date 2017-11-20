/**
 * File: selectPath.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU53 Premi::Front-End::Controllers::PathsEditorController metodo "selectPath"
 */
'use strict';
describe('TU53 Premi::Front-End::Controllers::PathsEditorController metodo "selectPath"', function(){
	var $scope, $rootScope, $q, errorOccurred = false, error,
	path = {'id': 'path'},
	paths = ["path0", "path1", "path2"];
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdUtil', function(){});
			$provide.service('$mdSidenav', function(){});
			$provide.factory('pathService', function(){
				return {
					getPathNames: jasmine.createSpy('getPathNames').and.callFake(function(){
						if(!errorOccurred)
							return $q.when(paths);
						else{
							error = "Something whent wrong!";
							return $q.reject(error);
						}
					})
				};
			});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen')
				};
			});
			$provide.service('$mdDialog', function(){});
		});
	});

	beforeEach(inject(function($controller, _$rootScope_, _$q_, $mdUtil, mindmapService, $mdSidenav, pathService, $mdDialog){
		//crea un nuovo scope figlio
		$rootScope = _$rootScope_;
		$q = _$q_;
		$scope = $rootScope.$new();
		$scope.$on = jasmine.createSpy('$on');
		//crea una nuova istanza di PathsEditorController
		$controller('PathsEditorController', { 
			$scope: $scope,
			mdUtil: $mdUtil, 
			mdSidenav: $mdSidenav, 
			pathService: pathService, 
			mindmapService: mindmapService, 
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe inizializzare l'attributo $scope.currentNode con l'oggetto path", function(){
		$scope.selectPath(path);
		expect($scope.currentPath).toBe(path);
	});

	it("Dovrebbe inizializzare l'attributo $scope.pathSelected a true", function(){
		$scope.selectPath(path);
		expect($scope.pathSelected).toBe(true);
	});
});
