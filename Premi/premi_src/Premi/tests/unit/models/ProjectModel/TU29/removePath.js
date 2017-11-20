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
    'TU29 - removePath()',
    function()
    {
        it(
            'Deve rimuovere un percorso dal progetto',
            function(done)
            {
                projectStub.project.addPath(
                    'path name',
                    function (path) {
                        var rem = projectStub.project.paths[0].id;
                        projectStub.project.removePath(
                            rem,
                            function(result)
                            {
                                should(!projectStub.project.paths.id(rem));
                                done();
                            },
                            function(error)
                            {
                                should.exist(error);
                                done();
                            }
                        );
                    },
                    function (error) {
                        should.exist(error);
                    }
                );

            }
        );
    }
);
