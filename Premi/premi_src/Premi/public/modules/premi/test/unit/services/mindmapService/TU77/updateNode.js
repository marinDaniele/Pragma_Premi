/**
 * File: updateNode.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di unità TU77 Premi::Front-End::Services::MindmapService metodo "updateNode"
 */
'use strict';
describe('TU77 Premi::Front-End::Services::MindmapService metodo "updateNode"', function () {
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
			_type : 'title',
			getContent: function(){ return this.content; },
			getX: function(){ return this._x*1; },
			getY: function(){ return this._y*1; },
			getHeight: function(){ return this._height*1; },
			getWidth: function(){ return this._width*1; },
			getType: function(){ return this._type; }
		}],
		getContents: function(){
			var obj = this.contents;
    		return Object.keys(obj).map(function (key) {return obj[key];});
		},
		getId: function(){
		    return this._id;
		}
	},
	data = {"contents":[{"content":"node1","x":"NaN","y":"NaN","height":"NaN","width":"NaN","class":"title"}]};

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
					updateNode: jasmine.createSpy('updateNode'),
					setNode: jasmine.createSpy('setNode')
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
		method = 'PUT';
		url = SERVER_URL+'/projects/'+projectId+'/nodes/'+node1.getId();
		$httpBackend.when(method, url, data)
			.respond(node1);
		spyOn(window, 'Node').and.returnValue(node1);
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		mindmapService.updateNode(node1);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.updateNode, passando come parametro node1", function(){
		mindmapService.updateNode(node1);
		$httpBackend.flush();
        expect(mindmapAdapterService.setNode).toHaveBeenCalledWith(node1);
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		mindmapService.updateNode(node1);
		$httpBackend.expect(method, url, data)
			.respond(node1);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto response.data, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = mindmapService.updateNode(node1);
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
