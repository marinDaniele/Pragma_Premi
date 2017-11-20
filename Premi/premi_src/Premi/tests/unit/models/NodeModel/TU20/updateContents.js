/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Node = require(path.resolve('./app/models/NodeModel'));

describe(
    'TU20 updateContents()',
    function()
    {
        it(
            'deve essere aggiornato il contenuto di un nodo',
            function(done)
            {
                projectStub.node.updateNode(
                    projectStub.contents,
                    function(updated){
                        should.exist(updated);
                        should.exist(updated.contents);
                        done();
                    }
                );
            }
        );
    }
);
