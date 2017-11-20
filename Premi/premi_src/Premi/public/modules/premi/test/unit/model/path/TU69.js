/**
 * File: TU69.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-17
 * Descrizione: Test di unità TU69 Premi::Front-End::Model::Path
 */
'use strict';
describe('TU69 Premi::Front-End::Model::Path', function(){
    var pathTest;

    beforeEach(function(){
        var nr1 = new NodeReference('0', 'titolo1');
        var nr2 = new NodeReference('1', 'titolo2');
        var nr3 = new NodeReference('2', 'titolo2');

        var stepsTest = [
            nr1,
            nr2,
            nr3
        ];

        pathTest = new Path(1,'pathName', stepsTest, true);
    });

    it('Verifico addStep', function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 3 quindi id: 0,1,2
        pathTest.addStep('3', 'titolo3');
        var lungDopo = pathTest.getSteps().length;
        expect(lungDopo).toEqual(lung + 1);
    });

    it('Verifico deleteStep', function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 3 quindi id: 0,1,2
        var result = pathTest.deleteStep('2');
        var lungDopo = pathTest.getSteps().length;
        expect(result).toEqual(true);
        expect(lungDopo).toEqual(lung - 1);
    });

    it('Verifico deleteStep - con id non valido', function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 3 quindi id: 0,1,2
        var result = pathTest.deleteStep('4');
        var lungDopo = pathTest.getSteps().length;
        expect(result).toBe(false);
        expect(lungDopo).toEqual(lung);
    });

});
