/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 26/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Project = mongoose.model('Project');

describe(
    'TU30 - getPathNodes()',
    function () {
        it(
            'Deve ritornare la lista dei nodi di un percorso: getPathNodes()',
            function(done)
            {
                projectStub.project.getPathNodes(
                    projectStub.project.paths[0].id,
                    function(result)
                    {
                        should.exist(result);
                        done();
                    },
                    function(err){
                            should.not.exist(err);
                    }
                );
            }
        );
    }
);
