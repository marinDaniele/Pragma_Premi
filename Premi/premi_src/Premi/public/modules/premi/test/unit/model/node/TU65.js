/**
 * File: TU65.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-16
 * Descrizione: Test di unità TU65 Premi::Front-End::Model::Node
 */
'use strict';
describe('TU65 Premi::Front-End::Model::Node', function(){
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
		node = new Node('id1', content);
	});

	it('Verifico addImage aggiunga un immagine', function(){
		node.addImage();

		expect(node.getContents().length).toEqual(4);
		expect(node.getContent(3).getType()).toEqual('imgUrl');

	});

	it('Verifico che addText aggiunga un elemento testuale', function(){

		node.addText();
		var result = node.getContent(3);

		expect(node.getContents().length).toEqual(4);
		expect(result.getType()).toEqual('text');

		/* non conviene testare tutto questo, se le impostazioni di default cambiano, tocca ricambiare il codice
		//variabili di controllo
		var urlDefaultText = 'Elemento testuale';
		var defaultX = 30;
		var defaultY = 30;
		var defaultHeight = 0;
		var defaultWidth = 0;
		var defaultType = 'text';

		expect(result.getContent() ).toEqual( urlDefaultText );
		expect(result.getX() ).toEqual( defaultX );
		expect(result.getY() ).toEqual( defaultY );
		expect(result.getHeight() ).toEqual( defaultHeight );
		expect(result.getWidth ).toEqual( defaultWidth );
		expect(result.getType() ).toEqual( defaultType );
*/
	});

	it('Verifico getContent', function(){
		var ncReturn = node.getContent(0);
		expect(ncReturn).toEqual( nodeContent1 );
	});

	it('Verifico removeContent rimuova un contenuto', function(){
		// ho aggiunto due nodeContent ai tre iniziali quindi gli id sono: 0,1,2,3,4
		var deleted = node.getContent(1);
		var con = node.getContents();

		node.removeContent(1);
		//var ncRes = node.getContent(1);
		//expect(ncRes).toBeUndefined();

		var lung = node.getContents().length;
		expect(lung).toEqual( con.length - 1 );
		expect(node.getContent(1)).not.toEqual(deleted);

	});

});
