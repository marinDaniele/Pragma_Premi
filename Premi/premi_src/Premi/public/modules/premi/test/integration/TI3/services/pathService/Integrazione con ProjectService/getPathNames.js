/**
 * File: getPathNames.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-09
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::PathService metodo "getPathNames"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::PathService metodo "getPathNames"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url,
	projectId = "556445fa9bb810da06778091",
	pathNames = {'paths':[]};

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
			method = 'GET';
			url = SERVER_URL+'/projects/'+projectId+'/paths';
			$httpBackend.when(method, url)
				.respond(pathNames);
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
		pathService.getPathNames();
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		pathService.getPathNames();
		$httpBackend.expect(method, url)
			.respond(pathNames);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto restituito dalla funzione buildPath, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = pathService.getPathNames();
		var expectedOutput = $http({
				'method': method, 
				'url': url
			})
            .then(function(response){
                return response.data.paths;
            });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});
});