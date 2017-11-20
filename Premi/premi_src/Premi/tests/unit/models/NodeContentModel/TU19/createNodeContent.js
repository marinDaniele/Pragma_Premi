/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    NodeContent = require(path.resolve('./app/models/NodeContentModel'));


describe(
    'TU19 createNodeContent()',
    function()
    {
        it(
            'Dato in input un JSON formattato correttamente, restituire un JSON corretto contenente le informazioni ' +
            'riguardanti il contenuto di un nodo: createNodeContent()',
            function(done)
            {
                NodeContent.createNodeContent(
                    projectStub.contents,
                    function(json)
                    {
                        should.exist(json);
                        done();
                    }
                );
            }
        );
    }
);
