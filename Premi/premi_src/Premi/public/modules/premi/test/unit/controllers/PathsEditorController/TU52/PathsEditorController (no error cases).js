/**
 * File: PathsEditorController (no error cases).js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU52 Premi::Front-End::Controllers::PathsEditorController costruttore (no promises non andate a buon fine) 
 */
'use strict';
describe('TU52 Premi::Front-End::Controllers::PathsEditorController costruttore (no promises non andate a buon fine)', function(){
	var $scope, $rootScope, mindmapService, $q, errorOccurred = false, error,
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

	beforeEach(inject(function($controller, _$rootScope_, _$q_, $mdUtil, $mdSidenav, pathService, _mindmapService_, $mdDialog){
		//crea un nuovo scope figlio
		$rootScope = _$rootScope_;
		$q = _$q_;
		$scope = $rootScope.$new();
		mindmapService = _mindmapService_;
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
	it("Dovrebbe invocare il metodo mindmapService.listen, passando come parametri il valore 'node-select' e una funzione", function(){
		expect(mindmapService.listen).toHaveBeenCalledWith("node-select", jasmine.any(Function));
	});

	it("Dovrebbe invocare il metodo mindmapService.listen, passando come parametri il valore 'node-deselect' e una funzione", function(){
		expect(mindmapService.listen).toHaveBeenCalledWith("node-deselect", jasmine.any(Function));
	});

	it("Dovrebbe invocare il metodo $scope.on, passando come parametri il valore '$destroy' e una funzione", function(){
		expect($scope.$on).toHaveBeenCalledWith("$destroy", jasmine.any(Function));
	});

	it("Dovrebbe inizializzare l'attributo $scope.currentPath a null", function(){
		expect($scope.currentPath).toBe(null);
	});

	it("Dovrebbe inizializzare l'attributo $scope.currentNode a null", function(){
		expect($scope.currentNode).toBe(null);
	});

	it("Dovrebbe inizializzare l'attributo $scope.currentPath con un array vuoto", function(){
		expect($scope.pathNames).toEqual([]);
	});

	it("Dovrebbe inizializzare l'attributo $scope.currentPath a false", function(){
		expect($scope.pathSelected).toBe(false);
	});

	it("Dovrebbe inizializzare $scope.pathNames = paths, nel caso la chiamata del metodo pathService.getPathName vada a buon fine", function(){
		$rootScope.$digest();
		expect($scope.pathNames).toBe(paths);
	});
});
