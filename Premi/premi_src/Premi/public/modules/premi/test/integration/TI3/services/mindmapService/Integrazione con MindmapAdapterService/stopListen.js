/**
 * File: stopListen.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "stopListen"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService', function () {
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
		spyOn(mindmapAdapterService, 'stopListen').and.callThrough();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.stopListen, passando come paramtri eventName e callback", function(){
		var eventName = "test event name";
		function callback(){}
		mindmapService.listen(eventName, callback);
		mindmapService.stopListen(eventName, callback);
        expect(mindmapAdapterService.stopListen).toHaveBeenCalledWith(eventName, callback);
	});
});