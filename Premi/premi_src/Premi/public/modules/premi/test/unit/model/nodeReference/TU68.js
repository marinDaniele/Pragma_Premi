/**
 * File: TU68.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-16
 * Descrizione: Test di unità TU68 Premi::Front-End::Model::NodeReference
 */
'use strict';
describe('TU68 Premi::Front-End::Model::NodeReference', function(){
    var nodeReference;

    beforeEach(function(){
        nodeReference = new NodeReference('idPath', 'TitoloStep');
    });

    it('Verifico getId', function(){
        var id = nodeReference.getId();
        expect( id ).toEqual('idPath');
    });

    it('Verifico getTitle', function(){
        var titolo = nodeReference.getTitle();
        expect( titolo ).toEqual('TitoloStep');
    });

});
