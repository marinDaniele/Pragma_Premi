/**
 * File: finalizeProjectUpdate.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di unità TU81 Premi::Front-End::Services::ProjectService metodo "finalizeProjectUpdate"
 */
'use strict';
describe('TU81 Premi::Front-End::Services::ProjectService metodo "finalizeProjectUpdate"', function () {
	var $httpBackend, SERVER_URL, projectService;
	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		inject(function(_projectService_, _$httpBackend_, _SERVER_URL_){
			projectService = _projectService_;
			$httpBackend = _$httpBackend_;
			SERVER_URL = _SERVER_URL_;
		});
		$httpBackend.whenGET(SERVER_URL + '/projects/556445fa9bb810da06778091')
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
		$httpBackend.expectGET(SERVER_URL+'/projects/556445fa9bb810da06778091');
		projectService.loadProject('556445fa9bb810da06778091');
		$httpBackend.flush();
	});
	//test
	it('Aggiornamento delle impostazione di un progetto',function(){
		$httpBackend.whenPUT(SERVER_URL + '/projects/556445fa9bb810da06778091').respond({status:'ok'});
		//Ho già un progetto carico sul service
		var project = projectService.getCurrentProject();
		expect(project.getId()).toEqual('556445fa9bb810da06778091');
		project.setBackgroundColor('red');
		$httpBackend.expectPUT(SERVER_URL + '/projects/556445fa9bb810da06778091');
		projectService.finalizeProjectUpdates().then(function(data){
			expect(data).toBeDefined();
			expect(data.status).toEqual('ok');
		});
		$httpBackend.flush();
	});
});

