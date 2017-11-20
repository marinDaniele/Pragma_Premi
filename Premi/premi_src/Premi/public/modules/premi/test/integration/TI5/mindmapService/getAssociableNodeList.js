/**
 * File: getAssociableNodeList.js
 * @author gmidena - fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI5 Premi::Front-End::Services::MindmapAdapterService metodo "getAssociableNodeList"
 */
'use strict';
describe('TI5 Premi::Front-End::Services::MindmapAdapterService metodo "getAssociableNodeList"', function () {
	var mindmapService, mindmapAdapterService;

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return {
					getAssociableNodeList: jasmine.createSpy('getAssociableNodeList')
				};
			})
		});
	});

	beforeEach(inject(function(_mindmapAdapterService_, _mindmapService_){
		mindmapAdapterService = _mindmapAdapterService_;
		mindmapService = _mindmapService_;
	}));

	it("Dovrebbe invocare il metodo mindmapAdapterService.getAssociableNodeList, passando come parametro nodeId", function(){
		var nodeId = "nodeId";
		mindmapService.getAssociableNodeList(nodeId);
        expect(mindmapAdapterService.getAssociableNodeList).toHaveBeenCalledWith(nodeId);
	});
});
