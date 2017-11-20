/**
 * File: deleteAssociation.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::MindmapService metodo "deleteAssociation"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::MindmapService metodo "deleteAssociation"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, $http, $q, $rootScope, method, url,
	projectId = "project0", 
	associationId = "association0";
	
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
					deleteAssociation: jasmine.createSpy('deleteAssociation').and.callFake(
						function(_associationId){
							return _associationId == associationId;
						})
				};
			});
		});
	})

	beforeEach(inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_, _$q_, _$rootScope_, _$http_){
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
	}));

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
