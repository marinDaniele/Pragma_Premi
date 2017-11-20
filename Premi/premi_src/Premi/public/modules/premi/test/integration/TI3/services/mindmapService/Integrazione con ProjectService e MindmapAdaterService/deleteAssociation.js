/**
 * File: deleteAssociation.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "deleteAssociation"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService metodo "deleteAssociation"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, $http, $q, $rootScope, method, url,
	projectId = "556445fa9bb810da06778091",
	associationId = "association0",
	rootNodeId = "node0",
	sourceNodeId = "node1", 
	destinationNodeId = "node2",
	node0 = {_id : rootNodeId, contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]},
	node1 = {_id : sourceNodeId, contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node2 = {_id : destinationNodeId, contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]},
	nodes = [node0, node1, node2],
	edge0 = {_id : associationId, source : 'node1', destination : 'node2', class : 'association'},
	edges = [edge0];
	
	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		/*module(function($provide){
			$provide.factory('mindmapAdapterService', function(){
				return{
					deleteAssociation: jasmine.createSpy('deleteAssociation').and.callFake(
						function(_associationId){
							return _associationId == associationId;
					}),
					loadMap: jasmine.createSpy('loadMap')
				};
			});
		});*/
		inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_, _$q_, _$rootScope_, _$http_){
			mindmapAdapterService = _mindmapAdapterService_;
			projectService = _projectService_;
			mindmapService = _mindmapService_;
			SERVER_URL = _SERVER_URL_;
			$httpBackend = _$httpBackend_;
			$q = _$q_;
			$rootScope = _$rootScope_;
			$http = _$http_;
			method = 'DELETE';
			url = SERVER_URL+'/projects/'+projectId+'/associations/'+associationId;
			$httpBackend.when('DELETE', url)
				.respond({_id: associationId});
			spyOn(window, 'ErrorInfo').and.callFake(function(title, message, code){
				return { _title : title, _message : message, _code : code };
			});
		});
		spyOn(projectService, 'getId').and.callThrough();
		spyOn(mindmapAdapterService, 'deleteAssociation').and.callThrough();
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
		mindmapAdapterService.loadMap(nodes, edges, rootNodeId);
		mindmapService.drawMap();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		mindmapService.deleteAssociation(associationId);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.deleteAssociation, passando come parametri parentNodeId, associationNodeId e associationId", function(){
		mindmapService.deleteAssociation(associationId);
		$httpBackend.flush();
        expect(mindmapAdapterService.deleteAssociation).toHaveBeenCalledWith(associationId);
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		mindmapService.deleteAssociation(associationId);
		$httpBackend.expect(method, url)
			.respond({_id: associationId});
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto response.data, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = mindmapService.deleteAssociation(associationId);
		var expectedOutput = $http({
				'method': method,
				'url': url
			})
            .then(function(response){
                return response.data;
            });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});

	it("Dovrebbe restituire l'oggetto $q.reject(new ErrorInfo('Errore','Non è stato possibile aggiungere l\'associazione','data')), quando il metodo mindmapAdapterService.deleteAssociation restituisce false", function(){
        var realOutput = mindmapService.deleteAssociation(associationId + "1");
        var expectedOutput = $q.reject(new ErrorInfo('Errore','Non è stato possibile aggiungere l\'associazione','data'));
        expect(realOutput).toEqual(expectedOutput);
	});
});