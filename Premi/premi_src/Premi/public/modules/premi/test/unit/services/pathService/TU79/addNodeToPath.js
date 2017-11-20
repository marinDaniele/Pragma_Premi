/**
 * File: addNodeToPath.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-09
 * Descrizione: Test di unità TU79 Premi::Front-End::Services::PathService metodo "addNodeToPath"
 */
'use strict';
describe('TU79 Premi::Front-End::Services::PathService metodo "addNodeToPath"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url, data,
	projectId = "project0",
	node = {
		_id : 'node', 
		contents : [{
			content : 'node', 
			x : 7, 
			y : 4, 
			height : '10px', 
			width : '10px', 
			class : 'title'
		}]
	},
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
		url = SERVER_URL+'/projects/'+projectId+'/paths/'+path.id+'/'+node._id;
		$httpBackend.when(method, url)
			.respond(path);
		spyOn(window, 'Path').and.returnValue(path);
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		pathService.addNodeToPath(node._id, path.id);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		pathService.addNodeToPath(node._id, path.id);
		$httpBackend.expect(method, url)
			.respond(path);
		$httpBackend.flush();
	});
	
	it("Dovrebbe restituire l'oggetto response.data, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = pathService.addNodeToPath(node._id, path.id);
		var expectedOutput = $http({
				'method': method, 
				'url': url
			})
            .then(
                function(response) {
                    return response.data;
                });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});
});
