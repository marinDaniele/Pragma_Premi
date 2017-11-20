/**
 * File: deletePath.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-09
 * Descrizione: Test di unità TU79 Premi::Front-End::Services::PathService metodo "deletePath"
 */
'use strict';
describe('TU79 Premi::Front-End::Services::PathService metodo "deletePath"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url,
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
		method = 'DELETE';
		url = SERVER_URL+'/projects/'+projectId+'/paths/'+path.id;
		$httpBackend.when(method, url)
			.respond({});
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		pathService.deletePath(path.id);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		pathService.deletePath(path.id);
		$httpBackend.expect(method, url)
			.respond({});
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto response.data, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = pathService.deletePath(path.id);
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
});
