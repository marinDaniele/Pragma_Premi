/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Project = mongoose.model('Project');

describe(
    'TU29 - addPath()',
    function() {
        it(
            'Deve aggiungere un percorso al progetto',
            function (done) {
                projectStub.project.addPath(
                    'path name',
                    function (result) {
                        result.should.have.property('name', 'path name');
                        done();
                    },
                    function (error) {
                        should.exist(error);
                    }
                );
            }
        );
    }
);
