/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Project = mongoose.model('Project');


describe(
    'TU25 - setName()',
    function() {
        it(
            'Deve creare rinominare il progetto',
            function (done) {
                var name = 'new name';
                projectStub.project.setName(
                    name,
                    function () {
                        projectStub.project.should.have.property('name', name);
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
