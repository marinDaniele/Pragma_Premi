/**
 * File: getNode.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-06-08
 * Descrizione: Test di unità TU78 Premi::Front-End::Services::MindmapService metodo "getNode"
 */
'use strict';
describe('TU78 Premi::Front-End::Services::MindmapService', function () {
	var mindmapService, mindmapAdapterService;

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('mindmapAdapterService', function(){
				return {
					getNode: jasmine.createSpy('getNode')
				};
			})
		});
	});

	beforeEach(inject(function(_mindmapAdapterService_, _mindmapService_){
		mindmapAdapterService = _mindmapAdapterService_;
		mindmapService = _mindmapService_;
	}));

	it("Dovrebbe invocare il metodo mindmapAdapterService.getNode, passando come parametro nodeId", function(){
		var nodeId = "nodeId";
		mindmapService.getNode(nodeId);
        expect(mindmapAdapterService.getNode).toHaveBeenCalledWith(nodeId);
	});
});
