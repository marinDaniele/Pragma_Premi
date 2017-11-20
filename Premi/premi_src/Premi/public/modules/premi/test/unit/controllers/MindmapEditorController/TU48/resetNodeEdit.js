/**
 * File: MindmapEditorController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU48 Premi::Front-End::Controllers::MindmapEditorController metodo "resetNodeEdit"
 */
'use strict';
describe('TU48 Premi::Front-End::Controllers::MindmapEditorController metodo "resetNodeEdit"', function(){
	var $scope, mindmapService, nodeId;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen'),
					getNode: jasmine.createSpy('getNode')
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
		//crea una nuova istanza di MindmapEditorController
		$controller('MindmapEditorController', { 
			$scope: $scope,
			$mdDialog: $mdDialog,
			mindmapService: mindmapService,
			projectService: projectService
		});
	}));

	beforeEach(function(){
		$scope.currentNode = {
			'getId': function(){return "node";}
		};
	});

	//test
	it("Dovrebbe invocare il metodo mindmapService.getNode, passando come parametro il valore restituito dal metodo $scope.currentNode.getId", function(){
		nodeId = $scope.currentNode.getId();
		$scope.resetNodeEdit();
		expect(mindmapService.getNode).toHaveBeenCalledWith(nodeId);
	});
});
