/**
 * File: PresentationViewerController (error cases).js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU56 Premi::Front-End::Controllers::PresentationViewerController costruttore (solo casi promises non andate a buon fine)
 */
'use strict';
describe('TU56 Premi::Front-End::Controllers::PresentationViewerController costruttore (solo casi promises non andate a buon fine)', function(){
	var $scope, $rootScope, $q, projectService, presentationService, error,
	errorInGetNodes = true,
	errorInGetPath = true,
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
		'steps': nodes,
		'getSteps': function(){return this.steps;}
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
							error = "Something whent wrong!";
							return $q.reject(error);
						}
					}),
					getPath: jasmine.createSpy('getPath').and.callFake(function(pathId){
						if(!errorInGetPath){
							return $q.when(path);
						}
						else{
							error = "Something whent wrong!";
							return $q.reject(error);
						}
					})
				}
			});
		});
		inject(function($controller, _$rootScope_, $mdDialog, _projectService_, $location, _$q_, _presentationService_){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			projectService = _projectService_;
			presentationService = _presentationService_;
			$scope.$on = jasmine.createSpy('$on');
			$scope.$broadcast = jasmine.createSpy('$broadcast');	
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
		$scope.$emit = jasmine.createSpy('$emit');
		$rootScope.$digest();
		$rootScope.$digest();
	});

	//test
	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed error, nel caso la chiamata del metodo presentationService.getNodes e/o presentationService.getPath non vada a buon fine", function(){
		expect($scope.$emit).toHaveBeenCalledWith('premi-error', error);
	});
});
