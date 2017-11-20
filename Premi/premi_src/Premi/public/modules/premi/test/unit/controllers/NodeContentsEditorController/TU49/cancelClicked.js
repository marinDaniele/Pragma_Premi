/**
 * File: saveClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "saveClicked"
 */
'use strict';
describe('TU49 Premi::Front-End::Controllers::NodeContentsEditorController metodo "saveClicked"', function(){
	var $scope, projectService, $mdDialog,
	style = "style";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return {
					hide: jasmine.createSpy('hide')
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
		$scope.onConfirm = jasmine.createSpy('onConfirm');
	});

	//test
	it("Dovrebbe invocare il metodo $scope.onConfirm", function(){
		expect($scope.onConfirm).not.toHaveBeenCalled();
		$scope.saveClicked();
		expect($scope.onConfirm).toHaveBeenCalled();
	});

	it("Dovrebbe assegnare 'null' all'attributo $scope.selectedNodeContent", function(){
		expect($scope.selectedNodeContent).not.toBe(null);
		$scope.saveClicked();
		expect($scope.selectedNodeContent).toBe(null);
	});

	it("Dovrebbe invocare il metodo $mdDialog.hide", function(){
		expect($mdDialog.hide).not.toHaveBeenCalled();
		$scope.saveClicked();
		expect($mdDialog.hide).toHaveBeenCalled();
	});
});
