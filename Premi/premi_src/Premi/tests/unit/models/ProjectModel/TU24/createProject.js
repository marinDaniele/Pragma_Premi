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
    'TU24 - createProject()',
    function()
    {
        it(
            'Deve creare un nuovo progetto, con nodo radice e percorso di default',
            function(done)
            {
                Project.createProject(
                    'test project',
                    projectStub.user.id,
                    function (project) {
                        should.exist(project);
                        should.exist(project.root);
                        should.exist(project.paths[0]);
                        should.exist(project.nodes[0]);
                        done();
                    },
                    function(error)
                    {
                        should.exist(error);
                        done();
                    }
                );
            }
        );
    }
);
