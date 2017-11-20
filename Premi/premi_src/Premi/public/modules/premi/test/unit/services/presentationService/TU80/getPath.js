/**
 * File: getPath.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-09
 * Descrizione: Test di unità TU80 Premi::Front-End::Services::PresentationService metodo "getPath"
 */
'use strict';
describe('TU80 Premi::Front-End::Services::PresentationService metodo "getPath"', function () {
	var presentationService, pathService,
	path = {'id': 'path0'};

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		module(function($provide){
			$provide.factory('pathService', function(){
				return{
					getPath: jasmine.createSpy('getPath').and.returnValue(path)
				};
			});
		});
		inject(function(_presentationService_, _pathService_){
			presentationService = _presentationService_;
			pathService = _pathService_;
		});
	});
	//test
	it("Dovrebbe restituire l'oggetto ritornato dal metodo pathService.getPath", function(){
		var realOutput = presentationService.getPath(path.id);
		var expectedOutput = pathService.getPath(path.id);
		expect(realOutput).toBe(expectedOutput);
	});
});
