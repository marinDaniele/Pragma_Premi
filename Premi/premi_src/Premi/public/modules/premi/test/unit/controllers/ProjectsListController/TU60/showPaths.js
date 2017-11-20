/**
 * File: showPaths.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-13
 * Descrizione: Test di unità TU60 Premi::Front-End::Controllers::ProjectsListController metodo "showPaths"
 */
'use strict';
describe('TU60 Premi::Front-End::Controllers::ProjectsListController metodo "showPaths"', function(){
	var $scope, $mdDialog,
	paths = [],
	projectId = "project";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show')
				}
			});
		});
		inject(function($controller, $rootScope, _$mdDialog_){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$mdDialog = _$mdDialog_;
			//crea una nuova istanza di ProjectsListController
			$controller('ProjectsListController', { 
				$scope: $scope,
				$mdDialog: $mdDialog
			});
		});
		$scope.$emit = jasmine.createSpy('$emit');
	});

	//test
	it("Dovrebbe invocare il metodo $mdDialog.show", function(){
		expect($mdDialog.show).not.toHaveBeenCalled();
		$scope.showPaths(projectId, paths);
		expect($mdDialog.show).toHaveBeenCalled();
	});
});
