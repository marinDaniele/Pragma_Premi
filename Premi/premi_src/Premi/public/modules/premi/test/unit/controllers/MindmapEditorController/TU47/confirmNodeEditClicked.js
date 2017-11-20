/**
 * File: confirmNodeEditClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU47 Premi::Front-End::Controllers::MindmapEditorController metodo "confirmNodeEditClicked"
 */
'use strict';
describe('TU47 Premi::Front-End::Controllers::MindmapEditorController', function(){
	var $scope, mindmapService;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('mindmapService', function(){
				return {
					updateNode: jasmine.createSpy('updateNode'),
					listen: jasmine.createSpy('listen')
				};
			});
			$provide.service('projectService', function(){});
		});
	});

	beforeEach(inject(function($controller, $rootScope, $mdDialog, _mindmapService_, projectService){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		mindmapService = _mindmapService_;
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
	it("Dovrebbe invocare il metodo mindmapService.updateNode, con il parametro $scope.currentNode", function(){
		$scope.confirmNodeEditClicked();
		expect(mindmapService.updateNode).toHaveBeenCalledWith($scope.currentNode);
	});
});
