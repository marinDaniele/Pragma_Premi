/**
 * File: createProject.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di unità TU81 Premi::Front-End::Services::ProjectService metodo "createProject"
 */
'use strict';
describe('TU81 Premi::Front-End::Services::ProjectService metodo "createProject"', function () {
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
		$httpBackend.whenPOST(SERVER_URL + '/projects')
			.respond({
				'__v': 0,
				'root': '556445fa9bb810da06778092',
				'userId': '555c2a9717121ce319d1d4e2',
				'name': 'Progetto per test',
				'_id': '556445fa9bb810da06778091',
				'fontFamily': 'sans-serif',
				'fontColor': 'default',
				'bkgColor': 'default',
				'paths': [
					{
						'_id': '556445fa9bb810da06778094',
						'name': 'Default',
						'default': true,
						'nodes': [
							'556445fa9bb810da06778092'
						]
					}
				],
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
	});
	//test
	it('Creazione di un progetto', function () {
		$httpBackend.expectPOST(SERVER_URL+'/projects');
		projectService.createProject('Progetto per test').then(function(message){
			expect(message._id).toEqual('556445fa9bb810da06778091');
			expect(message.name).toEqual('Progetto per test');
			expect(message.paths).toEqual([
				{
					'_id': '556445fa9bb810da06778094',
					'name': 'Default',
					'default': true,
					'nodes': [
						'556445fa9bb810da06778092'
					]
				}
			]);
		}, function(error){
			expect(error).toBeUndefined();
		});
		$httpBackend.flush();
	});
});

