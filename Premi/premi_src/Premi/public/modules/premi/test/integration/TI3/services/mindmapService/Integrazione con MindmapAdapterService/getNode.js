/**
 * File: getNode.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "getNode"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService', function () {
	var mindmapService, mindmapAdapterService,
	node0 = {_id : 'node0', contents : [{content : 'node0', x : 0, y : 0, height : '10px', width : '10px', class : 'title'}]},
	node1 = {_id : 'node1', contents : [{content : 'node1', x : 7, y : 4, height : '10px', width : '10px', class : 'title'}]},
	node2 = {_id : 'node2', contents : [{content : 'node2', x : 5, y : 7, height : '10px', width : '10px', class : 'title'}]},
	nodes = [node0, node1, node2];

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
		});
		inject(function(_mindmapAdapterService_, _mindmapService_){
			mindmapAdapterService = _mindmapAdapterService_;
			mindmapService = _mindmapService_;
		});
		spyOn(mindmapAdapterService, 'getNode').and.callThrough();
		//Caricamento mappa mentale
		mindmapAdapterService.loadMap(nodes, [], node0._id);
		mindmapService.drawMap();
	});

	it("Dovrebbe invocare il metodo mindmapAdapterService.getNode, passando come parametro nodeId", function(){
		var nodeId = node2._id;
		mindmapService.getNode(nodeId);
        expect(mindmapAdapterService.getNode).toHaveBeenCalledWith(nodeId);
	});
});