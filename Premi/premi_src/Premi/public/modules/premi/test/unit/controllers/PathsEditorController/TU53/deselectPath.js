/**
 * File: deselectPath.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU53 Premi::Front-End::Controllers::PathsEditorController metodo "deselectPath"
 */
'use strict';
describe('TU53 Premi::Front-End::Controllers::PathsEditorController metodo "deselectPath"', function(){
	var $scope, $rootScope, $q, errorOccurred = false, error,
	path = {
		'getId': function(){return "path2";},
		'getName': function(){return "newPath";}
	},
	paths = [{'_id': "path0", 'name': "path0"}, {'_id': "path1", 'name': "path1"}, {'_id': "path2", 'name': "path2"}];
	
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
		$rootScope.$digest();
	}));

	//test
	it("Dovrebbe impostare l'attributo $scope.currentNode a null", function(){
		$scope.pathSelected = true;
		$scope.currentPath = path;
		$scope.deselectPath();
		expect($scope.currentPath).toBe(null);
	});

	it("Dovrebbe impostare l'attributo $scope.pathSelected a false", function(){
		$scope.pathSelected = true;
		$scope.currentPath = path;
		$scope.deselectPath();
		expect($scope.pathSelected).toBe(false);
	});

	it("Dovrebbe aggiornare il nome del percorso deselezionato con le eventuali modifiche", function(){
		$scope.pathSelected = true;
		$scope.currentPath = path;
		var editedName = $scope.currentPath.getName();
        var currentId = $scope.currentPath.getId();
		$scope.deselectPath();
        var i = 0
		for (; $scope.pathNames[i]._id !== currentId && i < $scope.pathNames.length; i++);
		expect($scope.pathNames[i].name).toBe(editedName);
	});
});
