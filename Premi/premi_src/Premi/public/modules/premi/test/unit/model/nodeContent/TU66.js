/**
 * File: TU66.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-16
 * Descrizione: Test di unità TU66 Premi::Front-End::Model::NodeContent
 */
'use strict';
describe('Test di unità TU66 Premi::Front-End::Model::NodeContent', function(){
	var nodeContent;
	
	beforeEach(function(){
		nodeContent = new NodeContent('nodeId','nodeContent',1,2,50,50,'title');
	});

	it('Verifico la costruzione dell\'oggetto NodeContent', function(){
		expect(nodeContent).toBeDefined();
	});
	
	it('Verifico getContent', function(){
		var content = nodeContent.getContent();
		expect(content).toEqual('nodeContent');
	});

	it('Verifico getHeight', function(){
		var height = nodeContent.getHeight();
		expect(height).toEqual(50);
	});

	it('Verifico getId', function(){
		var id = nodeContent.getId();
		expect(id).toEqual('nodeId');
	});

	it('Verifico getType', function(){
		var type = nodeContent.getType();
		expect(type).toEqual('title');
	});

	it('Verifico getWidth', function(){
		var width = nodeContent.getWidth();
		expect(width).toEqual(50);
	});

	it('Verifico getX', function(){
		var x = nodeContent.getX();
		expect(x).toEqual(1);
	});

	it('Verifico getY', function(){
		var y = nodeContent.getY();
		expect(y).toEqual(2);
	});
});
