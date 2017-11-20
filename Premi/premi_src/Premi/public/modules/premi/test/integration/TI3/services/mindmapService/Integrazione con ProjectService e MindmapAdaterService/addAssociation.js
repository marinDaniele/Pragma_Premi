/**
 * File: addAssociation.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "addAssociation"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService metodo "addAssociation"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, method, url,
	projectId = "556445fa9bb810da06778091", 
	rootNodeId = "node0",
	sourceNodeId = "node1", 
	destinationNodeId = "node2", 
	associationId = "association0",
	requestData = {
		sourceId: sourceNodeId,
		destinationId: destinationNodeId
	},
	responseData = {_id : associationId},
	node0 = {_id : rootNodeId, contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]},
	node1 = {_id : sourceNodeId, contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node2 = {_id : destinationNodeId, contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]},
	nodes = [node0, node1, node2];

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		/*module(function($provide){
			$provide.factory('mindmapAdapterService', function(){
				return{
					addAssociation: jasmine.createSpy('addAssociation'),
					loadMap: jasmine.createSpy('loadMap')
				};
			});
		});*/
		inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_){
			mindmapAdapterService = _mindmapAdapterService_;
			projectService = _projectService_;
			mindmapService = _mindmapService_;
			SERVER_URL = _SERVER_URL_;
			$httpBackend = _$httpBackend_;
			method = 'POST';
			url = SERVER_URL+'/projects/'+projectId+'/associations';
			$httpBackend.when(method, url, requestData)
				.respond(responseData);
		});
		spyOn(projectService, 'getId').and.callThrough();
		spyOn(mindmapAdapterService, 'addAssociation').and.callThrough();
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
		//Caricamento mappa mentale
		mindmapAdapterService.loadMap(nodes, [], rootNodeId);
		mindmapService.drawMap();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		mindmapService.addAssociation(sourceNodeId, destinationNodeId);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.addAssociation, passando come parametri sourceNodeId, destinationNodeId e associationId", function(){
		mindmapService.addAssociation(sourceNodeId, destinationNodeId);
		$httpBackend.flush();
        expect(mindmapAdapterService.addAssociation).toHaveBeenCalledWith(sourceNodeId, destinationNodeId, associationId);
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		mindmapService.addAssociation(sourceNodeId, destinationNodeId);
		$httpBackend.expect(method, url, requestData)
			.respond(responseData);
		$httpBackend.flush();
	});
});