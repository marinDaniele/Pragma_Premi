/**
 * File: getProjects.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-18
 * Descrizione: Test di unità TU81 Premi::Front-End::Services::ProjectService metodo "getProjects"
 */
'use strict';
describe('TU81 Premi::Front-End::Services::ProjectService metodo "getProjects"', function () {
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
		$httpBackend.whenGET(SERVER_URL + '/projects')
			.respond([{
					'_id': '556445fa9bb810da06778091',
					'name': 'Progetto per test',
					'paths': [
						{
							'_id': '556445fa9bb810da06778094',
							'name': 'Default'
						}
					]
				}]);
	});
	//test
	it('getProjects()', function () {
		$httpBackend.expectGET(SERVER_URL+'/projects');
		projectService.getProjects().then(function(data){
			expect(data).toBeDefined();
			expect(data[0]).toBeDefined();
			expect(data[0]._id).toEqual('556445fa9bb810da06778091');
			expect(data[0].name).toEqual('Progetto per test');
			expect(data[0].paths).toEqual([
				{
					'_id': '556445fa9bb810da06778094',
					'name': 'Default'
				}
			]);
		});
		$httpBackend.flush();
	});
});

