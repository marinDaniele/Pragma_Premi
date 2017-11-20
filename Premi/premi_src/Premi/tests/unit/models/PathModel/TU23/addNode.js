/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */


'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Path = require(path.resolve('./app/models/PathModel'));

describe(
    'TU23 addNode()',
    function() {
        it(
            'deve essere aggiunto un nodo al percorso',
            function (done) {
                projectStub.path.addNode(projectStub.node.id);
                should.exist(projectStub.path.nodes[0]);
                done();
            }
        );
    }
);
