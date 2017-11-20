/**
 * File: loadProject.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::ProjectService metodo "loadProject"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::ProjectService metodo "loadProject"', function () {
	var $httpBackend, SERVER_URL, projectService, mindmapAdapterService;
	var projectId = '556445fa9bb810da06778091';
	var projectName = 'Progetto per test';
	var rootId = 'node0';
	var fontFamily = 'sans-serif';
	var fontColor = 'default';
	var bkgColor = 'default';
	var node0 = {_id : 'node0', contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]};
	var node1 = {_id : 'node1', contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]};
	var node2 = {_id : 'node2', contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]};
	var nodes = [node0, node1, node2];
	var relation0 = {_id : 'relation0', source : 'node0', destination : 'node1', class : 'hierarchical'};
	var relation1 = {_id : 'relation1', source : 'node0', destination : 'node2', class : 'hierarchical'};
	var relation2 = {_id : 'relation2', source : 'node1', destination : 'node2', class : 'association'};
	var relations = [relation0, relation1, relation2];
	var _currentProject = new Project(projectId, projectName, fontFamily, fontColor, bkgColor, rootId);
	var data = {
				'root': rootId,
				'name': projectName,
				'fontFamily': fontFamily,
				'fontColor': fontColor,
				'bkgColor': bkgColor,
				'relations': relations,
				'nodes': nodes
			};

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return {
					loadMap: jasmine.createSpy('loadMap')
				}
			});
		});
		inject(function(_projectService_, _$httpBackend_, _SERVER_URL_, _mindmapAdapterService_){
			projectService = _projectService_;
			$httpBackend = _$httpBackend_;
			SERVER_URL = _SERVER_URL_;
			mindmapAdapterService = _mindmapAdapterService_;
			spyOn(projectService, 'getCurrentProject').and.returnValue(_currentProject);
		});
		$httpBackend.whenGET(SERVER_URL + '/projects/' + projectId)
			.respond(data);
	});
	//test
	it('Caricamento di un Progetto', function () {
		$httpBackend.expectGET(SERVER_URL+'/projects/' + projectId);
		projectService.loadProject(projectId).then(function(){
			expect(projectService.getId()).toBe(projectId);
		});
		$httpBackend.flush();
	});

	it('Richiesta di caricamento di un progetto con il server offline',function(){
		$httpBackend.whenGET(SERVER_URL + '/projects/' + projectId)
			.respond(400,null);
		$httpBackend.expectGET(SERVER_URL+'/projects/' + projectId);
		projectService.loadProject(projectId)
			.then(function(status){
				expect(status).toBeUndefined();
			},function(error){
				expect(error.getTitle()).toBe('Impossibile contattare il server');
				expect(error.getCode()).toBe(0);
				expect(error.getMessage()).toBe('Ci sono dei problemi di comnicazione con il serverquesto può essere ' +
				'dovuto ad un problema della connessione ad internet oppure ad un problema del nostro');
			});
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.loadMap, passando come parametri i nodi, le relazioni e l'identificativo del nodo radice, nel caso il progetto venga caricato correttamente", function(){
		projectService.loadProject(projectId).then(function(){
			expect(mindmapAdapterService.loadMap).toHaveBeenCalledWith(nodes,
                        relations,
                        projectService.getCurrentProject().getRootId());
		});
		$httpBackend.flush();
	})
});

