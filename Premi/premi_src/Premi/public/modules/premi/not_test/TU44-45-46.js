/**
 * File: TU44-45-46.js
 * @author pragma.swe@gmail.com
 * Data: 25-05-2015
 *
 * Descrizione: Test di unità TU44, TU45 e TU46 Premi::Front-End::Model::Path
 *
 */

describe('Test di unità TU44, TU45 e TU46 Premi::Front-End::Model::Path', function(){

    var nr1 = new NodeReference(0, 'titolo1');
    var nr2 = new NodeReference(1, 'titolo2');
    var nr3 = new NodeReference(2, 'titolo2');

    var stepsTest = {
        0 : nr1,
        1 : nr2,
        2 : nr3
    };

    var pathTest;

    describe('Test di unità TU44', function(){

        beforeAll(function(){
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

    describe('Test di unità TU45', function(){

        beforeAll(function(){
            pathTest = new Path(1,'pathName', stepsTest, true);
        });

        it("Verifico getId", function(){

            var id = pathTest.getId();
            expect(id).toEqual(1);

        });

        it("Verifico getName", function(){

            var name = pathTest.getName();
            expect(name).toEqual('pathName');

        });

        it("Verifico getStemp", function(){

            var steps = pathTest.getSteps();
            expect(steps).toEqual(stepsTest);

        });

    });

    describe('Test di unità TU46', function(){

        beforeAll(function(){
            pathTest = new Path(1,'pathName', stepsTest, true);
        });

        it("Verifico setName", function(){

            var newName = 'newPathName';
            pathTest.setName(newName);
            var result = pathTest.getName();
            expect(result).toEqual(newName);

        });

        it("Verifico isDefault", function(){

            var def = pathTest.isDefault();
            expect(def).toBe(true);

        });

    });
});