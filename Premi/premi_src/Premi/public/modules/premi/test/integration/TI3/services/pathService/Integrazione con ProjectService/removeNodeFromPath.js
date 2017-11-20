/**
 * File: removeNodeFromPath.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-09
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::PathService metodo "removeNodeFromPath"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::PathService metodo "removeNodeFromPath"', function () {
	var pathService, projectService, SERVER_URL, $httpBackend, $http, $rootScope, method, url, 
	projectId = "556445fa9bb810da06778091",
	node = {_id : 'node', contents : [{content : 'node', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node0 = {_id : 'node0', contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]},
	node1 = {_id : 'node1', contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node2 = {_id : 'node2', contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]},
	nodes = [node0, node1, node2], path = {'id' : 'path', 'default': false, 'name': 'path', 'nodes': nodes};

	function buildPath(pathId,data){
        var isDefault = data.default;
        var name = data.name;
        var newPath = new Path(pathId,name,[],isDefault);
        data.nodes.forEach(function (nodeJson){
            var node = new Node(nodeJson._id, nodeJson.contents);
            newPath.addStep(node.getId(), node.getTitle());
        });
        return newPath;
    }

	beforeEach(function (){
		module('premi.services');
		module(function ($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		inject(function (_projectService_, _pathService_, _SERVER_URL_, _$httpBackend_, _$http_, _$rootScope_){
			projectService = _projectService_;
			pathService = _pathService_;
			SERVER_URL = _SERVER_URL_;
			$httpBackend = _$httpBackend_;
			$http = _$http_;
			$rootScope = _$rootScope_;
			method = 'DELETE';
			url = SERVER_URL+'/projects/'+projectId+'/paths/'+path.id+'/'+node._id;
			$httpBackend.when(method, url)
				.respond(path);
			window.Nofereference = jasmine.createSpy('NodeReference').and.callFake(function (id,title){
			    this._id = id;
			    this._title = title;
				this.getId = function (){
				    return this._id;
				};
				this.getTitle = function (){
				    return this._title;
				};
			});
			window.Path = jasmine.createSpy('Path').and.callFake(function (id,name,steps,isDefault){
			    this._id = id;
			    this._name = name;
			    this._steps = steps;
			    this._default = isDefault;
				this.getId = function (){
				    return this._id;
				};
				this.getName = function (){
				    return this._name;
				};
				this.getSteps = function (){
				    return this._steps;
				};
				this.setName = function (name){
				    this._name = name;
				};
				this.addStep = function (id, title){
				    this._steps.push(new NodeReference(id, title));
				};
				this.deleteStep = function (nodeId){
				    for(var i=0;i<this._steps.length;i++){
				        if (this._steps[i].getId() === nodeId){
				            this._steps.splice(i,1);
				            return true;
				        }
				    }
				    return false;
				};
				this.isDefault = function (){
				    return this._default;
				};
			});
			window.Project = jasmine.createSpy('Project').and.callFake(function (id, name, backgroundColor, fontFamily, textColor, rootId){
			    this._id = id;
			    this._name = name;
			    this._backgroundColor = backgroundColor;
			    this._fontFamily = fontFamily;
			    this._textColor = textColor;
			    this._rootId = rootId;
				Project.prototype.getRootId= function (){
				    return this._rootId;
				};
				Project.prototype.getId = function (){
				    return this._id;
				};
				Project.prototype.getName = function (){
				    return this._name;
				};
				Project.prototype.getBackgroundColor = function (){
				    return this._backgroundColor;
				};
				Project.prototype.getFontFamily = function (){
				    return this._fontFamily;
				};
				Project.prototype.getTextColor = function (){
				    return this._textColor;
				};
				Project.prototype.setName = function (name){
				    this._name = name;
				};
				Project.prototype.setBackgroundColor = function (backgroundColor){
				    this._backgroundColor = backgroundColor;
				};
				Project.prototype.setFontFamily = function (fontFamily){
				    this._fontFamily = fontFamily;
				};
				Project.prototype.setTextColor = function (textColor){
				    this._textColor = textColor;
				};
			});
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

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
 	});

	it("Dovrebbe invocare il metodo projectService.getId", function (){
		pathService.removeNodeFromPath(node._id, path.id);
		$httpBackend.flush();
        expect(projectService.getId).toHaveBeenCalled();
	});

	it("Dovrebbe inviare una richiesta al server", function (){
		pathService.removeNodeFromPath(node._id, path.id);
		$httpBackend.expect(method, url)
			.respond(path);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto restituito dalla funzione buildPath, nel caso la richiesta al server vada a buon fine", function (){
		var realOutput = pathService.removeNodeFromPath(node._id, path.id);
		var expectedOutput = $http({
				'method': method, 
				'url': url
			})
            .then(function (response){
                return buildPath(path.id, response.data);
            });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toMatch(expectedOutput);
	});
});