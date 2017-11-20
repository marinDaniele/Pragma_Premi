/**
 * File: deleteNode.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "deleteNode"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService metodo "deleteNode"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, $http, $rootScope, method, url;
	var node0 = {_id : 'node0', contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]};
	var node1 = {_id : 'node1', contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]};
	var node2 = {_id : 'node2', contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]};
	var nodes = [node0, node1, node2];
	var relation0 = {_id : 'relation0', source : 'node0', destination : 'node1', class : 'hierarchical'};
	var relation1 = {_id : 'relation1', source : 'node0', destination : 'node2', class : 'hierarchical'};
	var relation2 = {_id : 'relation2', source : 'node1', destination : 'node2', class : 'association'};
	var relations = [relation0, relation1, relation2];
	var projectId = "556445fa9bb810da06778091", 
	nodeId = "node1", 
	rootId = "root",
	data = {
		nodes: nodes,
		relations: relations,
		rootId: rootId
	};

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return{
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
			method = 'DELETE'
			url = SERVER_URL+'/projects/'+projectId+'/nodes/'+nodeId;
			$httpBackend.when(method, url)
				.respond(data);
		});
		spyOn(projectService, 'getId').and.callThrough();
		$httpBackend.whenGET(SERVER_URL + '/projects/'+projectId)
			.respond({
				'root': rootId,
				'name': 'Progetto per test',
				'fontFamily': 'sans-serif',
				'fontColor': 'default',
				'bkgColor': 'default',
				'relations': relations,
				'nodes': nodes
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
		mindmapService.deleteNode(nodeId);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.loadMap, passando come parametri parentNodeId e node1", function(){
		mindmapService.deleteNode(nodeId);
		$httpBackend.flush();
        expect(mindmapAdapterService.loadMap).toHaveBeenCalledWith(nodes, relations, rootId);
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		mindmapService.deleteNode(nodeId);
		$httpBackend.expect(method, url)
			.respond(data);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto restituito dal metodo mindmapAdapterService.loadMap, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = mindmapService.deleteNode(nodeId);
		var expectedOutput = $http({
				'method': method,
				'url': url
			})
            .then(function(response) {
                return mindmapAdapterService.loadMap(response.data.nodes, response.data.relations, projectService.getCurrentProject().getRootId());
            });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});
});