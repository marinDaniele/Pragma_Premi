/**
 * File: drawMap.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::MindmapService metodo "drawMap"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::MindmapService metodo "drawMap"', function () {
	var mindmapService, mindmapAdapterService;

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return {
					drawMap: jasmine.createSpy('drawMap')
				};
			})
		});
	});

	beforeEach(inject(function(_mindmapAdapterService_, _mindmapService_){
		mindmapAdapterService = _mindmapAdapterService_;
		mindmapService = _mindmapService_;
	}));

	it("Dovrebbe invocare il metodo mindmapAdapterService.drawMap", function(){
		mindmapService.drawMap();
        expect(mindmapAdapterService.drawMap).toHaveBeenCalled();
	});
});
