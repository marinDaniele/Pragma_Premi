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
    'TU20 getContents()',
    function () {
        it(
            'deve essere ritornato il contenuto',
            function (done) {
                projectStub.node.getContents(
                    function (contents){
                        should.exist(contents);
                        done();
                    }
                );
            }
        );
    }
);
