/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    Path = require(path.resolve('./app/models/PathModel'));

describe(
    'TU22 createPath()',
    function(){
        it(
            'deve essere creato un percorso di presentazione non di default',
            function(done)
            {
                Path.createPath(
                    'test path',
                    false,
                    function(path)
                    {
                        should.exist(path);
                        done();
                    }
                );
            }
        );
    }
);
