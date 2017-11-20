/**
 * File: printPresentation.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-11
 * Descrizione: Test di unità TU57 Premi::Front-End::Controllers::PresentationViewerController metodo "printPresentation"
 */
'use strict';
describe('TU57 Premi::Front-End::Controllers::PresentationViewerController metodo "printPresentation"', function(){
	var $scope, $rootScope, $q, projectService, errorInGetNodes = false, getNodesError, errorInGetPath = false, getPathError,
	currentProject = {
		getName: function(){return "project";},
		getTextColor: function(){return "white";},
		getBackgroundColor: function(){return "blue";},
		getFontFamily: function(){return "Arial";} 
	},
	node0 = {
		_id : 'node0',
		contents : [{
			content : 'node0', 
			x : 0, 
			y : 0, 
			height : '10px', 
			width : '10px', 
			class : 'title', 
			getStyle: jasmine.createSpy('getStyle'),
			getType: jasmine.createSpy('getType').and.callFake(function(){return this.class;}),
			getContent: jasmine.createSpy('getContent').and.callFake(function(){return this.content;})
		}], 
		getContents: jasmine.createSpy('getContents').and.callFake(function(){return this.contents;})
	},
	node1 = {
		_id : 'node1', 
		contents : [{
			content : 'node1', 
			x : 7, 
			y : 4, 
			height : '10px', 
			width : '10px', 
			class : 'title', 
			getStyle: jasmine.createSpy('getStyle'),
			getType: jasmine.createSpy('getType').and.callFake(function(){return this.class;}),
			getContent: jasmine.createSpy('getContent').and.callFake(function(){return this.content;})
		}], 
		getContents: jasmine.createSpy('getContents').and.callFake(function(){return this.contents;})
	},
	node2 = {
		_id : 'node2', 
		contents : [{
			content : 'node2', 
			x : 5, 
			y : 7, 
			height : '10px', 
			width : '10px', 
			class : 'title', 
			getStyle: jasmine.createSpy('getStyle'),
			getType: jasmine.createSpy('getType').and.callFake(function(){return this.class;}),
			getContent: jasmine.createSpy('getContent').and.callFake(function(){return this.content;})
		}], 
		getContents: jasmine.createSpy('getContents').and.callFake(function(){return this.contents;})
	},
	nodes = [node0, node1, node2],
	presentationData = {
		'nodes': nodes,
		'nodesIndex': 0,
		'currentNode': nodes[0]
	},
	path = {
		'id': 'path',
		'steps': nodes,
		'getSteps': jasmine.createSpy('getSteps').and.callFake(function(){return this.steps;})
	},
	$routeParams = {'pathId': path.id};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('projectService', function(){
				return {
					getCurrentProject: jasmine.createSpy('getCurrentProject').and.returnValue(currentProject),
					getStyle: jasmine.createSpy('getStyle')
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
		inject(function($controller, _$rootScope_, $mdDialog, _projectService_, $location, _$q_, presentationService){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			projectService = _projectService_;
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
		spyOn(window, 'open').and.callFake(function(){
			return {
				document: jasmine.createSpyObj('document', ['open', 'write', 'close'])
			}
		});
		$scope.currentPath = path;
		$scope.nodes = nodes;
		$scope.printPresentation();
	});

	//test
	it("Dovrebbe invocare il metodo projectService.getStyle", function(){
		expect(projectService.getStyle).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.currentPath.getSteps", function(){
		expect($scope.currentPath.getSteps).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo NodeContent.getContents per ciascun nodo del percorso attuale", function(){
		var pathLenght = $scope.currentPath.getSteps().length;
		for(var i=0; i< pathLenght; i++)
            expect($scope.nodes[i].getContents).toHaveBeenCalled();
	});
	
	it("Dovrebbe invocare il metodo NodeContent.getType per tutti i contenuti di ciascun nodo del percorso attuale", function(){
		var pathLenght = $scope.currentPath.getSteps().length;
		for(var i=0; i< pathLenght; i++){
			var nodeContents = $scope.nodes[i].getContents();
            for (var j = 0; j <nodeContents.length;j++)
        		expect(nodeContents[j].getType).toHaveBeenCalled();
		}
	});

	it("Dovrebbe invocare il metodo NodeContent.getStyle per tutti i contenuti di ciascun nodo del percorso attuale", function(){
		var pathLenght = $scope.currentPath.getSteps().length;
		for(var i=0; i< pathLenght; i++){
			var nodeContents = $scope.nodes[i].getContents();
            for (var j = 0; j <nodeContents.length;j++)
        		expect(nodeContents[j].getStyle).toHaveBeenCalled();
		}
	});

	it("Dovrebbe invocare il metodo NodeContent.getContent per tutti i contenuti di ciascun nodo del percorso attuale", function(){
		var pathLenght = $scope.currentPath.getSteps().length;
		for(var i=0; i< pathLenght; i++){
			var nodeContents = $scope.nodes[i].getContents();
            for (var j = 0; j <nodeContents.length;j++)
        		expect(nodeContents[j].getContent).toHaveBeenCalled();
		}
	});
});
