/**
 * File: finalizePathUpdates.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-09
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::PathService metodo "finalizePathUpdates"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::PathService metodo "finalizePathUpdates"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url, data,
	projectId = "project0",
	path = {
		id : 'path',
		getId: function() {return this.id;},
		getName: function() {return this.id;}
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
		});
	})

	beforeEach(inject(function(_projectService_, _pathService_, _SERVER_URL_, _$httpBackend_, _$http_, _$rootScope_){
		projectService = _projectService_;
		pathService = _pathService_;
		SERVER_URL = _SERVER_URL_;
		$httpBackend = _$httpBackend_;
		$http = _$http_;
		$rootScope = _$rootScope_;
		method = 'PUT';
		url = SERVER_URL+'/projects/' + projectId + '/paths/' + path.id;
		data = {'name':path.id};
		$httpBackend.when(method, url, data)
			.respond({});
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		pathService.finalizePathUpdates(path);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		pathService.finalizePathUpdates(path);
		$httpBackend.expect(method, url, data)
			.respond({});
		$httpBackend.flush();
	});
	
	it("Dovrebbe restituire l'oggetto response.data, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = pathService.finalizePathUpdates(path);
		var expectedOutput = $http({
				'method': method, 
				'url': url,
				'data': data
			})
			.then(function(response){
				return response.data;
			});
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});
});
