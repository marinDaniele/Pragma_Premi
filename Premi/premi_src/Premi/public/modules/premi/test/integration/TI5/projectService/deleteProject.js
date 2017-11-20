/**
 * File: deleteProject.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::ProjectService metodo "deleteProject"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::ProjectService metodo "deleteProject"', function () {
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
		$httpBackend.whenDELETE(SERVER_URL + '/projects/556445fa9bb810da06778091')
			.respond({'status': 'ok'});
	});
	//test
	it('Cancellazione di un progetto', function () {
		$httpBackend.expectDELETE(SERVER_URL+'/projects/556445fa9bb810da06778091');
		projectService.deleteProject('556445fa9bb810da06778091').then(function(data){
			expect(data).toBeDefined();
		});
		$httpBackend.flush();
	});
});

