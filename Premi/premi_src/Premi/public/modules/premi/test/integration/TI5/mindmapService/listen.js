/**
 * File: listen.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::MindmapService metodo "listen"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::MindmapService', function () {
	var mindmapService, mindmapAdapterService;

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return {
					listen: jasmine.createSpy('listen')
				};
			})
		});
	});

	beforeEach(inject(function(_mindmapAdapterService_, _mindmapService_){
		mindmapAdapterService = _mindmapAdapterService_;
		mindmapService = _mindmapService_;
	}));

	it("Dovrebbe invocare il metodo mindmapAdapterService.listen, passando come parametri eventName e callback", function(){
		var eventName = "test event name";
		function callback(){}
		mindmapService.listen(eventName, callback);
        expect(mindmapAdapterService.listen).toHaveBeenCalledWith(eventName, callback);
	});
});
