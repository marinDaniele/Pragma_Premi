/**
 * File: addNode.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "addNode"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService metodo "addNode"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, $http, $rootScope, method, url;
	var projectId = "556445fa9bb810da06778091", 
	parentNodeId = "node0",
	node1 = {
		_id : 'node1', 
		contents : [{
			content : 'node1', 
			x : 7, 
			y : 4, 
			height : '10px', 
			width : '10px', 
			class : 'title'
		}]
	};

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return{
					addNode: jasmine.createSpy('addNode'),
					loadMap: jasmine.createSpy('loadMap')
				};
			});
		});
		inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_, _$http_, _$rootScope_){
			mindmapAdapterService = _mindmapAdapterService_;
			projectService = _projectService_;
			mindmapService = _mindmapService_;
			SERVER_URL = _SERVER_URL_;
			$httpBackend = _$httpBackend_;
			$http = _$http_;
			$rootScope = _$rootScope_;
			method = 'POST';
			url = SERVER_URL+'/projects/'+projectId+'/nodes/'+parentNodeId;
			$httpBackend.when(method, url)
				.respond(node1);
			spyOn(window, 'Node').and.returnValue(node1);
		});
		spyOn(projectService, 'getId').and.callThrough();
		$httpBackend.whenGET(SERVER_URL + '/projects/'+projectId)
			.respond({
				'root': '556445fa9bb810da06778092',
				'name': 'Progetto per test',
				'fontFamily': 'sans-serif',
				'fontColor': 'default',
				'bkgColor': 'default',
				'relations': [],
				'nodes': [
					{
						'_id': '556445fa9bb810da06778092',
						'contents': [
							{
								'_id': '556445fa9bb810da06778093',
								'class': 'title',
								'width': 0,
								'height': 0,
								'y': 5.8,
								'x': 28,
								'content': 'Nuovo nodo'
							}
						]
					}
				]
			});
		$httpBackend.expectGET(SERVER_URL+'/projects/'+projectId);
		projectService.loadProject(projectId);
		$httpBackend.flush();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		mindmapService.addNode(parentNodeId);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il costruttore della classe Node, passando come parametri node1._id e node1.contents", function(){
		mindmapService.addNode(parentNodeId);
		$httpBackend.flush();
        expect(window.Node).toHaveBeenCalledWith(node1._id, node1.contents);
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.addNode, passando come parametri parentNodeId e node1", function(){
		mindmapService.addNode(parentNodeId);
		$httpBackend.flush();
        expect(mindmapAdapterService.addNode).toHaveBeenCalledWith(parentNodeId, node1);
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		mindmapService.addNode(parentNodeId);
		$httpBackend.expect(method, url)
			.respond(node1);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto restituito dal metodo mindmapAdapterService.addNode, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = mindmapService.addNode(parentNodeId);
		var expectedOutput = $http({
				'method': method, 
				'url': url
			})
            .then(
            function(response){
                var node = new Node(response.data._id,response.data.contents);
                return mindmapAdapterService.addNode(parentNodeId,node);
            });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});
});