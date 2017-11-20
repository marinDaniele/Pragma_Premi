/**
 * File: addNode.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di unità TU77 Premi::Front-End::Services::MindmapService metodo "addNode"
 */
'use strict';
describe('TU77 Premi::Front-End::Services::MindmapService metodo "addNode"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, $http, $rootScope, method, url;
	var projectId = "project0", parentNodeId = "node0",
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
			$provide.factory('projectService', function(){
				return{
					getId: jasmine.createSpy('getId').and.returnValue(projectId)
				};
			});
			$provide.factory('mindmapAdapterService', function(){
				return{
					addNode: jasmine.createSpy('addNode')
				};
			});
		});
	})

	beforeEach(inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_, _$http_, _$rootScope_){
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
	}));

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
