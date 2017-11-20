/**
 * File: addPath.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-09
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::PathService metodo "addPath"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::PathService metodo "addPath"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url, data,
	projectId = "556445fa9bb810da06778091",
	path = {id : 'path'};

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		inject(function(_projectService_, _pathService_, _SERVER_URL_, _$httpBackend_, _$http_, _$rootScope_){
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
			spyOn(window, 'Path').and.returnValue(path);
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
		expect(realOutput).toEqual(expectedOutput);
	});
});