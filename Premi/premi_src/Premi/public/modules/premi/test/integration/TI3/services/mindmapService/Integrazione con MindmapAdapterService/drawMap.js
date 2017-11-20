/**
 * File: drawMap.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "drawMap"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService metodo "drawMap"', function () {
	var mindmapService, mindmapAdapterService;

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		inject(function(_mindmapAdapterService_, _mindmapService_){
			mindmapAdapterService = _mindmapAdapterService_;
			mindmapService = _mindmapService_;
		});
		spyOn(mindmapAdapterService, 'drawMap').and.callThrough();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.drawMap", function(){
		mindmapService.drawMap();
        expect(mindmapAdapterService.drawMap).toHaveBeenCalled();
	});
});