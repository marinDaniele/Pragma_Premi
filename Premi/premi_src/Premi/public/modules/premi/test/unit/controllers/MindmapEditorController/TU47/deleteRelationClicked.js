/**
 * File: deleteRelationClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU47 Premi::Front-End::Controllers::MindmapEditorController metodo "deleteRelationClicked"
 */
'use strict';
describe('TU47 Premi::Front-End::Controllers::MindmapEditorController', function(){
	var $scope, $rootScope, $q, mindmapService, projectService, errorOccurred, error,
	associationId = "associationId";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen'),
					deleteAssociation: jasmine.createSpy('deleteAssociation').and.callFake(function(){
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

	beforeEach(inject(function($controller, _$rootScope_, _$q_, $mdDialog, _mindmapService_, _projectService_){
		//crea un nuovo scope figlio
		$rootScope = _$rootScope_;
		$q = _$q_;
		$scope = $rootScope.$new();
		mindmapService = _mindmapService_;
		projectService = _projectService_;
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
	it("Dovrebbe invocare il metodo mindmapService.deleteAssociation, con il parametro associationId", function(){
		$scope.deleteRelationClicked(associationId);
		expect(mindmapService.deleteAssociation).toHaveBeenCalledWith(associationId);
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con i parametri 'premi-error' ed error, nel caso l'aggiunta di associazione non vada a buon fine", function(){
		errorOccurred = true;
		$scope.deleteRelationClicked(associationId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',error);
	});
});
