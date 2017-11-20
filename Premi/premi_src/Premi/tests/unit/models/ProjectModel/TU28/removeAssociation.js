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
    'TU28 - removeAssociation()',
    function()
    {
        it(
            'Deve rimuovere un\'associazione tra due nodi',
            function(done)
            {
                var association;
                projectStub.project.relations.forEach(
                    function (element) {
                        if(element.class === 'association')
                        {
                            association = element;
                            return;
                        }
                    }
                );
                projectStub.project.removeAssociation(
                    association.id,
                    function()
                    {
                        projectStub.project.should.have.property('relations').with.lengthOf(0);
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
