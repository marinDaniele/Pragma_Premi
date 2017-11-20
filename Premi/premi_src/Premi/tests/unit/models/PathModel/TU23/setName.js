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
    'TU23 setName()',
    function() {
        it(
            'deve essere modificato il nome del percorso',
            function (done) {
                projectStub.path.setName('new name');
                projectStub.path.should.have.property('name', 'new name');
                done();
            }
        );
    }
);
