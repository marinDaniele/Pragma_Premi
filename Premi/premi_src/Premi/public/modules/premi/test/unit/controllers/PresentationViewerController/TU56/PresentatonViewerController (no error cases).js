/**
 * File: PresentationViewerController (no error cases).js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU56 Premi::Front-End::Controllers::PresentationViewerController costruttore (no promises non andate a buon fine)
 */
'use strict';
describe('TU56 Premi::Front-End::Controllers::PresentationViewerController costruttore (no promises non andate a buon fine)', function(){
	var $scope, $rootScope, $q, projectService, presentationService, getNodesError, getPathError,
	errorInGetNodes = false, 
	errorInGetPath = false, 
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
	});

	//test
	it("Dovrebbe inizializzare l'attributo $scope.nodes a null", function(){
		expect($scope.nodes).toBe(null);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.nodesIndex a null", function(){
		expect($scope.nodesIndex).toBe(null);
	});

	it("Dovrebbe inizializzare l'attributo $scope.currentPath a null", function(){
		expect($scope.currentPath).toBe(null);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.currentNode a null", function(){
		expect($scope.currentNode).toBe(null);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.fullscreen a false", function(){
		expect($scope.fullscreen).toBe(false);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.currentIndex a 0", function(){
		expect($scope.currentIndex).toBe(0);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.presentationLength a 0", function(){
		expect($scope.presentationLength).toBe(0);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.linearPresentation a true", function(){
		expect($scope.linearPresentation).toBe(true);
	});
	
	it("Dovrebbe inizializzare l'attributo $scope.sidenavOpen a false", function(){
		expect($scope.sidenavOpen).toBe(false);
	});

	it("Dovrebbe invocare il metodo presentationService.getNodes con il parametro $routeParams.pathId", function(){
		expect(presentationService.getNodes).toHaveBeenCalledWith($routeParams.pathId);
	});

	it("Dovrebbe aggiornare l'attributo $scope.nodes con il valore di presentationData.nodes, nel caso presentationService.getNodes vada a buon fine", function(){
		expect($scope.nodes).not.toBe(presentationData.nodes);
		$rootScope.$digest();
		expect($scope.nodes).toBe(presentationData.nodes);
	});

	it("Dovrebbe aggiornare l'attributo $scope.nodesIndex con il valore di presentationData.index, nel caso presentationService.getNodes vada a buon fine", function(){
		expect($scope.nodesIndex).not.toBe(presentationData.index);
		$rootScope.$digest();
		expect($scope.nodesIndex).toBe(presentationData.index);
	});

	it("Dovrebbe aggiornare l'attributo $scope.currentNode con il valore di presentationData.nodes[0], nel caso presentationService.getNodes vada a buon fine", function(){
		expect($scope.currentNode).not.toBe(presentationData.nodes[0]);
		$rootScope.$digest();
		expect($scope.currentNode).toBe(presentationData.nodes[0]);
	});

	it("Dovrebbe invocare il metodo presentationService.getPath con il parametro $routeParams.pathId", function(){
		expect(presentationService.getPath).toHaveBeenCalledWith($routeParams.pathId);
	});

	it("Dovrebbe invocare il metodo $scope.$broadcast con i parametri 'presentation-init' e []", function(){
		$rootScope.$digest();
		expect($scope.$broadcast).toHaveBeenCalledWith('presentation-init', []);
	});

	it("Dovrebbe invocare il metodo $scope.$on, con i parametri 'presentation-goingToNode' ed error", function(){
		expect($scope.$on).toHaveBeenCalledWith("presentation-goingToNode", jasmine.any(Function));
	});
});
