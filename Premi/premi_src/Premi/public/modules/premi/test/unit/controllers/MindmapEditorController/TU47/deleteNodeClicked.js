/**
 * File: deleteNodeClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU47 Premi::Front-End::Controllers::MindmapEditorController metodo "deleteNodeClicked"
 */
'use strict';
describe('TU47 Premi::Front-End::Controllers::MindmapEditorController', function(){
	var $scope, $rootScope, $q, mindmapService, errorOccurred, error,
	nodeId = "node0";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen'),
					deleteNode: jasmine.createSpy('deleteNode').and.callFake(function(){
						if(!errorOccurred)
							return $q.when();
						else{
							error = "Something went wrong!";
							return $q.reject(error);
						}
					}),
					drawMap: jasmine.createSpy('drawMap')
				};
			});
			$provide.service('projectService', function(){});
		});
	});

	beforeEach(inject(function($controller, _$rootScope_, _$q_, $mdDialog, _mindmapService_, projectService){
		//crea un nuovo scope figlio
		$rootScope = _$rootScope_;
		$q = _$q_;
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
	it("Dovrebbe invocare il metodo mindmapService.deleteNode, con il parametro nodeId", function(){
		$scope.deleteNodeClicked(nodeId);
		expect(mindmapService.deleteNode).toHaveBeenCalledWith(nodeId);
	});

	it("Dovrebbe invocare il metodo mindmapService.drawMap, nel caso la rimozione di nodo vada a buon fine", function(){
		errorOccurred = false;
		$scope.deleteNodeClicked(nodeId);
		$rootScope.$digest();
		expect(mindmapService.drawMap).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con i parametri 'premi-error' ed error, nel caso la rimozione di nodo non vada a buon fine", function(){
		errorOccurred = true;
		$scope.deleteNodeClicked(nodeId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',error);
	});
});
