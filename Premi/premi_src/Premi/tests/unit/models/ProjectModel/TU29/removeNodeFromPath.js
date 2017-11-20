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
    'TU29 - removeNodeFromPath()',
    function () {
        it(
            'Deve rimuovere un nodo da un percorso del progetto',
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
                                        projectStub.project.removeNodeFromPath(
                                            node.id,
                                            path.id,
                                            function(result)
                                            {
                                                result.should.have.property('nodes').with.lengthOf(0);
                                                done();
                                            },
                                            function(error) {}
                                        );
                                    },
                                    function(error) {}
                                );
                            },
                            function (error) {}
                        );
                    },
                    function(error) {}
                );
                var project = projectStub.project;
                projectStub.project.addPath(
                    'path name',
                    function (path) {
                        projectStub.project.addNodeToPath(
                            projectStub.node.id,
                            path.id,
                            function(result)
                            {

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
            }
        );
    }
);
