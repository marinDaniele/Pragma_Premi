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
    'TU25 - setBkgColor()',
    function () {
        it(
            'Deve cambiare il colore del background dei frame: setBkgColor()',
            function(done)
            {
                var color = 'blue';
                projectStub.project.setBkgColor(
                    color,
                    function()
                    {
                        projectStub.project.should.have.property('bkgColor', color);
                        done();
                    },
                    function(error)
                    {
                        should.exist(error);
                    }
                );
            }
        );
    }
);
