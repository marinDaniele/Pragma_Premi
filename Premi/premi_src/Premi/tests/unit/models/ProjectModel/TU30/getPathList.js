/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 24/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Project = mongoose.model('Project');

describe(
    'TU30 - getPathList()',
    function () {
        it(
            'Deve ritornare la lista dei percorsi di un progetto',
            function(done)
            {
                projectStub.project.addPath(
                    'path name',
                    function(result)
                    {
                        projectStub.project.getPathList(
                            function(result)
                            {
                                should(result.paths.leght > 0);
                                result.paths.forEach(
                                    function(element)
                                    {
                                        should.exist(element.name);
                                        should.exist(element.id);
                                        should.exist(element.default);
                                    }
                                );
                                done();
                            }
                        );
                    },
                    function(error)
                    {
                        should.exist(error);
                    }
                );
            }
        );

    }
);
