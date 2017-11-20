/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 26/05/2015
 */

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    Node = require(path.resolve('./app/models/NodeModel')),
    Relation = require(path.resolve('./app/models/RelationModel'));

describe(
    'TU31 - createRelation()',
    function()
    {
        it(
            'Verificare che all\’inizializzazione dell\’applicazione la collection relations sia vuota',
            function(done) {
            Relation.find(
                {},
                function(err, relation) {
                    relation.should.have.length(0);
                    done();
                }
            );
            }
        );

        it(
            'Verificare che, fornendo dei parametri di input validi, venga costruita una relazione gerarchica',
            function(done)
            {
                var type = 'hierarchical';

                Node.createNode(
                    function(node1)
                    {
                        Node.createNode(
                            function(node2) {
                                Relation.createRelation(node1._id, node2._id, type,
                                    function (relation) {
                                        should.exist(relation);
                                        relation.should.have.property('source',node1._id);
                                        relation.should.have.property('destination',node2._id);
                                        relation.should.have.property('class',type);
                                        done();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );

        it(
            'Verificare che, fornendo dei parametri di input validi, venga costruita una associazione',
            function(done)
            {
                var type = 'association';

                Node.createNode(
                    function(node1)
                    {
                        Node.createNode(
                            function(node2) {
                                Relation.createRelation(node1._id, node2._id, type,
                                    function (relation) {
                                        should.exist(relation);
                                        relation.should.have.property('source',node1._id);
                                        relation.should.have.property('destination',node2._id);
                                        relation.should.have.property('class',type);
                                        done();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);
