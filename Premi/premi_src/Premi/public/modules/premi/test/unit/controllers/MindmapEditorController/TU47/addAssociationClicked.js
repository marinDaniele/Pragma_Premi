/**
 * File: addAssociationClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU47 Premi::Front-End::Controllers::MindmapEditorController metodo "addAssociationClicked"
 */
'use strict';
describe('TU47 Premi::Front-End::Controllers::MindmapEditorController', function(){
	var $scope, $rootScope, $q, mindmapService, errorOccurred, error, nodeId,
	destId = "destId";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen'),
					addAssociation: jasmine.createSpy('getNode').and.callFake(function(){
						if(!errorOccurred)
							return $q.when();
						else{
							error = "Something went wrong!";
							return $q.reject(error);
						}
					})
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

	beforeEach(function(){
		$scope.currentNode = {
			'getId': function(){return "node";}
		};
	});

	//test
	it("Dovrebbe invocare il metodo mindmapService.addAssociation, passando come parametri il valore restituito dal metodo $scope.currentNode.getId e destId", function(){
		nodeId = $scope.currentNode.getId();
		$scope.addAssociationClicked(destId);
		expect(mindmapService.addAssociation).toHaveBeenCalledWith(nodeId, destId);
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con i parametri 'premi-error' ed error, nel caso l'aggiunta di associazione non vada a buon fine", function(){
		errorOccurred = true;
		$scope.addAssociationClicked(destId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',error);
	});
});
