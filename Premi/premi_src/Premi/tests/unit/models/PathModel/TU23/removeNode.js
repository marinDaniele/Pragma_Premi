/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Path = require(path.resolve('./app/models/PathModel'));

describe(
    'TU23 removeNode()',
    function() {
        it(
            'deve essere rimosso un nodo al percorso: removeNode()',
            function(done)
            {
                var nodeId = mongoose.Types.ObjectId();
                projectStub.path.nodes = [];
                projectStub.path.nodes.push(nodeId);
                projectStub.path.removeNode(
                    nodeId,
                    function(nodes){
                        should.not.exist(nodes[0]);
                        done();
                    },
                    function(error){}
                );
            }
        );

        it(
            'deve essere segnalato errore la rimozione un nodo non presente nel percorso: removeNode()',
            function(done)
            {
                var nodeId = mongoose.Types.ObjectId();
                projectStub.path.removeNode(
                    nodeId,
                    function(nodes){
                        should.not.exist(nodes[0]);
                        done();
                    },
                    function(error){
                        should.exist(error);
                        done();
                    }

                );
            }
        );
    }
);
