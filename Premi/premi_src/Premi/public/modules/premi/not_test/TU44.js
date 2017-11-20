/**
 * File: TU44.js
 * @author Daniele Marin
 * Data: 25-05-2015
 *
 * Descrizione: Test di unità TU44 Premi::Front-End::Model::Path
 *
 */

describe('Test di unità TU44  Premi::Front-End::Model::Path', function(){

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

    it("Verifico addStep", function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 3 quindi id: 0,1,2
        pathTest.addStep(3, 'titolo3');
        var lungDopo = pathTest.getSteps().length;
        expect(lungDopo).toEqual(lung + 1);
    });

    it("Verifico deleteStep", function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 4 quindi id: 0,1,2,3
        pathTest.deleteStep(3);
        var lungDopo = pathTest.getSteps().length;
        expect(lungDopo).toEqual(lung - 1);
    });

});
