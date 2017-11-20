/**
 * File: TU72.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-17
 * Descrizione: Test di unità TU72 Premi::Front-End::Model::PresentationNode
 */
'use strict';
describe('TU72 Premi::Front-End::Model::PresentationNode', function(){
    //costruisco riferimenti ai figli
    var child1 = new NodeReference(0, 'titolo1');
    var child2 = new NodeReference(1, 'titolo2');
    var child3 = new NodeReference(2, 'titolo2');
    var childNodes = [child1, child2, child3];
    //costruisco riferimenti alle associazioni
    var associated1 = new NodeReference(3, 'titolo3');
    var associated2 = new NodeReference(4, 'titolo4');
    var associated3 = new NodeReference(5, 'titolo5');
    var associatedNodes = [associated1, associated2, associated3];
    // riferimento nodo padre
    var parentNode = new NodeReference(6, 'titolo6');
    //costruisco contenuti di un nodo
    var nodeContent1 = new NodeContent(0,'text_content',1,2,100,200,'text');
    var nodeContent2 = new NodeContent(1,'img_content',3,4,100,200,'imgUrl');
    var nodeContent3 = new NodeContent(2,'title_content',5,6,100,200,'title');
    var content = [nodeContent1, nodeContent2, nodeContent3];
    //costruisco un PresentationNode
    var presentationNode;

    //inizio il test
    beforeEach(function(){
        presentationNode = new PresentationNode('nodeId', content, parentNode, childNodes, associatedNodes);
    });

    it('Verifico getParentNode', function(){
        var parent = presentationNode.getParentNode();
        expect(parent).toEqual(parentNode);
    });

    it('Verifico getParentNode ritorni null se non ha un padre', function(){
        var testNode = new PresentationNode('nodeId', content, null, childNodes, associatedNodes);
        var parent = testNode.getParentNode();
        expect(parent).toEqual(null);
    });

    it('Verifico getChildNodes', function(){
        var childs = presentationNode.getChildNodes();
        expect(childs).toEqual(childNodes);
    });

    it('Verifico getAssociatedNodes', function(){
        var associated = presentationNode.getAssociatedNodes();
        expect(associated).toEqual(associatedNodes);
    });

});
