/**
 * File: setFullscreen.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-11
 * Descrizione: Test di unità TU58 Premi::Front-End::Controllers::PresentationViewerController metodo "setFullscreen"
 */
'use strict';
describe('TU58 Premi::Front-End::Controllers::PresentationViewerController metodo "setFullscreen"', function(){
	var $scope, $rootScope, $q, errorInGetNodes = false, getNodesError, errorInGetPath = false, getPathError, fullscreen, 
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
		spyOn($scope, '$emit');
	});

	//test
	it("Dovrebbe impostare il valore dell'attributo $scope.fullscreen con il valore del parametro fullscreen", function(){
		fullscreen = !$scope.fullscreen;
		expect($scope.fullscreen).toBe(!fullscreen);
		$scope.setFullscreen(fullscreen);
		expect($scope.fullscreen).toBe(fullscreen);
	});

	it("Dovrebbe impostare il valore dell'attributo $scope.sidenavOpen a false, passando il valore 'true' come parametro", function(){
		$scope.sidenavOpen = true;
		$scope.setFullscreen(true);
		expect($scope.sidenavOpen).toBe(false);
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con il parametro 'premi-fullscreen-on', passando il valore 'true' come parametro", function(){
		$scope.setFullscreen(true);
		expect($scope.$emit).toHaveBeenCalledWith('premi-fullscreen-on');
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con il parametro 'premi-fullscreen-off', passando il valore 'false' come parametro", function(){
		$scope.setFullscreen(false);
		expect($scope.$emit).toHaveBeenCalledWith('premi-fullscreen-off');
	});
});
