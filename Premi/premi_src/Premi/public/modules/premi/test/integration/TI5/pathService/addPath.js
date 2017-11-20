/**
 * File: addPath.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-09
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::PathService metodo "addPath"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::PathService metodo "addPath"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url, data,
	projectId = "project0",
	path = {id : 'path'};

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
		method = 'POST';
		url = SERVER_URL+'/projects/'+projectId+'/paths';
		data = {'name':path.id};
		$httpBackend.when(method, url, data)
			.respond(path);
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		pathService.addPath(path.id);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		pathService.addPath(path.id);
		$httpBackend.expect(method, url, data)
			.respond(path);
		$httpBackend.flush();
	});
	
	it("Dovrebbe restituire un nuovo percorso, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = pathService.addPath(path.id);
		var expectedOutput = $http({
				'method': method, 
				'url': url,
				'data': data
			})
            .then(
                function(response) {
                    return new Path(response.data.id, name, [], false);
                });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toMatch(expectedOutput);
	});
});
