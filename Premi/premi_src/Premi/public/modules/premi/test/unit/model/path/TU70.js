/**
 * File: TU70.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-17
 * Descrizione: Test di unità TU70 Premi::Front-End::Model::Path
 */
'use strict';
describe('TU70 Premi::Front-End::Model::Path', function(){
    var nr1 = new NodeReference(0, 'titolo1');
    var nr2 = new NodeReference(1, 'titolo2');
    var nr3 = new NodeReference(2, 'titolo2');
    var stepsTest = [
        nr1,
        nr2,
        nr3
    ];
    var pathTest;

    beforeEach(function(){
        pathTest = new Path(1,'pathName', stepsTest, true);
    });

    it('Verifico getId', function(){
        var id = pathTest.getId();
        expect(id).toEqual(1);
    });

    it('Verifico getName', function(){
        var name = pathTest.getName();
        expect(name).toEqual('pathName');
    });

    it('Verifico getSteps', function(){
        var steps = pathTest.getSteps();
        expect(steps).toEqual(stepsTest);
    });

});
