/**
 * File: getPath.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-09
 * Descrizione: Test di unità TU79 Premi::Front-End::Services::PathService metodo "getPath"
 */
'use strict';
describe('TU79 Premi::Front-End::Services::PathService metodo "getPath"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url,
	projectId = "project0",
	node0 = {_id : 'node0', contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]},
	node1 = {_id : 'node1', contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node2 = {_id : 'node2', contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]},
	nodes = [node0, node1, node2],
	path = {'id' : 'path', 'nodes': nodes, 'default': false, 'name': 'path'};

	function buildPath(pathId,data){
        var isDefault = data.default;
        var name = data.name;
        var newPath = new Path(pathId,name,[],isDefault);
        data.nodes.forEach(function(nodeJson){
            var node = new Node(nodeJson._id, nodeJson.contents);
            newPath.addStep(node.getId(), node.getTitle());
        });
        return newPath;
    }

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
		method = 'GET';
		url = SERVER_URL+'/projects/'+projectId+'/paths/'+path.id;
		$httpBackend.when(method, url)
			.respond(path);
		spyOn(window, 'Node').and.callFake(function(id, contents){
			return {
				'_id': id, 'contents': contents,
				'getId': function(){return this._id;},
				'getTitle': function(){return this.contents[0].content}
			};
		});
		spyOn(window, 'NodeReference').and.callFake(function(id, title){
			return {'_id': id, '_title': title};
		});
		spyOn(window, 'Path').and.callFake(function(id,name,steps,isDefault){
			return {
				'_id': id, '_name': name, '_steps': steps, '_default': isDefault,
			    'addStep': function(id, title){
			    	this._steps.push(new NodeReference(id, title));
			    }
			};
		});
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		pathService.getPath(path.id);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		pathService.getPath(path.id);
		$httpBackend.expect(method, url)
			.respond(path);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto restituito dalla funzione buildPath, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = pathService.getPath(path.id);
		var expectedOutput = $http({'method': method, 'url': url})
            .then(function(response){
                return buildPath(path.id, response.data);
            });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toMatch(expectedOutput);
	});
});
