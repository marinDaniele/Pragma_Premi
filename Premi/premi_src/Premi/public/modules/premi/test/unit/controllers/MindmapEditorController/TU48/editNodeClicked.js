/**
 * File: editNodeClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU48 Premi::Front-End::Controllers::MindmapEditorController metodo "editNodeClicked"
 */
'use strict';
describe('TU48 Premi::Front-End::Controllers::MindmapEditorController metodo "editNodeClicked"', function(){
	var $scope, mindmapService, $mdDialog;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show')
				}
			});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen')
				};
			});
			$provide.service('projectService', function(){});
		});
	});

	beforeEach(inject(function($controller, $rootScope, _$mdDialog_, _mindmapService_, projectService){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		mindmapService = _mindmapService_;
		$mdDialog = _$mdDialog_;
		$scope.$on = jasmine.createSpy('$on');
		$scope.$emit = jasmine.createSpy('$emit');
		//crea una nuova istanza di MindmapEditorController
		$controller('MindmapEditorController', { 
			$scope: $scope,
			$mdDialog: $mdDialog,
			mindmapService: mindmapService,
			projectService: projectService
		});
	}));

	//test
	it("Dovrebbe invocare il metodo $mdDialog.show", function(){
		expect($mdDialog.show).not.toHaveBeenCalled();
		$scope.editNodeClicked();
		expect($mdDialog.show).toHaveBeenCalled();
	});
});
