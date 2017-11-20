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
    'TU27 - removeNode()',
    function() {
        it(
            'Deve rimuovere nodi, associazioni correlate e toglierle dai percorsi',
            function(done)
            {
                projectStub.project.addNode(
                    projectStub.project.nodes[1].id,
                    function(node)
                    {
                        projectStub.project.addNode(
                            node.id,
                            function(node2)
                            {
                                projectStub.project.addNode(
                                    node2.id,
                                    function(node3)
                                    {
                                        projectStub.project.addAssociation(
                                            node3.id,
                                            projectStub.project.root,
                                            function(relId)
                                            {
                                                projectStub.project.removeNode(
                                                    projectStub.project.nodes[1].id,
                                                    function(result)
                                                    {
                                                        projectStub.project.should.have.property('nodes').with.lengthOf(1);
                                                        projectStub.project.should.have.property('relations').with.lengthOf(0);
                                                        projectStub.project.paths[0].should.have.property('nodes').with.lengthOf(1);
                                                        done();
                                                    },
                                                    function(error) {}
                                                )
                                            },
                                            function(error) {}
                                        );
                                    },
                                    function(error) {}
                                );
                            },
                            function(error) {}
                        );

                    },
                    function(error) {}
                );
            }
        );
    }
);
