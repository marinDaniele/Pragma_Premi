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
    'TU29 - addNodeToPath()',
    function () {
        it(
            'Deve aggiungere un nodo ad un percorso del progetto',
            function(done)
            {
                projectStub.project.addNode(
                    projectStub.project.root,
                    function(node)
                    {
                        projectStub.project.addPath(
                            'path name',
                            function (path) {
                                projectStub.project.addNodeToPath(
                                    node.id,
                                    path.id,
                                    function(result)
                                    {
                                        result.should.have.property('nodes').with.lengthOf(1);
                                        done();
                                    },
                                    function(error)
                                    {
                                        should.exist(error);
                                    }
                                );
                            },
                            function (error) {
                                should.exist(error);
                            }
                        );
                    },
                    function(error)
                    {
                        should.not.exist(error);
                    }
                );

            }
        );
    }
);
