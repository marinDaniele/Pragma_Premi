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
    'TU26 - addNode()',
    function() {
        it(
            'Deve aggiungere un nodo al progetto (collegato ad uno esistente)',
            function (done) {
                projectStub.project.addNode(
                    projectStub.project.root,
                    function (node) {
                        should.exist(node);
                        var rel = projectStub.project.relations[0];
                        var dest = rel.destination.toString();
                        var src = rel.source.toString();
                        should(dest === node.id.toString());
                        should(src === projectStub.project.root.toString());
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
