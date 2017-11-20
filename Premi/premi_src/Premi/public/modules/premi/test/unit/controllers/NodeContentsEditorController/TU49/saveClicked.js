/**
 * File: cancelClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "cancelClicked"
 */
'use strict';
describe('TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "cancelClicked"', function(){
	var $scope, projectService, $mdDialog,
	style = "style";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return {
					cancel: jasmine.createSpy('cancel')
				};
			});
			$provide.factory('projectService', function(){
				return {
					getStyle: jasmine.createSpy('getStyle').and.returnValue(style)
				};
			});
		});
		inject(function($controller, $rootScope, _$mdDialog_, _projectService_){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			projectService = _projectService_;
			$mdDialog = _$mdDialog_;
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
			removeContent: jasmine.createSpy('removeContent')
		};
		$scope.selectedNodeContent = {
			getId: jasmine.createSpy('getId').and.returnValue("id")
		};
		$scope.onReset = jasmine.createSpy('onReset');
	});

	//test
	it("Dovrebbe invocare il metodo $scope.onReset", function(){
		expect($scope.onReset).not.toHaveBeenCalled();
		$scope.cancelClicked();
		expect($scope.onReset).toHaveBeenCalled();
	});

	it("Dovrebbe assegnare 'null' all'attributo $scope.selectedNodeContent", function(){
		expect($scope.selectedNodeContent).not.toBe(null);
		$scope.cancelClicked();
		expect($scope.selectedNodeContent).toBe(null);
	});

	it("Dovrebbe invocare il metodo $mdDialog.cancel", function(){
		expect($mdDialog.cancel).not.toHaveBeenCalled();
		$scope.cancelClicked();
		expect($mdDialog.cancel).toHaveBeenCalled();
	});
});
