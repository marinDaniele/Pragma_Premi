/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    Node = require(path.resolve('./app/models/NodeModel'));

describe(
    'TU20 createNode()',
    function () {
        it(
            'deve essere creato un nodo',
            function (done) {
                Node.createNode(
                    function (rNode) {
                        should.exist(rNode);

                        done();
                    }
                );
            }
        );
    }
);
