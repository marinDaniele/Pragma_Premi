/**
 * File: TU64.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-16
 * Descrizione: Test di unità TU64 Premi::Front-End::Model::Node
 */
'use strict';
describe('TU64 Premi::Front-End::Model::Node', function(){
	var nodeContent1 = new NodeContent(0,'text_content',1,2,100,200,'text');
	var nodeContent2 = new NodeContent(1,'img_content',3,4,100,200,'imgUrl');
	var nodeContent3 = new NodeContent(2,'title_content',5,6,100,200,'title');
	var content = [
		nodeContent1,
		nodeContent2,
		nodeContent3
	];
	var node;

	beforeEach(function(){
		node = new Node('testNode', [nodeContent1, nodeContent2, nodeContent3]);
	});

	it('Verifico getContents', function(){
		var result = node.getContents();
		expect(result).toEqual(content);
	});

	it('Verifico getTitle', function(){
		var title = node.getTitle();
		expect(title).toEqual('title_content');
	});
});
