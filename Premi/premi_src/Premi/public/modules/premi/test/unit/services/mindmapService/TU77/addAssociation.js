/**
 * File: addAssociation.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di unità TU77 Premi::Front-End::Services::MindmapService metodo "addAssociation"
 */
'use strict';
describe('TU77 Premi::Front-End::Services::MindmapService metodo "addAssociation"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, method, url,
	projectId = "project0", 
	sourceNodeId = "node1", 
	destinationNodeId = "node2", 
	associationId = "association0",
	requestData = {
		sourceId: sourceNodeId,
		destinationId: destinationNodeId
	},
	responseData = {_id : associationId};

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
					addAssociation: jasmine.createSpy('addAssociation')
				};
			});
		});
	})

	beforeEach(inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_){
		mindmapAdapterService = _mindmapAdapterService_;
		projectService = _projectService_;
		mindmapService = _mindmapService_;
		SERVER_URL = _SERVER_URL_;
		$httpBackend = _$httpBackend_;
		method = 'POST';
		url = SERVER_URL+'/projects/'+projectId+'/associations';
		$httpBackend.when(method, url, requestData)
			.respond(responseData);
	}));

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
