/**
 * File: TU67.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-16
 * Descrizione: Test di unità TU67 Premi::Front-End::Model::NodeContent
 */
'use strict';
describe('TU67 Premi::Front-End::Model::NodeContent', function(){
	var nodeContent;

	beforeEach(function(){
		nodeContent = new NodeContent('nodeId','Titolo del nodo di prova',1,2,50,50,'title');
	});

	it('Verifico il metodo getStyle()', function(){
		var css={
			top: '2%',
			left: '1%',
			width: '50%',
			height:'50%',
			position: 'absolute'
		};
		expect(nodeContent.getStyle()).toEqual(css);
	});

	it('Verifico il metodo getStyle() con altezza e larghezza 0', function(){
		var tempContent = new NodeContent('nodeId','Titolo del nodo di prova',1,2,0,0,'title');
		var css={
			top: '2%',
			left: '1%',
			width: 'auto',
			height:'auto',
			position: 'absolute'
		};
		expect(tempContent.getStyle()).toEqual(css);
	});

	it('Verifico setX',function(){
		var editedContent = new NodeContent('nodeId','Titolo del nodo di prova',4,2,50,50,'title');

		nodeContent.setX(4);
		expect(nodeContent).toEqual(editedContent);
	});
	it('verifico setY',function(){
		var editedContent = new NodeContent('nodeId','Titolo del nodo di prova',1,4,50,50,'title');
		nodeContent.setY(4);
		expect(nodeContent).toEqual(editedContent);
	});
	it('verifico setWidth',function(){
		var editedContent = new NodeContent('nodeId','Titolo del nodo di prova',1,2,50,4,'title');
		nodeContent.setWidth(4);
		expect(nodeContent).toEqual(editedContent);
	});
	it('verifico setHeight',function(){
		var editedContent = new NodeContent('nodeId','Titolo del nodo di prova',1,2,4,50,'title');
		nodeContent.setHeight(4);
		expect(nodeContent).toEqual(editedContent);
	});
	it('verifico setContent',function(){
		var editedContent = new NodeContent('nodeId','Titolo del nodo di prova',1,2,4,50,'title');
		editedContent.setContent('Titolo');
		expect(editedContent.getContent()).toEqual('Titolo');
	});
});
