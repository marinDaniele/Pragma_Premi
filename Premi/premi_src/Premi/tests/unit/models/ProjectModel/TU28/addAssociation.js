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
    'TU28 - addAssociation()',
    function () {
        it(
            'Deve aggiungere un\'associazione tra due nodi',
            function(done)
            {
                var fakeId = mongoose.Types.ObjectId();
                var association;
                projectStub.project.addAssociation(
                    projectStub.project.root,
                    fakeId,
                    function(relId)
                    {
                        association = projectStub.project.relations.id(relId);
                        should(association.destination.toString() === fakeId);
                        should(association.source.toString() === projectStub.project.root.toString());
                        done();
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
