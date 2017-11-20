/**
 * File: nextStep.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-11
 * Descrizione: Test di unità TU57 Premi::Front-End::Controllers::PresentationViewerController metodo "nextStep"
 */
'use strict';
describe('TU57 Premi::Front-End::Controllers::PresentationViewerController metodo "nextStep"', function(){
	var $scope, $rootScope, $q, errorInGetNodes = false, getNodesError, errorInGetPath = false, getPathError,
	currentProject = {
		getName: function(){return "project";},
		getTextColor: function(){return "white";},
		getBackgroundColor: function(){return "blue";},
		getFontFamily: function(){return "Arial";} 
	},
	node0 = {_id : 'node0', contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]},
	node1 = {_id : 'node1', contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node2 = {_id : 'node2', contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]},
	nodes = [node0, node1, node2],
	presentationData = {
		'nodes': nodes,
		'nodesIndex': 0,
		'currentNode': nodes[0]
	},
	path = {
		'id': 'path',
		'steps': nodes
	},
	$routeParams = {'pathId': path.id};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('projectService', function(){
				return {
					getCurrentProject: jasmine.createSpy('getCurrentProject').and.returnValue(currentProject)
				};
			});
			$provide.service('$location', function(){});
			$provide.service('$routeParams', function(){});
			$provide.factory('presentationService', function(){
				return {
					getNodes: jasmine.createSpy('getNodes').and.callFake(function(pathId){
						if(!errorInGetNodes){
							return $q.when(presentationData);
						}
						else{
							getNodesError = "Something whent wrong in getNodes!";
							return $q.reject(getNodesError);
						}
					}),
					getPath: jasmine.createSpy('getPath').and.callFake(function(pathId){
						if(!errorInGetPath){
							return $q.when(path);
						}
						else{
							getPathError = "Something whent wrong in getPath!";
							return $q.reject(getPathError);
						}
					})
				}
			});
		});
		inject(function($controller, _$rootScope_, $mdDialog, projectService, $location, _$q_, presentationService){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			//crea una nuova istanza di PresentationViewerController
			$controller('PresentationViewerController', { 
				$scope: $scope, 
				$mdDialog: $mdDialog,
				projectService: projectService,
				$location: $location, 
				$q: $q, 
				$routeParams: $routeParams, 
				presentationService: presentationService
			});
		});
		spyOn($scope, '$on');
		spyOn($scope, '$broadcast');
	});

	//test
	it("Dovrebbe invocare il metodo $scope.$broadcast, con il parametro 'presentation-nextStep'", function(){
		$scope.nextStep();
		expect($scope.$broadcast).toHaveBeenCalledWith('presentation-nextStep');
	});
});
