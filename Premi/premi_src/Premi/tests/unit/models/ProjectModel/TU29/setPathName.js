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
    'TU29 - setPathName()',
    function() {
        it(
            'Deve rinominare un percorso dell progetto',
            function(done)
            {
                projectStub.project.addPath(
                    'path name',
                    function (result) {
                        projectStub.project.setPathName(
                            projectStub.project.paths[1]._id,
                            'new path name',
                            function(result)
                            {
                                result.should.have.property('name', 'new path name');
                                done();
                            },
                            function(error) {
                                should.exist(error);
                                done();
                            }
                        );
                    },
                    function (error) {
                        should.exist(error);
                        done();
                    }
                );

            }
        );
    }
);
